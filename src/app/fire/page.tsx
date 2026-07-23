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
  Flame,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import NumberField from "@/components/NumberField";
import CurrencyIcon from "@/components/CurrencyIcon";
import { useMoneyValue } from "@/hooks/useMoneyValue";
import PulseCallout from "@/components/PulseCallout";
import CalculatorFaq from "@/components/CalculatorFaq";
import RelatedTools from "@/components/RelatedTools";

type TargetMode = "auto" | "manual";

/** Hard safety cap — projection stops at FIRE or this year. */
const MAX_PROJECTION_YEARS = 80;

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
    fireNumber: "FIRE Target",
    yearsToFire: "Years to FIRE",
    monthlyIncome: "Passive Income at FIRE",
    portfolioAtFire: "Portfolio at FIRE",
    chartTitle: "Path to Financial Independence",
    chartSub: "Portfolio value vs. your FIRE target over time",
    portfolio: "Portfolio",
    fireTarget: "FIRE Target",
    reached: "FIRE reached",
    notReached: "Not reachable with these inputs",
    invalidSwr: "Enter a withdrawal rate above 0%",
    invalidTarget: "Enter a FIRE target above 0",
    targetMode: "How to set your FIRE target",
    modeAuto: "Calculate from expenses",
    modeManual: "Enter target myself",
    customTarget: "FIRE Target Amount",
    autoHint: "Target = annual expenses ÷ safe withdrawal rate",
    tipTitle: "How this calculator works",
    tipBody:
      "Choose automatic target (expenses ÷ withdrawal rate) or type your own FIRE number. The chart projects contributions and growth until your portfolio crosses that target.",
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
    fireNumber: "FIRE 목표 금액",
    yearsToFire: "FIRE까지 기간",
    monthlyIncome: "FIRE 시점 월 수동소득",
    portfolioAtFire: "FIRE 시점 자산",
    chartTitle: "경제적 자유까지 경로",
    chartSub: "시간에 따른 자산과 FIRE 목표선",
    portfolio: "자산",
    fireTarget: "FIRE 목표",
    reached: "FIRE 도달",
    notReached: "현재 입력값으로는 도달하기 어려움",
    invalidSwr: "안전 인출률은 0%보다 커야 합니다",
    invalidTarget: "FIRE 목표 금액은 0보다 커야 합니다",
    targetMode: "FIRE 목표 설정 방식",
    modeAuto: "생활비로 자동 계산",
    modeManual: "목표 금액 직접 입력",
    customTarget: "FIRE 목표 금액",
    autoHint: "목표 = 연간 생활비 ÷ 안전 인출률",
    tipTitle: "계산 방식",
    tipBody:
      "생활비÷인출률로 목표를 자동 계산하거나, 원하는 FIRE 목표 금액을 직접 입력할 수 있습니다. 월 저축과 복리로 그 목표에 도달하는 시점을 찾습니다.",
  },
};

