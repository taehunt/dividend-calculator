export type RelatedTool = {
  href: string;
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
};

const tools = {
  pulse: {
    href: "/pulse",
    title: { en: "Income Pulse", ko: "인컴 펄스" },
    desc: {
      en: "See today’s dividend attractiveness score vs Treasuries and inflation.",
      ko: "오늘 배당 매력도 점수를 국채·물가와 비교해 확인합니다.",
    },
  },
  dividend: {
    href: "/",
    title: {
      en: "Dividend Reinvestment Calculator",
      ko: "배당 재투자 계산기",
    },
    desc: {
      en: "Project long-term growth with DRIP, contributions, yield, and tax.",
      ko: "DRIP·적립·배당률·세금을 반영해 장기 성장을 계산합니다.",
    },
  },
  fire: {
    href: "/fire",
    title: { en: "FIRE Calculator", ko: "FIRE 조기은퇴 계산기" },
    desc: {
      en: "Estimate when your portfolio can cover living expenses.",
      ko: "포트폴리오가 생활비를 충당하는 시점을 추정합니다.",
    },
  },
  goal: {
    href: "/goal",
    title: {
      en: "Dividend Income Goal",
      ko: "배당 목표 소득 계산기",
    },
    desc: {
      en: "Find the portfolio size needed for a monthly dividend target.",
      ko: "목표 월 배당에 필요한 포트폴리오 규모를 계산합니다.",
    },
  },
  compound: {
    href: "/compound",
    title: { en: "Compound Interest", ko: "복리 계산기" },
    desc: {
      en: "See how principal and monthly contributions grow over time.",
      ko: "원금과 월 적립금이 복리로 얼마나 성장하는지 봅니다.",
    },
  },
  tax: {
    href: "/tax",
    title: { en: "Dividend Tax Calculator", ko: "배당세 계산기" },
    desc: {
      en: "Estimate net dividend income after tax and reinvestment drag.",
      ko: "세후 배당 소득과 재투자에 미치는 세금 영향을 계산합니다.",
    },
  },
  average: {
    href: "/average",
    title: { en: "Average Cost Calculator", ko: "평단가 계산기" },
    desc: {
      en: "Track cost basis across multiple buys and averaging strategies.",
      ko: "여러 번 매수 후 평균 단가와 물타기 효과를 계산합니다.",
    },
  },
  cagr: {
    href: "/cagr",
    title: { en: "CAGR Calculator", ko: "CAGR 계산기" },
    desc: {
      en: "Measure annualized growth between start and end values.",
      ko: "시작·종료 금액 사이 연평균 복리 수익률을 계산합니다.",
    },
  },
  inflation: {
    href: "/inflation",
    title: { en: "Inflation Calculator", ko: "인플레이션 계산기" },
    desc: {
      en: "See how inflation changes purchasing power over time.",
      ko: "물가 상승이 구매력을 어떻게 바꾸는지 확인합니다.",
    },
  },
  tools: {
    href: "/tools",
    title: { en: "All Tools", ko: "전체 도구" },
    desc: {
      en: "Browse every YieldGrower calculator in one place.",
      ko: "YieldGrower의 모든 계산기를 한곳에서 봅니다.",
    },
  },
} as const;

export type RelatedToolsKey =
  | "dividend"
  | "fire"
  | "goal"
  | "compound"
  | "tax"
  | "average"
  | "cagr"
  | "inflation"
  | "pulse";

/** Full catalog for /tools hub structured data and menus. */
export const catalogTools: RelatedTool[] = [
  tools.pulse,
  tools.dividend,
  tools.fire,
  tools.average,
  tools.tax,
  tools.compound,
  tools.goal,
  tools.cagr,
  tools.inflation,
];

export const relatedToolsMap: Record<RelatedToolsKey, RelatedTool[]> = {
  dividend: [tools.fire, tools.goal, tools.pulse],
  fire: [tools.goal, tools.compound, tools.pulse],
  goal: [tools.fire, tools.dividend, tools.pulse],
  compound: [tools.dividend, tools.fire, tools.inflation],
  tax: [tools.dividend, tools.goal, tools.pulse],
  average: [tools.dividend, tools.cagr, tools.tools],
  cagr: [tools.compound, tools.average, tools.tools],
  inflation: [tools.fire, tools.compound, tools.goal],
  pulse: [tools.goal, tools.fire, tools.dividend],
};
