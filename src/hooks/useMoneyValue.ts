"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { convertMoney, toDisplayMoney, type MoneyCurrency } from "@/lib/money";
import { readStoredJson, writeStoredJson } from "@/lib/calculator-storage";
import {
  formatUrlNumber,
  readUrlNumber,
  writeUrlParam,
} from "@/lib/calculator-url";

type MoneyOptions = {
  /** Short query key; value is always USD in the URL. */
  urlParam?: string;
};

/**
 * Money input that stays in the active currency.
 * Pass the USD baseline default; KRW is derived automatically.
 * Optional storageKey persists the USD amount in localStorage.
 * Optional urlParam makes the scenario shareable via the address bar.
 */
export function useMoneyValue(
  usdDefault: number,
  storageKey?: string,
  options?: MoneyOptions
) {
  const { currency, ready } = useLocale();
  const [value, setValue] = useState(() =>
    toDisplayMoney(usdDefault, currency)
  );
  const prevCurrency = useRef<MoneyCurrency>(currency);
  const hydrated = useRef(!storageKey && !options?.urlParam);
  const urlParam = options?.urlParam;

  useEffect(() => {
    if ((!storageKey && !urlParam) || !ready || hydrated.current) return;

    if (urlParam) {
      const fromUrl = readUrlNumber(urlParam);
      if (fromUrl !== undefined) {
        setValue(toDisplayMoney(fromUrl, currency));
        prevCurrency.current = currency;
        hydrated.current = true;
        return;
      }
    }

    if (storageKey) {
      const storedUsd = readStoredJson<number>(storageKey);
      if (typeof storedUsd === "number" && Number.isFinite(storedUsd)) {
        setValue(toDisplayMoney(storedUsd, currency));
        prevCurrency.current = currency;
      }
    }
    hydrated.current = true;
  }, [storageKey, urlParam, ready, currency]);

  useEffect(() => {
    if (prevCurrency.current === currency) return;
    setValue((v) => convertMoney(v, prevCurrency.current, currency));
    prevCurrency.current = currency;
  }, [currency]);

  useEffect(() => {
    if (!ready || !hydrated.current) return;
    const usd = convertMoney(value, currency, "USD");

    if (storageKey) {
      writeStoredJson(storageKey, usd);
    }
    if (urlParam) {
      writeUrlParam(urlParam, formatUrlNumber(usd));
    }
  }, [storageKey, urlParam, ready, value, currency]);

  return [value, setValue] as const;
}
