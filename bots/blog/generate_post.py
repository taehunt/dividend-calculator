import random
from datetime import date
from pathlib import Path

TOPICS = [
    {
        "slug": "dividend-reinvestment-plans",
        "title": "Dividend Reinvestment Plans (DRIP) for Beginners",
        "excerpt": "Learn how DRIP investing turns small dividends into long-term compounding growth.",
        "sections": [
            (
                "What a DRIP Actually Does",
                "A Dividend Reinvestment Plan automatically uses cash dividends to buy more shares instead of paying you cash. Over time, those extra shares produce more dividends, which buy even more shares. That feedback loop is the core of the dividend snowball.",
            ),
            (
                "Why Consistency Matters More Than Timing",
                "Most investors focus on picking the perfect entry price. With DRIP investing, the bigger advantage is staying invested and reinvesting through multiple market cycles. Regular contributions plus reinvested dividends usually outperform occasional lump-sum timing attempts.",
            ),
            (
                "How to Stress-Test Your Plan",
                "Before committing money, model different starting balances, monthly contributions, yields, and tax rates. A simple dividend calculator helps you see how small input changes affect long-term portfolio value and annual dividend income.",
            ),
        ],
    },
    {
        "slug": "compound-interest-wealth-building",
        "title": "Compound Interest and Long-Term Wealth Building",
        "excerpt": "See why time in the market and reinvested returns matter more than chasing short-term gains.",
        "sections": [
            (
                "The Math Behind Compounding",
                "Compounding means your returns begin earning their own returns. In dividend investing, that happens when payouts are reinvested. Early years look slow, then growth accelerates as the base gets larger.",
            ),
            (
                "Time Is the Real Multiplier",
                "A 20-year horizon gives compounding room to work. Extending the plan by five or ten years often increases outcomes more than slightly raising the expected return. That is why starting earlier usually beats waiting for a perfect strategy.",
            ),
            (
                "Use Numbers, Not Guesswork",
                "Write down your contribution schedule and expected yield assumptions. Then run the scenario in a DRIP or compound interest calculator so you can compare outcomes before adjusting your plan.",
            ),
        ],
    },
    {
        "slug": "high-yield-vs-dividend-growth",
        "title": "High Yield vs Dividend Growth: Which Fits Your Goals?",
        "excerpt": "Compare immediate income strategies with long-term dividend growth approaches.",
        "sections": [
            (
                "High Yield Trade-Offs",
                "Higher starting yields can produce more cash income today. The risk is that some high-yield companies cut dividends when business conditions weaken. Income reliability matters as much as the percentage shown on a quote screen.",
            ),
            (
                "Dividend Growth Advantages",
                "Lower-yield companies that raise dividends every year can create stronger long-term income streams. The starting payout looks smaller, but rising dividends plus share price growth can outperform static high-yield holdings.",
            ),
            (
                "Build a Hybrid Approach",
                "Many investors combine both styles: stable growers for compounding and selected higher-yield names for cash flow. Model both paths with a calculator so you can see how income and total value evolve over 10 to 30 years.",
            ),
        ],
    },
    {
        "slug": "fire-passive-dividend-income",
        "title": "FIRE Movement and Passive Dividend Income",
        "excerpt": "Understand how dividend income can support Financial Independence, Retire Early goals.",
        "sections": [
            (
                "Define Your Crossover Point",
                "FIRE planning usually starts with one question: when can passive income cover living expenses? Dividend income is one path to that crossover point because payouts can arrive whether or not you sell shares.",
            ),
            (
                "Contribution Rate Beats Perfect Stock Picking",
                "Raising your monthly contribution often moves the FIRE date more than chasing tiny yield improvements. Savings rate, investing consistency, and reinvestment discipline are the main levers.",
            ),
            (
                "Track Progress With Clear Inputs",
                "Estimate required annual dividends, then reverse-engineer the portfolio size and yield needed. A visual calculator makes it easier to adjust contributions until the timeline looks realistic.",
            ),
        ],
    },
    {
        "slug": "estimate-retirement-dividend-income",
        "title": "How to Estimate Retirement Income From Dividends",
        "excerpt": "A practical framework for projecting future dividend income with conservative assumptions.",
        "sections": [
            (
                "Start With Annual Spending Needs",
                "Write down the annual income you want dividends to cover. Separate needs from wants. This gives you a target instead of a vague hope that the portfolio will be large enough someday.",
            ),
            (
                "Translate Income Goals Into Portfolio Size",
                "If you want $40,000 a year and assume a 3% net yield after tax, you need roughly $1.33 million in dividend-producing assets. Changing yield or tax assumptions changes that number quickly, so run multiple scenarios.",
            ),
            (
                "Recheck Assumptions Every Year",
                "Inflation, tax rules, and dividend policies change. Recalculate annually and adjust contributions. Tools like a dividend reinvestment calculator help you keep the plan grounded in numbers.",
            ),
        ],
    },
    {
        "slug": "dividend-tax-considerations",
        "title": "Tax Considerations for Dividend Investors",
        "excerpt": "Why after-tax yield matters more than headline dividend percentages.",
        "sections": [
            (
                "Gross Yield Is Not Take-Home Yield",
                "A 4% dividend yield can become meaningfully lower after withholding and income tax. Your real compounding rate depends on what remains after tax, especially if you reinvest every payout.",
            ),
            (
                "Account Location Matters",
                "Where you hold dividend stocks can change outcomes. Tax-advantaged accounts, taxable brokerage accounts, and cross-border withholding rules all affect net cash flow. Compare after-tax results, not just sticker yields.",
            ),
            (
                "Model Tax Drag Explicitly",
                "Include a tax rate assumption in your long-term projections. Even a simple calculator with a tax input can show how much reinvestment speed changes when taxes rise or fall.",
            ),
        ],
    },
    {
        "slug": "monthly-contribution-dividend-snowball",
        "title": "Building a Dividend Snowball With Monthly Contributions",
        "excerpt": "How steady monthly investing and DRIP reinvestment create accelerating dividend income.",
        "sections": [
            (
                "Small Contributions Still Matter",
                "A few hundred dollars a month looks minor in year one. After a decade of contributions plus reinvested dividends, the portfolio base can be large enough that annual income becomes meaningful.",
            ),
            (
                "Automate the Process",
                "Automation removes decision fatigue. Schedule monthly buys and enable dividend reinvestment so the plan continues even when markets feel boring or stressful.",
            ),
            (
                "Measure Progress by Income Growth",
                "Track yearly dividend income, not just account balance. Watching the income line rise is often more motivating than staring at short-term price swings. A projection chart helps set expectations.",
            ),
        ],
    },
    {
        "slug": "common-dividend-investor-mistakes",
        "title": "Common Mistakes New Dividend Investors Make",
        "excerpt": "Avoid yield chasing, overconcentration, and ignoring taxes when building a dividend plan.",
        "sections": [
            (
                "Chasing the Highest Yield",
                "The largest yield on a screen is not always the best investment. Unsustainable payouts can be cut, and the share price can fall at the same time. Prefer durability over flashy percentages.",
            ),
            (
                "Ignoring Concentration Risk",
                "Owning only a few high-paying names can create fragile income. Diversifying across sectors and dividend styles reduces the chance that one cut derails your entire plan.",
            ),
            (
                "Skipping a Written Plan",
                "Without targets for contribution size, timeline, and desired income, it is easy to quit early. Write the plan down and test it with a calculator before you scale contributions.",
            ),
        ],
    },
]


