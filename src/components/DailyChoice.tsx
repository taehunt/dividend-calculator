"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Check, Flame, RotateCcw } from "lucide-react";
import { dailyPrompt, getMoneyType, kstDateKey } from "@/lib/money-personality";

type DailyRecord = Record<string, number>;
const STORAGE_KEY = "money-grain:daily:v1";

function previousDateKey(key: string, days: number) {
  const date = new Date(`${key}T12:00:00+09:00`);
  date.setUTCDate(date.getUTCDate() - days);
  return kstDateKey(date);
}

export default function DailyChoice() {
  const dateKey = kstDateKey();
  const prompt = dailyPrompt();
  const [records, setRecords] = useState<DailyRecord>({});
  const [typeName, setTypeName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setRecords(JSON.parse(raw) as DailyRecord);
        const resultRaw = window.localStorage.getItem("money-grain:last-result:v1");
        if (resultRaw) {
          const result = JSON.parse(resultRaw) as { type?: string };
          if (result.type) setTypeName(getMoneyType(result.type)?.name ?? null);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const streak = useMemo(() => {
    let count = 0;
    for (let days = 0; days < 366; days += 1) {
      if (records[previousDateKey(dateKey, days)] === undefined) break;
      count += 1;
    }
    return count;
  }, [dateKey, records]);

  function answer(index: number) {
    const next = { ...records, [dateKey]: index };
    setRecords(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const selected = records[dateKey];

  if (!ready) return <div className="min-h-[420px] animate-pulse rounded-[2rem] bg-stone-100" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#edf4ef] px-4 py-2 text-sm font-black text-[#315c4c]">
          <CalendarCheck className="h-4 w-4" /> {dateKey.replaceAll("-", ".")}
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0e6] px-4 py-2 text-sm font-black text-[#a84c2d]">
          <Flame className="h-4 w-4" /> 연속 {streak}일
        </div>
      </div>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(71,55,40,0.08)] sm:p-10">
        <p className="text-sm font-black tracking-[0.14em] text-[#b65335]">TODAY&apos;S CHOICE</p>
        <h2 className="mt-5 text-2xl font-black leading-[1.45] tracking-[-0.04em] text-stone-950 sm:text-4xl">{prompt.question}</h2>

        <div className="mt-8 grid gap-4">
          {prompt.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => answer(index)}
              className={`flex min-h-16 items-center justify-between gap-4 rounded-2xl border p-5 text-left font-bold transition-colors ${
                selected === index
                  ? "border-[#1f473b] bg-[#edf4ef] text-[#17392f]"
                  : "border-stone-200 bg-[#fffdf8] text-stone-700 hover:border-[#d36b45]"
              }`}
            >
              {option}
              {selected === index && <Check className="h-5 w-5 shrink-0" />}
            </button>
          ))}
        </div>

        {selected !== undefined && (
          <div className="mt-7 rounded-2xl bg-stone-100 p-5">
            <p className="text-xs font-black tracking-[0.14em] text-stone-500">오늘의 기록</p>
            <p className="mt-2 text-base font-bold leading-7 text-stone-800">{prompt.reflection}</p>
            {typeName ? (
              <p className="mt-3 text-sm text-stone-600">이 선택은 {typeName}이라는 고정된 결과를 바꾸지 않습니다. 오늘의 상태를 따로 기록합니다.</p>
            ) : (
              <Link href="/test" className="mt-3 inline-block text-sm font-black text-[#315c4c] underline underline-offset-4">내 돈 성향도 확인하기</Link>
            )}
          </div>
        )}
      </section>

      {selected !== undefined && (
        <button type="button" onClick={() => {
          const next = { ...records };
          delete next[dateKey];
          setRecords(next);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }} className="mx-auto mt-5 flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-900">
          <RotateCcw className="h-4 w-4" /> 오늘 답 다시 고르기
        </button>
      )}
    </div>
  );
}
