"use client";

import { useEffect, useState } from "react";

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
  const [text, setText] = useState(() => String(value));

  useEffect(() => {
    const parsed = Number(text);
    if (text === "" || text === "-" || text === "." || text === "-.") return;
    if (Number.isFinite(parsed) && parsed === value) return;
    setText(String(value));
  }, [value, text]);

  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      value={text}
      onChange={(e) => {
        const next = e.target.value;
        if (next !== "" && !/^-?\d*\.?\d*$/.test(next)) return;
        setText(next);
        if (next === "" || next === "-" || next === "." || next === "-.") return;
        const num = Number(next);
        if (Number.isFinite(num)) onChange(num);
      }}
      onBlur={() => {
        if (text === "" || text === "-" || text === "." || text === "-.") {
          setText(String(value));
          return;
        }
        const num = Number(text);
        if (!Number.isFinite(num)) {
          setText(String(value));
          return;
        }
        setText(String(num));
        onChange(num);
      }}
      className={
        className ||
        "w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      }
    />
  );
}
