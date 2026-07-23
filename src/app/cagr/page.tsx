"use client";

import { useMemo, useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

const copy = {
  en: {
    title: "CAGR Calculator",
    subtitle:
      "Calculate the compound annual growth rate between a starting and ending investment value.",
    inputs: "CAGR Inputs",
    startValue: "Starting Value",
    endValue: "Ending Value",
    years: "Number of Years",
    yrs: "Yrs",
    cagr: "CAGR",
    totalGain: "Total Gain / Loss",
    totalReturn: "Total Return",
    tipTitle: "What CAGR tells you",
    tipBody:
      "CAGR smooths returns into one annualized rate, making multi-year performance easier to compare. It assumes profits are reinvested and does not show volatility along the way.",
  },
  ko: {
    title: "CAGR 계산기",
    subtitle:
      "시작 금액과 종료 금액 사이의 연평균 복리 수익률(CAGR)을 계산합니다.",
    inputs: "CAGR 입력값",
    startValue: "시작 금액",
    endValue: "종료 금액",
    years: "기간",
    yrs: "년",
    cagr: "CAGR",
    totalGain: "총 손익",
    totalReturn: "총 수익률",
    tipTitle: "CAGR이 알려주는 것",
    tipBody:
      "CAGR은 여러 해의 성과를 하나의 연환산 수익률로 정리해 비교를 쉽게 만듭니다. 재투자를 가정하며, 중간 변동성은 보여주지 않습니다.",
  },
};

export default function CagrCalculatorPage() {
  const [lang, setLang] = useState<"en" | "ko">("en");
  const [currency, setCurrency] = useState<"USD" | "KRW">("USD");
  const [startValue, setStartValue] = useState(10000);
  const [endValue, setEndValue] = useState(25000);
  const [years, setYears] = useState(7);

  const t = copy[lang];

  const result = useMemo(() => {
    const safeYears = Math.max(years, 0.0001);
    const cagr =
      startValue > 0
        ? (Math.pow(endValue / startValue, 1 / safeYears) - 1) * 100
        : 0;
    const totalGain = endValue - startValue;
    const totalReturn =
      startValue > 0 ? ((endValue - startValue) / startValue) * 100 : 0;

    return {
      cagr,
      totalGain,
      totalReturn,
    };
  }, [startValue, endValue, years]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const formatPct = (value: number) =>
    `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

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
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="block w-full py-3 px-4 pr-12 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="cagr"
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
            <Field
              label={t.startValue}
              value={startValue}
              onChange={setStartValue}
            />
            <Field label={t.endValue} value={endValue} onChange={setEndValue} />
            <Field
              label={t.years}
              value={years}
              onChange={setYears}
              suffix={t.yrs}
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {t.cagr}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    result.cagr >= 0 ? "text-indigo-600" : "text-red-500"
                  }`}
                >
                  {formatPct(result.cagr)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.totalGain}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    result.totalGain >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {formatMoney(result.totalGain)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.totalReturn}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    result.totalReturn >= 0 ? "text-slate-900" : "text-red-500"
                  }`}
                >
                  {formatPct(result.totalReturn)}
                </p>
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
