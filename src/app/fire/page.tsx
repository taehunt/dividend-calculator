"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Calculator,
  Calendar,
  DollarSign,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

const copy = {
  en: {
    title: "FIRE Calculator",
    subtitle:
      "Estimate when your portfolio can cover your living expenses through investment returns and dividend-style compounding.",
    inputs: "FIRE Inputs",
    currentSavings: "Current Savings",
    monthlyContribution: "Monthly Contribution",
    annualExpenses: "Annual Living Expenses",
    expectedReturn: "Expected Annual Return",
    safeWithdraw: "Safe Withdrawal Rate",
    maxYears: "Max Years to Project",
    years: "Yrs",
    fireNumber: "FIRE Number",
    yearsToFire: "Years to FIRE",
    monthlyIncome: "Passive Income at FIRE",
    portfolioAtFire: "Portfolio at FIRE",
    chartTitle: "Path to Financial Independence",
    chartSub: "Portfolio value vs. your FIRE target over time",
    portfolio: "Portfolio",
    fireTarget: "FIRE Target",
    reached: "FIRE reached",
    notReached: "Not reached in projection window",
    tipTitle: "How this calculator works",
    tipBody:
      "Your FIRE number is annual expenses divided by the safe withdrawal rate. The chart projects monthly contributions and compound growth until your portfolio crosses that target.",
  },
  ko: {
    title: "FIRE 조기은퇴 계산기",
    subtitle:
      "투자 수익과 복리로 생활비를 충당할 수 있는 시점을 계산합니다.",
    inputs: "FIRE 입력값",
    currentSavings: "현재 자산",
    monthlyContribution: "월 저축액",
    annualExpenses: "연간 생활비",
    expectedReturn: "예상 연수익률",
    safeWithdraw: "안전 인출률",
    maxYears: "최대 계산 기간",
    years: "년",
    fireNumber: "FIRE 목표 금액",
    yearsToFire: "FIRE까지 기간",
    monthlyIncome: "FIRE 시점 월 수동소득",
    portfolioAtFire: "FIRE 시점 자산",
    chartTitle: "경제적 자유까지 경로",
    chartSub: "시간에 따른 자산과 FIRE 목표선",
    portfolio: "자산",
    fireTarget: "FIRE 목표",
    reached: "FIRE 도달",
    notReached: "계산 기간 내 미도달",
    tipTitle: "계산 방식",
    tipBody:
      "FIRE 목표 금액 = 연간 생활비 ÷ 안전 인출률입니다. 월 저축과 복리 수익을 반영해 목표가 넘는 시점을 찾습니다.",
  },
};

export default function FireCalculatorPage() {
  const [lang, setLang] = useState<"en" | "ko">("en");
  const [currency, setCurrency] = useState<"USD" | "KRW">("USD");
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [safeWithdraw, setSafeWithdraw] = useState(4);
  const [maxYears, setMaxYears] = useState(40);

  const t = copy[lang];

  const result = useMemo(() => {
    const fireNumber = annualExpenses / (safeWithdraw / 100);
    let balance = currentSavings;
    const monthlyRate = expectedReturn / 100 / 12;
    const rows: { year: number; portfolio: number; fireTarget: number }[] = [];
    let yearsToFire: number | null = null;
    let portfolioAtFire = currentSavings;

    for (let year = 1; year <= maxYears; year++) {
      for (let month = 0; month < 12; month++) {
        balance += monthlyContribution;
        balance *= 1 + monthlyRate;
      }

      const rounded = Math.round(balance);
      rows.push({
        year,
        portfolio: rounded,
        fireTarget: Math.round(fireNumber),
      });

      if (yearsToFire === null && balance >= fireNumber) {
        yearsToFire = year;
        portfolioAtFire = rounded;
      }
    }

    return {
      fireNumber: Math.round(fireNumber),
      yearsToFire,
      portfolioAtFire:
        yearsToFire === null
          ? Math.round(rows[rows.length - 1]?.portfolio || currentSavings)
          : portfolioAtFire,
      monthlyIncome: Math.round((annualExpenses || 0) / 12),
      rows,
    };
  }, [
    annualExpenses,
    currentSavings,
    expectedReturn,
    maxYears,
    monthlyContribution,
    safeWithdraw,
  ]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const InputField = ({
    label,
    value,
    onChange,
    suffix,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    suffix?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 text-sm">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="fire"
        lang={lang}
        currency={currency}
        onLangChange={setLang}
        onCurrencyChange={setCurrency}
        showLocaleControls
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-4">
            <Flame className="w-4 h-4" />
            FIRE
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            {t.title}
          </motion.h1>
          <p className="text-lg text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">{t.inputs}</h2>
            </div>
            <InputField
              label={t.currentSavings}
              value={currentSavings}
              onChange={setCurrentSavings}
            />
            <InputField
              label={t.monthlyContribution}
              value={monthlyContribution}
              onChange={setMonthlyContribution}
            />
            <InputField
              label={t.annualExpenses}
              value={annualExpenses}
              onChange={setAnnualExpenses}
            />
            <InputField
              label={t.expectedReturn}
              value={expectedReturn}
              onChange={setExpectedReturn}
              suffix="%"
            />
            <InputField
              label={t.safeWithdraw}
              value={safeWithdraw}
              onChange={setSafeWithdraw}
              suffix="%"
            />
            <InputField
              label={t.maxYears}
              value={maxYears}
              onChange={setMaxYears}
              suffix={t.years}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4" /> {t.fireNumber}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(result.fireNumber)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {t.yearsToFire}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {result.yearsToFire === null
                    ? t.notReached
                    : `${result.yearsToFire}${lang === "ko" ? "년" : " yrs"}`}
                </p>
                {result.yearsToFire !== null && (
                  <p className="text-xs text-emerald-600 mt-2">{t.reached}</p>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.monthlyIncome}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(result.monthlyIncome)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {t.portfolioAtFire}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(result.portfolioAtFire)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">{t.chartTitle}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">{t.chartSub}</p>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.rows}>
                    <defs>
                      <linearGradient id="firePortfolio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="year"
                      tickFormatter={(v) =>
                        lang === "ko" ? `${v}년` : `Yr ${v}`
                      }
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) =>
                        currency === "USD"
                          ? `$${(v / 1000).toFixed(0)}k`
                          : `₩${(v / 10000).toFixed(0)}만`
                      }
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => [
                        formatCurrency(Number(value)),
                        name === "portfolio" ? t.portfolio : t.fireTarget,
                      ]}
                    />
                    <Legend
                      formatter={(value) =>
                        value === "portfolio" ? t.portfolio : t.fireTarget
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="portfolio"
                      name="portfolio"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      fill="url(#firePortfolio)"
                    />
                    <Area
                      type="monotone"
                      dataKey="fireTarget"
                      name="fireTarget"
                      stroke="#f97316"
                      strokeWidth={2}
                      fillOpacity={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">{t.tipTitle}</h3>
              <p className="text-slate-600 leading-relaxed">{t.tipBody}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
