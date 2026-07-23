import random
from datetime import date
from pathlib import Path

TOPICS = [
    {
        "slug": "dividend-reinvestment-plans",
        "title": "Dividend Reinvestment Plans (DRIP) for Beginners",
        "title_ko": "초보자를 위한 배당 재투자(DRIP) 가이드",
        "excerpt": "Learn how DRIP investing turns small dividends into long-term compounding growth.",
        "excerpt_ko": "소액 배당이 장기 복리 성장으로 이어지는 DRIP 투자 원리를 알아봅니다.",
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
        "sections_ko": [
            (
                "DRIP가 실제로 하는 일",
                "배당 재투자 계획(DRIP)은 현금 배당을 받지 않고 자동으로 추가 주식을 매수합니다. 늘어난 주식이 다시 배당을 만들고, 그 배당이 또 주식을 사는 순환이 배당 눈덩이의 핵심입니다.",
            ),
            (
                "타이밍보다 꾸준함이 중요한 이유",
                "많은 투자자가 완벽한 매수 시점을 찾습니다. DRIP에서는 여러 시장 사이클에 걸쳐 투자를 유지하고 재투자하는 편이 더 큰 이점입니다. 정기 납입과 배당 재투자는 가끔의 타이밍 시도보다 보통 더 나은 결과를 냅니다.",
            ),
            (
                "계획을 스트레스 테스트하는 방법",
                "자금을 넣기 전에 초기 원금, 월 납입, 배당률, 세율을 바꿔 가며 모델링하세요. 간단한 배당 계산기로 입력 변화가 장기 자산과 연간 배당 소득에 미치는 영향을 확인할 수 있습니다.",
            ),
        ],
    },
    {
        "slug": "compound-interest-wealth-building",
        "title": "Compound Interest and Long-Term Wealth Building",
        "title_ko": "복리와 장기 자산 형성",
        "excerpt": "See why time in the market and reinvested returns matter more than chasing short-term gains.",
        "excerpt_ko": "단기 수익 추격보다 시장에 머무는 시간과 재투자가 왜 더 중요한지 살펴봅니다.",
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
        "sections_ko": [
            (
                "복리의 수학",
                "복리는 수익이 다시 수익을 내는 구조입니다. 배당 투자에서는 배당을 재투자할 때 일어납니다. 초반에는 느려 보이지만, 원금 베이스가 커질수록 성장 속도가 빨라집니다.",
            ),
            (
                "시간이 진짜 배수",
                "20년 같은 긴 기간이 있어야 복리가 작동할 공간이 생깁니다. 기대 수익률을 조금 올리는 것보다 기간을 5~10년 늘리는 편이 결과를 더 크게 바꾸는 경우가 많습니다. 그래서 완벽한 전략을 기다리다 시작하는 것보다 일찍 시작하는 편이 보통 유리합니다.",
            ),
            (
                "감이 아니라 숫자로",
                "납입 일정과 기대 배당률 가정을 적어 두고, DRIP·복리 계산기로 시나리오를 돌려 보세요. 계획을 바꾸기 전에 결과를 비교할 수 있습니다.",
            ),
        ],
    },
    {
        "slug": "high-yield-vs-dividend-growth",
        "title": "High Yield vs Dividend Growth: Which Fits Your Goals?",
        "title_ko": "고배당 vs 배당성장: 목표에 맞는 선택은?",
        "excerpt": "Compare immediate income strategies with long-term dividend growth approaches.",
        "excerpt_ko": "당장의 현금 소득 전략과 장기 배당성장 접근을 비교합니다.",
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
        "sections_ko": [
            (
                "고배당의 트레이드오프",
                "시작 배당률이 높으면 당장의 현금 소득이 커질 수 있습니다. 다만 일부 고배당 기업은 업황이 나빠지면 배당을 줄일 수 있습니다. 화면의 퍼센트만큼 소득의 안정성도 중요합니다.",
            ),
            (
                "배당성장의 장점",
                "매년 배당을 올리는 저배당 기업은 장기적으로 더 강한 소득 흐름을 만들 수 있습니다. 초기 지급액은 작아 보여도, 배당 증가와 주가 성장이 합쳐지면 정체된 고배당 보유를 앞지를 수 있습니다.",
            ),
            (
                "하이브리드로 구성하기",
                "많은 투자자가 복리용 안정 성장주와 현금흐름용 고배당을 섞습니다. 계산기로 두 경로를 모델링하면 10~30년 동안 소득과 총자산이 어떻게 변하는지 볼 수 있습니다.",
            ),
        ],
    },
    {
        "slug": "fire-passive-dividend-income",
        "title": "FIRE Movement and Passive Dividend Income",
        "title_ko": "FIRE 운동과 패시브 배당 소득",
        "excerpt": "Understand how dividend income can support Financial Independence, Retire Early goals.",
        "excerpt_ko": "배당 소득이 경제적 자립·조기 은퇴(FIRE) 목표를 어떻게 뒷받침하는지 이해합니다.",
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
        "sections_ko": [
            (
                "크로스오버 시점 정의하기",
                "FIRE 계획은 보통 한 질문에서 시작합니다. 언제 패시브 소득이 생활비를 덮을까? 배당은 주식을 팔지 않아도 현금이 들어올 수 있어 그 시점에 도달하는 한 경로입니다.",
            ),
            (
                "종목 선정 완벽함보다 납입률",
                "배당률을 조금 올리는 것보다 월 납입을 늘리는 편이 FIRE 날짜를 더 앞당기는 경우가 많습니다. 저축률, 투자 꾸준함, 재투자 습관이 핵심 레버입니다.",
            ),
            (
                "명확한 입력으로 진행 추적",
                "필요한 연간 배당을 추정한 뒤, 필요한 포트폴리오 규모와 배당률을 역산하세요. 시각 계산기로 납입을 조정하면 현실적인 타임라인을 만들기 쉽습니다.",
            ),
        ],
    },
    {
        "slug": "estimate-retirement-dividend-income",
        "title": "How to Estimate Retirement Income From Dividends",
        "title_ko": "배당으로 은퇴 소득 추정하기",
        "excerpt": "A practical framework for projecting future dividend income with conservative assumptions.",
        "excerpt_ko": "보수적 가정으로 미래 배당 소득을 추정하는 실전 프레임워크입니다.",
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
        "sections_ko": [
            (
                "연간 생활비부터 정하기",
                "배당으로 커버하고 싶은 연간 소득을 적으세요. 필수와 여유를 구분하면 막연한 기대 대신 목표가 생깁니다.",
            ),
            (
                "소득 목표를 포트폴리오 규모로 환산하기",
                "연간 $40,000이 필요하고 세후 순수익률을 3%로 가정하면 대략 133만 달러 규모의 배당 자산이 필요합니다. 가정에 따라 숫자가 크게 달라지므로 여러 시나리오를 돌리세요.",
            ),
            (
                "가정을 매년 재점검하기",
                "물가, 세법, 배당 정책은 변합니다. 매년 다시 계산하고 납입을 조정하세요. 배당 재투자 계산기가 계획을 숫자 기준으로 유지하는 데 도움이 됩니다.",
            ),
        ],
    },
    {
        "slug": "dividend-tax-considerations",
        "title": "Tax Considerations for Dividend Investors",
        "title_ko": "배당 투자자가 알아둘 세금 이슈",
        "excerpt": "Why after-tax yield matters more than headline dividend percentages.",
        "excerpt_ko": "헤드라인 배당률보다 세후 수익률이 중요한 이유를 설명합니다.",
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
        "sections_ko": [
            (
                "표면 배당률 ≠ 실제 수령률",
                "4% 배당률도 원천징수·소득세 후에는 꽤 낮아질 수 있습니다. 특히 매번 재투자한다면, 진짜 복리 속도는 세후 잔액에 달립니다.",
            ),
            (
                "계좌 위치가 결과를 바꾼다",
                "배당주를 어디에 담느냐에 따라 결과가 달라집니다. 절세 계좌, 과세 계좌, 국경 간 원천징수 규칙이 순현금흐름에 영향을 줍니다. 표면 수익률이 아니라 세후 결과를 비교하세요.",
            ),
            (
                "세금 드래그를 명시적으로 모델링",
                "장기 전망에 세율 가정을 넣으세요. 세금 입력이 있는 간단한 계산기만으로도 세율이 오르내릴 때 재투자 속도가 얼마나 바뀌는지 볼 수 있습니다.",
            ),
        ],
    },
    {
        "slug": "monthly-contribution-dividend-snowball",
        "title": "Building a Dividend Snowball With Monthly Contributions",
        "title_ko": "월 납입으로 배당 눈덩이 키우기",
        "excerpt": "How steady monthly investing and DRIP reinvestment create accelerating dividend income.",
        "excerpt_ko": "꾸준한 월 투자와 DRIP 재투자가 배당 소득을 가속시키는 방식을 설명합니다.",
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
        "sections_ko": [
            (
                "소액 납입도 의미가 있다",
                "매달 수십만 원은 1년 차에는 작아 보입니다. 10년의 납입과 배당 재투자 후에는 연간 소득이 의미 있을 만큼 베이스가 커질 수 있습니다.",
            ),
            (
                "프로세스를 자동화하기",
                "자동화는 결정 피로를 줄입니다. 월 매수를 예약하고 배당 재투자를 켜 두면, 시장이 지루하거나 스트레스일 때도 계획이 이어집니다.",
            ),
            (
                "잔고보다 소득 성장으로 측정",
                "계좌 잔고만이 아니라 연간 배당 소득을 추적하세요. 소득 라인이 올라가는 모습을 보는 편이 단기 가격 변동을 보는 것보다 동기부여가 되는 경우가 많습니다.",
            ),
        ],
    },
    {
        "slug": "common-dividend-investor-mistakes",
        "title": "Common Mistakes New Dividend Investors Make",
        "title_ko": "초보 배당 투자자가 자주 하는 실수",
        "excerpt": "Avoid yield chasing, overconcentration, and ignoring taxes when building a dividend plan.",
        "excerpt_ko": "배당 계획을 세울 때 고배당 추격, 과집중, 세금 무시를 피하세요.",
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
        "sections_ko": [
            (
                "최고 배당률만 쫓기",
                "화면에서 가장 높은 배당률이 항상 최선의 투자는 아닙니다. 지속 불가능한 배당은 삭감될 수 있고 주가도 같이 떨어질 수 있습니다. 화려한 퍼센트보다 지속 가능성을 우선하세요.",
            ),
            (
                "집중 위험 무시하기",
                "고배당 몇 종목만 보유하면 소득이 취약해질 수 있습니다. 섹터와 배당 스타일을 분산하면 한 번의 삭감이 전체 계획을 무너뜨릴 확률이 줄어듭니다.",
            ),
            (
                "문서화된 계획 없이 시작하기",
                "납입 규모, 기간, 목표 소득이 없으면 중도 포기하기 쉽습니다. 납입을 늘리기 전에 계획을 적어 두고 계산기로 검증하세요.",
            ),
        ],
    },
]