def yaml_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace('"', "'").replace("\n", " ").strip()


def build_content(topic: dict) -> str:
    parts = [
        f"This guide explains {topic['title'].lower()} in plain language for long-term investors.",
        "",
    ]
    for heading, body in topic["sections"]:
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(body)
        parts.append("")

    parts.extend(
        [
            "## Practical Next Step",
            "",
            "Before changing your portfolio, run a few scenarios with different contribution amounts, yields, and timelines. "
            "A free dividend reinvestment calculator can help you compare outcomes quickly and keep decisions grounded in numbers rather than headlines.",
            "",
            "*This article is for educational purposes only and is not financial advice.*",
        ]
    )
    return "\n".join(parts)


def write_post() -> Path:
    today = date.today().isoformat()
    day_index = date.today().timetuple().tm_yday % len(TOPICS)
    topic = TOPICS[day_index]

    # Keep daily uniqueness even if the same topic rotates yearly.
    suffix = random.choice(["guide", "overview", "checklist", "framework"])
    title = f"{topic['title']}: {suffix.title()}"
    slug = f"{today}-{topic['slug']}-{suffix}"
    path = Path("posts") / f"{slug}.md"
    Path("posts").mkdir(exist_ok=True)

    if path.exists():
        print(f"Post already exists: {path}")
        return path

    content = build_content(topic)
    frontmatter = (
        "---\n"
        f'title: "{yaml_escape(title)}"\n'
        f'date: "{today}"\n'
        f'excerpt: "{yaml_escape(topic["excerpt"])}"\n'
        "---\n\n"
    )
    path.write_text(frontmatter + content + "\n", encoding="utf-8")
    print(f"Created post: {path}")
    return path


def main():
    write_post()


if __name__ == "__main__":
    main()
