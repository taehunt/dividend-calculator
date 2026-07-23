"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Flame,
  Sprout,
  Target,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import PulseHistoryChart from "@/components/PulseHistoryChart";
import { useLocale } from "@/components/LocaleProvider";
import {
  deltaTone,
  formatNumber,
  formatPct,
  formatScoreDelta,
  formatUpdatedAt,
  scoreDelta,
  scoreTone,
  type IncomePulse,
} from "@/lib/income-pulse";

type Props = {
  initialData: IncomePulse;
};

const ETF_NAME_KO: Record<string, string> = {
  SCHD: "슈왑 미국 배당 주식",
  VYM: "뱅가드 고배당",
  VIG: "뱅가드 배당성장",
  JEPI: "JP모건 주식 프리미엄 인컴",
  QYLD: "글로벌X 나스닥100 커버드콜",
  DIVO: "Amplify 강화 배당",
};

const copy = {
  en: {
    eyebrow: "Income Pulse",
    title: "Is dividend income attractive today?",
    subtitle:
      "A daily YieldGrower score that compares popular dividend ETF yields with Treasuries, inflation, and market stress — so you know why today’s income backdrop matters.",
    score: "Attractiveness Score",
    today: "Today",
    deltaBuilding: "Day-over-day change starts tomorrow",
    updated: "Updated",
    realYield: "Real Yield",
    realYieldSub: "10Y Treasury minus CPI YoY",
    curve: "Yield Curve",
    curveSub: "10Y − 2Y spread",
    inflation: "Inflation (CPI YoY)",
    vix: "Market Stress (VIX)",
    dgs10: "10Y Treasury",
    fed: "Fed Funds Rate",
    avgYield: "Avg Dividend ETF Yield",
    spread: "ETF Yield vs 10Y",
    board: "Dividend ETF Yield Board",
    boardSub:
      "Trailing twelve-month dividend yield ÷ latest price (delayed market data).",
    historyTitle: "Score history",
    historySub: "Daily Attractiveness Score — check back tomorrow to see the trend build.",
    historyEmpty:
      "History starts today. Come back tomorrow to see how the Attractiveness Score moves over time.",
    symbol: "Ticker",
    name: "Fund",
    price: "Price",
    yield: "Yield",
    sources: "Sources",
    sourcesBody:
      "Macro data from FRED (Federal Reserve Bank of St. Louis). ETF prices and dividends from Yahoo Finance delayed quotes.",
    disclaimer: "Disclaimer",
    ctaTitle: "Put today’s backdrop into a plan",
    goalTitle: "Dividend Income Goal",
    goalDesc: "Find the portfolio size needed for a monthly dividend target.",
    fireTitle: "FIRE Calculator",
    fireDesc: "Estimate when passive income can cover living expenses.",
    compoundTitle: "Compound Interest",
    compoundDesc: "Project how contributions grow under different return assumptions.",
    openCalc: "Open calculator",
  },
  ko: {
    eyebrow: "인컴 펄스",
    title: "오늘 배당 소득, 얼마나 매력적인가?",
    subtitle:
      "대표 배당 ETF 수익률을 국채·물가·시장 스트레스와 비교해 YieldGrower가 매일 가공한 점수입니다. 숫자만 나열하지 않고, 오늘 인컴 환경이 왜 중요한지 한눈에 보여줍니다.",
    score: "매력도 점수",
    today: "오늘",
    deltaBuilding: "전일 대비 변화는 내일부터 표시됩니다",
    updated: "업데이트",
    realYield: "실질금리",
    realYieldSub: "미국 10년물 − CPI 전년비",
    curve: "수익률 곡선",
    curveSub: "10년물 − 2년물 스프레드",
    inflation: "물가 (CPI 전년비)",
    vix: "시장 스트레스 (VIX)",
    dgs10: "미국 10년 국채",
    fed: "연준 기준금리",
    avgYield: "배당 ETF 평균 수익률",
    spread: "ETF 수익률 − 10년물",
    board: "배당 ETF 수익률 보드",
    boardSub:
      "최근 1년 배당 합계 ÷ 최신 가격으로 계산한 트레일링 수익률입니다. (지연 시세)",
    historyTitle: "점수 히스토리",
    historySub: "매일 갱신되는 매력도 점수입니다. 내일부터 추이가 쌓입니다.",
    historyEmpty:
      "히스토리는 오늘부터 쌓입니다. 내일 다시 오면 점수 변화를 그래프로 볼 수 있습니다.",
    symbol: "티커",
    name: "상품명",
    price: "가격",
    yield: "수익률",
    sources: "출처",
    sourcesBody:
      "거시지표: FRED (세인트루이스 연준). ETF 가격·배당: Yahoo Finance 지연 시세.",
    disclaimer: "면책",
    ctaTitle: "오늘 환경을 내 계획에 연결하기",
    goalTitle: "배당 목표 소득",
    goalDesc: "월 배당 목표를 위해 필요한 포트폴리오 규모를 계산합니다.",
    fireTitle: "FIRE 계산기",
    fireDesc: "수동 소득이 생활비를 넘는 시점을 추정합니다.",
    compoundTitle: "복리 계산기",
    compoundDesc: "적립금과 수익률 가정에 따른 자산 성장을 확인합니다.",
    openCalc: "계산기 열기",
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
  const { lang } = useLocale();
  const data = initialData;
  const t = copy[lang];
  const regimeLabel =
    lang === "ko" ? data.curveRegime.label_ko : data.curveRegime.label_en;
  const delta = scoreDelta(data.history);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="pulse"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3">
            <Activity className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-2">
                {t.today} · {t.score}
              </p>
              <p
                className={`text-6xl font-extrabold tracking-tight ${scoreTone(data.score)}`}
              >
                {data.score ?? "—"}
              </p>
              <p className="text-lg font-semibold text-slate-700 mt-1">
                {data.scoreLabel[lang]}
              </p>
              <p className={`text-sm font-semibold mt-2 ${deltaTone(delta)}`}>
                {delta === null
                  ? t.deltaBuilding
                  : formatScoreDelta(delta, lang)}
              </p>
            </div>
            <div className="md:max-w-xl">
              <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
                {data.brief[lang]}
              </p>
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
          <Card
            label={t.curve}
            value={regimeLabel}
            sub={`${t.curveSub}: ${formatPct(data.rates.t10y2y?.value)}`}
          />
          <Card
            label={t.inflation}
            value={formatPct(data.rates.cpi_yoy?.value)}
          />
          <Card label={t.vix} value={formatNumber(data.rates.vix?.value, 1)} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card label={t.dgs10} value={formatPct(data.rates.dgs10?.value)} />
          <Card label={t.fed} value={formatPct(data.rates.fed_funds?.value)} />
          <Card label={t.avgYield} value={formatPct(data.avgEtfYield)} />
          <Card label={t.spread} value={formatPct(data.spreadVs10y)} />
        </div>

        <PulseHistoryChart
          history={data.history ?? []}
          lang={lang}
          title={t.historyTitle}
          subtitle={t.historySub}
          emptyHint={t.historyEmpty}
          scoreLabel={t.score}
        />

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
                  <td className="py-3 pr-3 font-bold text-indigo-600">
                    {etf.symbol}
                  </td>
                  <td className="py-3 pr-3 text-slate-700">
                    {lang === "ko" ? ETF_NAME_KO[etf.symbol] || etf.name : etf.name}
                  </td>
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

        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-sm text-slate-600 space-y-2 mb-10">
          <p>
            <span className="font-semibold text-slate-800">{t.sources}: </span>
            {t.sourcesBody}
          </p>
          <p>
            <span className="font-semibold text-slate-800">{t.disclaimer}: </span>
            {data.disclaimer[lang]}
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">{t.ctaTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/goal"
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <Target className="w-5 h-5 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">{t.goalTitle}</h3>
              <p className="text-sm text-slate-600 mb-3">{t.goalDesc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                {t.openCalc} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/fire"
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <Flame className="w-5 h-5 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">{t.fireTitle}</h3>
              <p className="text-sm text-slate-600 mb-3">{t.fireDesc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                {t.openCalc} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/compound"
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <Sprout className="w-5 h-5 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">{t.compoundTitle}</h3>
              <p className="text-sm text-slate-600 mb-3">{t.compoundDesc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                {t.openCalc} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
