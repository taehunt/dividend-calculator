#!/usr/bin/env python3
"""Create a data-backed YieldGrower Pinterest pin and optionally publish it."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urlencode

import requests
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
PULSE_PATH = ROOT / "public" / "data" / "income-pulse.json"
DEFAULT_OUTPUT = ROOT / "pinterest_pin.jpg"
PINTEREST_API = "https://api.pinterest.com/v5/pins"
SITE_URL = "https://www.yieldgrower.com"


@dataclass(frozen=True)
class PinContent:
    date: str
    title: str
    subtitle: str
    detail: str
    description: str
    destination: str
    alt_text: str


def load_pulse(path: Path = PULSE_PATH) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if payload.get("score") is None or not payload.get("history"):
        raise ValueError("Income Pulse data is incomplete")
    return payload


def signed_pct(value: Any) -> str:
    return f"{float(value):+.2f}%"


def pct(value: Any) -> str:
    return f"{float(value):.2f}%"


def build_content(pulse: dict[str, Any]) -> PinContent:
    history = pulse["history"]
    latest = history[-1]
    previous = history[-2] if len(history) > 1 else latest
    date = str(latest["date"])
    score = int(pulse["score"])
    delta = score - int(previous.get("score", score))
    label = str((pulse.get("scoreLabel") or {}).get("en") or "Current reading")
    avg_yield = pct(pulse["avgEtfYield"])
    treasury = pct((pulse.get("rates") or {}).get("dgs10", {}).get("value"))
    spread = signed_pct(pulse["spreadVs10y"])
    delta_text = "unchanged" if delta == 0 else f"{delta:+d} vs prior reading"

    title = f"INCOME PULSE {score}/100"
    subtitle = f"{label.upper()} · {delta_text.upper()}"
    detail = f"ETF yield {avg_yield}  |  10Y {treasury}  |  Spread {spread}"
    description = (
        f"YieldGrower Income Pulse for {date}: {score}/100 ({label}). "
        f"Average tracked ETF yield {avg_yield} versus the 10-year Treasury at "
        f"{treasury}, a {spread} spread. Explore the sources, methodology, and "
        "scenario calculators. Educational information only; not financial advice."
    )
    query = urlencode(
        {
            "utm_source": "pinterest",
            "utm_medium": "organic_social",
            "utm_campaign": "income_pulse",
            "utm_content": date,
        }
    )
    destination = f"{SITE_URL}/pulse?{query}"
    alt_text = (
        f"YieldGrower Income Pulse dated {date}, score {score} out of 100. "
        f"Average tracked ETF yield {avg_yield}; 10-year Treasury {treasury}."
    )
    return PinContent(date, title, subtitle, detail, description, destination, alt_text)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    linux_path = Path("/usr/share/fonts/truetype/dejavu") / name
    windows_path = Path("C:/Windows/Fonts") / ("arialbd.ttf" if bold else "arial.ttf")
    for candidate in (linux_path, windows_path):
        try:
            return ImageFont.truetype(str(candidate), size)
        except OSError:
            continue
    return ImageFont.load_default()


def render_pin(content: PinContent, output: Path = DEFAULT_OUTPUT) -> Path:
    width, height = 1000, 1500
    image = Image.new("RGB", (width, height), color=(8, 18, 36))
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle(
        (70, 75, 930, 1425), radius=44, fill=(15, 30, 54), outline=(45, 212, 191), width=4
    )
    draw.text((110, 145), "YIELDGROWER", font=font(34, True), fill=(45, 212, 191))
    draw.text((110, 225), content.date, font=font(30), fill=(148, 163, 184))
    draw.multiline_text(
        (500, 465), content.title, font=font(74, True), fill=(248, 250, 252), anchor="mm", align="center"
    )
    draw.multiline_text(
        (500, 640), content.subtitle, font=font(34, True), fill=(147, 197, 253), anchor="mm", align="center"
    )
    draw.rounded_rectangle((115, 760, 885, 970), radius=28, fill=(23, 49, 78))
    draw.multiline_text(
        (500, 865),
        content.detail.replace("  |  ", "\n"),
        font=font(31),
        fill=(226, 232, 240),
        anchor="mm",
        align="center",
        spacing=20,
    )
    draw.text(
        (500, 1115), "Data-backed daily context", font=font(32, True), fill=(248, 250, 252), anchor="mm"
    )
    draw.text(
        (500, 1180), "Sources · Methodology · Scenario tools", font=font(27), fill=(148, 163, 184), anchor="mm"
    )
    draw.rounded_rectangle((115, 1285, 885, 1370), radius=22, fill=(45, 212, 191))
    draw.text(
        (500, 1328), "Explore at YieldGrower.com/pulse", font=font(29, True), fill=(8, 18, 36), anchor="mm"
    )

    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, quality=92, optimize=True)
    return output


def publish_pin(content: PinContent, image_path: Path, token: str, board_id: str) -> dict[str, Any]:
    encoded = base64.b64encode(image_path.read_bytes()).decode("ascii")
    payload = {
        "board_id": board_id,
        "title": content.title[:100],
        "description": content.description[:800],
        "link": content.destination,
        "alt_text": content.alt_text[:500],
        "media_source": {
            "source_type": "image_base64",
            "content_type": "image/jpeg",
            "data": encoded,
        },
    }
    response = requests.post(
        PINTEREST_API,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=payload,
        timeout=60,
    )
    if response.status_code == 401:
        raise RuntimeError("Pinterest authentication failed; refresh PINTEREST_ACCESS_TOKEN")
    response.raise_for_status()
    return response.json()


def fingerprint(content: PinContent) -> str:
    raw = f"{content.date}|{content.title}|{content.detail}".encode()
    return hashlib.sha256(raw).hexdigest()[:16]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="render and validate without publishing")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    content = build_content(load_pulse())
    image_path = render_pin(content, args.output)
    summary = {
        "fingerprint": fingerprint(content),
        "date": content.date,
        "title": content.title,
        "destination": content.destination,
        "image": str(image_path),
        "dry_run": args.dry_run,
    }

    if args.dry_run:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
        return 0

    token = os.environ.get("PINTEREST_ACCESS_TOKEN", "").strip()
    board_id = os.environ.get("PINTEREST_BOARD_ID", "").strip()
    if not token or not board_id:
        raise RuntimeError("Missing PINTEREST_ACCESS_TOKEN or PINTEREST_BOARD_ID")

    result = publish_pin(content, image_path, token, board_id)
    summary.update({"pin_id": result.get("id"), "dry_run": False})
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
