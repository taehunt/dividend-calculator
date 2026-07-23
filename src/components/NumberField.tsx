"use client";

import { useEffect, useState, type ElementType } from "react";

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  icon?: ElementType;
  min?: number;
  max?: number;
  step?: number | string;
};

/**
 * Stable controlled number field that keeps focus while typing
 * and allows temporary empty / partial values.
 */
export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  icon: Icon,
  min,
  max,
  step,
}: NumberFieldProps) {
  const [text, setText] = useState(() => String(value));

  useEffect(() => {
    const parsed = Number(text);
    if (text === "" || text === "-" || text === "." || text === "-.") return;
    if (Number.isFinite(parsed) && parsed === value) return;
    setText(String(value));
  }, [value, text]);

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={text}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const next = e.target.value;
            if (next !== "" && !/^-?\d*\.?\d*$/.test(next)) return;
            setText(next);
            if (next === "" || next === "-" || next === "." || next === "-.") {
              return;
            }
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
          className={`block w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            Icon ? "pl-11 pr-12" : "px-4 pr-12"
          }`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="text-slate-400 text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}