export default function FireCalculatorPage() {
  const { lang, currency } = useLocale();
  const [currentSavings, setCurrentSavings] = useMoneyValue(100000);
  const [monthlyContribution, setMonthlyContribution] = useMoneyValue(2000);
  const [annualExpenses, setAnnualExpenses] = useMoneyValue(40000);
  const [customTarget, setCustomTarget] = useMoneyValue(1_000_000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [safeWithdraw, setSafeWithdraw] = useState(4);
  const [targetMode, setTargetMode] = useState<TargetMode>("auto");

  const t = copy[lang];
  const moneySuffix = currency === "KRW" ? "원" : "USD";

  const calculatedTarget =
    safeWithdraw > 0 ? annualExpenses / (safeWithdraw / 100) : null;

  const result = useMemo(() => {
    const swrValid = safeWithdraw > 0;
    let fireNumber: number | null = null;

    if (targetMode === "manual") {
      fireNumber = customTarget > 0 ? customTarget : null;
    } else if (swrValid) {
      fireNumber = annualExpenses / (safeWithdraw / 100);
    }

    const targetValid =
      fireNumber !== null && Number.isFinite(fireNumber) && fireNumber > 0;

    let balance = currentSavings;
    const monthlyRate = expectedReturn / 100 / 12;
    const rows: {
      year: number;
      portfolio: number;
      fireTarget: number | null;
    }[] = [];
    let yearsToFire: number | null = null;
    let portfolioAtFire = currentSavings;

    for (let year = 1; year <= MAX_PROJECTION_YEARS; year++) {
      for (let month = 0; month < 12; month++) {
        balance += monthlyContribution;
        balance *= 1 + monthlyRate;
      }

      const rounded = Math.round(balance);
      rows.push({
        year,
        portfolio: rounded,
        fireTarget: targetValid ? Math.round(fireNumber!) : null,
      });

      if (targetValid && yearsToFire === null && balance >= fireNumber!) {
        yearsToFire = year;
        portfolioAtFire = rounded;
        break; // stop at FIRE — no need for a user-set max horizon
      }
    }

    // Passive income estimate at FIRE
    let monthlyIncome = Math.round((annualExpenses || 0) / 12);
    if (targetMode === "manual" && targetValid && swrValid) {
      monthlyIncome = Math.round((fireNumber! * (safeWithdraw / 100)) / 12);
    }

    return {
      fireNumber: targetValid ? Math.round(fireNumber!) : null,
      yearsToFire,
      portfolioAtFire:
        yearsToFire === null
          ? Math.round(rows[rows.length - 1]?.portfolio || currentSavings)
          : portfolioAtFire,
      monthlyIncome,
      rows,
      targetValid,
      invalidReason:
        targetMode === "auto" && !swrValid
          ? ("swr" as const)
          : targetMode === "manual" && !(customTarget > 0)
            ? ("target" as const)
            : null,
    };
  }, [
    annualExpenses,
    currentSavings,
    customTarget,
    expectedReturn,
    monthlyContribution,
    safeWithdraw,
    targetMode,
  ]);

  const formatCurrency = (value: number) => {
    if (!Number.isFinite(value)) return "—";
    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatAxis = (value: number) => {
    if (!Number.isFinite(value)) return "—";
    if (currency === "USD") {
      if (Math.abs(value) >= 1_000_000)
        return `$${(value / 1_000_000).toFixed(1)}M`;
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (Math.abs(value) >= 100_000_000)
      return `₩${(value / 100_000_000).toFixed(1)}억`;
    return `₩${(value / 10_000).toFixed(0)}만`;
  };

  const selectMode = (mode: TargetMode) => {
    if (mode === "manual" && calculatedTarget !== null && Number.isFinite(calculatedTarget)) {
      setCustomTarget(Math.round(calculatedTarget));
    }
    if (mode === "auto" && customTarget > 0 && safeWithdraw > 0) {
      // optional: leave expenses as-is; user may have set custom independently
    }
    setTargetMode(mode);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="fire" showLocaleControls />

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

        <PulseCallout variant="banner" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">{t.inputs}</h2>
            </div>

            <div>
              <p className="block text-sm font-semibold text-slate-700 mb-2">
                {t.targetMode}
              </p>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => selectMode("auto")}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    targetMode === "auto"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.modeAuto}
                </button>
                <button
                  type="button"
                  onClick={() => selectMode("manual")}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    targetMode === "manual"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.modeManual}
                </button>
              </div>
            </div>

            <NumberField
              label={t.currentSavings}
              icon={CurrencyIcon}
              value={currentSavings}
              onChange={setCurrentSavings}
              suffix={moneySuffix}
            />
            <NumberField
              label={t.monthlyContribution}
              icon={CurrencyIcon}
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              suffix={moneySuffix}
            />

            {targetMode === "manual" ? (
              <NumberField
                label={t.customTarget}
                icon={CurrencyIcon}
                value={customTarget}
                onChange={setCustomTarget}
                suffix={moneySuffix}
              />
            ) : (
              <>
                <NumberField
                  label={t.annualExpenses}
                  icon={CurrencyIcon}
                  value={annualExpenses}
                  onChange={setAnnualExpenses}
                  suffix={moneySuffix}
                />
                <p className="text-xs text-slate-400 -mt-3">{t.autoHint}</p>
              </>
            )}

            <NumberField
              label={t.expectedReturn}
              icon={TrendingUp}
              value={expectedReturn}
              onChange={setExpectedReturn}
              suffix="%"
            />
            <NumberField
              label={t.safeWithdraw}
              icon={TrendingUp}
              value={safeWithdraw}
              onChange={(v) => setSafeWithdraw(Math.max(0, v))}
              suffix="%"
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.fireNumber}
                </p>
                <p
                  className={`font-bold text-slate-900 ${
                    result.fireNumber === null
                      ? "text-base leading-snug"
                      : "text-3xl"
                  }`}
                >
                  {result.fireNumber === null
                    ? result.invalidReason === "swr"
                      ? t.invalidSwr
                      : t.invalidTarget
                    : formatCurrency(result.fireNumber)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.yearsToFire}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {!result.targetValid
                    ? "—"
                    : result.yearsToFire === null
                      ? t.notReached
                      : `${result.yearsToFire}${lang === "ko" ? "년" : " yrs"}`}
                </p>
                {result.yearsToFire !== null && (
                  <p className="text-xs text-emerald-600 mt-1 font-medium">
                    {t.reached}
                  </p>
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
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.portfolioAtFire}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(result.portfolioAtFire)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">{t.chartTitle}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">{t.chartSub}</p>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.rows}>
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
                      tickFormatter={formatAxis}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => [
                        value == null || !Number.isFinite(Number(value))
                          ? "—"
                          : formatCurrency(Number(value)),
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
                      fillOpacity={0.15}
                      fill="#4f46e5"
                      strokeWidth={3}
                    />
                    {result.targetValid && (
                      <Area
                        type="monotone"
                        dataKey="fireTarget"
                        name="fireTarget"
                        stroke="#f97316"
                        fillOpacity={0}
                        strokeWidth={2}
                        strokeDasharray="6 4"
                      />
                    )}
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

        <CalculatorFaq page="fire" />
        <RelatedTools page="fire" />
      </main>
    </div>
  );
}
