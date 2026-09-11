"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AXES, AXIS_KEYS, type AxisKey, type MoneyScores, axisLabel, getMoneyType } from "@/lib/money-personality";

export default function ResultAxes({ slug }: { slug: string }) {
  const type = getMoneyType(slug);
  const [scores, setScores] = useState<MoneyScores | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem("money-grain:last-result:v1");
        if (!raw) return;
        const saved = JSON.parse(raw) as { type?: string; scores?: MoneyScores };
        if (saved.type === slug && saved.scores) setScores(saved.scores);
      } catch {
        window.localStorage.removeItem("money-grain:last-result:v1");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

  if (!type) return null;

  return (
    <section className="mt-10 rounded-[2rem] border border-stone-200 bg-[#fffdf8] p-6 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.15em] text-[#a34f32]">FOUR GRAINS</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-stone-950 sm:text-3xl">나의 네 가지 기준</h2>
        </div>
        {!scores && <Link href="/test" className="text-sm font-black text-[#315c4c] underline underline-offset-4">테스트하고 내 점수 보기</Link>}
      </div>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        {AXIS_KEYS.map((key: AxisKey) => {
          const axis = AXES[key];
          const pole = axisLabel(type, key);
          const highSide = pole.code === axis.high.code;
          const displayScore = scores?.[key] ?? (highSide ? 80 : 20);
          return (
            <article key={key}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-stone-900">{axis.title}</h3>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-600">{pole.label}{scores ? ` ${highSide ? scores[key] : 100 - scores[key]}%` : ""}</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-[#b65335]" style={{ width: `${displayScore}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs font-bold text-stone-500"><span>{axis.low.label}</span><span>{axis.high.label}</span></div>
              <p className="mt-3 text-sm leading-6 text-stone-600">{pole.description}</p>
            </article>
          );
        })}
      </div>
      {!scores && <p className="mt-6 text-xs leading-6 text-stone-500">위 막대는 유형의 방향을 설명하는 예시입니다. 실제 응답 강도는 이 브라우저에서 테스트를 완료한 경우에만 표시됩니다.</p>}
    </section>
  );
}
