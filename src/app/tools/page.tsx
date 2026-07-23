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
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const tools = [
  {
    href: "/pulse",
    title: "Income Pulse",
    titleKo: "인컴 펄스",
    desc: "Daily score: how attractive dividend ETF income looks vs Treasuries, inflation, and market stress.",
    icon: Activity,
  },
  {
    href: "/",
    title: "Dividend Reinvestment Calculator",
    titleKo: "배당 재투자 계산기",
    desc: "Project long-term growth with DRIP, contributions, yield, and tax.",
    icon: LineChart,
  },
  {
    href: "/fire",
    title: "FIRE Calculator",
    titleKo: "FIRE 조기은퇴 계산기",
    desc: "Estimate when your portfolio can cover living expenses.",
    icon: Flame,
  },
  {
    href: "/average",
    title: "Average Cost Calculator",
    titleKo: "평단가(물타기) 계산기",
    desc: "Track cost basis across multiple buys and averaging strategies.",
    icon: Calculator,
  },
  {
    href: "/tax",
    title: "Dividend Tax Calculator",
    titleKo: "배당세 계산기",
    desc: "Estimate net dividend income after tax and reinvestment drag.",
    icon: Percent,
  },
  {
    href: "/compound",
    title: "Compound Interest Calculator",
    titleKo: "복리 계산기",
    desc: "Visualize how principal and contributions grow with compound returns.",
    icon: Sprout,
  },
  {
    href: "/goal",
    title: "Dividend Income Goal Calculator",
    titleKo: "배당 목표 소득 계산기",
    desc: "Calculate how large a portfolio you need for a monthly dividend target.",
    icon: Target,
  },
  {
    href: "/cagr",
    title: "CAGR Calculator",
    titleKo: "CAGR 계산기",
    desc: "Measure annualized growth between a start and end portfolio value.",
    icon: TrendingUp,
  },
  {
    href: "/inflation",
    title: "Inflation Calculator",
    titleKo: "인플레이션 계산기",
    desc: "See how inflation changes purchasing power over time.",
    icon: CircleDollarSign,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="tools" showLocaleControls={false} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Tools
          </h1>
          <p className="text-slate-600 text-lg">
            Free calculators for dividend investing, FIRE planning, and growth tracking.
          </p>
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
                <h2 className="text-lg font-bold text-slate-900 mb-1">{tool.title}</h2>
                <p className="text-sm text-slate-500 mb-3">{tool.titleKo}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
