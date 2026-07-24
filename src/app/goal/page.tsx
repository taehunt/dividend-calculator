"use client";

import { useMemo } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";
import { calcStorageKey } from "@/lib/calculator-storage";
import { Calculator, Target } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import NumberField from "@/components/NumberField";
import { useMoneyValue } from "@/hooks/useMoneyValue";
import PulseCallout from "@/components/PulseCallout";
import CalculatorFaq from "@/components/CalculatorFaq";
import RelatedTools from "@/components/RelatedTools";

const copy = {
  en: {
    title: "Dividend Income Goal Calculator",
    subtitle:
      "Find out how large your portfolio needs to be to earn a target monthly dividend income.",
    inputs: "Income Goal Inputs",
    monthlyGoal: "Desired Monthly Dividend",
    yieldRate: "Expected Dividend Yield",
    taxRate: "Tax Rate on Dividends",
    currentPortfolio: "Current Portfolio (optional)",
    requiredPortfolio: "Required Portfolio",
    annualGoal: "Annual Dividend Goal",
    afterTaxMonthly: "After-Tax Monthly Income",
    gap: "Funding Gap",
    tipTitle: "Turn income goals into a clear target",
    tipBody:
      "Required portfolio = annual after-tax income goal ÷ net yield. Raising yield assumptions lowers the required capital, but higher yields can be less durable. Compare scenarios before changing your plan.",
  },
  ko: {
    title: "배당 목표 소득 계산기",
    subtitle:
      "원하는 월 배당을 받기 위해 필요한 포트폴리오 규모를 계산합니다.",
    inputs: "목표 입력값",
    monthlyGoal: "목표 월 배당",
    yieldRate: "예상 배당 수익률",
    taxRate: "배당 세율",
    currentPortfolio: "현재 자산 (선택)",
    requiredPortfolio: "필요 자산",
    annualGoal: "연간 배당 목표",
    afterTaxMonthly: "세후 월 배당",
    gap: "부족 금액",
    tipTitle: "소득 목표를 금액으로 바꾸기",
    tipBody:
      "필요 자산 = 세후 연간 배당 목표 ÷ 세후 수익률입니다. 수익률 가정을 높이면 필요 원금은 줄지만, 고배당은 지속성이 떨어질 수 있으니 여러 시나리오를 비교하세요.",
  },
};

export default function DividendGoalPage() {
  const { lang, currency } = useLocale();
  const [monthlyGoal, setMonthlyGoal] = useMoneyValue(
    3000,
    calcStorageKey("goal", "monthlyGoal"),
    { urlParam: "g" }
  );
  const [yieldRate, setYieldRate] = usePersistedState(
    calcStorageKey("goal", "yieldRate"),
    3.5,
    { urlParam: "y" }
  );
  const [taxRate, setTaxRate] = usePersistedState(
    calcStorageKey("goal", "taxRate"),
    15,
    { urlParam: "t" }
  );
  const [currentPortfolio, setCurrentPortfolio] = useMoneyValue(
    50000,
    calcStorageKey("goal", "currentPortfolio"),
    { urlParam: "p" }
  );

  const t = copy[lang];
  const moneySuffix = currency === "KRW" ? "원" : "USD";

  const result = useMemo(() => {
    const annualGrossGoal = monthlyGoal * 12;
    const netYield = (yieldRate / 100) * (1 - taxRate / 100);
    const requiredPortfolio =
      netYield > 0 ? annualGrossGoal / (yieldRate / 100) : 0;
    // requiredPortfolio above is pre-tax yield based on gross dividends.
    // For after-tax monthly income target, increase capital to cover tax.
    const requiredForAfterTax =
      netYield > 0 ? (monthlyGoal * 12) / netYield : 0;
    const afterTaxMonthly = monthlyGoal; // user enters desired take-home monthly
    const gap = Math.max(0, requiredForAfterTax - currentPortfolio);

    return {
      annualGoal: Math.round(annualGrossGoal),
      requiredPortfolio: Math.round(requiredForAfterTax),
      afterTaxMonthly: Math.round(afterTaxMonthly),
      gap: Math.round(gap),
      requiredGross: Math.round(requiredPortfolio),
    };
  }, [monthlyGoal, yieldRate, taxRate, currentPortfolio]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="goal"
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

        <PulseCallout variant="banner" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">{t.inputs}</h2>
            </div>
            <NumberField
              label={t.monthlyGoal}
              value={monthlyGoal}
              onChange={setMonthlyGoal}
              suffix={moneySuffix}
            />
            <NumberField
              label={t.yieldRate}
              value={yieldRate}
              onChange={setYieldRate}
              suffix="%"
            />
            <NumberField
              label={t.taxRate}
              value={taxRate}
              onChange={setTaxRate}
              suffix="%"
            />
            <NumberField
              label={t.currentPortfolio}
              value={currentPortfolio}
              onChange={setCurrentPortfolio}
              suffix={moneySuffix}
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4" /> {t.requiredPortfolio}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {formatMoney(result.requiredPortfolio)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.annualGoal}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.annualGoal)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.afterTaxMonthly}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.afterTaxMonthly)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">{t.gap}</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatMoney(result.gap)}
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">{t.tipTitle}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{t.tipBody}</p>
            </div>
          </div>
        </div>

        <CalculatorFaq page="goal" />
        <RelatedTools page="goal" />
      </main>
    </div>
  );
}
