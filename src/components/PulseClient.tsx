"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import {
  formatNumber,
  formatPct,
  formatUpdatedAt,
  scoreTone,
  type IncomePulse,
  type PulseLang,
} from "@/lib/income-pulse";

type Props = {
  initialData: IncomePulse;
};

const copy = {
  en: {
    score: "YG Attractiveness Score",
    updated: "Updated",
    realYield: "Real Yield",
    realYieldSub: "10Y − CPI YoY",
    curve: "Yield Curve",
    inflation: "CPI YoY",
    vix: "VIX",
    dgs10: "10Y Treasury",
    fed: "Fed Funds",
    avgYield: "Avg ETF Yield",
    spread: "Spread vs 10Y",
    board: "Dividend ETF Yield Board",
    boardSub: "Trailing yields for popular income ETFs (delayed)",
    symbol: "Symbol",
    name: "Name",
    price: "Price",
    yield: "Yield",
    sources: "Sources",
    disclaimer: "Disclaimer",
  },
  ko: {
    score: "YG 매력도 점수",
    updated: "업데이트",
    realYield: "실질금리",
    realYieldSub: "10년물 − CPI 전년비",
    curve: "수익률 곡선",
    inflation: "CPI 전년비",
    vix: "VIX",
    dgs10: "미국 10년물",
    fed: "기준금리",
    avgYield: "ETF 평균 수익률",
    spread: "10년물 대비 스프레드",
    board: "배당 ETF 수익률 보드",
    boardSub: "대표 인컴 ETF의 트레일링 수익률 (지연 시세)",
    symbol: "티커",
    name: "이름",
    price: "가격",
    yield: "수익률",
    sources: "출처",
    disclaimer: "면책",
  },
};

function Card({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function PulseClient({ initialData }: Props) {
  const [lang, setLang] = useState<PulseLang>("en");
  const data = initialData;
  const t = copy[lang];
  const regimeLabel =
    lang === "ko" ? data.curveRegime.label_ko : data.curveRegime.label_en;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
          <Globe className="w-4 h-4 text-slate-400" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as PulseLang)}
            className="text-sm bg-transparent text-slate-700 focus:outline-none font-medium cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-2">{t.score}</p>
            <p className={`text-6xl font-extrabold tracking-tight ${scoreTone(data.score)}`}>
              {data.score ?? "—"}
            </p>
            <p className="text-lg font-semibold text-slate-700 mt-1">
              {data.scoreLabel[lang]}
            </p>
          </div>
          <div className="md:max-w-xl">
            <p className="text-slate-700 leading-relaxed">{data.brief[lang]}</p>
            <p className="text-xs text-slate-400 mt-3">
              {t.updated}: {formatUpdatedAt(data.updatedAt, lang)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card
          label={t.realYield}
          value={formatPct(data.rates.real_yield?.value)}
          sub={t.realYieldSub}
        />
        <Card label={t.curve} value={regimeLabel} sub={formatPct(data.rates.t10y2y?.value)} />
        <Card label={t.inflation} value={formatPct(data.rates.cpi_yoy?.value)} />
        <Card label={t.vix} value={formatNumber(data.rates.vix?.value, 1)} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card label={t.dgs10} value={formatPct(data.rates.dgs10?.value)} />
        <Card label={t.fed} value={formatPct(data.rates.fed_funds?.value)} />
        <Card label={t.avgYield} value={formatPct(data.avgEtfYield)} />
        <Card label={t.spread} value={formatPct(data.spreadVs10y)} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-slate-900">{t.board}</h2>
        <p className="text-sm text-slate-500 mt-1 mb-5">{t.boardSub}</p>
        <table className="w-full text-sm text-left min-w-[560px]">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="py-2 pr-3 font-semibold">{t.symbol}</th>
              <th className="py-2 pr-3 font-semibold">{t.name}</th>
              <th className="py-2 pr-3 font-semibold text-right">{t.price}</th>
              <th className="py-2 font-semibold text-right">{t.yield}</th>
            </tr>
          </thead>
          <tbody>
            {data.etfs.map((etf) => (
              <tr key={etf.symbol} className="border-b border-slate-50">
                <td className="py-3 pr-3 font-bold text-indigo-600">{etf.symbol}</td>
                <td className="py-3 pr-3 text-slate-700">{etf.name}</td>
                <td className="py-3 pr-3 text-right text-slate-800">
                  {etf.price != null ? `$${etf.price.toFixed(2)}` : "—"}
                </td>
                <td className="py-3 text-right font-semibold text-slate-900">
                  {formatPct(etf.yield)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-sm text-slate-600 space-y-2">
        <p>
          <span className="font-semibold text-slate-800">{t.sources}: </span>
          {data.sources.macro}; {data.sources.etf}
        </p>
        <p>
          <span className="font-semibold text-slate-800">{t.disclaimer}: </span>
          {data.disclaimer[lang]}
        </p>
      </div>
    </div>
  );
}
