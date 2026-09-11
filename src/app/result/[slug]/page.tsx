import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircleWarning, Sprout } from "lucide-react";
import { notFound } from "next/navigation";
import ResultActions from "@/components/ResultActions";
import ResultAxes from "@/components/ResultAxes";
import {
  MONEY_TYPES,
  getMoneyType,
  oppositeType,
} from "@/lib/money-personality";

export const dynamicParams = false;

export function generateStaticParams() {
  return MONEY_TYPES.map((type) => ({ slug: type.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const type = getMoneyType(slug);
  if (!type) return {};
  return {
    title: `${type.name} - 돈결 16유형`,
    description: `${type.tagline}. ${type.summary} 소비, 스트레스, 관계 특징과 정반대 유형을 확인하세요.`,
    alternates: { canonical: `/result/${type.slug}` },
    openGraph: {
      title: `나의 돈 성향은 ${type.name}`,
      description: `${type.tagline} — 돈결 16유형 테스트`,
      url: `/result/${type.slug}`,
      type: "article",
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = getMoneyType(slug);
  if (!type) notFound();

  const opposite = oppositeType(type);
  const related = MONEY_TYPES.filter((candidate) => candidate.slug !== type.slug && candidate.slug !== opposite.slug).slice(0, 3);

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-18">
      <div className="mx-auto max-w-4xl">
        <section className="overflow-hidden rounded-[2.2rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(71,55,40,0.1)]">
          <div className="relative px-6 py-11 text-center sm:px-12 sm:py-16" style={{ background: `linear-gradient(145deg, ${type.color}18, #fffdf8 58%)` }}>
            <p className="text-sm font-black tracking-[0.18em] text-stone-500">YOUR MONEY GRAIN · {type.signature}</p>
            <span className="mt-7 block text-7xl" aria-hidden="true">{type.emoji}</span>
            <p className="mt-6 text-base font-black text-[#a34f32]">{type.tagline}</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-stone-950 sm:text-6xl">{type.name}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-stone-700 sm:text-lg">{type.summary}</p>
          </div>
          <div className="border-t border-stone-200 p-6 sm:p-9"><ResultActions name={type.name} /></div>
        </section>

        <ResultAxes slug={type.slug} />

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { label: "소비할 때", body: type.spending },
            { label: "압박을 받을 때", body: type.stress },
            { label: "가까운 관계에서", body: type.relationship },
          ].map((item) => (
            <article key={item.label} className="rounded-[1.75rem] border border-stone-200 bg-white p-6">
              <p className="text-xs font-black tracking-[0.14em] text-[#a34f32]">{item.label}</p>
              <p className="mt-4 text-sm font-medium leading-7 text-stone-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-[#cbd9ce] bg-[#edf4ef] p-7">
            <div className="flex items-center gap-2 text-[#315c4c]"><CheckCircle2 className="h-5 w-5" /><h2 className="text-xl font-black text-stone-950">이 유형의 힘</h2></div>
            <ul className="mt-5 grid gap-3">
              {type.strengths.map((item) => <li key={item} className="flex gap-3 text-sm font-bold text-stone-700"><span className="text-[#315c4c]">●</span>{item}</li>)}
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-[#ead1c3] bg-[#fff4ec] p-7">
            <div className="flex items-center gap-2 text-[#a34f32]"><MessageCircleWarning className="h-5 w-5" /><h2 className="text-xl font-black text-stone-950">놓치기 쉬운 부분</h2></div>
            <ul className="mt-5 grid gap-3">
              {type.cautions.map((item) => <li key={item} className="flex gap-3 text-sm font-bold text-stone-700"><span className="text-[#a34f32]">●</span>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-[#f3dfce] p-7 sm:flex sm:items-center sm:gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#a34f32]"><Sprout className="h-6 w-6" /></span>
          <div className="mt-4 sm:mt-0"><p className="text-xs font-black tracking-[0.14em] text-[#9d4b31]">작게 시작할 한 가지</p><p className="mt-2 text-lg font-black leading-7 text-stone-900">{type.action}</p></div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#1f473b] p-7 text-white sm:p-10">
          <p className="text-xs font-black tracking-[0.15em] text-[#f4c77b]">OPPOSITE GRAIN</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <span className="text-6xl" aria-hidden="true">{opposite.emoji}</span>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em]">정반대 결은 {opposite.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[#d8e7de]">{opposite.summary} 반대는 틀림이 아니라 내가 자동으로 보지 못하는 기준을 보여주는 거울입니다.</p>
            </div>
            <Link href={`/compatibility?a=${type.slug}&b=${opposite.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#f4c77b] px-5 text-sm font-black text-[#1f473b]">둘의 차이 보기 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-stone-950">다른 돈결도 살펴보기</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((candidate) => (
              <Link key={candidate.slug} href={`/result/${candidate.slug}`} className="rounded-3xl border border-stone-200 bg-white p-5 hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-3xl" aria-hidden="true">{candidate.emoji}</span>
                <h3 className="mt-3 font-black text-stone-950">{candidate.name}</h3>
                <p className="mt-1 text-xs leading-5 text-stone-500">{candidate.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-xs leading-6 text-stone-500">이 결과는 자기이해와 대화를 위한 비임상적 성향 설명입니다. 정신건강 진단, 신용평가 또는 재정 자문에 사용할 수 없습니다.</p>
      </div>
    </main>
  );
}
