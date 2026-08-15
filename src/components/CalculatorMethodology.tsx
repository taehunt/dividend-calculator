"use client";

import Link from "next/link";
import { BookOpenCheck, ExternalLink } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const sources = {
  investorBasics: "https://www.investor.gov/introduction-investing",
  compound:
    "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
  dca: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging",
  performance:
    "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-47",
  fees:
    "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated",
  irs550: "https://www.irs.gov/publications/p550",
  blsPower: "https://www.bls.gov/cpi/factsheets/purchasing-power-constant-dollars.htm",
  blsMethod: "https://www.bls.gov/cpi/methods-overview.htm",
  finraPerformance:
    "https://www.finra.org/investors/investing/investing-basics/evaluating-performance",
} as const;

type Language = "en" | "ko";

type Guide = {
  title: string;
  intro: string;
  formula: string;
  formulaExplanation: string;
  example: string[];
  interpretation: string[];
  limits: string[];
  sources: { label: string; href: string }[];
};

const guideCopy = {
  dividend: {
    en: {
      title: "Calculation method: price growth, dividends, tax, and DRIP",
      intro:
        "This projection deliberately separates price appreciation from dividend yield. Each month it adds the contribution, applies one-twelfth of the annual price-growth assumption, calculates a dividend on that balance, removes the selected dividend tax, and adds the net dividend only when DRIP is enabled.",
      formula:
        "next balance = (balance + contribution) × (1 + price growth ÷ 12) + net dividend",
      formulaExplanation:
        "Net dividend equals the post-growth balance × dividend yield ÷ 12 × (1 − tax rate). Enter price growth excluding dividends; entering a total-return rate would count dividends twice.",
      example: [
        "Start with $10,000 and add $500 at the beginning of the month: $10,500.",
        "At 7% annual price growth, the monthly price gain is $61.25, producing $10,561.25 before the dividend.",
        "At a 3% yield and 15% dividend tax, the net monthly dividend is about $22.44. With DRIP on, the month ends at about $10,583.69.",
      ],
      interpretation: [
        "Compare DRIP on and off with every other input unchanged. The difference isolates reinvestment in this model.",
        "Run lower-return, lower-yield, or higher-tax cases. A range is more useful than treating one projection as a forecast.",
      ],
      limits: [
        "Rates remain constant and returns arrive smoothly each month; real prices and dividends are irregular and can fall.",
        "The model excludes fees, bid-ask spreads, dividend cuts, currency movements, and account-specific tax rules.",
        "The displayed annual dividend is the sum of modeled after-tax dividends during the final projection year, not a guaranteed future payment.",
      ],
      sources: [
        { label: "Investor.gov — Introduction to investing and compound growth", href: sources.investorBasics },
        { label: "IRS Publication 550 — Dividends and reinvested distributions (U.S.)", href: sources.irs550 },
        { label: "Investor.gov — How fees affect investment results", href: sources.fees },
      ],
    },
    ko: {
      title: "계산 방식: 주가 상승·배당·세금·DRIP 분리",
      intro:
        "이 계산은 주가 상승률과 배당 수익률을 의도적으로 분리합니다. 매월 적립금을 먼저 더하고, 연간 주가 상승률의 12분의 1을 적용한 뒤, 그 잔액에서 배당을 계산합니다. 선택한 배당세를 차감하고 DRIP을 켠 경우에만 세후 배당을 잔액에 더합니다.",
      formula:
        "다음 달 잔액 = (현재 잔액 + 월 적립금) × (1 + 주가 상승률 ÷ 12) + 세후 배당",
      formulaExplanation:
        "세후 배당은 주가 상승 적용 후 잔액 × 배당률 ÷ 12 × (1 − 세율)입니다. 주가 상승률에는 배당을 제외한 값을 넣어야 배당이 이중 계산되지 않습니다.",
      example: [
        "초기금 $10,000에 월초 적립금 $500을 더하면 $10,500입니다.",
        "연 7% 주가 상승 가정의 한 달 상승분은 $61.25이므로 배당 계산 전 잔액은 $10,561.25입니다.",
        "배당률 3%, 세율 15%이면 세후 월 배당은 약 $22.44입니다. DRIP을 켜면 첫 달 말 잔액은 약 $10,583.69입니다.",
      ],
      interpretation: [
        "다른 입력값을 그대로 두고 DRIP만 켜고 꺼서 이 모델에서 재투자가 만드는 차이를 비교하세요.",
        "낮은 수익률·낮은 배당률·높은 세율 시나리오를 함께 확인하세요. 한 가지 결과를 예측처럼 믿는 것보다 범위를 보는 것이 적절합니다.",
      ],
      limits: [
        "수익률과 배당률이 일정하고 매월 고르게 발생한다고 가정하지만 실제 가격과 배당은 불규칙하며 감소할 수 있습니다.",
        "수수료, 매매 스프레드, 배당 삭감, 환율, 계좌별 세법 차이는 반영하지 않습니다.",
        "연간 배당 수익은 마지막 계산 연도에 발생한 세후 배당의 합계이며 미래 지급을 보장하지 않습니다.",
      ],
      sources: [
        { label: "Investor.gov — 투자와 복리 성장 기초", href: sources.investorBasics },
        { label: "미국 국세청 Publication 550 — 배당과 재투자 분배금", href: sources.irs550 },
        { label: "Investor.gov — 수수료가 투자 결과에 미치는 영향", href: sources.fees },
      ],
    },
  },
  fire: {
    en: {
      title: "Calculation method: turning spending into a portfolio target",
      intro:
        "Automatic mode converts annual spending into a planning target by dividing it by the withdrawal-rate assumption. The projection then adds each monthly contribution and applies one-twelfth of the annual return until the balance first reaches the target, for up to 100 years.",
      formula: "FIRE target = annual expenses ÷ withdrawal rate",
      formulaExplanation:
        "A $40,000 annual expense target divided by 4% produces a $1,000,000 planning target. The percentage is a user-controlled scenario input—not a promise that the portfolio will safely support every retirement length or market path.",
      example: [
        "With $100,000 already invested, $2,000 added monthly, and a constant 7% annual return, the current implementation first crosses $1,000,000 in projection year 16.",
        "The projected balance at that year-end is about $1,014,136 because the calculator reports annual checkpoints rather than the exact crossing month.",
      ],
      interpretation: [
        "Lower the return and withdrawal-rate assumptions together to test a more conservative case.",
        "Use manual target mode when your target already includes taxes, healthcare, a cash reserve, or other items not represented by current expenses.",
      ],
      limits: [
        "The return is smooth and constant; the order of gains and losses near retirement can materially change real outcomes.",
        "Expenses do not automatically rise with inflation, and the model excludes fees and taxes on withdrawals.",
        "A withdrawal-rate shortcut is not individualized retirement advice or a guarantee against depletion.",
      ],
      sources: [
        { label: "Investor.gov — Investing, risk, and compound growth", href: sources.investorBasics },
        { label: "Investor.gov — Performance claims and projection limits", href: sources.performance },
        { label: "Investor.gov — Long-term impact of fees", href: sources.fees },
      ],
    },
    ko: {
      title: "계산 방식: 생활비를 목표 자산으로 환산",
      intro:
        "자동 모드는 연간 생활비를 인출률 가정으로 나눠 계획용 목표 자산을 만듭니다. 이후 매월 적립금을 더하고 연 기대수익률의 12분의 1을 적용해, 최대 100년 안에 잔액이 목표를 처음 넘는 연도를 찾습니다.",
      formula: "FIRE 목표 자산 = 연간 생활비 ÷ 인출률",
      formulaExplanation:
        "연간 생활비 $40,000을 인출률 4%로 나누면 목표는 $1,000,000입니다. 이 비율은 사용자가 바꾸는 시나리오 가정이며, 모든 은퇴 기간과 시장 흐름에서 안전하다는 보장이 아닙니다.",
      example: [
        "현재 자산 $100,000, 월 적립 $2,000, 연 7% 고정 수익률이면 현재 구현은 계산 16년차에 처음 $1,000,000을 넘습니다.",
        "연말 단위로 결과를 표시하므로 해당 시점의 계산 잔액은 약 $1,014,136이며 정확한 월별 도달일을 뜻하지 않습니다.",
      ],
      interpretation: [
        "보수적인 경우를 보려면 기대수익률과 인출률을 함께 낮춰 비교하세요.",
        "세금, 의료비, 현금 예비비 등 현재 생활비에 없는 항목까지 이미 반영한 목표가 있다면 직접 입력 모드를 사용하세요.",
      ],
      limits: [
        "수익률이 일정하다고 가정하지만 은퇴 전후 손익의 순서는 실제 자산 지속 기간을 크게 바꿀 수 있습니다.",
        "생활비가 물가에 따라 자동 증가하지 않으며 수수료와 인출 세금도 제외합니다.",
        "인출률은 계획용 단축식이며 개인별 은퇴 자문이나 자산 고갈 방지 보장이 아닙니다.",
      ],
      sources: [
        { label: "Investor.gov — 투자 위험과 복리 성장", href: sources.investorBasics },
        { label: "Investor.gov — 수익률 표시와 전망치의 한계", href: sources.performance },
        { label: "Investor.gov — 장기 수수료 영향", href: sources.fees },
      ],
    },
  },
  average: {
    en: {
      title: "Calculation method: weighted average purchase price",
      intro:
        "This tool multiplies the shares in each purchase lot by that lot's price, adds every lot's cost, and divides by total shares. It is a weighted average; simply averaging the quoted prices would be wrong when lot sizes differ.",
      formula: "average purchase price = Σ(shares × purchase price) ÷ Σ(shares)",
      formulaExplanation:
        "Market value equals total shares × current price. Unrealized profit or loss equals market value minus the purchase cost entered here.",
      example: [
        "Buying 10 shares at $100 costs $1,000; buying 20 more at $70 costs $1,400.",
        "Total cost is $2,400 across 30 shares, so the weighted average price is $80—not the simple price average of $85.",
        "At a current price of $85, market value is $2,550 and unrealized gain is $150 before fees and taxes.",
      ],
      interpretation: [
        "Use separate rows for each actual purchase price and share count.",
        "A lower average price shows arithmetic only. It does not show whether adding to the position improves diversification or investment quality.",
      ],
      limits: [
        "Broker commissions, foreign-exchange costs, stock splits, sales, return-of-capital adjustments, and transferred tax lots are not modeled.",
        "Tax-law cost basis can differ from this planning average by jurisdiction, security, account type, and lot-selection method.",
        "The result is not a buy, sell, or average-down signal.",
      ],
      sources: [
        { label: "IRS Publication 550 — Basis, lots, and reinvested shares (U.S.)", href: sources.irs550 },
        { label: "Investor.gov — Dollar-cost averaging definition", href: sources.dca },
        { label: "Investor.gov — Fees and transaction costs", href: sources.fees },
      ],
    },
    ko: {
      title: "계산 방식: 수량 가중 평균 매입 단가",
      intro:
        "각 매수 건의 수량과 가격을 곱해 매수금액을 구하고, 모든 매수금액의 합을 총수량으로 나눕니다. 매수 수량이 다르면 표시 가격만 단순 평균하는 방식은 맞지 않습니다.",
      formula: "평균 매입 단가 = Σ(매수 수량 × 매수가) ÷ Σ(매수 수량)",
      formulaExplanation:
        "평가금액은 총수량 × 현재가이며, 평가손익은 평가금액에서 입력한 총 매수금액을 뺀 값입니다.",
      example: [
        "$100에 10주를 사면 $1,000, $70에 20주를 추가하면 $1,400입니다.",
        "총 30주의 매수금액은 $2,400이므로 가중 평단은 $80입니다. 두 가격의 단순 평균인 $85가 아닙니다.",
        "현재가가 $85라면 평가금액은 $2,550, 수수료·세금 전 평가이익은 $150입니다.",
      ],
      interpretation: [
        "실제 체결가격과 수량을 매수 건별로 한 줄씩 입력하세요.",
        "평단 하락은 산술 결과일 뿐이며 추가 매수가 분산도나 투자 대상의 질을 개선한다는 뜻이 아닙니다.",
      ],
      limits: [
        "매매 수수료, 환전 비용, 액면분할, 매도, 자본환급 조정, 다른 계좌에서 옮긴 세금 lot은 반영하지 않습니다.",
        "세법상 취득원가는 국가·종목·계좌·매도 lot 선택 방식에 따라 이 계획용 평균과 달라질 수 있습니다.",
        "결과는 매수·매도·물타기 신호가 아닙니다.",
      ],
      sources: [
        { label: "미국 국세청 Publication 550 — 취득원가·lot·재투자 주식", href: sources.irs550 },
        { label: "Investor.gov — 정액 분할 투자 정의", href: sources.dca },
        { label: "Investor.gov — 수수료와 거래비용", href: sources.fees },
      ],
    },
  },
  tax: {
    en: {
      title: "Calculation method: gross dividend, tax drag, and reinvestment",
      intro:
        "The selected tax rate is applied directly to modeled gross dividends. If reinvestment is projected, the calculator compounds only the after-tax dividend yield once per year and assumes no price change.",
      formula: "net dividend = portfolio × dividend yield × (1 − tax rate)",
      formulaExplanation:
        "Projected reinvestment gain equals portfolio × (1 + net dividend yield)^years − starting portfolio. This isolates modeled dividend reinvestment from price appreciation.",
      example: [
        "A $100,000 portfolio at a 3.5% yield produces $3,500 in modeled gross annual dividends.",
        "At a 15% tax rate, modeled tax is $525 and net annual dividend is $2,975, or about $248 per month.",
        "Reinvesting that constant 2.975% net yield annually for 10 years produces about $34,066 of modeled gain, excluding price changes.",
      ],
      interpretation: [
        "Enter the effective rate that fits the account and jurisdiction you are testing; the default is not a universal tax rate.",
        "Compare taxable and tax-advantaged scenarios separately instead of mixing their rules into one rate.",
      ],
      limits: [
        "The tool does not determine whether a dividend is qualified, ordinary, exempt, withheld abroad, or eligible for a credit.",
        "Progressive tax brackets, deductions, filing status, treaties, fees, and changing laws are excluded.",
        "Results are planning arithmetic, not a tax return calculation or tax advice.",
      ],
      sources: [
        { label: "IRS Publication 550 — Dividend categories and reporting (U.S.)", href: sources.irs550 },
        { label: "Investor.gov — Investment returns and dividend income", href: sources.investorBasics },
        { label: "Investor.gov — Performance methodology and excluded factors", href: sources.performance },
      ],
    },
    ko: {
      title: "계산 방식: 세전 배당·세금 영향·재투자 분리",
      intro:
        "선택한 세율을 계산된 세전 배당에 직접 적용합니다. 재투자 결과는 세후 배당률만 연 1회 복리로 적용하고 주가 변화는 없다고 가정합니다.",
      formula: "세후 배당 = 포트폴리오 × 배당률 × (1 − 세율)",
      formulaExplanation:
        "재투자 증가분은 포트폴리오 × (1 + 세후 배당률)^기간 − 초기 포트폴리오입니다. 주가 상승을 제외하고 배당 재투자 효과만 분리합니다.",
      example: [
        "$100,000 포트폴리오에 배당률 3.5%를 적용하면 계산상 세전 연 배당은 $3,500입니다.",
        "세율 15%이면 세금은 $525, 세후 연 배당은 $2,975이며 월평균 약 $248입니다.",
        "세후 배당률 2.975%를 매년 같은 비율로 10년간 재투자하면 주가 변동을 제외한 계산 증가분은 약 $34,066입니다.",
      ],
      interpretation: [
        "기본 세율을 보편적인 세율로 보지 말고 확인하려는 국가와 계좌에 맞는 실효세율을 직접 입력하세요.",
        "과세 계좌와 세제혜택 계좌는 규칙을 하나의 세율로 섞지 말고 별도 시나리오로 비교하세요.",
      ],
      limits: [
        "적격·일반·비과세 배당 여부, 해외 원천징수, 외국납부세액공제 적용 가능성을 판정하지 않습니다.",
        "누진세율, 공제, 신고 형태, 조세조약, 수수료, 법 개정은 제외합니다.",
        "결과는 계획용 산술 계산이며 세금 신고 계산이나 세무 자문이 아닙니다.",
      ],
      sources: [
        { label: "미국 국세청 Publication 550 — 배당 유형과 신고", href: sources.irs550 },
        { label: "Investor.gov — 투자수익과 배당 소득", href: sources.investorBasics },
        { label: "Investor.gov — 수익률 계산 방법과 제외 요소", href: sources.performance },
      ],
    },
  },
  compound: {
    en: {
      title: "Calculation method: monthly contributions with monthly compounding",
      intro:
        "For every modeled month, this calculator adds the contribution first and then applies one-twelfth of the annual rate to the entire balance. It keeps contributions separate so the chart can distinguish money added from modeled growth.",
      formula: "next balance = (balance + monthly contribution) × (1 + annual rate ÷ 12)",
      formulaExplanation:
        "Because the contribution is added before growth, each monthly deposit receives one month of return immediately. A calculator that deposits at month-end will produce a slightly lower result.",
      example: [
        "Starting with $10,000, adding $500 each month, and applying a constant 7% annual rate for 20 years produces a modeled ending balance of about $302,370.",
        "Total money contributed is $130,000; the remaining roughly $172,370 is modeled growth before fees, taxes, and inflation.",
      ],
      interpretation: [
        "Use the rate as a scenario, not an expected entitlement. Compare several rates and time horizons.",
        "Keep nominal and inflation-adjusted assumptions consistent; use the inflation calculator to translate purchasing power.",
      ],
      limits: [
        "Returns are smooth, constant, and compounded monthly; real investments fluctuate and may lose principal.",
        "Fees, taxes, inflation, contribution changes, and withdrawals are excluded.",
        "The result depends on beginning-of-month contribution timing and may differ from other calculators.",
      ],
      sources: [
        { label: "Investor.gov — Compound Interest Calculator", href: sources.compound },
        { label: "Investor.gov — Compound growth and investment risk", href: sources.investorBasics },
        { label: "Investor.gov — How fees reduce compounding", href: sources.fees },
      ],
    },
    ko: {
      title: "계산 방식: 월초 적립과 월 복리",
      intro:
        "매월 적립금을 먼저 잔액에 더한 뒤 전체 잔액에 연이율의 12분의 1을 적용합니다. 납입 원금은 별도로 누적해 차트에서 직접 넣은 돈과 계산상 성장분을 구분합니다.",
      formula: "다음 달 잔액 = (현재 잔액 + 월 적립금) × (1 + 연이율 ÷ 12)",
      formulaExplanation:
        "적립금을 수익 계산 전에 더하므로 매월 납입액이 즉시 한 달치 수익률을 적용받습니다. 월말 납입을 가정하는 계산기보다 결과가 조금 높을 수 있습니다.",
      example: [
        "초기금 $10,000, 월 적립 $500, 연 7% 고정 수익률, 20년을 적용하면 계산상 최종 잔액은 약 $302,370입니다.",
        "총 납입 원금은 $130,000이며 나머지 약 $172,370은 수수료·세금·물가를 차감하기 전 계산상 성장분입니다.",
      ],
      interpretation: [
        "수익률은 받을 수 있는 확정값이 아니라 시나리오로 사용하고 여러 수익률과 기간을 비교하세요.",
        "명목 수익률과 물가 조정 수익률을 섞지 말고, 구매력은 인플레이션 계산기로 따로 확인하세요.",
      ],
      limits: [
        "수익률이 일정하고 월 복리로 발생한다고 가정하지만 실제 투자는 변동하며 원금 손실이 날 수 있습니다.",
        "수수료, 세금, 물가, 적립금 변화, 중도 인출은 제외합니다.",
        "월초 납입을 가정하므로 다른 납입 시점의 계산기와 결과가 다를 수 있습니다.",
      ],
      sources: [
        { label: "Investor.gov — 복리 계산기", href: sources.compound },
        { label: "Investor.gov — 복리 성장과 투자 위험", href: sources.investorBasics },
        { label: "Investor.gov — 수수료가 복리에 미치는 영향", href: sources.fees },
      ],
    },
  },
  goal: {
    en: {
      title: "Calculation method: required capital for an after-tax income goal",
      intro:
        "The monthly target is treated as take-home dividend income. The calculator annualizes it, converts the gross yield to a net yield with the selected tax rate, and divides the annual target by that net yield.",
      formula: "required portfolio = monthly net-income goal × 12 ÷ [yield × (1 − tax rate)]",
      formulaExplanation:
        "The funding gap is the required portfolio minus the current portfolio, floored at zero. It does not estimate how long closing that gap will take.",
      example: [
        "A $3,000 monthly net-income goal equals $36,000 per year.",
        "At a 3.5% gross yield and 15% tax rate, modeled net yield is 2.975%.",
        "$36,000 ÷ 2.975% produces a required portfolio of about $1,210,084. With $100,000 already invested, the displayed gap is about $1,110,084.",
      ],
      interpretation: [
        "Test lower yields because a high displayed yield can change or reflect higher risk.",
        "Increase the income target for expenses not covered elsewhere, then check its future purchasing power with the inflation calculator.",
      ],
      limits: [
        "Dividends and yields can be reduced; the model assumes the selected yield remains constant.",
        "It excludes price changes, fees, currency changes, irregular distributions, and detailed tax rules.",
        "The target is mathematical sizing, not a recommendation to build a dividend-only portfolio.",
      ],
      sources: [
        { label: "FINRA — Yield, total return, and performance", href: sources.finraPerformance },
        { label: "IRS Publication 550 — Dividend income and taxation (U.S.)", href: sources.irs550 },
        { label: "Investor.gov — Risk and dividend returns", href: sources.investorBasics },
      ],
    },
    ko: {
      title: "계산 방식: 세후 목표 소득에 필요한 자산 역산",
      intro:
        "월 목표액을 실제로 받으려는 세후 배당 소득으로 봅니다. 이를 연간 금액으로 바꾸고, 선택한 세율로 세전 배당률을 세후 배당률로 변환한 뒤 연간 목표를 나눕니다.",
      formula: "필요 자산 = 월 세후 목표 × 12 ÷ [배당률 × (1 − 세율)]",
      formulaExplanation:
        "부족 금액은 필요 자산에서 현재 자산을 뺀 값이며 0보다 작으면 0으로 표시합니다. 부족분을 채우는 기간은 계산하지 않습니다.",
      example: [
        "세후 월 목표 $3,000은 연간 $36,000입니다.",
        "세전 배당률 3.5%, 세율 15%이면 계산상 세후 배당률은 2.975%입니다.",
        "$36,000을 2.975%로 나누면 필요 자산은 약 $1,210,084입니다. 현재 자산이 $100,000이면 부족 금액은 약 $1,110,084입니다.",
      ],
      interpretation: [
        "표시 배당률이 높을수록 변동 가능성이나 위험이 클 수 있으므로 낮은 배당률도 함께 비교하세요.",
        "다른 소득으로 충당되지 않는 지출을 목표액에 포함하고 인플레이션 계산기로 미래 구매력도 확인하세요.",
      ],
      limits: [
        "배당과 배당률은 줄어들 수 있지만 선택한 배당률이 계속 유지된다고 가정합니다.",
        "주가 변동, 수수료, 환율, 불규칙한 분배금, 상세 세법은 제외합니다.",
        "결과는 목표 금액의 산술적 크기이며 배당 자산만으로 포트폴리오를 구성하라는 권유가 아닙니다.",
      ],
      sources: [
        { label: "FINRA — 배당률·총수익·성과 평가", href: sources.finraPerformance },
        { label: "미국 국세청 Publication 550 — 배당 소득과 과세", href: sources.irs550 },
        { label: "Investor.gov — 투자 위험과 배당 수익", href: sources.investorBasics },
      ],
    },
  },
  cagr: {
    en: {
      title: "Calculation method: one annualized rate between two values",
      intro:
        "CAGR finds the constant annual rate that would connect the starting value to the ending value over the selected number of years. It is a geometric rate, not the arithmetic average of yearly returns.",
      formula: "CAGR = (ending value ÷ starting value)^(1 ÷ years) − 1",
      formulaExplanation:
        "Total return is calculated separately as (ending − starting) ÷ starting. CAGR annualizes the full-period change so periods of different lengths can be compared on one scale.",
      example: [
        "Growing from $10,000 to $25,000 over seven years is a 150% total return.",
        "Applying the CAGR formula produces about 13.99% per year because $10,000 × (1 + 13.99%)^7 is approximately $25,000.",
      ],
      interpretation: [
        "Use identical definitions for start and end values: both should either include or exclude cash flows consistently.",
        "For portfolios with deposits and withdrawals, CAGR can misstate investor experience; a cash-flow-aware return measure may be more appropriate.",
      ],
      limits: [
        "CAGR hides the path between endpoints, including volatility, drawdowns, and the timing of losses.",
        "It does not deduct fees, taxes, or inflation unless the input values already reflect them.",
        "Past annualized growth does not predict future returns.",
      ],
      sources: [
        { label: "FINRA — Comparing performance with annualized returns", href: sources.finraPerformance },
        { label: "Investor.gov — Performance claims and methodology", href: sources.performance },
        { label: "Investor.gov — Fees excluded from performance", href: sources.fees },
      ],
    },
    ko: {
      title: "계산 방식: 두 금액을 연결하는 하나의 연환산 수익률",
      intro:
        "선택 기간 동안 시작 금액이 종료 금액이 되도록 만드는 일정한 연간 복리율을 구합니다. 각 연도 수익률의 산술 평균이 아니라 기하학적 비율입니다.",
      formula: "CAGR = (종료 금액 ÷ 시작 금액)^(1 ÷ 기간) − 1",
      formulaExplanation:
        "총수익률은 (종료 금액 − 시작 금액) ÷ 시작 금액으로 별도 계산합니다. CAGR은 전체 기간 변화를 연환산해 길이가 다른 기간을 같은 기준으로 비교하게 합니다.",
      example: [
        "$10,000이 7년 후 $25,000이 되면 전체 수익률은 150%입니다.",
        "CAGR 공식 결과는 연 약 13.99%이며, $10,000 × (1 + 13.99%)^7은 약 $25,000이 됩니다.",
      ],
      interpretation: [
        "시작 금액과 종료 금액에서 현금 흐름을 포함하거나 제외하는 기준을 동일하게 맞추세요.",
        "중간 납입과 인출이 있는 포트폴리오는 CAGR이 실제 투자 경험을 왜곡할 수 있으므로 현금 흐름을 반영한 수익률이 더 적절할 수 있습니다.",
      ],
      limits: [
        "두 끝점 사이의 변동성, 낙폭, 손실 시점을 보여주지 않습니다.",
        "입력 금액에 이미 반영하지 않았다면 수수료·세금·물가를 차감하지 않습니다.",
        "과거 연환산 성장률은 미래 수익률을 예측하지 않습니다.",
      ],
      sources: [
        { label: "FINRA — 연환산 수익률을 이용한 성과 비교", href: sources.finraPerformance },
        { label: "Investor.gov — 성과 표시와 계산 방법", href: sources.performance },
        { label: "Investor.gov — 성과에서 제외될 수 있는 수수료", href: sources.fees },
      ],
    },
  },
  inflation: {
    en: {
      title: "Calculation method: future cost and purchasing power",
      intro:
        "The calculator shows two views of the same inflation assumption. Future cost compounds today's amount upward; real value discounts a fixed nominal amount by the same rate.",
      formula: "future cost = current amount × (1 + inflation rate)^years",
      formulaExplanation:
        "Real value equals current amount ÷ (1 + inflation rate)^years. These are scenario calculations using a constant rate, not a reconstruction of historical CPI.",
      example: [
        "At constant 3% inflation for 20 years, a basket costing $50,000 today would cost about $90,306.",
        "A fixed $50,000 held 20 years would have purchasing power equivalent to about $27,684 in today's dollars, a modeled loss of $22,316.",
      ],
      interpretation: [
        "Use a rate that matches the planning question. Personal spending can differ from a national consumer-price index.",
        "When combining tools, do not subtract inflation twice: use either nominal cash flows with nominal returns or real cash flows with real returns.",
      ],
      limits: [
        "Actual inflation changes over time and varies across housing, healthcare, food, education, and other categories.",
        "The model does not use monthly CPI observations, regional prices, taxes, or changes in consumption patterns.",
        "Future cost and real value answer different questions and should not be added together.",
      ],
      sources: [
        { label: "U.S. Bureau of Labor Statistics — Purchasing power and constant dollars", href: sources.blsPower },
        { label: "U.S. Bureau of Labor Statistics — CPI methods overview", href: sources.blsMethod },
        { label: "Investor.gov — Nominal growth and investment risk", href: sources.investorBasics },
      ],
    },
    ko: {
      title: "계산 방식: 미래 비용과 구매력 할인",
      intro:
        "같은 물가상승률 가정을 두 방향으로 보여줍니다. 미래 비용은 현재 금액을 복리로 늘리고, 실질 가치는 고정된 명목 금액을 같은 비율로 할인합니다.",
      formula: "미래 비용 = 현재 금액 × (1 + 물가상승률)^기간",
      formulaExplanation:
        "실질 가치는 현재 금액 ÷ (1 + 물가상승률)^기간입니다. 일정한 비율을 쓰는 시나리오 계산이며 과거 소비자물가지수를 재현하는 도구가 아닙니다.",
      example: [
        "물가가 20년 동안 매년 3%씩 오른다고 가정하면 현재 $50,000인 소비 묶음의 미래 비용은 약 $90,306입니다.",
        "고정된 $50,000의 20년 후 구매력은 현재 가치 약 $27,684에 해당하며 계산상 구매력 감소는 $22,316입니다.",
      ],
      interpretation: [
        "계획 목적에 맞는 비율을 사용하세요. 개인별 지출 구조는 국가 소비자물가지수와 다를 수 있습니다.",
        "다른 계산기와 함께 쓸 때 물가를 두 번 차감하지 마세요. 명목 현금흐름에는 명목 수익률을, 실질 현금흐름에는 실질 수익률을 맞춰야 합니다.",
      ],
      limits: [
        "실제 물가는 시기마다 달라지고 주거·의료·식품·교육 등 항목별 상승률도 다릅니다.",
        "월별 CPI 관측값, 지역별 가격, 세금, 소비 구성 변화는 반영하지 않습니다.",
        "미래 비용과 실질 가치는 서로 다른 질문의 결과이므로 합산하면 안 됩니다.",
      ],
      sources: [
        { label: "미국 노동통계국 — 구매력과 불변가치", href: sources.blsPower },
        { label: "미국 노동통계국 — CPI 산정 방법", href: sources.blsMethod },
        { label: "Investor.gov — 명목 성장과 투자 위험", href: sources.investorBasics },
      ],
    },
  },
} satisfies Record<string, Record<Language, Guide>>;

