import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import requests


SITE_URL = "https://www.yieldgrower.com"
POSTS_DIR = Path("posts")
SEOUL = timezone(timedelta(hours=9), name="Asia/Seoul")
DEFAULT_MODELS = ("gemini-3.6-flash", "gemini-2.5-flash")
MIN_ENGLISH_WORDS = 900
MAX_ENGLISH_WORDS = 1_700
MIN_KOREAN_WORDS = 550
MAX_KOREAN_WORDS = 1_600
MAX_SIMILARITY = 0.24

SOURCES = {
    "investing": {
        "label": "Investor.gov — Introduction to Investing",
        "url": "https://www.investor.gov/introduction-investing",
        "scope": "compound growth, regular investing, risk, asset allocation, and diversification",
    },
    "compound": {
        "label": "Investor.gov — Compound Interest",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest",
        "scope": "the definition of compound interest",
    },
    "diversification": {
        "label": "Investor.gov — Diversify Your Investments",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments",
        "scope": "what diversification can and cannot do",
    },
    "performance": {
        "label": "FINRA — Evaluating Performance",
        "url": "https://www.finra.org/investors/investing/investing-basics/evaluating-performance",
        "scope": "dividend yield and total return definitions",
    },
    "risk": {
        "label": "FINRA — Risk",
        "url": "https://www.finra.org/investors/investing/investing-basics/risk",
        "scope": "investment risk, time horizon, asset allocation, and diversification",
    },
    "tax": {
        "label": "IRS — Topic No. 404, Dividends",
        "url": "https://www.irs.gov/taxtopics/tc404",
        "scope": "United States dividend classifications and reporting; do not generalize to other countries",
    },
}

THEMES = (
    {
        "name": "DRIP mechanics and realistic compounding",
        "hint": "Answer a specific beginner question about reinvesting after-tax dividends without promising returns.",
        "tool": "/",
        "sources": ("investing", "compound", "performance"),
    },
    {
        "name": "dividend yield versus total return",
        "hint": "Explain how price appreciation and dividends differ, and prevent double-counting in projections.",
        "tool": "/",
        "sources": ("performance", "risk", "investing"),
    },
    {
        "name": "monthly contribution planning",
        "hint": "Show how contribution size and time horizon change a projection using a concrete scenario.",
        "tool": "/compound",
        "sources": ("investing", "compound", "risk"),
    },
    {
        "name": "dividend income goal planning",
        "hint": "Work backward from an annual income goal while stressing yield and tax uncertainty.",
        "tool": "/goal",
        "sources": ("performance", "risk", "diversification"),
    },
    {
        "name": "FIRE scenario planning",
        "hint": "Discuss a crossover target as a scenario, not a guarantee, and include spending flexibility.",
        "tool": "/fire",
        "sources": ("investing", "risk", "diversification"),
    },
    {
        "name": "high-yield risk",
        "hint": "Explain why a high displayed yield can reflect a falling price or payout risk.",
        "tool": "/",
        "sources": ("performance", "risk", "diversification"),
    },
    {
        "name": "diversification for income investors",
        "hint": "Explain concentration risk across companies, sectors, and income sources.",
        "tool": "/average",
        "sources": ("diversification", "risk", "investing"),
    },
    {
        "name": "inflation and future income",
        "hint": "Separate nominal income from purchasing power and use conservative scenario language.",
        "tool": "/inflation",
        "sources": ("investing", "risk", "compound"),
    },
    {
        "name": "average cost and recurring purchases",
        "hint": "Explain weighted average cost and why a lower break-even price does not remove investment risk.",
        "tool": "/average",
        "sources": ("risk", "diversification", "investing"),
    },
    {
        "name": "dividend tax drag",
        "hint": "Explain after-tax compounding and clearly label any US tax discussion as US-specific.",
        "tool": "/tax",
        "sources": ("tax", "performance", "investing"),
    },
    {
        "name": "CAGR interpretation",
        "hint": "Explain CAGR as a smoothed historical or scenario rate, not a promise of steady annual returns.",
        "tool": "/cagr",
        "sources": ("performance", "risk", "compound"),
    },
    {
        "name": "assumption stress testing",
        "hint": "Compare conservative, base, and optimistic assumptions without recommending a security.",
        "tool": "/tools",
        "sources": ("risk", "investing", "diversification"),
    },
)