def yaml_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace('"', "'").replace("\n", " ").strip()


def build_content(topic: dict, *, lang: str = "en") -> str:
    if lang == "ko":
        intro = f"이 글은 장기 투자자를 위해 '{topic['title_ko']}'을(를) 쉽게 설명합니다."
        sections = topic["sections_ko"]
        next_heading = "## 실전 다음 단계"
        next_body = (
            "포트폴리오를 바꾸기 전에 납입액, 배당률, 기간을 바꿔 가며 시나리오를 비교하세요. "
            "무료 배당 재투자 계산기로 결과를 빠르게 비교하면, 헤드라인보다 숫자에 기반한 결정을 내릴 수 있습니다."
        )
        disclaimer = "*이 글은 교육 목적이며 투자 자문이 아닙니다.*"
    else:
        intro = f"This guide explains {topic['title'].lower()} in plain language for long-term investors."
        sections = topic["sections"]
        next_heading = "## Practical Next Step"
        next_body = (
            "Before changing your portfolio, run a few scenarios with different contribution amounts, yields, and timelines. "
            "A free dividend reinvestment calculator can help you compare outcomes quickly and keep decisions grounded in numbers rather than headlines."
        )
        disclaimer = "*This article is for educational purposes only and is not financial advice.*"

    parts = [intro, ""]
    for heading, body in sections:
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(body)
        parts.append("")

    parts.extend([next_heading, "", next_body, "", disclaimer])
    return "\n".join(parts)


