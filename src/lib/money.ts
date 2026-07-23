export type MoneyCurrency = "USD" | "KRW";

/** Display conversion only — not a live FX rate. */
export const USD_KRW = 1400;

export function toDisplayMoney(usdAmount: number, currency: MoneyCurrency): number {
  if (currency === "KRW") return Math.round(usdAmount * USD_KRW);
  return usdAmount;
}

export function convertMoney(
  value: number,
  from: MoneyCurrency,
  to: MoneyCurrency
): number {
  if (from === to) return value;
  if (!Number.isFinite(value)) return 0;
  if (from === "USD" && to === "KRW") return Math.round(value * USD_KRW);
  return Math.round(value / USD_KRW);
}
