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
