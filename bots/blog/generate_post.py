import os
import re
import json
from datetime import date
from pathlib import Path

import requests

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MODEL = "gemini-2.0-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

TOPICS = [
    "dividend reinvestment plans (DRIP) for beginners",
    "compound interest and long-term wealth building",
    "high dividend yield vs dividend growth stocks",
    "FIRE movement and passive dividend income",
    "how to estimate retirement income from dividends",
    "tax considerations for dividend investors",
    "building a dividend snowball with monthly contributions",
    "common mistakes new dividend investors make",
]


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")[:80]


def pick_topic() -> str:
    # Rotate by day of year so topics vary without external state.
    idx = date.today().timetuple().tm_yday % len(TOPICS)
    return TOPICS[idx]


def generate_article(topic: str) -> dict:
    if not GEMINI_API_KEY:
        raise RuntimeError("Missing GEMINI_API_KEY")

    prompt = f"""
You are a financial writer for YieldGrower.com, a free dividend calculator site.
Write one SEO-friendly blog article in English about: {topic}

Return ONLY valid JSON with this schema:
{{
  "title": "string, under 70 characters",
  "excerpt": "string, 1-2 sentences under 160 characters",
  "content": "markdown body only, 700-1000 words, with ## headings, no H1"
}}

Rules:
- Practical and educational, not financial advice.
- Mention using a dividend/DRIP calculator naturally once.
- No fake statistics.
- No links except relative mention of YieldGrower calculator concept.
"""

    response = requests.post(
        API_URL,
        params={"key": GEMINI_API_KEY},
        headers={"Content-Type": "application/json"},
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.7},
        },
        timeout=90,
    )
    response.raise_for_status()
    data = response.json()
    text = data["candidates"][0]["content"]["parts"][0]["text"].strip()

    # Remove markdown code fences if model wraps JSON.
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text)


def yaml_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace('"', "'").replace("\n", " ").strip()


def write_post(article: dict) -> Path:
    today = date.today().isoformat()
    slug = f"{today}-{slugify(article['title'])}"
    posts_dir = Path("posts")
    posts_dir.mkdir(exist_ok=True)
    path = posts_dir / f"{slug}.md"

    if path.exists():
        print(f"Post already exists: {path}")
        return path

    title = yaml_escape(article["title"])
    excerpt = yaml_escape(article["excerpt"])
    frontmatter = (
        "---\n"
        f'title: "{title}"\n'
        f'date: "{today}"\n'
        f'excerpt: "{excerpt}"\n'
        "---\n\n"
    )
    path.write_text(frontmatter + article["content"].strip() + "\n", encoding="utf-8")
    print(f"Created post: {path}")
    return path


def main():
    topic = pick_topic()
    print(f"Topic: {topic}")
    article = generate_article(topic)
    write_post(article)


if __name__ == "__main__":
    main()
