"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  "aria-label"?: string;
};

/** Compact number input for tables/rows — keeps focus while typing. */
export default function DraftNumberInput({
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? String(value);

  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      value={text}
      onChange={(e) => {
        const next = e.target.value;
        if (next !== "" && !/^-?\d*\.?\d*$/.test(next)) return;
        setDraft(next);
        if (next === "" || next === "-" || next === "." || next === "-.") return;
        const num = Number(next);
        if (Number.isFinite(num)) onChange(num);
      }}
      onBlur={() => {
        if (text === "" || text === "-" || text === "." || text === "-.") {
          setDraft(null);
          return;
        }
        const num = Number(text);
        if (!Number.isFinite(num)) {
          setDraft(null);
          return;
        }
        onChange(num);
        setDraft(null);
      }}
      className={
        className ||
        "w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      }
    />
  );
}
