"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { QUESTIONS, scoreAnswers, typeFromScores } from "@/lib/money-personality";

const STORAGE_KEY = "money-grain:test:v1";

type SavedTest = {
  current: number;
  answers: Record<number, 0 | 1>;
};

export default function MoneyTest() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 0 | 1>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as SavedTest;
          if (saved.current >= 0 && saved.current < QUESTIONS.length) setCurrent(saved.current);
          if (saved.answers && typeof saved.answers === "object") setAnswers(saved.answers);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ current, answers }));
  }, [answers, current, ready]);

  const question = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);

  function choose(value: 0 | 1) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if (current === QUESTIONS.length - 1) {
      const scores = scoreAnswers(nextAnswers);
      const type = typeFromScores(scores);
      window.localStorage.setItem(
        "money-grain:last-result:v1",
        JSON.stringify({ type: type.slug, scores, completedAt: new Date().toISOString() })
      );
      setReady(false);
      window.localStorage.removeItem(STORAGE_KEY);
      router.push(`/result/${type.slug}`);
      return;
    }

    window.setTimeout(() => setCurrent((value) => value + 1), 140);
  }

  function reset() {
    setAnswers({});
    setCurrent(0);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  if (!ready) {
    return <div className="min-h-[480px] animate-pulse rounded-[2rem] bg-stone-100" />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-7 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          disabled={current === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-stone-600 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> 이전
        </button>
        <p className="text-sm font-bold tabular-nums text-stone-500">
          <span className="text-stone-900">{current + 1}</span> / {QUESTIONS.length}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-stone-600 hover:bg-stone-100"
        >
          <RotateCcw className="h-4 w-4" /> 처음부터
        </button>
      </div>

      <div
        className="mb-10 h-2 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-label="테스트 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="h-full rounded-full bg-[#d36b45] transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <section key={question.id} className="animate-[question-in_.35s_ease-out] rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(71,55,40,0.08)] sm:p-10">
        <p className="text-sm font-black tracking-[0.16em] text-[#b65335]">QUESTION {String(question.id).padStart(2, "0")}</p>
        <h2 className="mt-5 text-2xl font-black leading-[1.45] tracking-[-0.04em] text-stone-950 sm:text-4xl">
          {question.prompt}
        </h2>

        <div className="mt-9 grid gap-4">
          {[question.low, question.high].map((label, index) => {
            const value = index as 0 | 1;
            const selected = answers[question.id] === value;
            return (
              <button
                key={label}
                type="button"
                onClick={() => choose(value)}
                className={`group flex min-h-20 items-center justify-between gap-5 rounded-2xl border p-5 text-left text-base font-bold leading-7 transition-all sm:text-lg ${
                  selected
                    ? "border-[#1f473b] bg-[#edf4ef] text-[#17392f]"
                    : "border-stone-200 bg-[#fffdf8] text-stone-700 hover:-translate-y-0.5 hover:border-[#d36b45] hover:bg-[#fff8ef]"
                }`}
              >
                <span>{label}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-stone-400 shadow-sm transition-colors group-hover:text-[#b65335]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="mt-7 text-center text-sm leading-6 text-stone-500">
        정답은 없습니다. 이상적인 모습보다 평소의 선택에 가까운 답을 골라주세요.
      </p>
    </div>
  );
}