export type CalculatorMethodologyKey = keyof typeof guideCopy;

const labels = {
  en: {
    reviewed: "Formula and content reviewed August 16, 2026",
    formula: "Formula used by this calculator",
    example: "Worked example",
    interpretation: "How to interpret the result",
    limits: "What this calculator does not model",
    sources: "Primary and regulatory references",
    maintainer: "Maintained by the YieldGrower operator",
    maintainerNote:
      "The operator designs and maintains the calculator implementation and documents its assumptions. No investment-adviser, tax-professional, legal, or accounting credential is claimed.",
  },
  ko: {
    reviewed: "계산식·본문 검토일: 2026년 8월 16일",
    formula: "이 계산기가 사용하는 공식",
    example: "재현 가능한 계산 예시",
    interpretation: "결과 해석 방법",
    limits: "반영하지 않는 항목",
    sources: "1차 기관·규제기관 참고자료",
    maintainer: "YieldGrower 운영자가 직접 유지관리",
    maintainerNote:
      "운영자는 계산기 구현과 가정 문서화를 관리합니다. 투자자문·세무·법률·회계 관련 전문 자격을 보유했다고 주장하지 않습니다.",
  },
};

export default function CalculatorMethodology({
  page,
}: {
  page: CalculatorMethodologyKey;
}) {
  const { lang } = useLocale();
  const guide = guideCopy[page][lang];
  const t = labels[lang];

  return (
    <section className="mt-20 border-t border-slate-200 pt-14" aria-labelledby={`${page}-method-title`}>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-9 sm:px-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
            <span>{t.reviewed}</span>
          </div>
          <h2 id={`${page}-method-title`} className="max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {guide.title}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700">{guide.intro}</p>
        </div>

        <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2">
          <section>
            <h3 className="text-lg font-bold text-slate-900">{t.formula}</h3>
            <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 font-mono text-sm leading-6 text-indigo-950">
              {guide.formula}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{guide.formulaExplanation}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900">{t.example}</h3>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {guide.example.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900">{t.interpretation}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {guide.interpretation.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900">{t.limits}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {guide.limits.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="lg:col-span-2 border-t border-slate-200 pt-8">
            <h3 className="text-lg font-bold text-slate-900">{t.sources}</h3>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {guide.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-1.5 text-sm font-medium leading-6 text-indigo-700 underline decoration-indigo-200 underline-offset-4 hover:text-indigo-900"
                  >
                    <span>{source.label}</span>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900">{t.maintainer}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t.maintainerNote}</p>
            <Link href="/about" className="mt-3 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-900">
              {lang === "ko" ? "운영 및 검증 방식 보기" : "Read how the site is maintained"}
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
