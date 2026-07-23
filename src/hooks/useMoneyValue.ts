"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { convertMoney, toDisplayMoney, type MoneyCurrency } from "@/lib/money";

/**
 * Money input that stays in the active currency.
 * Pass the USD baseline default; KRW is derived automatically.
 */
export function useMoneyValue(usdDefault: number) {
  const { currency } = useLocale();
  const [value, setValue] = useState(() =>
    toDisplayMoney(usdDefault, currency)
  );
  const prevCurrency = useRef<MoneyCurrency>(currency);

  useEffect(() => {
    if (prevCurrency.current === currency) return;
    setValue((v) => convertMoney(v, prevCurrency.current, currency));
    prevCurrency.current = currency;
  }, [currency]);

  return [value, setValue] as const;
}