BACKFILL_TARGETS = (
    ("2026-07-24-dividend-tax-considerations-framework.md", 9),
    ("2026-07-25-monthly-contribution-dividend-snowball-guide.md", 2),
    ("2026-07-26-common-dividend-investor-mistakes-checklist.md", 11),
    ("2026-07-27-dividend-reinvestment-plans-framework.md", 0),
    ("2026-07-28-compound-interest-wealth-building-checklist.md", 2),
    ("2026-07-29-high-yield-vs-dividend-growth-overview.md", 5),
)

PROHIBITED_PHRASES = (
    "guaranteed return",
    "guaranteed income",
    "risk-free investment",
    "always outperforms",
    "can't lose",
    "cannot lose",
    "확정 수익",
    "수익 보장",
    "원금 보장",
    "무위험 투자",
    "반드시 오른",
)


@dataclass(frozen=True)
class Projection:
    balance: int
    contributions: int
    annual_dividend: int


def project_portfolio(
    initial: float = 10_000,
    monthly: float = 500,
    years: int = 20,
    price_growth: float = 7,
    dividend_yield: float = 3,
    dividend_tax: float = 15,
) -> Projection:
    balance = initial
    contributions = initial
    annual_dividend = 0.0
    for _year in range(years):
        annual_dividend = 0.0
        for _month in range(12):
            balance += monthly
            contributions += monthly
            balance += balance * (price_growth / 12 / 100)
            dividend = balance * (dividend_yield / 12 / 100)
            after_tax_dividend = dividend * (1 - dividend_tax / 100)
            balance += after_tax_dividend
            annual_dividend += after_tax_dividend
    return Projection(
        balance=round(balance),
        contributions=round(contributions),
        annual_dividend=round(annual_dividend),
    )


def scheduled_date() -> str:
    return datetime.now(SEOUL).date().isoformat()


def yaml_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', "'").replace("\n", " ").strip()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9\s-]", "", value.lower())
    slug = re.sub(r"[\s_-]+", "-", slug).strip("-")
    return slug[:72] or "dividend-planning-guide"


def markdown_words(value: str) -> list[str]:
    plain = re.sub(r"https?://\S+", " ", value)
    plain = re.sub(r"[#*`>\[\]()|]", " ", plain)
    return re.findall(r"[A-Za-z0-9][A-Za-z0-9'’-]*|[가-힣]+", plain)


def shingles(value: str, size: int = 5) -> set[tuple[str, ...]]:
    words = [word.lower() for word in markdown_words(value)]
    return {tuple(words[i : i + size]) for i in range(max(0, len(words) - size + 1))}


def similarity(left: str, right: str) -> float:
    left_set = shingles(left)
    right_set = shingles(right)
    if not left_set or not right_set:
        return 0.0
    return len(left_set & right_set) / len(left_set | right_set)


def existing_post_data(exclude_path: Path | None = None) -> tuple[list[str], list[str]]:
    titles: list[str] = []
    bodies: list[str] = []
    if not POSTS_DIR.exists():
        return titles, bodies
    for path in sorted(POSTS_DIR.glob("*.md")):
        if exclude_path is not None and path == exclude_path:
            continue
        raw = path.read_text(encoding="utf-8")
        title_match = re.search(r'^title:\s*"?(.*?)"?\s*$', raw, re.MULTILINE)
        if title_match:
            titles.append(title_match.group(1).strip('"'))
        parts = re.split(r"\n---ko---\n", raw, maxsplit=1)
        bodies.append(re.sub(r"\A---.*?---\s*", "", parts[0], flags=re.DOTALL))
    return titles, bodies


