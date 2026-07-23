import base64
import os
import random
import requests
from PIL import Image, ImageDraw, ImageFont

PINTEREST_ACCESS_TOKEN = os.environ.get("PINTEREST_ACCESS_TOKEN")
BOARD_ID = os.environ.get("PINTEREST_BOARD_ID")
SITE_URL = "https://www.yieldgrower.com"

TOPICS = [
    ("THE POWER OF\nDIVIDEND DRIP", "Turn $500/mo into a\nRetirement Fortune"),
    ("FIRE MOVEMENT\nSTRATEGY", "Calculate Your Exact\nFinancial Freedom Date"),
    ("COMPOUND INTEREST\nMAGIC", "Watch Your Wealth\nSnowball Over Time"),
    ("DIVIDEND INVESTING\nFOR BEGINNERS", "How to Build a\nPassive Income Machine"),
    ("DRIP CALCULATOR", "Visualize Your\nDividend Snowball"),
]

BG_COLORS = [
    (15, 23, 42),
    (30, 58, 138),
    (17, 24, 39),
    (7, 89, 133),
    (49, 46, 129),
]


def generate_image():
    width, height = 1000, 1500
    bg_color = random.choice(BG_COLORS)
    title, subtitle = random.choice(TOPICS)

    image = Image.new("RGB", (width, height), color=bg_color)
    draw = ImageDraw.Draw(image)

    try:
        title_font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72
        )
        sub_font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 42
        )
        brand_font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36
        )
    except OSError:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        brand_font = ImageFont.load_default()

    draw.text(
        (width / 2, 420),
        title,
        font=title_font,
        fill=(255, 255, 255),
        anchor="mm",
        align="center",
    )
    draw.text(
        (width / 2, 700),
        subtitle,
        font=sub_font,
        fill=(147, 197, 253),
        anchor="mm",
        align="center",
    )

    points = [(200, 1100), (350, 1050), (500, 900), (650, 950), (800, 750)]
    draw.line(points, fill=(34, 197, 94), width=12)
    for x, y in points:
        draw.ellipse([x - 12, y - 12, x + 12, y + 12], fill=(255, 255, 255))

    draw.rectangle([(0, height - 140), (width, height)], fill=(255, 255, 255))
    draw.text(
        (width / 2, height - 70),
        "YieldGrower.com",
        font=brand_font,
        fill=(15, 23, 42),
        anchor="mm",
    )

    image_path = "pinterest_pin.jpg"
    image.save(image_path, quality=90)
    return image_path, title.replace("\n", " "), subtitle.replace("\n", " ")


def create_pin(image_path, title, description):
    with open(image_path, "rb") as file:
        image_b64 = base64.b64encode(file.read()).decode("utf-8")

    headers = {
        "Authorization": f"Bearer {PINTEREST_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "board_id": BOARD_ID,
        "title": title[:100],
        "description": f"{description} Free dividend reinvestment calculator.",
        "link": SITE_URL,
        "alt_text": title[:500],
        "media_source": {
            "source_type": "image_base64",
            "content_type": "image/jpeg",
            "data": image_b64,
        },
    }

    response = requests.post(
        "https://api.pinterest.com/v5/pins",
        headers=headers,
        json=payload,
        timeout=60,
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    response.raise_for_status()
    return response.json()


def main():
    if not PINTEREST_ACCESS_TOKEN or not BOARD_ID:
        raise RuntimeError("Missing PINTEREST_ACCESS_TOKEN or PINTEREST_BOARD_ID")

    image_path, title, description = generate_image()
    print(f"Generated image: {image_path}")
    print(f"Title: {title}")

    pin = create_pin(image_path, title, description)
    print(f"Pin created successfully: {pin.get('id')}")


if __name__ == "__main__":
    main()
