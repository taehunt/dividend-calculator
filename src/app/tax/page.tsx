"use client";

import { useMemo, useState } from "react";
import { Calculator, Percent } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  en: {
    title: "Dividend Tax Calculator",
    subtitle:
      "Estimate net dividend income after tax and see how tax drag affects reinvestment.",
    inputs: "Dividend Inputs",
    portfolioValue: "Portfolio Value",
    dividendYield: "Dividend Yield",
    taxRate: "Dividend Tax Rate",
    reinvest: "Reinvest After Tax",
    years: "Years to Project",
    yrs: "Yrs",
    grossIncome: "Gross Annual Dividend",
    taxAmount: "Estimated Tax",
    netIncome: "Net Annual Dividend",
    monthlyNet: "Net Monthly Dividend",
    afterYears: "Net Value if Reinvested",
    tipTitle: "Why after-tax yield matters",
    tipBody:
      "Headline yield is not take-home yield. Tax reduces the cash available for spending or DRIP reinvestment. Use this calculator to compare net income before adjusting your portfolio.",
  },
  ko: {
    title: "배당세 계산기",
    subtitle:
      "세후 배당 소득을 계산하고, 세금이 재투자에 미치는 영향을 확인합니다.",
    inputs: "배당 입력값",
    portfolioValue: "포트폴리오 평가액",
    dividendYield: "배당 수익률",
    taxRate: "배당 세율",
    reinvest: "세후 재투자",
    years: "재투자 기간",
    yrs: "년",
    grossIncome: "세전 연 배당",
    taxAmount: "예상 세금",
    netIncome: "세후 연 배당",
    monthlyNet: "세후 월 배당",
    afterYears: "재투자 시 세후 자산 증가분",
    tipTitle: "세후 수익률이 중요한 이유",
    tipBody:
      "표기 배당률은 실수령액이 아닙니다. 세금만큼 소비·재투자 가능 금액이 줄어듭니다. 포트폴리오를 조정하기 전에 세후 소득을 먼저 비교해 보세요.",
  },
};

export default function DividendTaxPage() {
  const { lang, currency } = useLocale();
  const [portfolioValue, setPortfolioValue] = useState(100000);
  const [dividendYield, setDividendYield] = useState(3.5);
  const [taxRate, setTaxRate] = useState(15);
  const [years, setYears] = useState(10);

  const t = copy[lang];

  const result = useMemo(() => {
    const gross = portfolioValue * (dividendYield / 100);
    const tax = gross * (taxRate / 100);
    const net = gross - tax;
    const monthlyNet = net / 12;

    // Approximate future value of reinvested after-tax dividends (no price growth).
    const annualNetYield = dividendYield * (1 - taxRate / 100) / 100;
    let value = portfolioValue;
    for (let y = 0; y < years; y++) {
      value *= 1 + annualNetYield;
    }
    const reinvestGain = value - portfolioValue;

    return {
      gross: Math.round(gross),
      tax: Math.round(tax),
      net: Math.round(net),
      monthlyNet: Math.round(monthlyNet),
      reinvestGain: Math.round(reinvestGain),
    };
  }, [portfolioValue, dividendYield, taxRate, years]);

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
        active="tax"
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
              label={t.portfolioValue}
              value={portfolioValue}
              onChange={setPortfolioValue}
            />
            <Field
              label={t.dividendYield}
              value={dividendYield}
              onChange={setDividendYield}
              suffix="%"
            />
            <Field
              label={t.taxRate}
              value={taxRate}
              onChange={setTaxRate}
              suffix="%"
            />
            <Field
              label={t.years}
              value={years}
              onChange={setYears}
              suffix={t.yrs}
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.grossIncome}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.gross)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Percent className="w-4 h-4" /> {t.taxAmount}
                </p>
                <p className="text-3xl font-bold text-red-500">
                  {formatMoney(result.tax)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.netIncome}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {formatMoney(result.net)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.monthlyNet}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.monthlyNet)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">
                {t.afterYears} ({years}
                {lang === "ko" ? "년" : " yrs"})
              </p>
              <p className="text-3xl font-bold text-emerald-600">
                {formatMoney(result.reinvestGain)}
              </p>
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
