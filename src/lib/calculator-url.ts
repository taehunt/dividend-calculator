/**
 * Short query-param helpers for shareable calculator links.
 * Money amounts are always stored as USD (same as localStorage).
 */

export function readUrlParam(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = new URL(window.location.href).searchParams.get(key);
  return value == null || value === "" ? undefined : value;
}

export function readUrlNumber(key: string): number | undefined {
  const raw = readUrlParam(key);
  if (raw === undefined) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function readUrlBoolean(key: string): boolean | undefined {
  const raw = readUrlParam(key);
  if (raw === undefined) return undefined;
  if (raw === "1" || raw === "true") return true;
  if (raw === "0" || raw === "false") return false;
  return undefined;
}

export function writeUrlParam(key: string, value: string | null): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (value == null || value === "") {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;
  window.history.replaceState(null, "", next);
}

export function formatUrlNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  // Trim trailing zeros for cleaner share links.
  return String(Number(value.toFixed(4)));
}
