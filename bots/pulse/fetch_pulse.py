#!/usr/bin/env python3
"""Fetch FRED macro + Yahoo ETF yields and write Income Pulse JSON."""

from __future__ import annotations

import json
import math
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
OUT_PATH = ROOT / "public" / "data" / "income-pulse.json"

FRED_SERIES = {
    "dgs10": "DGS10",
    "dgs2": "DGS2",
    "t10y2y": "T10Y2Y",
    "cpi": "CPIAUCSL",
    "vix": "VIXCLS",
    "fed_funds": "FEDFUNDS",
}

ETF_WATCHLIST = [
    {"symbol": "SCHD", "name": "Schwab US Dividend Equity"},
    {"symbol": "VYM", "name": "Vanguard High Dividend Yield"},
    {"symbol": "VIG", "name": "Vanguard Dividend Appreciation"},
    {"symbol": "JEPI", "name": "JPMorgan Equity Premium Income"},
    {"symbol": "QYLD", "name": "Global X Nasdaq 100 Covered Call"},
    {"symbol": "DIVO", "name": "Amplify CWP Enhanced Dividend"},
]

USER_AGENT = (
    "Mozilla/5.0 (compatible; YieldGrowerPulse/1.0; +https://yieldgrower.com)"
)


def http_get_json(url: str, timeout: int = 30) -> Any:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fred_observations(series_id: str, api_key: str, limit: int = 24) -> list[dict]:
    params = urllib.parse.urlencode(
        {
            "series_id": series_id,
            "api_key": api_key,
            "file_type": "json",
            "sort_order": "desc",
            "limit": str(limit),
        }
    )
    url = f"https://api.stlouisfed.org/fred/series/observations?{params}"
    data = http_get_json(url)
    rows = []
    for obs in data.get("observations", []):
        value = obs.get("value")
        if value in (None, ".", ""):
            continue
        try:
            rows.append({"date": obs["date"], "value": float(value)})
        except (TypeError, ValueError):
            continue
    return rows


def latest_value(rows: list[dict]) -> tuple[float | None, str | None]:
    if not rows:
        return None, None
    return rows[0]["value"], rows[0]["date"]


def cpi_yoy(rows: list[dict]) -> tuple[float | None, str | None]:
    """rows are newest-first monthly CPI levels."""
    if len(rows) < 13:
        return None, None
    latest = rows[0]["value"]
    year_ago = rows[12]["value"]
    if year_ago == 0:
        return None, None
    return ((latest / year_ago) - 1.0) * 100.0, rows[0]["date"]


def yahoo_etf(symbol: str) -> dict[str, Any]:
    """Trailing yield ≈ sum of last ~1y dividends / last price via Yahoo chart."""
    params = urllib.parse.urlencode(
        {
            "range": "1y",
            "interval": "1mo",
            "events": "div",
            "includePrePost": "false",
        }
    )
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?{params}"
    try:
        data = http_get_json(url)
        result = data["chart"]["result"][0]
        meta = result.get("meta") or {}
        price = meta.get("regularMarketPrice")
        if price is None:
            closes = ((result.get("indicators") or {}).get("quote") or [{}])[0].get("close") or []
            for c in reversed(closes):
                if c is not None:
                    price = float(c)
                    break

        div_events = (result.get("events") or {}).get("dividends") or {}
        ttm = 0.0
        for item in div_events.values():
            try:
                ttm += float(item.get("amount") or 0)
            except (TypeError, ValueError):
                continue

        yield_pct = None
        if price and price > 0 and ttm > 0:
            yield_pct = round((ttm / float(price)) * 100.0, 3)

        return {
            "symbol": symbol,
            "price": round(float(price), 2) if price is not None else None,
            "yield": yield_pct,
            "currency": meta.get("currency") or "USD",
            "ok": yield_pct is not None,
        }
    except (urllib.error.URLError, KeyError, IndexError, TypeError, ValueError) as exc:
        return {
            "symbol": symbol,
            "price": None,
            "yield": None,
            "currency": "USD",
            "ok": False,
            "error": str(exc),
        }


def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))


def curve_regime(spread: float | None) -> dict[str, str]:
    if spread is None:
        return {
            "id": "unknown",
            "label_en": "Unavailable",
            "label_ko": "데이터 없음",
        }
    if spread < -0.1:
        return {
            "id": "inverted",
            "label_en": "Inverted",
            "label_ko": "역전",
        }
    if spread > 0.5:
        return {
            "id": "steep",
            "label_en": "Steep",
            "label_ko": "가파름",
        }
    return {
        "id": "normal",
        "label_en": "Normal",
        "label_ko": "정상",
    }


