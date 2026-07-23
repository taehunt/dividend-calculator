export type FaqItem = {
  q: string;
  a: string;
};

export type FaqBundle = {
  en: FaqItem[];
  ko: FaqItem[];
};

export const calculatorFaqs = {
  dividend: {
    en: [
      {
        q: "What is a dividend reinvestment calculator?",
        a: "A dividend reinvestment (DRIP) calculator projects how your portfolio can grow when cash dividends buy more shares instead of being withdrawn. YieldGrower’s free tool models initial capital, monthly contributions, expected return, dividend yield, tax, and DRIP on/off so you can compare compounding paths.",
      },
      {
        q: "How does DRIP compound returns over time?",
        a: "Each reinvested dividend increases your share count. Those extra shares produce more dividends later, creating a snowball. Small monthly contributions plus steady reinvestment often matter more than perfect market timing over 10–30 years.",
      },
      {
        q: "Should I include dividend tax in my projection?",
        a: "Yes, if you invest in a taxable account. Tax reduces cash available to reinvest, so after-tax yield is what compounds. For a focused after-tax view, also try the Dividend Tax Calculator on YieldGrower.",
      },
      {
        q: "How is this different from a FIRE calculator?",
        a: "The DRIP calculator answers “how large can my portfolio become?” The FIRE calculator answers “when can passive income cover expenses?” Use both together, and check Income Pulse for today’s income backdrop.",
      },
    ],
    ko: [
      {
        q: "배당 재투자(DRIP) 계산기는 무엇인가요?",
        a: "현금 배당을 인출하지 않고 추가 주식 매수에 쓰는 경우, 포트폴리오가 어떻게 성장하는지 추정하는 도구입니다. YieldGrower는 초기 원금, 월 적립, 기대 수익률, 배당률, 세금, DRIP 켜기/끄기를 반영해 복리 경로를 비교합니다.",
      },
      {
        q: "DRIP는 어떻게 복리를 만드나요?",
        a: "재투자된 배당으로 보유 주식이 늘고, 늘어난 주식이 다시 배당을 만듭니다. 10~30년 구간에서는 완벽한 타이밍보다 꾸준한 적립과 재투자가 결과를 더 크게 바꾸는 경우가 많습니다.",
      },
      {
        q: "배당세도 넣고 계산해야 하나요?",
        a: "과세 계좌라면 넣는 편이 현실적입니다. 세금만큼 재투자 가능 금액이 줄어 복리 속도가 달라집니다. 세후에 더 집중하려면 배당세 계산기도 함께 써 보세요.",
      },
      {
        q: "FIRE 계산기와는 무엇이 다른가요?",
        a: "DRIP 계산기는 ‘자산이 얼마나 커질까?’를, FIRE 계산기는 ‘언제 생활비를 패시브 소득으로 충당할까?’를 봅니다. 둘을 같이 쓰고, 오늘의 인컴 환경은 Income Pulse에서 확인하세요.",
      },
    ],
  },
  fire: {
    en: [
      {
        q: "What does a FIRE calculator estimate?",
        a: "It estimates when your portfolio may cover living expenses using contributions, expected returns, and a safe withdrawal rate (or a manual FIRE number). The goal is a realistic crossover point, not a guarantee.",
      },
      {
        q: "What is a safe withdrawal rate?",
        a: "A common planning shortcut is about 4% of portfolio value per year, but the right rate depends on market returns, spending flexibility, and longevity. Lower rates raise your FIRE target; higher rates lower it but increase sequence-of-returns risk.",
      },
      {
        q: "Should I set my FIRE target manually?",
        a: "Yes, if you already know the nest egg you want. Automatic mode uses expenses ÷ withdrawal rate. Manual mode lets you type a custom target and watch the chart until portfolio value crosses it.",
      },
      {
        q: "How do dividends fit into FIRE planning?",
        a: "Dividends can fund spending without selling shares, but yield and taxes still matter. Pair this page with the Dividend Income Goal Calculator and check Income Pulse for today’s yield backdrop.",
      },
    ],
    ko: [
      {
        q: "FIRE 계산기는 무엇을 추정하나요?",
        a: "월 저축, 기대 수익률, 안전 인출률(또는 직접 입력한 FIRE 목표)을 바탕으로 생활비를 커버할 수 있는 시점을 추정합니다. 확정이 아니라 계획적인 크로스오버를 보는 도구입니다.",
      },
      {
        q: "안전 인출률이란 무엇인가요?",
        a: "흔히 연 4% 정도를 계획 가정으로 씁니다. 시장 수익률, 지출 유연성, 수명에 따라 달라집니다. 인출률을 낮추면 필요 자산은 커지고, 높이면 목표는 작아지지만 위험은 커질 수 있습니다.",
      },
      {
        q: "FIRE 목표를 직접 입력해도 되나요?",
        a: "네. 자동 모드는 생활비÷인출률로 목표를 만들고, 수동 모드는 원하는 목표 금액을 직접 넣어 차트에서 도달 시점을 봅니다.",
      },
      {
        q: "배당은 FIRE와 어떻게 연결되나요?",
        a: "배당은 주식을 팔지 않고도 생활비를 일부 충당할 수 있습니다. 배당률·세금도 중요하니 배당 목표 소득 계산기와 Income Pulse를 함께 확인하세요.",
      },
    ],
  },
  compound: {
    en: [
      {
        q: "How does a compound interest calculator work?",
        a: "It applies returns to both your principal and previously earned interest. Add monthly contributions to see how consistent investing changes the ending balance versus contributions alone.",
      },
      {
        q: "Is compound interest the same as DRIP?",
        a: "Related, but not identical. Compound interest is the math of earnings-on-earnings. DRIP is one real-world way dividends create that compounding inside a stock portfolio.",
      },
      {
        q: "What inputs matter most?",
        a: "Time horizon and contribution size usually dominate small rate differences. Starting earlier or investing consistently often beats waiting for a perfect expected return.",
      },
    ],
    ko: [
      {
        q: "복리 계산기는 어떻게 작동하나요?",
        a: "원금뿐 아니라 이미 생긴 이자에도 수익률을 적용합니다. 월 적립을 넣으면 ‘낸 돈’과 ‘불어난 잔액’이 어떻게 갈라지는지 볼 수 있습니다.",
      },
      {
        q: "복리와 DRIP는 같은가요?",
        a: "비슷하지만 다릅니다. 복리는 수익이 수익을 낳는 수학이고, DRIP는 배당으로 그 복리를 주식 포트폴리오에서 실현하는 한 방법입니다.",
      },
      {
        q: "어떤 입력이 결과를 가장 바꾸나요?",
        a: "보통 기간과 적립액이 수익률을 조금 바꾸는 것보다 영향이 큽니다. 완벽한 수익률을 기다리기보다 일찍, 꾸준히 넣는 편이 유리한 경우가 많습니다.",
      },
    ],
  },
  goal: {
    en: [
      {
        q: "How do I calculate the portfolio needed for monthly dividend income?",
        a: "Convert your monthly goal to an annual after-tax target, then divide by the assumed net yield. Example: if you need $36,000 after tax and assume a 3% net yield, you need about $1.2 million in dividend-producing assets.",
      },
      {
        q: "Why does tax change the required portfolio?",
        a: "Gross yield is not take-home yield. Higher tax means you need a larger portfolio (or a higher gross yield) to hit the same monthly cash goal.",
      },
      {
        q: "What should I do after I know the funding gap?",
        a: "Use the DRIP and FIRE calculators to test contribution plans that close the gap, and check Income Pulse to see whether today’s ETF yields look attractive versus Treasuries.",
      },
    ],
    ko: [
      {
        q: "월 배당 목표에 필요한 자산은 어떻게 구하나요?",
        a: "월 목표를 세후 연간 목표로 바꾼 뒤, 가정한 세후 배당률로 나눕니다. 예: 세후 연 3,600만 원이 필요하고 세후 수익률이 3%라면 약 12억 원 규모가 필요합니다.",
      },
      {
        q: "세금이 필요 자산을 바꾸는 이유는?",
        a: "표기 배당률은 실수령액이 아닙니다. 세율이 높을수록 같은 월 현금을 위해 더 큰 자산(또는 더 높은 세전 배당률)이 필요합니다.",
      },
      {
        q: "부족 금액을 알았다면 다음은?",
        a: "DRIP·FIRE 계산기로 부족분을 메울 적립 계획을 테스트하고, Income Pulse로 오늘 배당 ETF 수익률이 국채 대비 매력적인지 확인하세요.",
      },
    ],
  },
  tax: {
    en: [
      {
        q: "Why use a dividend tax calculator?",
        a: "Headline yields ignore withholding and income tax. This tool estimates gross dividends, tax drag, net income, and how much less you can reinvest after tax.",
      },
      {
        q: "Does tax affect DRIP speed?",
        a: "Yes. Only after-tax cash can buy more shares in a taxable account. Higher tax slows the snowball even if the stated yield stays the same.",
      },
      {
        q: "Is this personalized tax advice?",
        a: "No. Rules differ by country, account type, and filing status. Use the numbers as a planning estimate, then confirm with a qualified tax professional if needed.",
      },
    ],
    ko: [
      {
        q: "배당세 계산기는 왜 쓰나요?",
        a: "화면의 배당률은 세금을 반영하지 않는 경우가 많습니다. 세전 배당, 세금, 세후 소득, 재투자 가능 금액을 대략 비교할 수 있습니다.",
      },
      {
        q: "세금이 DRIP 속도에 영향을 주나요?",
        a: "줍니다. 과세 계좌에서는 세후 현금만 재투자되므로, 표기 배당률이 같아도 세율이 높으면 눈덩이 속도가 느려집니다.",
      },
      {
        q: "개인 세무 자문인가요?",
        a: "아닙니다. 국가·계좌·신고 방식에 따라 달라집니다. 계획용 추정치로 쓰고, 필요하면 세무 전문가에게 확인하세요.",
      },
    ],
  },
  average: {
    en: [
      {
        q: "How is average cost (cost basis) calculated?",
        a: "Average cost = total money spent ÷ total shares owned. Adding lower-priced buys reduces your average cost basis; higher-priced buys raise it.",
      },
      {
        q: "Is averaging down always a good idea?",
        a: "Not always. It can lower your break-even price, but it also increases concentration if the thesis is wrong. Use the calculator for math clarity, not as a buy signal.",
      },
      {
        q: "Can I track unrealized profit and loss?",
        a: "Yes. Enter an optional current market price to see market value and unrealized P/L against your average cost.",
      },
    ],
    ko: [
      {
        q: "평단가(평균 단가)는 어떻게 계산하나요?",
        a: "평균 단가 = 총 매수금액 ÷ 총 수량입니다. 더 싼 가격에 추가 매수하면 평단이 내려가고, 더 비싸게 사면 올라갑니다.",
      },
      {
        q: "물타기는 항상 좋은가요?",
        a: "아닙니다. 손익분기점은 낮출 수 있지만, 판단이 틀리면 집중 위험이 커집니다. 이 도구는 매수 신호가 아니라 숫자 확인용입니다.",
      },
      {
        q: "평가손익도 볼 수 있나요?",
        a: "네. 현재가를 넣으면 평가금액과 평단 대비 평가손익을 확인할 수 있습니다.",
      },
    ],
  },
  cagr: {
    en: [
      {
        q: "What is CAGR?",
        a: "CAGR (compound annual growth rate) is the constant annual rate that takes a starting value to an ending value over a period. It smooths multi-year performance into one number.",
      },
      {
        q: "Does CAGR show volatility?",
        a: "No. Two investments can share the same CAGR with very different drawdowns along the way. Use CAGR for comparison, not as a complete risk measure.",
      },
      {
        q: "When should investors use CAGR?",
        a: "Use it to compare multi-year portfolio results, fund performance, or a planned contribution path against a target ending value.",
      },
    ],
    ko: [
      {
        q: "CAGR이란 무엇인가요?",
        a: "CAGR(연평균 복리 수익률)은 시작 금액이 일정 기간 후 종료 금액이 되기 위해 필요했던 ‘일정한 연율’입니다. 여러 해 성과를 하나의 숫자로 정리합니다.",
      },
      {
        q: "CAGR이 변동성도 보여주나요?",
        a: "아니요. CAGR이 같아도 중간에 낙폭은 크게 다를 수 있습니다. 비교용 지표이지 위험 전체를 나타내지는 않습니다.",
      },
      {
        q: "언제 쓰면 좋나요?",
        a: "다년 포트폴리오 성과, 펀드 비교, 목표 종료 금액 대비 계획 점검에 유용합니다.",
      },
    ],
  },
  inflation: {
    en: [
      {
        q: "Why does inflation matter for investors?",
        a: "If returns lag inflation, real purchasing power shrinks even when your account balance rises. Planning in both today’s and future dollars keeps FIRE and income goals honest.",
      },
      {
        q: "What does this inflation calculator show?",
        a: "It estimates the future cost of the same basket of goods and the real value of a fixed amount of today’s money after years of inflation.",
      },
      {
        q: "How should I use it with other YieldGrower tools?",
        a: "Stress-test FIRE expenses and dividend income goals at higher future costs, then compare contribution plans in the compound and DRIP calculators.",
      },
    ],
    ko: [
      {
        q: "투자자에게 인플레이션이 왜 중요한가요?",
        a: "수익률이 물가보다 낮으면 잔고는 늘어도 실질 구매력은 줄어들 수 있습니다. FIRE·배당 목표는 현재 가치와 미래 가치를 같이 보는 편이 현실적입니다.",
      },
      {
        q: "이 계산기는 무엇을 보여주나요?",
        a: "같은 소비 바구니의 미래 비용과, 고정된 현재 금액이 물가 상승 후 실질적으로 얼마의 가치가 되는지 추정합니다.",
      },
      {
        q: "다른 도구와 어떻게 같이 쓰나요?",
        a: "FIRE 생활비와 배당 목표를 더 높은 미래 비용으로 스트레스 테스트한 뒤, 복리·DRIP 계산기로 적립 계획을 비교하세요.",
      },
    ],
  },
} satisfies Record<string, FaqBundle>;

export type CalculatorFaqKey = keyof typeof calculatorFaqs;
