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
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

const copy = {
  en: {
    title: "Compound Interest Calculator",
    subtitle:
      "See how initial capital and monthly contributions grow with compound returns over time.",
    inputs: "Compound Inputs",
    initial: "Initial Principal",
    monthly: "Monthly Contribution",
    rate: "Annual Interest Rate",
    years: "Years",
    yrs: "Yrs",
    finalBalance: "Final Balance",
    totalContrib: "Total Contributions",
    totalInterest: "Total Interest Earned",
    chartTitle: "Compound Growth Over Time",
    chartSub: "Balance vs contributions each year",
    balance: "Balance",
    contributions: "Contributions",
    tipTitle: "Compound interest in plain terms",
    tipBody:
      "You earn returns on both your contributions and previously earned interest. Starting earlier or contributing consistently usually matters more than waiting for a perfect rate.",
  },
  ko: {
    title: "복리 계산기",
    subtitle:
      "초기 원금과 월 적립금이 복리로 얼마나 성장하는지 계산합니다.",
    inputs: "복리 입력값",
    initial: "초기 원금",
    monthly: "월 적립금",
    rate: "연이율",
    years: "기간",
    yrs: "년",
    finalBalance: "최종 잔액",
    totalContrib: "총 납입금",
    totalInterest: "총 이자 수익",
    chartTitle: "복리 성장 그래프",
    chartSub: "연도별 잔액과 누적 납입금",
    balance: "잔액",
    contributions: "납입금",
    tipTitle: "복리란?",
    tipBody:
      "원금뿐 아니라 이미 생긴 이자에도 이자가 붙습니다. 완벽한 수익률을 기다리기보다, 일찍 시작하고 꾸준히 적립하는 편이 보통 더 큰 차이를 만듭니다.",
  },
};

export default function CompoundCalculatorPage() {
  const [lang, setLang] = useState<"en" | "ko">("en");
  const [currency, setCurrency] = useState<"USD" | "KRW">("USD");
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const t = copy[lang];

  const result = useMemo(() => {
    let balance = initial;
    let contributions = initial;
    const monthlyRate = rate / 100 / 12;
    const rows: { year: number; balance: number; contributions: number }[] = [];

    for (let year = 1; year <= years; year++) {
      for (let m = 0; m < 12; m++) {
        balance += monthly;
        contributions += monthly;
        balance *= 1 + monthlyRate;
      }
      rows.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(contributions),
      });
    }

    const finalBalance = Math.round(balance);
    const totalContrib = Math.round(contributions);
    return {
      finalBalance,
      totalContrib,
      totalInterest: finalBalance - totalContrib,
      rows,
    };
  }, [initial, monthly, rate, years]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const Field = ({
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
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {suffix && (
        <p className="text-xs text-slate-400 mt-1">{suffix}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="compound"
        lang={lang}
        currency={currency}
        onLangChange={setLang}
        onCurrencyChange={setCurrency}
        showLocaleControls
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
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
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">{t.inputs}</h2>
            </div>
            <Field label={t.initial} value={initial} onChange={setInitial} />
            <Field label={t.monthly} value={monthly} onChange={setMonthly} />
            <Field
              label={t.rate}
              value={rate}
              onChange={setRate}
              suffix="%"
            />
            <Field
              label={t.years}
              value={years}
              onChange={setYears}
              suffix={t.yrs}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.finalBalance}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.finalBalance)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.totalContrib}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.totalContrib)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.totalInterest}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {formatMoney(result.totalInterest)}
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
                      <linearGradient id="compoundBal" x1="0" y1="0" x2="0" y2="1">
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
                        formatMoney(Number(value)),
                        name === "balance" ? t.balance : t.contributions,
                      ]}
                    />
                    <Legend
                      formatter={(value) =>
                        value === "balance" ? t.balance : t.contributions
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      name="balance"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      fill="url(#compoundBal)"
                    />
                    <Area
                      type="monotone"
                      dataKey="contributions"
                      name="contributions"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">{t.tipTitle}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{t.tipBody}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
