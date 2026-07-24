"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import CalculatorFaq from "@/components/CalculatorFaq";
import RelatedTools from "@/components/RelatedTools";
import { useLocale } from "@/components/LocaleProvider";
import DraftNumberInput from "@/components/DraftNumberInput";
import { convertMoney, toDisplayMoney, type MoneyCurrency } from "@/lib/money";
import {
  calcStorageKey,
  readStoredJson,
  writeStoredJson,
} from "@/lib/calculator-storage";

type Purchase = {
  id: number;
  shares: number;
  price: number;
};

type StoredAverage = {
  purchases: { id: number; shares: number; priceUsd: number }[];
  currentPriceUsd: number;
};

const copy = {
  en: {
    title: "Average Cost Calculator",
    subtitle:
      "Calculate your cost basis after averaging down or averaging up across multiple buys.",
    inputs: "Purchases",
    shares: "Shares",
    price: "Price / Share",
    add: "Add Purchase",
    totalShares: "Total Shares",
    totalCost: "Total Cost",
    avgCost: "Average Cost",
    currentPrice: "Current Market Price (optional)",
    marketValue: "Market Value",
    pnl: "Unrealized P/L",
    tipTitle: "How averaging works",
    tipBody:
      "Average cost = total money spent ÷ total shares owned. Adding lower-priced buys reduces your average cost basis. This tool is useful for dividend and growth investors tracking DCA or average-down strategies.",
  },
  ko: {
    title: "평단가(물타기) 계산기",
    subtitle:
      "여러 번 매수한 뒤 평균 단가(물타기/불타기)를 계산합니다.",
    inputs: "매수 내역",
    shares: "수량",
    price: "매수가",
    add: "매수 추가",
    totalShares: "총 수량",
    totalCost: "총 매수금액",
    avgCost: "평균 단가",
    currentPrice: "현재가 (선택)",
    marketValue: "평가금액",
    pnl: "평가손익",
    tipTitle: "평단가 계산 방식",
    tipBody:
      "평균 단가 = 총 매수금액 ÷ 총 수량입니다. 더 낮은 가격에 추가 매수하면 평단이 내려갑니다. 배당·성장 투자자의 물타기/적립식 매수 추적에 유용합니다.",
  },
};

export default function AverageCalculatorPage() {
  const { lang, currency, ready } = useLocale();
  const [purchases, setPurchases] = useState<Purchase[]>(() => [
    { id: 1, shares: 10, price: toDisplayMoney(100, currency) },
    { id: 2, shares: 20, price: toDisplayMoney(80, currency) },
  ]);
  const [currentPrice, setCurrentPrice] = useState(() =>
    toDisplayMoney(90, currency)
  );
  const prevCurrency = useRef<MoneyCurrency>(currency);
  const hydrated = useRef(false);

  useEffect(() => {
    if (!ready || hydrated.current) return;
    const stored = readStoredJson<StoredAverage>(
      calcStorageKey("average", "draft")
    );
    if (stored?.purchases?.length) {
      setPurchases(
        stored.purchases.map((p) => ({
          id: p.id,
          shares: p.shares,
          price: toDisplayMoney(p.priceUsd, currency),
        }))
      );
      if (typeof stored.currentPriceUsd === "number") {
        setCurrentPrice(toDisplayMoney(stored.currentPriceUsd, currency));
      }
      prevCurrency.current = currency;
    }
    hydrated.current = true;
  }, [ready, currency]);

  useEffect(() => {
    if (prevCurrency.current === currency) return;
    const from = prevCurrency.current;
    setPurchases((prev) =>
      prev.map((p) => ({
        ...p,
        price: convertMoney(p.price, from, currency),
      }))
    );
    setCurrentPrice((v) => convertMoney(v, from, currency));
    prevCurrency.current = currency;
  }, [currency]);

  useEffect(() => {
    if (!ready || !hydrated.current) return;
    const payload: StoredAverage = {
      purchases: purchases.map((p) => ({
        id: p.id,
        shares: p.shares,
        priceUsd: convertMoney(p.price, currency, "USD"),
      })),
      currentPriceUsd: convertMoney(currentPrice, currency, "USD"),
    };
    writeStoredJson(calcStorageKey("average", "draft"), payload);
  }, [ready, purchases, currentPrice, currency]);

  const t = copy[lang];

  const result = useMemo(() => {
    const totalShares = purchases.reduce((sum, p) => sum + (p.shares || 0), 0);
    const totalCost = purchases.reduce(
      (sum, p) => sum + (p.shares || 0) * (p.price || 0),
      0
    );
    const avgCost = totalShares > 0 ? totalCost / totalShares : 0;
    const marketValue = totalShares * (currentPrice || 0);
    const pnl = marketValue - totalCost;
    return { totalShares, totalCost, avgCost, marketValue, pnl };
  }, [purchases, currentPrice]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  const updatePurchase = (id: number, key: "shares" | "price", value: number) => {
    setPurchases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
  };

  const addPurchase = () => {
    setPurchases((prev) => [
      ...prev,
      { id: Date.now(), shares: 0, price: 0 },
    ]);
  };

  const removePurchase = (id: number) => {
    setPurchases((prev) =>
      prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="average" showLocaleControls />

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
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">{t.inputs}</h2>
              </div>
              <button
                onClick={addPurchase}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4" /> {t.add}
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-[1fr_1fr_40px] gap-3 text-xs font-semibold text-slate-500 px-1">
                <span>{t.shares}</span>
                <span>{t.price}</span>
                <span />
              </div>
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[1fr_1fr_40px] gap-3 items-center"
                >
                  <DraftNumberInput
                    aria-label={t.shares}
                    value={p.shares}
                    onChange={(v) => updatePurchase(p.id, "shares", v)}
                  />
                  <DraftNumberInput
                    aria-label={t.price}
                    value={p.price}
                    onChange={(v) => updatePurchase(p.id, "price", v)}
                  />
                  <button
                    onClick={() => removePurchase(p.id)}
                    className="h-10 w-10 inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {t.currentPrice}
              </label>
              <DraftNumberInput
                aria-label={t.currentPrice}
                value={currentPrice}
                onChange={setCurrentPrice}
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">
                {t.totalShares}
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {result.totalShares.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">
                {t.totalCost}
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {formatMoney(result.totalCost)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">
                {t.avgCost}
              </p>
              <p className="text-3xl font-bold text-indigo-600">
                {formatMoney(result.avgCost)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">
                {t.marketValue}
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {formatMoney(result.marketValue)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">{t.pnl}</p>
              <p
                className={`text-3xl font-bold ${
                  result.pnl >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {formatMoney(result.pnl)}
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 mb-2">{t.tipTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.tipBody}</p>
            </div>
          </div>
        </div>

        <CalculatorFaq page="average" />
        <RelatedTools page="average" />
      </main>
    </div>
  );
}
