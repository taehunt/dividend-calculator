"use client";

import { useMemo } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";
import { calcStorageKey } from "@/lib/calculator-storage";
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
import { useLocale } from "@/components/LocaleProvider";
import NumberField from "@/components/NumberField";
import { useMoneyValue } from "@/hooks/useMoneyValue";
import PulseCallout from "@/components/PulseCallout";
import CalculatorFaq from "@/components/CalculatorFaq";
import RelatedTools from "@/components/RelatedTools";

const copy = {
  en: {
    title: "Inflation Calculator",
    subtitle:
      "See how inflation erodes purchasing power and what your money may be worth in the future.",
    inputs: "Inflation Inputs",
    amount: "Current Amount",
    rate: "Annual Inflation Rate",
    years: "Years",
    yrs: "Yrs",
    futureCost: "Future Cost of Same Basket",
    lostPower: "Purchasing Power Lost",
    realValue: "Real Value of Today's Money",
    chartTitle: "Purchasing Power Over Time",
    chartSub: "Nominal amount needed vs real value of a fixed sum",
    needed: "Amount Needed",
    real: "Real Value",
    tipTitle: "Why inflation matters for investors",
    tipBody:
      "If your investments grow slower than inflation, your real purchasing power shrinks. Pair this tool with the FIRE and compound calculators to plan in today's dollars and future dollars.",
  },
  ko: {
    title: "인플레이션 계산기",
    subtitle:
      "물가 상승이 구매력을 얼마나 깎는지, 같은 생활비가 미래에 얼마가 되는지 계산합니다.",
    inputs: "인플레이션 입력값",
    amount: "현재 금액",
    rate: "연 물가상승률",
    years: "기간",
    yrs: "년",
    futureCost: "동일 구매의 미래 비용",
    lostPower: "잃은 구매력",
    realValue: "현재 금액의 실질 가치",
    chartTitle: "시간에 따른 구매력",
    chartSub: "필요 명목 금액 vs 고정 금액의 실질 가치",
    needed: "필요 금액",
    real: "실질 가치",
    tipTitle: "투자자에게 물가가 중요한 이유",
    tipBody:
      "투자 수익률이 물가보다 낮으면 실질 구매력은 줄어듭니다. FIRE·복리 계산기와 함께 쓰면 현재 가치와 미래 가치를 같이 계획할 수 있습니다.",
  },
};

export default function InflationCalculatorPage() {
  const { lang, currency } = useLocale();
  const [amount, setAmount] = useMoneyValue(
    50000,
    calcStorageKey("inflation", "amount")
  );
  const [rate, setRate] = usePersistedState(
    calcStorageKey("inflation", "rate"),
    3
  );
  const [years, setYears] = usePersistedState(
    calcStorageKey("inflation", "years"),
    20
  );

  const t = copy[lang];
  const moneySuffix = currency === "KRW" ? "원" : "USD";

  const result = useMemo(() => {
    const rows: { year: number; needed: number; real: number }[] = [];
    for (let year = 0; year <= years; year++) {
      const needed = amount * Math.pow(1 + rate / 100, year);
      const real = amount / Math.pow(1 + rate / 100, year);
      rows.push({
        year,
        needed: Math.round(needed),
        real: Math.round(real),
      });
    }

    const futureCost = amount * Math.pow(1 + rate / 100, years);
    const realValue = amount / Math.pow(1 + rate / 100, years);

    return {
      futureCost: Math.round(futureCost),
      realValue: Math.round(realValue),
      lostPower: Math.round(amount - realValue),
      rows,
    };
  }, [amount, rate, years]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="inflation"
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
            <NumberField label={t.amount} value={amount} onChange={setAmount} suffix={moneySuffix} />
            <NumberField label={t.rate} value={rate} onChange={setRate} suffix="%" />
            <NumberField
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
                  {t.futureCost}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatMoney(result.futureCost)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.realValue}
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {formatMoney(result.realValue)}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">
                  {t.lostPower}
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatMoney(result.lostPower)}
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
                        name === "needed" ? t.needed : t.real,
                      ]}
                    />
                    <Legend
                      formatter={(value) =>
                        value === "needed" ? t.needed : t.real
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="needed"
                      name="needed"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={0.15}
                      fill="#f97316"
                    />
                    <Area
                      type="monotone"
                      dataKey="real"
                      name="real"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      fillOpacity={0.1}
                      fill="#4f46e5"
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

        <CalculatorFaq page="inflation" />
        <RelatedTools page="inflation" />
      </main>
    </div>
  );
}
