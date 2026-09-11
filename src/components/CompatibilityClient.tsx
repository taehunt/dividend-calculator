"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Link2, Sparkles } from "lucide-react";
import { AXES, AXIS_KEYS, MONEY_TYPES, axisLabel, getMoneyType } from "@/lib/money-personality";

const differenceCopy = {
  purpose: {
    title: "안전과 경험의 우선순위",
    body: "한 사람은 흔들리지 않는 기반을 먼저 보고, 다른 사람은 삶의 가능성과 경험을 먼저 봅니다. 지출 전에 반드시 지킬 안전선과 이번 선택에서 얻고 싶은 경험을 따로 말하면 충돌이 줄어듭니다.",
  },
  structure: {
    title: "계획과 유연함의 속도 차이",
    body: "한 사람은 미리 정한 기준에서 안심하고, 다른 사람은 상황에 맞게 바꿀 수 있을 때 편합니다. 고정할 항목과 자유롭게 조정할 항목을 나누는 방식이 잘 맞습니다.",
  },
  ownership: {
    title: "독립과 공유의 경계",
    body: "한 사람은 선택권을 존중받고 싶고, 다른 사람은 결정 과정에 함께하고 싶습니다. 상의가 필요한 금액과 각자 설명 없이 쓸 수 있는 범위를 미리 정해두세요.",
  },
  horizon: {
    title: "현재와 미래의 거리",
    body: "한 사람은 지금 체감하는 만족을, 다른 사람은 시간이 지나 생길 여유를 먼저 봅니다. 현재를 위한 몫과 미래를 위한 몫을 경쟁시키지 말고 동시에 예산에 넣는 것이 좋습니다.",
  },
};

export default function CompatibilityClient() {
  const [first, setFirst] = useState(MONEY_TYPES[0].slug);
  const [second, setSecond] = useState(MONEY_TYPES[MONEY_TYPES.length - 1].slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const a = params.get("a");
      const b = params.get("b");
      if (a && getMoneyType(a)) setFirst(a);
      if (b && getMoneyType(b)) setSecond(b);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const result = useMemo(() => {
    const a = getMoneyType(first) ?? MONEY_TYPES[0];
    const b = getMoneyType(second) ?? MONEY_TYPES[1];
    const same = AXIS_KEYS.filter((key) => axisLabel(a, key).code === axisLabel(b, key).code);
    const different = AXIS_KEYS.filter((key) => !same.includes(key));
    return { a, b, same, different };
  }, [first, second]);

  async function copyComparison() {
    const url = `${window.location.origin}/compatibility?a=${first}&b=${second}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div>
      <div className="grid gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-[0_24px_70px_rgba(71,55,40,0.08)] sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:p-8">
        <label className="grid gap-2 text-sm font-black text-stone-700">
          첫 번째 유형
          <select value={first} onChange={(event) => setFirst(event.target.value)} className="h-14 rounded-2xl border border-stone-300 bg-[#fffdf8] px-4 text-base font-bold text-stone-900 outline-none focus:border-[#1f473b]">
            {MONEY_TYPES.map((type) => <option key={type.slug} value={type.slug}>{type.emoji} {type.name}</option>)}
          </select>
        </label>
        <span className="hidden pb-4 text-stone-400 sm:block">×</span>
        <label className="grid gap-2 text-sm font-black text-stone-700">
          두 번째 유형
          <select value={second} onChange={(event) => setSecond(event.target.value)} className="h-14 rounded-2xl border border-stone-300 bg-[#fffdf8] px-4 text-base font-bold text-stone-900 outline-none focus:border-[#1f473b]">
            {MONEY_TYPES.map((type) => <option key={type.slug} value={type.slug}>{type.emoji} {type.name}</option>)}
          </select>
        </label>
      </div>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-[#1f473b] text-white">
        <div className="grid gap-6 p-7 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-10">
          {[result.a, result.b].map((type) => (
            <div key={type.slug} className="text-center">
              <span className="text-5xl" aria-hidden="true">{type.emoji}</span>
              <p className="mt-3 text-xl font-black">{type.name}</p>
              <p className="mt-1 text-sm text-[#d8e7de]">{type.tagline}</p>
            </div>
          ))}
          <Sparkles className="mx-auto hidden h-7 w-7 text-[#f4c77b] sm:col-start-2 sm:row-start-1 sm:block" />
        </div>
        <div className="border-t border-white/15 bg-white/5 px-7 py-5 text-center text-sm font-bold text-[#e6f0ea]">
          같은 기준 {result.same.length}개 · 다른 기준 {result.different.length}개
        </div>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {result.same.map((key) => {
          const pole = axisLabel(result.a, key);
          return (
            <article key={key} className="rounded-3xl border border-[#cbd9ce] bg-[#edf4ef] p-6">
              <p className="text-xs font-black tracking-[0.14em] text-[#37624f]">자연스럽게 통하는 부분</p>
              <h2 className="mt-3 text-xl font-black text-stone-950">{AXES[key].title}: {pole.label}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-700">두 사람 모두 {pole.description} 결정의 이유를 길게 설명하지 않아도 서로 이해하기 쉬운 영역입니다.</p>
            </article>
          );
        })}
        {result.different.map((key) => (
          <article key={key} className="rounded-3xl border border-[#ead1c3] bg-[#fff4ec] p-6">
            <p className="text-xs font-black tracking-[0.14em] text-[#a34f32]">번역이 필요한 부분</p>
            <h2 className="mt-3 text-xl font-black text-stone-950">{differenceCopy[key].title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">{differenceCopy[key].body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 rounded-3xl bg-stone-100 p-6 sm:grid-cols-2">
        <button type="button" onClick={copyComparison} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#1f473b] px-5 text-sm font-black text-white">
          <Link2 className="h-4 w-4" /> {copied ? "비교 링크를 복사했어요" : "비교 링크 복사"}
        </button>
        <Link href="/types" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white px-5 text-sm font-black text-stone-700">
          유형 먼저 살펴보기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 text-center text-xs leading-6 text-stone-500">관계 비교는 좋고 나쁨을 판정하지 않습니다. 서로 다른 돈의 기준을 대화 가능한 문장으로 바꾸는 도구입니다.</p>
    </div>
  );
}