def extract_json(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if not match:
            raise
        data = json.loads(match.group(0))
    if not isinstance(data, dict):
        raise ValueError("Gemini response must be a JSON object")
    return data


def source_block(source_ids: tuple[str, ...], *, lang: str) -> str:
    heading = "## Sources and further reading" if lang == "en" else "## 출처 및 추가 자료"
    lines = [heading, ""]
    for source_id in source_ids:
        source = SOURCES[source_id]
        lines.append(f"- [{source['label']}]({source['url']})")
    return "\n".join(lines)


def footer_block(tool_path: str, *, lang: str) -> str:
    tool_url = f"{SITE_URL}{tool_path}"
    if lang == "ko":
        return "\n".join(
            [
                "## 계산기로 직접 확인하기",
                "",
                f"- [YieldGrower 계산기에서 같은 가정을 바꿔 보기]({tool_url})",
                "",
                "이 글은 자동화된 초안 생성과 구조·중복·계산값 검사를 거쳐 발행되었습니다. 사람의 개별 투자 검토를 대신하지 않습니다.",
                "",
                "*이 글은 정보·교육 목적이며 투자·세무 자문이 아닙니다.*",
            ]
        )
    return "\n".join(
        [
            "## Test the assumptions yourself",
            "",
            f"- [Change the same assumptions in the YieldGrower calculator]({tool_url})",
            "",
            "This article was published after automated drafting plus structural, duplication, and calculation checks. It is not a substitute for individual human investment review.",
            "",
            "*This article is for informational and educational purposes only. It is not investment or tax advice.*",
        ]
    )


def finalize_content(
    body: str, source_ids: tuple[str, ...], tool_path: str, *, lang: str
) -> str:
    return "\n\n".join(
        [body.strip(), source_block(source_ids, lang=lang), footer_block(tool_path, lang=lang)]
    ).strip()


def validate_article(
    article: dict[str, Any],
    source_ids: tuple[str, ...],
    tool_path: str,
    existing_bodies: list[str],
) -> list[str]:
    errors: list[str] = []
    required = ("title", "titleKo", "excerpt", "excerptKo", "contentEn", "contentKo")
    for key in required:
        if not isinstance(article.get(key), str) or not article[key].strip():
            errors.append(f"{key} must be a non-empty string")
    if errors:
        return errors

    if len(article["title"]) > 70:
        errors.append("English title exceeds 70 characters")
    if len(article["excerpt"]) > 160:
        errors.append("English excerpt exceeds 160 characters")
    if len(article["excerptKo"]) > 160:
        errors.append("Korean excerpt exceeds 160 characters")

    content_en = finalize_content(article["contentEn"], source_ids, tool_path, lang="en")
    content_ko = finalize_content(article["contentKo"], source_ids, tool_path, lang="ko")
    en_count = len(markdown_words(content_en))
    ko_count = len(markdown_words(content_ko))
    if not MIN_ENGLISH_WORDS <= en_count <= MAX_ENGLISH_WORDS:
        errors.append(
            f"English word count {en_count} is outside {MIN_ENGLISH_WORDS}-{MAX_ENGLISH_WORDS}"
        )
    if not MIN_KOREAN_WORDS <= ko_count <= MAX_KOREAN_WORDS:
        errors.append(
            f"Korean word count {ko_count} is outside {MIN_KOREAN_WORDS}-{MAX_KOREAN_WORDS}"
        )

    for label, content in (("English", content_en), ("Korean", content_ko)):
        headings = re.findall(r"^##\s+\S.+$", content, re.MULTILINE)
        if not 6 <= len(headings) <= 12:
            errors.append(f"{label} content must have 6-12 H2 sections, found {len(headings)}")
        if re.search(r"^#\s+", content, re.MULTILINE):
            errors.append(f"{label} content contains an H1 heading")
        if "<script" in content.lower() or "<iframe" in content.lower():
            errors.append(f"{label} content contains prohibited raw HTML")
        for source_id in source_ids:
            if SOURCES[source_id]["url"] not in content:
                errors.append(f"{label} content is missing source {source_id}")
        if f"{SITE_URL}{tool_path}" not in content:
            errors.append(f"{label} content is missing its calculator link")

    combined = f"{content_en}\n{content_ko}".lower()
    for phrase in PROHIBITED_PHRASES:
        if phrase in combined:
            errors.append(f"Prohibited phrase found: {phrase}")

    max_similarity = max(
        (similarity(content_en, existing) for existing in existing_bodies),
        default=0.0,
    )
    if max_similarity > MAX_SIMILARITY:
        errors.append(
            f"English content similarity {max_similarity:.3f} exceeds {MAX_SIMILARITY:.2f}"
        )
    return errors


def build_prompt(
    theme: dict[str, Any],
    existing_titles: list[str],
    validation_feedback: list[str] | None = None,
    fixed_metadata: dict[str, str] | None = None,
) -> str:
    projection = project_portfolio()
    sources = [
        {
            "id": source_id,
            "label": SOURCES[source_id]["label"],
            "url": SOURCES[source_id]["url"],
            "allowed_scope": SOURCES[source_id]["scope"],
        }
        for source_id in theme["sources"]
    ]
    feedback = validation_feedback or []
    metadata_instruction = ""
    if fixed_metadata:
        metadata_instruction = (
            "\nThis expands an existing article. Preserve these metadata values exactly "
            "and write content that directly matches them:\n"
            + json.dumps(fixed_metadata, ensure_ascii=False, indent=2)
            + "\n"
        )
    return f"""
You write for YieldGrower, a bilingual educational calculator website.
Create one original, people-first article in English and a faithful natural Korean version.

Theme: {theme["name"]}
Specific direction: {theme["hint"]}
Related calculator: {SITE_URL}{theme["tool"]}
{metadata_instruction}
Recent titles that must not be repeated or lightly reworded:
{json.dumps(existing_titles[-60:], ensure_ascii=False, indent=2)}

Use only these sources for factual claims:
{json.dumps(sources, ensure_ascii=False, indent=2)}

Use this calculator-generated example exactly and explain that it is a scenario, not a forecast:
- Initial investment: $10,000
- Monthly contribution: $500
- Period: 20 years
- Annual price growth excluding dividends: 7%
- Dividend yield: 3%
- Dividend tax assumption: 15%
- DRIP: enabled
- Final portfolio value: ${projection.balance:,}
- Total contributions: ${projection.contributions:,}
- Final-year after-tax dividend income: ${projection.annual_dividend:,}

The example above is calculated by YieldGrower's dividend reinvestment model.
The related calculator URL is a companion tool selected for the article topic.
Do not attribute the example to that companion tool unless its URL is the homepage.

Return only valid JSON:
{{
  "title": "specific English title under 70 characters",
  "titleKo": "natural Korean title",
  "excerpt": "English excerpt under 160 characters",
  "excerptKo": "Korean excerpt under 160 characters",
  "contentEn": "900-1400 English words in Markdown with 5-9 ## sections and no H1",
  "contentKo": "complete Korean version in Markdown with the same substance and 5-9 ## sections and no H1"
}}

Rules:
- Answer a concrete reader question and add analysis that is specific to the supplied scenario.
- Separate price growth from dividend yield so returns are never double-counted.
- Explain uncertainty, taxes, inflation, and concentration risk where relevant.
- Do not recommend individual securities or claim that any outcome is guaranteed.
- Do not invent quotations, studies, statistics, laws, tax rates, or source claims.
- Link factual statements only to the supplied URLs using Markdown links.
- Tax material must say jurisdiction and tax year can change and professional advice may be needed.
- Do not add a sources section, calculator CTA, automation disclosure, or disclaimer; the publisher adds those.
- Do not repeat generic filler such as "in today's financial landscape."

Previous validation errors to correct:
{json.dumps(feedback, ensure_ascii=False)}
""".strip()


def call_gemini(api_key: str, model: str, prompt: str) -> dict[str, Any]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    response = requests.post(
        url,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "maxOutputTokens": 8192,
                "responseMimeType": "application/json",
            },
        },
        timeout=150,
    )
    print(f"Gemini model={model} status={response.status_code}")
    if response.status_code >= 400:
        print(response.text[:1000])
        response.raise_for_status()
    data = response.json()
    candidates = data.get("candidates") or []
    if not candidates:
        raise RuntimeError(f"Gemini returned no candidates: {json.dumps(data)[:1000]}")
    text = candidates[0]["content"]["parts"][0]["text"]
    return extract_json(text)


