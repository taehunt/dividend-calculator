"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ko";
export type Currency = "USD" | "KRW";

type LocaleContextValue = {
  lang: Lang;
  currency: Currency;
  setLang: (lang: Lang) => void;
  setCurrency: (currency: Currency) => void;
  ready: boolean;
};

const STORAGE_KEY = "yg-locale";

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStored(): { lang: Lang; currency: Currency } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { lang?: string; currency?: string };
    const lang = parsed.lang === "ko" ? "ko" : "en";
    const currency = parsed.currency === "KRW" ? "KRW" : "USD";
    return { lang, currency };
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setLangState(stored.lang);
      setCurrencyState(stored.currency);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lang, currency })
      );
    } catch {
      // ignore quota / private mode
    }
  }, [lang, currency, ready]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
  }, []);

  const value = useMemo(
    () => ({ lang, currency, setLang, setCurrency, ready }),
    [lang, currency, setLang, setCurrency, ready]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
