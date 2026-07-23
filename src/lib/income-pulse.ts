export type PulseLang = "en" | "ko";

export type RatePoint = {
  value: number | null;
  date: string | null;
  unit: string;
};

export type PulseEtf = {
  symbol: string;
  name: string;
  price: number | null;
  yield: number | null;
  currency: string;
  ok: boolean;
};

export type PulseHistoryPoint = {
  date: string;
  score: number | null;
  avgEtfYield?: number | null;
  spreadVs10y?: number | null;
  dgs10?: number | null;
  realYield?: number | null;
};

export type IncomePulse = {
  version: number;
  updatedAt: string;
  score: number | null;
  scoreLabel: { en: string; ko: string };
  brief: { en: string; ko: string };
  avgEtfYield: number | null;
  spreadVs10y: number | null;
  curveRegime: {
    id: string;
    label_en: string;
    label_ko: string;
  };
  rates: {
    dgs10: RatePoint;
    dgs2: RatePoint;
    t10y2y: RatePoint;
    fed_funds: RatePoint;
    cpi_yoy: RatePoint;
    vix: RatePoint;
    real_yield: RatePoint;
  };
  etfs: PulseEtf[];
  history?: PulseHistoryPoint[];
  sources: { macro: string; etf: string };
  disclaimer: { en: string; ko: string };
  errors?: string[];
};

export function formatPct(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

export function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

export function formatUpdatedAt(iso: string, lang: PulseLang): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(d) + " UTC";
  } catch {
    return iso;
  }
}

export function scoreTone(score: number | null): string {
  if (score === null) return "text-slate-500";
  if (score >= 70) return "text-emerald-600";
  if (score >= 45) return "text-indigo-600";
  return "text-orange-600";
}

/** Score change vs previous history day (null if fewer than 2 scored days). */
export function scoreDelta(history?: PulseHistoryPoint[] | null): number | null {
  if (!history || history.length < 2) return null;
  const scored = history.filter(
    (h) => h.score !== null && h.score !== undefined && !Number.isNaN(h.score)
  );
  if (scored.length < 2) return null;
  const prev = scored[scored.length - 2].score as number;
  const curr = scored[scored.length - 1].score as number;
  return curr - prev;
}

export function formatScoreDelta(delta: number, lang: PulseLang): string {
  if (delta === 0) {
    return lang === "ko" ? "전일 대비 변동 없음" : "Unchanged vs yesterday";
  }
  const sign = delta > 0 ? "+" : "";
  return lang === "ko"
    ? `전일 대비 ${sign}${delta}`
    : `${sign}${delta} vs yesterday`;
}

export function deltaTone(delta: number | null): string {
  if (delta === null || delta === 0) return "text-slate-500";
  if (delta > 0) return "text-emerald-600";
  return "text-orange-600";
}

/** Recent scores for sparkline (oldest → newest). */
export function recentScores(
  history?: PulseHistoryPoint[] | null,
  limit = 14
): number[] {
  if (!history?.length) return [];
  return history
    .filter((h) => h.score != null && !Number.isNaN(h.score as number))
    .slice(-limit)
    .map((h) => h.score as number);
}
