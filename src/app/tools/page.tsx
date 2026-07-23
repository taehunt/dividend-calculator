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
  },
  ko: {
    title: "전체 도구",
    subtitle:
      "배당 투자, FIRE 계획, 자산 성장을 위한 무료 계산기 모음입니다.",
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
      </main>
    </div>
  );
}
