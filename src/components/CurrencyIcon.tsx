"use client";

import { DollarSign } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  className?: string;
};

/** Dollar or won icon based on active currency. */
export default function CurrencyIcon({ className }: Props) {
  const { currency } = useLocale();

  if (currency === "KRW") {
    return (
      <span
        className={`inline-flex items-center justify-center text-[1.05rem] font-semibold leading-none ${className || ""}`}
        aria-hidden
      >
        ₩
      </span>
    );
  }

  return <DollarSign className={className} />;
}
