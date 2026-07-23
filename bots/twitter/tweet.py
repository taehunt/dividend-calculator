#!/usr/bin/env python3
"""Post today's Income Pulse score to X (Twitter)."""

from __future__ import annotations

import json
import os
import random
import sys
from pathlib import Path
from typing import Any

API_KEY = os.environ.get("TWITTER_API_KEY")
API_SECRET = os.environ.get("TWITTER_API_SECRET")
ACCESS_TOKEN = os.environ.get("TWITTER_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")

ROOT = Path(__file__).resolve().parents[2]
PULSE_PATH = ROOT / "public" / "data" / "income-pulse.json"
PULSE_URL = "https://www.yieldgrower.com/pulse"


def get_twitter_client():
    import tweepy

    return tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
    )


def load_pulse() -> dict[str, Any] | None:
    if not PULSE_PATH.exists():
        return None
    try:
        return json.loads(PULSE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Warning: could not read pulse data: {exc}", file=sys.stderr)
        return None


def fmt_pct(value: Any, digits: int = 2) -> str | None:
    if value is None:
        return None
    try:
        return f"{float(value):.{digits}f}%"
    except (TypeError, ValueError):
        return None


def fmt_signed_pct(value: Any, digits: int = 2) -> str | None:
    if value is None:
        return None
    try:
        num = float(value)
    except (TypeError, ValueError):
        return None
    sign = "+" if num >= 0 else ""
    return f"{sign}{num:.{digits}f}%"


def score_delta(pulse: dict[str, Any]) -> int | None:
    history = pulse.get("history") or []
    if not isinstance(history, list) or len(history) < 2:
        return None
    prev = history[-2].get("score")
    curr = history[-1].get("score")
    if prev is None or curr is None:
        return None
    try:
        return int(curr) - int(prev)
    except (TypeError, ValueError):
        return None


def generate_pulse_tweet(pulse: dict[str, Any]) -> str | None:
    score = pulse.get("score")
    if score is None:
        return None

    label = (pulse.get("scoreLabel") or {}).get("en") or "n/a"
    avg = fmt_pct(pulse.get("avgEtfYield"))
    dgs10 = fmt_pct((pulse.get("rates") or {}).get("dgs10", {}).get("value"))
    spread = fmt_signed_pct(pulse.get("spreadVs10y"))
    delta = score_delta(pulse)

    if delta is None:
        delta_line = "Fresh daily readout from YieldGrower."
    elif delta > 0:
        delta_line = f"Up {delta} vs yesterday."
    elif delta < 0:
        delta_line = f"Down {abs(delta)} vs yesterday."
    else:
        delta_line = "Unchanged vs yesterday."

    metric_bits = []
    if avg and dgs10 and spread:
        metric_bits.append(f"ETF yield {avg} vs 10Y {dgs10} ({spread})")
    elif avg:
        metric_bits.append(f"Avg ETF yield {avg}")
    metrics = metric_bits[0] if metric_bits else "Full macro + ETF board inside."

    templates = [
        (
            "Income Pulse today: {score}/100 ({label})\n\n"
            "{metrics}\n"
            "{delta_line}\n\n"
            "Full score → {url}\n\n"
            "#IncomePulse #Dividends #FIRE"
        ),
        (
            "Is dividend income attractive today?\n\n"
            "YG Attractiveness Score: {score}/100 — {label}\n"
            "{metrics}\n\n"
            "{delta_line}\n"
            "{url}\n\n"
            "#DividendInvesting #PassiveIncome #Stocks"
        ),
        (
            "Daily Income Pulse: {score}/100 ({label})\n\n"
            "{metrics}\n\n"
            "Track the trend → {url}\n\n"
            "#YieldGrower #Dividends #Investing"
        ),
    ]

    text = random.choice(templates).format(
        score=score,
        label=label,
        metrics=metrics,
        delta_line=delta_line,
        url=PULSE_URL,
    )
    if len(text) > 280:
        text = (
            f"Income Pulse: {score}/100 ({label})\n\n"
            f"{metrics}\n\n"
            f"{PULSE_URL}\n\n"
            "#IncomePulse #Dividends"
        )
    return text


def generate_fallback_tweet() -> str:
    tickers = ["$SCHD", "$VYM", "$VIG", "$JEPI", "$O", "$KO"]
    ticker = random.choice(tickers)
    templates = [
        (
            "Wondering how much {ticker} you need for retirement income?\n\n"
            "Model DRIP + contributions free → https://www.yieldgrower.com\n\n"
            "#DividendInvesting #FIRE"
        ),
        (
            "Check today’s Income Pulse, then plan with the calculators.\n\n"
            "{url}\n\n"
            "#IncomePulse #Dividends #PassiveIncome"
        ),
    ]
    return random.choice(templates).format(ticker=ticker, url=PULSE_URL)


def generate_tweet() -> str:
    pulse = load_pulse()
    if pulse:
        text = generate_pulse_tweet(pulse)
        if text:
            return text
    print("Pulse data unavailable — using fallback promo tweet.", file=sys.stderr)
    return generate_fallback_tweet()


def main() -> int:
    if not all([API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET]):
        print("Error: Missing Twitter API credentials.", file=sys.stderr)
        return 1

    tweet_text = generate_tweet()
    print("--- tweet preview ---")
    print(tweet_text)
    print(f"--- length: {len(tweet_text)} ---")

    client = get_twitter_client()
    try:
        response = client.create_tweet(text=tweet_text)
        print(f"Successfully posted tweet: {response.data}")
        return 0
    except Exception as exc:  # noqa: BLE001
        print(f"Error posting tweet: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
