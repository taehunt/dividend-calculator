"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarRange, CheckCircle2, Trash2 } from "lucide-react";
import { dailyPrompt, kstDateKey } from "@/lib/money-personality";

type DailyRecord = Record<string, number>;
const STORAGE_KEY = "money-grain:daily:v1";

function dateFromKey(key: string) {
  return new Date(`${key}T12:00:00+09:00`);
}

export default function WeeklyReview() {
  const [records, setRecords] = useState<DailyRecord>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setRecords(JSON.parse(raw) as DailyRecord);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const history = useMemo(() => Object.entries(records)
    .filter(([, answer]) => answer === 0 || answer === 1)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, answer]) => ({ date, answer, prompt: dailyPrompt(dateFromKey(date)) })), [records]);

  const recent = history.filter(({ date }) => {
    const elapsed = dateFromKey(kstDateKey()).getTime() - dateFromKey(date).getTime();
    return elapsed >= 0 && elapsed < 7 * 86_400_000;
  });
  const firstChoices = recent.filter(({ answer }) => answer === 0).length;
  const secondChoices = recent.length - firstChoices;

  function removeRecord(date: string) {
    const next = { ...records };
    delete next[date];
    setRecords(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  if (!ready) return <div className="min-h-[420px] animate-pulse rounded-[2rem] bg-stone-100" />;

  if (history.length === 0) {
    return (
      <section className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center sm:p-12">
        <CalendarRange className="mx-auto h-10 w-10 text-[#315c4c]" />
        <h2 className="mt-5 text-2xl font-black text-stone-950">아직 돌아볼 기록이 없습니다</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-600">오늘의 선택에 답하면 이 브라우저에 기록이 쌓입니다. 답을 평가하지 않고 최근 선택을 다시 읽을 수 있습니다.</p>
        <Link href="/daily" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1f473b] px-6 text-sm font-black text-white">오늘의 질문에 답하기</Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-3xl border border-stone-200 bg-white p-6">
          <p className="text-xs font-black tracking-[0.14em] text-stone-500">최근 7일 기록</p>
          <p className="mt-2 text-4xl font-black text-stone-950">{recent.length}<span className="ml-1 text-base text-stone-500">일</span></p>
        </article>
        <article className="rounded-3xl border border-[#cbd9ce] bg-[#edf4ef] p-6">
          <p className="text-xs font-black tracking-[0.14em] text-[#315c4c]">첫 번째 선택</p>
          <p className="mt-2 text-4xl font-black text-stone-950">{firstChoices}<span className="ml-1 text-base text-stone-500">회</span></p>
        </article>
        <article className="rounded-3xl border border-[#ead1c3] bg-[#fff4ec] p-6">
          <p className="text-xs font-black tracking-[0.14em] text-[#a34f32]">두 번째 선택</p>
          <p className="mt-2 text-4xl font-black text-stone-950">{secondChoices}<span className="ml-1 text-base text-stone-500">회</span></p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-stone-950">최근 선택 다시 읽기</h2>
        <p className="mt-2 text-sm leading-7 text-stone-600">두 선택 중 어느 쪽이 더 좋다는 뜻은 아닙니다. 당시 상황과 지금의 생각이 달라졌는지 살펴보세요.</p>
        <div className="mt-6 divide-y divide-stone-200">
          {history.slice(0, 14).map(({ date, answer, prompt }) => (
            <article key={date} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-stone-500">{date.replaceAll("-", ".")}</p>
                  <h3 className="mt-2 font-black leading-7 text-stone-900">{prompt.question}</h3>
                </div>
                <button type="button" onClick={() => removeRecord(date)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700" aria-label={`${date} 기록 삭제`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 flex gap-2 text-sm font-bold leading-6 text-[#315c4c]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{prompt.options[answer]}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">{prompt.reflection}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-[#f3dfce] p-7 sm:p-9">
        <p className="text-xs font-black tracking-[0.14em] text-[#9d4b31]">WEEKLY QUESTIONS</p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-stone-950">이번 주를 정리하는 세 문장</h2>
        <ol className="mt-5 grid gap-3 text-sm font-bold leading-7 text-stone-700">
          <li>1. 다시 같은 상황이 온다면 유지하고 싶은 선택은?</li>
          <li>2. 당시에는 보이지 않았지만 지금 알게 된 조건은?</li>
          <li>3. 다음 주에 한 번만 시험해 볼 작은 변화는?</li>
        </ol>
      </section>
    </div>
  );
}