def generate_valid_article(
    api_key: str,
    theme: dict[str, Any],
    existing_titles: list[str],
    existing_bodies: list[str],
    models: tuple[str, ...],
    fixed_metadata: dict[str, str] | None = None,
) -> tuple[dict[str, Any], str]:
    feedback: list[str] = []
    last_error: Exception | None = None
    for attempt in range(1, 3):
        prompt = build_prompt(theme, existing_titles, feedback, fixed_metadata)
        for model in models:
            try:
                print(f"Generation attempt={attempt} model={model}")
                article = call_gemini(api_key, model, prompt)
                if fixed_metadata:
                    article.update(fixed_metadata)
                errors = validate_article(
                    article,
                    theme["sources"],
                    theme["tool"],
                    existing_bodies,
                )
                if not errors:
                    return article, model
                feedback = errors
                print("Quality gate rejected article:")
                for error in errors:
                    print(f"- {error}")
                break
            except Exception as exc:
                last_error = exc
                print(f"Model failed: {type(exc).__name__}: {exc}")
        else:
            continue
    if feedback:
        raise RuntimeError("Article failed quality gates: " + "; ".join(feedback))
    raise RuntimeError(f"All Gemini models failed. Last error: {last_error}")


def write_post(
    article: dict[str, Any],
    theme: dict[str, Any],
    model: str,
    publish_date: str,
) -> Path:
    POSTS_DIR.mkdir(exist_ok=True)
    existing_for_date = sorted(POSTS_DIR.glob(f"{publish_date}-*.md"))
    if existing_for_date:
        print(f"A post already exists for {publish_date}: {existing_for_date[0]}")
        return existing_for_date[0]

    slug = f"{publish_date}-{slugify(article['title'])}"
    path = POSTS_DIR / f"{slug}.md"
    content_en = finalize_content(
        article["contentEn"], theme["sources"], theme["tool"], lang="en"
    )
    content_ko = finalize_content(
        article["contentKo"], theme["sources"], theme["tool"], lang="ko"
    )
    frontmatter = "\n".join(
        [
            "---",
            f'title: "{yaml_escape(article["title"])}"',
            f'titleKo: "{yaml_escape(article["titleKo"])}"',
            f'date: "{publish_date}"',
            f'excerpt: "{yaml_escape(article["excerpt"])}"',
            f'excerptKo: "{yaml_escape(article["excerptKo"])}"',
            'author: "YieldGrower Editorial"',
            'generationMethod: "AI-assisted with automated quality checks"',
            f'generatorModel: "{yaml_escape(model)}"',
            "---",
            "",
        ]
    )
    path.write_text(
        frontmatter + content_en + "\n\n---ko---\n\n" + content_ko + "\n",
        encoding="utf-8",
    )
    print(f"Created quality-gated post: {path}")
    return path