def vix_penalty(vix: float | None) -> float:
    if vix is None:
        return 0.0
    if vix > 25:
        return 10.0
    if vix > 20:
        return 5.0
    return 0.0


def attractiveness_score(
    avg_etf_yield: float | None,
    dgs10: float | None,
    real_yield: float | None,
    vix: float | None,
) -> int | None:
    if avg_etf_yield is None or dgs10 is None:
        return None
    ry = real_yield if real_yield is not None else 0.0
    raw = (
        50.0
        + 20.0 * (avg_etf_yield - dgs10)
        - 10.0 * max(0.0, ry)
        - vix_penalty(vix)
    )
    return int(round(clamp(raw, 0.0, 100.0)))


def score_label(score: int | None) -> dict[str, str]:
    if score is None:
        return {"en": "Unavailable", "ko": "계산 불가"}
    if score >= 70:
        return {"en": "Attractive", "ko": "매력적"}
    if score >= 45:
        return {"en": "Neutral", "ko": "중립"}
    return {"en": "Cautious", "ko": "신중"}


def build_brief(
    score: int | None,
    avg_etf_yield: float | None,
    dgs10: float | None,
    real_yield: float | None,
    regime: dict[str, str],
) -> dict[str, str]:
    label = score_label(score)
    spread = None
    if avg_etf_yield is not None and dgs10 is not None:
        spread = avg_etf_yield - dgs10

    if score is None or spread is None:
        return {
            "en": "Today’s Income Pulse is incomplete. Check back after the next daily update.",
            "ko": "오늘 인컴 펄스 데이터가 아직 완전하지 않습니다. 다음 일일 업데이트 후 다시 확인해 주세요.",
        }

    spread_txt = f"{spread:+.2f}%"
    real_txt = f"{real_yield:.2f}%" if real_yield is not None else "n/a"
    avg_txt = f"{avg_etf_yield:.2f}%" if avg_etf_yield is not None else "n/a"
    dgs_txt = f"{dgs10:.2f}%" if dgs10 is not None else "n/a"

    if score >= 70:
        en = (
            f"Dividend ETF income looks relatively attractive versus Treasuries. "
            f"Average ETF yield {avg_txt} vs 10Y {dgs_txt} (spread {spread_txt}); "
            f"real yield {real_txt}. Curve: {regime['label_en']}."
        )
        ko = (
            f"배당 ETF 소득이 국채 대비 상대적으로 매력적입니다. "
            f"ETF 평균 {avg_txt} vs 10년물 {dgs_txt} (스프레드 {spread_txt}), "
            f"실질금리 {real_txt}. 수익률 곡선: {regime['label_ko']}."
        )
    elif score >= 45:
        en = (
            f"Today’s income backdrop is mixed — neither clearly favoring dividend ETFs nor Treasuries. "
            f"Average ETF yield {avg_txt} vs 10Y {dgs_txt} (spread {spread_txt}); "
            f"real yield {real_txt}. Curve: {regime['label_en']}."
        )
        ko = (
            f"오늘의 인컴 환경은 혼조입니다. 배당 ETF와 국채 중 한쪽이 뚜렷이 우세하지 않습니다. "
            f"ETF 평균 {avg_txt} vs 10년물 {dgs_txt} (스프레드 {spread_txt}), "
            f"실질금리 {real_txt}. 수익률 곡선: {regime['label_ko']}."
        )
    else:
        en = (
            f"Treasuries look more competitive for income right now. "
            f"Average ETF yield {avg_txt} vs 10Y {dgs_txt} (spread {spread_txt}); "
            f"real yield {real_txt}. Curve: {regime['label_en']}."
        )
        ko = (
            f"지금은 국채 소득이 상대적으로 더 경쟁력 있습니다. "
            f"ETF 평균 {avg_txt} vs 10년물 {dgs_txt} (스프레드 {spread_txt}), "
            f"실질금리 {real_txt}. 수익률 곡선: {regime['label_ko']}."
        )

    return {"en": en, "ko": ko, "label_en": label["en"], "label_ko": label["ko"]}


