import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MONEY_TYPES } from "@/lib/money-personality";

export const metadata: Metadata = {
  title: "돈결 16가지 유형",
  description: "안정과 경험, 계획과 유연, 독립과 공유, 현재와 미래의 조합으로 만들어지는 16가지 돈 성향을 살펴보세요.",
  alternates: { canonical: "/types" },
};

export default function TypesPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">16 MONEY GRAINS</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">돈을 대하는 16가지 결</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">각 유형은 네 가지 성향 축의 조합입니다. 이름은 기억을 돕는 별칭일 뿐, 사람의 능력이나 성숙도를 평가하지 않습니다.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MONEY_TYPES.map((type) => (
            <Link key={type.slug} href={`/result/${type.slug}`} className="group flex min-h-72 flex-col rounded-[1.75rem] border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_45px_rgba(71,55,40,0.1)]">
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl" aria-hidden="true">{type.emoji}</span>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-black tracking-[0.12em] text-stone-500">{type.signature}</span>
              </div>
              <h2 className="mt-6 text-xl font-black tracking-[-0.03em] text-stone-950">{type.name}</h2>
              <p className="mt-2 text-sm font-bold text-[#a34f32]">{type.tagline}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-600">{type.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-black text-[#315c4c]">자세히 읽기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-[#1f473b] p-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-10">
          <div>
            <h2 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">설명만 읽는 것보다 직접 선택해 보세요</h2>
            <p className="mt-3 text-sm leading-7 text-[#d8e7de]">20개 문항에서 반복되는 선택을 기준으로 가장 가까운 유형을 찾습니다.</p>
          </div>
          <Link href="/test" className="mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#f4c77b] px-6 text-sm font-black text-[#1f473b] sm:mt-0">테스트 시작 <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