def read_post_metadata(path: Path) -> dict[str, str]:
    raw = path.read_text(encoding="utf-8")
    metadata: dict[str, str] = {}
    for key in ("title", "titleKo", "date", "excerpt", "excerptKo"):
        match = re.search(rf'^{key}:\s*"([^"]*)"\s*$', raw, re.MULTILINE)
        if not match:
            raise ValueError(f"Missing {key} frontmatter in {path}")
        metadata[key] = match.group(1)
    return metadata


def write_backfill_post(
    path: Path,
    article: dict[str, Any],
    theme: dict[str, Any],
    model: str,
    metadata: dict[str, str],
) -> None:
    content_en = finalize_content(
        article["contentEn"], theme["sources"], theme["tool"], lang="en"
    )
    content_ko = finalize_content(
        article["contentKo"], theme["sources"], theme["tool"], lang="ko"
    )
    frontmatter = "\n".join(
        [
            "---",
            f'title: "{yaml_escape(metadata["title"])}"',
            f'titleKo: "{yaml_escape(metadata["titleKo"])}"',
            f'date: "{metadata["date"]}"',
            f'excerpt: "{yaml_escape(metadata["excerpt"])}"',
            f'excerptKo: "{yaml_escape(metadata["excerptKo"])}"',
            'author: "YieldGrower Editorial"',
            'generationMethod: "AI-assisted with automated quality checks"',
            f'generatorModel: "{yaml_escape(model)}"',
            "---",
            "",
        ]
    )
    path.write_text(
        frontmatter + content_en + "\n\n---ko---\n\n" + content_ko + "\n",
        encoding="utf-8",
    )
    print(f"Expanded quality-gated legacy post: {path}")


def backfill_legacy_posts(api_key: str, models: tuple[str, ...]) -> None:
    for filename, theme_index in BACKFILL_TARGETS:
        path = POSTS_DIR / filename
        if not path.exists():
            raise FileNotFoundError(f"Backfill target does not exist: {path}")
        metadata = read_post_metadata(path)
        existing_titles, existing_bodies = existing_post_data(exclude_path=path)
        fixed_metadata = {
            key: metadata[key]
            for key in ("title", "titleKo", "excerpt", "excerptKo")
        }
        article, model = generate_valid_article(
            api_key,
            THEMES[theme_index],
            existing_titles,
            existing_bodies,
            models,
            fixed_metadata,
        )
        write_backfill_post(
            path,
            article,
            THEMES[theme_index],
            model,
            metadata,
        )


