"use client";

import Link from "next/link";
import {
  Calculator,
  Flame,
  LineChart,
  Percent,
  Sprout,
  Target,
  TrendingUp,
  CircleDollarSign,
  Activity,
  type LucideIcon,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

type Tool = {
  href: string;
  icon: LucideIcon;
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
};

const tools: Tool[] = [
  {
    href: "/pulse",
    icon: Activity,
    title: { en: "Income Pulse", ko: "인컴 펄스" },
    desc: {
      en: "Daily score: how attractive dividend ETF income looks vs Treasuries, inflation, and market stress.",
      ko: "배당 ETF 수익률이 국채·물가·시장 스트레스 대비 얼마나 매력적인지 매일 갱신되는 점수입니다.",
    },
  },
  {
    href: "/",
    icon: LineChart,
    title: {
      en: "Dividend Reinvestment Calculator",
      ko: "배당 재투자 계산기",
    },
    desc: {
      en: "Project long-term growth with DRIP, contributions, yield, and tax.",
      ko: "DRIP, 적립금, 배당률, 세금을 반영해 장기 자산 성장을 계산합니다.",
    },
  },
  {
    href: "/fire",
    icon: Flame,
    title: { en: "FIRE Calculator", ko: "FIRE 조기은퇴 계산기" },
    desc: {
      en: "Estimate when your portfolio can cover living expenses.",
      ko: "포트폴리오가 생활비를 충당하는 시점을 추정합니다.",
    },
  },
  {
    href: "/average",
    icon: Calculator,
    title: { en: "Average Cost Calculator", ko: "평단가(물타기) 계산기" },
    desc: {
      en: "Track cost basis across multiple buys and averaging strategies.",
      ko: "여러 번 매수한 뒤 평균 단가와 물타기 효과를 계산합니다.",
    },
  },
  {
    href: "/tax",
    icon: Percent,
    title: { en: "Dividend Tax Calculator", ko: "배당세 계산기" },
    desc: {
      en: "Estimate net dividend income after tax and reinvestment drag.",
      ko: "세후 배당 소득과 재투자에 미치는 세금 영향을 계산합니다.",
    },
  },
  {
    href: "/compound",
    icon: Sprout,
    title: { en: "Compound Interest Calculator", ko: "복리 계산기" },
    desc: {
      en: "Visualize how principal and contributions grow with compound returns.",
      ko: "원금과 적립금이 복리로 얼마나 성장하는지 확인합니다.",
    },
  },
  {
    href: "/goal",
    icon: Target,
    title: {
      en: "Dividend Income Goal Calculator",
      ko: "배당 목표 소득 계산기",
    },
    desc: {
      en: "Calculate how large a portfolio you need for a monthly dividend target.",
      ko: "목표 월 배당을 위해 필요한 포트폴리오 규모를 계산합니다.",
    },
  },
  {
    href: "/cagr",
    icon: TrendingUp,
    title: { en: "CAGR Calculator", ko: "CAGR 계산기" },
    desc: {
      en: "Measure annualized growth between a start and end portfolio value.",
      ko: "시작 금액과 종료 금액 사이의 연평균 복리 수익률을 계산합니다.",
    },
  },
  {
    href: "/inflation",
    icon: CircleDollarSign,
    title: { en: "Inflation Calculator", ko: "인플레이션 계산기" },
    desc: {
      en: "See how inflation changes purchasing power over time.",
      ko: "물가 상승이 구매력을 어떻게 바꾸는지 확인합니다.",
    },
  },
];

const pageCopy = {
  en: {
    title: "Tools",
    subtitle:
      "Free calculators for dividend investing, FIRE planning, and growth tracking.",
    reviewed: "Calculator formulas and methodology pages reviewed August 16, 2026.",
    howTitle: "How to use the calculators",
    howBody: [
      "Start with the question you need to answer, then change one assumption at a time. The dividend and compound tools project a possible path; FIRE and dividend-goal tools work backward from a target; average cost and CAGR summarize values you already know; inflation translates between nominal amounts and purchasing power.",
      "Every result is calculated in your browser. YieldGrower does not receive or store the amounts you enter. Share links contain only the inputs placed in the URL, so review a link before sending it to someone else.",
    ],
    checksTitle: "Before relying on a result",
    checks: [
      "Read the formula, worked example, and limitations shown below each calculator.",
      "Compare a conservative, base, and optimistic case instead of treating one rate as a forecast.",
      "Keep price growth, dividends, taxes, fees, and inflation separate to avoid double counting.",
      "Confirm personal investment and tax decisions with current primary sources and a qualified professional.",
    ],
  },
  ko: {
    title: "전체 도구",
    subtitle:
      "배당 투자, FIRE 계획, 자산 성장을 위한 무료 계산기 모음입니다.",
    reviewed: "계산식·방법론 페이지 검토일: 2026년 8월 16일",
    howTitle: "계산기 사용 순서",
    howBody: [
      "확인하려는 질문에 맞는 도구를 선택한 뒤 가정을 한 번에 하나씩 바꿔 비교하세요. 배당·복리 계산기는 가능한 성장 경로를, FIRE·배당 목표 계산기는 목표에서 필요한 금액을 역산합니다. 평단가·CAGR은 이미 알고 있는 거래나 기간 성과를 요약하고, 인플레이션 계산기는 명목 금액과 구매력을 구분합니다.",
      "모든 결과는 이용자의 브라우저에서 계산됩니다. YieldGrower는 입력 금액을 전송받거나 저장하지 않습니다. 공유 링크에는 URL에 포함된 입력값이 들어가므로 다른 사람에게 보내기 전에 링크 내용을 확인하세요.",
    ],
    checksTitle: "결과를 사용하기 전 확인사항",
    checks: [
      "각 계산기 아래에 표시된 계산식, 재현 예시, 반영하지 않는 항목을 읽으세요.",
      "한 가지 수익률을 예측처럼 사용하지 말고 보수적·기준·낙관적 시나리오를 비교하세요.",
      "주가 상승, 배당, 세금, 수수료, 물가를 분리해 이중 계산을 피하세요.",
      "개인 투자·세금 결정은 최신 1차 자료와 자격 있는 전문가를 통해 확인하세요.",
    ],
  },
};

export default function ToolsPage() {
  const { lang } = useLocale();
  const t = pageCopy[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="tools"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t.title}
          </h1>
          <p className="text-slate-600 text-lg">{t.subtitle}</p>
          <p className="mt-3 text-sm font-medium text-slate-500">{t.reviewed}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {tool.title[lang]}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tool.desc[lang]}
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-12 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.howTitle}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
              {t.howBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.checksTitle}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              {t.checks.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
