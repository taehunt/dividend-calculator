import type { PulseLang } from "@/lib/income-pulse";

const KEY = "yg-pulse:lastVisit";

export type PulseVisitSnapshot = {
  score: number;
  updatedAt: string;
};

export function readPulseVisit(): PulseVisitSnapshot | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw == null) return undefined;
    const parsed = JSON.parse(raw) as PulseVisitSnapshot;
    if (
      typeof parsed?.score !== "number" ||
      !Number.isFinite(parsed.score) ||
      typeof parsed?.updatedAt !== "string"
    ) {
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
}

export function writePulseVisit(score: number, updatedAt: string): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PulseVisitSnapshot = { score, updatedAt };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode
  }
}

/** Delta vs the score the visitor last saw (null if first visit or same snapshot). */
export function visitScoreDelta(
  currentScore: number | null | undefined,
  currentUpdatedAt: string,
  last?: PulseVisitSnapshot
): number | null {
  if (
    currentScore === null ||
    currentScore === undefined ||
    Number.isNaN(currentScore) ||
    !last
  ) {
    return null;
  }
  if (last.updatedAt === currentUpdatedAt) return null;
  return currentScore - last.score;
}

export function formatVisitDelta(delta: number, lang: PulseLang): string {
  if (delta === 0) {
    return lang === "ko"
      ? "마지막 방문 이후 변동 없음"
      : "Unchanged since your last visit";
  }
  const sign = delta > 0 ? "+" : "";
  return lang === "ko"
    ? `마지막 방문 대비 ${sign}${delta}`
    : `${sign}${delta} since your last visit`;
}