def choose_theme(publish_date: str) -> dict[str, Any]:
    ordinal = datetime.strptime(publish_date, "%Y-%m-%d").date().toordinal()
    return THEMES[ordinal % len(THEMES)]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--check",
        action="store_true",
        help="Run deterministic generator self-checks without calling Gemini.",
    )
    mode.add_argument(
        "--backfill-all",
        action="store_true",
        help="Expand the configured legacy posts while preserving their URLs and dates.",
    )
    return parser.parse_args()


def self_check() -> None:
    projection = project_portfolio()
    expected = Projection(balance=429_022, contributions=130_000, annual_dividend=10_386)
    if projection != expected:
        raise AssertionError(f"Projection mismatch: {projection} != {expected}")

    english_sentence = (
        "A planning scenario helps investors compare contributions, time, price growth, "
        "dividends, taxes, uncertainty, diversification, and risk without treating the result as a forecast."
    )
    korean_sentence = (
        "계획 시나리오는 납입금 기간 주가 상승 배당 세금 불확실성 분산 위험을 비교하되 "
        "결과를 예측이나 보장으로 해석하지 않도록 돕습니다."
    )
    english_sections = "\n\n".join(
        f"## Planning factor {index}\n\n" + " ".join([english_sentence] * 9)
        for index in range(1, 6)
    )
    korean_sections = "\n\n".join(
        f"## 계획 요소 {index}\n\n" + " ".join([korean_sentence] * 12)
        for index in range(1, 6)
    )
    fixture = {
        "title": "How to Stress-Test a Dividend Growth Scenario",
        "titleKo": "배당 성장 시나리오를 점검하는 방법",
        "excerpt": "Use a structured scenario to test dividend assumptions without treating projections as forecasts.",
        "excerptKo": "전망을 예측으로 오해하지 않고 배당 가정을 점검하는 방법을 설명합니다.",
        "contentEn": english_sections,
        "contentKo": korean_sections,
    }
    errors = validate_article(
        fixture,
        ("investing", "risk"),
        "/",
        [],
    )
    if errors:
        raise AssertionError(f"Quality-gate fixture failed: {errors}")

    duplicate_errors = validate_article(
        fixture,
        ("investing", "risk"),
        "/",
        [english_sections],
    )
    if not any("similarity" in error for error in duplicate_errors):
        raise AssertionError("Similarity gate did not reject duplicate content")

    prohibited_fixture = dict(fixture)
    prohibited_fixture["contentEn"] += "\n\nThis is a guaranteed return."
    prohibited_errors = validate_article(
        prohibited_fixture,
        ("investing", "risk"),
        "/",
        [],
    )
    if not any("Prohibited phrase" in error for error in prohibited_errors):
        raise AssertionError("Prohibited-claim gate did not reject unsafe wording")

    backfill_paths = [POSTS_DIR / filename for filename, _theme in BACKFILL_TARGETS]
    if len(backfill_paths) != len(set(backfill_paths)):
        raise AssertionError("Backfill targets contain duplicate paths")
    missing_paths = [str(path) for path in backfill_paths if not path.exists()]
    if missing_paths:
        raise AssertionError(f"Backfill targets are missing: {missing_paths}")
    for _filename, theme_index in BACKFILL_TARGETS:
        if not 0 <= theme_index < len(THEMES):
            raise AssertionError(f"Invalid backfill theme index: {theme_index}")

    print("Projection and quality-gate self-checks passed")


def main() -> None:
    args = parse_args()
    if args.check:
        self_check()
        return

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("Missing GEMINI_API_KEY")
    models = tuple(
        model.strip()
        for model in os.environ.get("GEMINI_MODELS", ",".join(DEFAULT_MODELS)).split(",")
        if model.strip()
    )
    if not models:
        raise RuntimeError("GEMINI_MODELS does not contain a model")

    if args.backfill_all:
        backfill_legacy_posts(api_key, models)
        return

    publish_date = scheduled_date()
    existing_today = sorted(POSTS_DIR.glob(f"{publish_date}-*.md"))
    if existing_today:
        print(f"Daily post already exists: {existing_today[0]}")
        return

    theme = choose_theme(publish_date)
    existing_titles, existing_bodies = existing_post_data()
    article, model = generate_valid_article(
        api_key,
        theme,
        existing_titles,
        existing_bodies,
        models,
    )
    write_post(article, theme, model, publish_date)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Blog generation failed: {type(exc).__name__}: {exc}", file=sys.stderr)
        raise