def load_previous() -> dict[str, Any] | None:
    if not OUT_PATH.exists():
        return None
    try:
        return json.loads(OUT_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def main() -> int:
    api_key = os.environ.get("FRED_API_KEY", "").strip()
    if not api_key:
        print("ERROR: FRED_API_KEY is required", file=sys.stderr)
        return 1

    previous = load_previous()
    rates: dict[str, Any] = {}
    errors: list[str] = []

    try:
        dgs10_rows = fred_observations(FRED_SERIES["dgs10"], api_key, limit=10)
        dgs2_rows = fred_observations(FRED_SERIES["dgs2"], api_key, limit=10)
        t10y2y_rows = fred_observations(FRED_SERIES["t10y2y"], api_key, limit=10)
        vix_rows = fred_observations(FRED_SERIES["vix"], api_key, limit=10)
        fed_rows = fred_observations(FRED_SERIES["fed_funds"], api_key, limit=10)
        cpi_rows = fred_observations(FRED_SERIES["cpi"], api_key, limit=24)

        dgs10, dgs10_date = latest_value(dgs10_rows)
        dgs2, dgs2_date = latest_value(dgs2_rows)
        t10y2y, curve_date = latest_value(t10y2y_rows)
        vix, vix_date = latest_value(vix_rows)
        fed_funds, fed_date = latest_value(fed_rows)
        cpi_yoy_val, cpi_date = cpi_yoy(cpi_rows)

        real_yield = None
        if dgs10 is not None and cpi_yoy_val is not None:
            real_yield = round(dgs10 - cpi_yoy_val, 3)

        rates = {
            "dgs10": {"value": dgs10, "date": dgs10_date, "unit": "%"},
            "dgs2": {"value": dgs2, "date": dgs2_date, "unit": "%"},
            "t10y2y": {"value": t10y2y, "date": curve_date, "unit": "%"},
            "fed_funds": {"value": fed_funds, "date": fed_date, "unit": "%"},
            "cpi_yoy": {"value": round(cpi_yoy_val, 3) if cpi_yoy_val is not None else None, "date": cpi_date, "unit": "%"},
            "vix": {"value": vix, "date": vix_date, "unit": "index"},
            "real_yield": {"value": real_yield, "date": dgs10_date, "unit": "%"},
        }
    except Exception as exc:  # noqa: BLE001
        errors.append(f"fred:{exc}")
        if previous and "rates" in previous:
            rates = previous["rates"]
        else:
            print(f"FATAL FRED failure and no previous rates: {exc}", file=sys.stderr)
            return 1

    etfs: list[dict[str, Any]] = []
    for item in ETF_WATCHLIST:
        quote = yahoo_etf(item["symbol"])
        etfs.append(
            {
                "symbol": item["symbol"],
                "name": item["name"],
                "price": quote.get("price"),
                "yield": quote.get("yield"),
                "currency": quote.get("currency", "USD"),
                "ok": bool(quote.get("ok")),
            }
        )
        if not quote.get("ok"):
            errors.append(f"yahoo:{item['symbol']}")

    # If Yahoo failed entirely, keep previous ETF board
    ok_yields = [e["yield"] for e in etfs if e.get("yield") is not None]
    if not ok_yields and previous and previous.get("etfs"):
        etfs = previous["etfs"]
        ok_yields = [e["yield"] for e in etfs if e.get("yield") is not None]
        errors.append("yahoo:fallback_previous")

    avg_etf_yield = (
        round(sum(ok_yields) / len(ok_yields), 3) if ok_yields else None
    )

    dgs10 = (rates.get("dgs10") or {}).get("value")
    real_yield = (rates.get("real_yield") or {}).get("value")
    vix = (rates.get("vix") or {}).get("value")
    t10y2y = (rates.get("t10y2y") or {}).get("value")
    regime = curve_regime(t10y2y)
    score = attractiveness_score(avg_etf_yield, dgs10, real_yield, vix)
    brief = build_brief(score, avg_etf_yield, dgs10, real_yield, regime)

    payload = {
        "version": 1,
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "score": score,
        "scoreLabel": {
            "en": brief.get("label_en", score_label(score)["en"]),
            "ko": brief.get("label_ko", score_label(score)["ko"]),
        },
        "brief": {"en": brief["en"], "ko": brief["ko"]},
        "avgEtfYield": avg_etf_yield,
        "spreadVs10y": (
            round(avg_etf_yield - dgs10, 3)
            if avg_etf_yield is not None and dgs10 is not None
            else None
        ),
        "curveRegime": regime,
        "rates": rates,
        "etfs": etfs,
        "sources": {
            "macro": "FRED (Federal Reserve Bank of St. Louis)",
            "etf": "Yahoo Finance chart dividends (TTM / price, delayed)",
        },
        "disclaimer": {
            "en": "Educational information only. Not investment, tax, or financial advice.",
            "ko": "교육 목적의 정보이며 투자·세무·재무 자문이 아닙니다.",
        },
        "errors": errors,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT_PATH}")
    print(f"Score={score} avgEtfYield={avg_etf_yield} errors={errors}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