def write_post() -> Path:
    today = date.today().isoformat()
    day_index = date.today().timetuple().tm_yday % len(TOPICS)
    topic = TOPICS[day_index]

    # Keep daily uniqueness even if the same topic rotates yearly.
    suffix = random.choice(["guide", "overview", "checklist", "framework"])
    suffix_ko = {"guide": "가이드", "overview": "개요", "checklist": "체크리스트", "framework": "프레임워크"}[
        suffix
    ]
    title = f"{topic['title']}: {suffix.title()}"
    title_ko = f"{topic['title_ko']}: {suffix_ko}"
    slug = f"{today}-{topic['slug']}-{suffix}"
    path = Path("posts") / f"{slug}.md"
    Path("posts").mkdir(exist_ok=True)

    if path.exists():
        print(f"Post already exists: {path}")
        return path

    content_en = build_content(topic, lang="en")
    content_ko = build_content(topic, lang="ko")
    frontmatter = (
        "---\n"
        f'title: "{yaml_escape(title)}"\n'
        f'titleKo: "{yaml_escape(title_ko)}"\n'
        f'date: "{today}"\n'
        f'excerpt: "{yaml_escape(topic["excerpt"])}"\n'
        f'excerptKo: "{yaml_escape(topic["excerpt_ko"])}"\n'
        "---\n\n"
    )
    path.write_text(
        frontmatter + content_en + "\n\n---ko---\n\n" + content_ko + "\n",
        encoding="utf-8",
    )
    print(f"Created post: {path}")
    return path


def main():
    write_post()


if __name__ == "__main__":
    main()
