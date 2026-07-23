import Link from "next/link";
import { Calculator, Flame, LineChart, Percent } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const tools = [
  {
    href: "/",
    title: "Dividend Reinvestment Calculator",
    titleKo: "배당 재투자 계산기",
    desc: "Project long-term growth with DRIP, contributions, yield, and tax.",
    descKo: "DRIP, 월 적립, 배당률, 세금을 반영한 장기 자산 성장 계산",
    icon: LineChart,
  },
  {
    href: "/fire",
    title: "FIRE Calculator",
    titleKo: "FIRE 조기은퇴 계산기",
    desc: "Estimate when your portfolio can cover living expenses.",
    descKo: "생활비를 충당하는 경제적 자유 도달 시점 계산",
    icon: Flame,
  },
  {
    href: "/average",
    title: "Average Cost Calculator",
    titleKo: "평단가(물타기) 계산기",
    desc: "Track cost basis across multiple buys and averaging strategies.",
    descKo: "여러 번 매수 후 평균 단가와 평가손익 계산",
    icon: Calculator,
  },
  {
    href: "/tax",
    title: "Dividend Tax Calculator",
    titleKo: "배당세 계산기",
    desc: "Estimate net dividend income after tax and reinvestment drag.",
    descKo: "세후 배당 소득과 재투자 영향 계산",
    icon: Percent,
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
            Free calculators for dividend investing, FIRE planning, and cost basis tracking.
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
