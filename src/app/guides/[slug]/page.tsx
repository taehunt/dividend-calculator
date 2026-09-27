import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = GUIDES.filter((candidate) => candidate.slug !== guide.slug).slice(0, 3);

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-18">
      <article className="mx-auto max-w-3xl">
        <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-black text-[#315c4c] hover:underline">
          <ArrowLeft className="h-4 w-4" /> 전체 가이드
        </Link>

        <header className="mt-8 border-b border-stone-200 pb-9">
          <div className="flex flex-wrap items-center gap-3 text-xs font-black text-stone-500">
            <span className="rounded-full bg-[#edf4ef] px-3 py-1.5 text-[#315c4c]">{guide.category}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> 약 {guide.readMinutes}분</span>
            <span>최종 검토 2026.09.28</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[1.18] tracking-[-0.055em] text-stone-950 sm:text-6xl">{guide.title}</h1>
          <p className="mt-6 text-lg font-medium leading-8 text-stone-700">{guide.intro}</p>
        </header>

        <div className="mt-10 grid gap-12">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-stone-950 sm:text-3xl">{section.title}</h2>
              <div className="mt-5 grid gap-4">
                {section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-stone-700">{paragraph}</p>)}
              </div>
              {section.checklist && (
                <div className="mt-6 rounded-3xl border border-stone-200 bg-[#fffdf8] p-6">
                  <p className="text-xs font-black tracking-[0.14em] text-[#a34f32]">CHECKLIST</p>
                  <ul className="mt-4 grid gap-3">
                    {section.checklist.map((item) => <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-stone-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#315c4c]" />{item}</li>)}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-[2rem] bg-[#1f473b] p-7 text-white sm:p-9">
          <p className="text-xs font-black tracking-[0.15em] text-[#f4c77b]">TRY IT NOW</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">{guide.practice.title}</h2>
          <ol className="mt-6 grid gap-4">
            {guide.practice.steps.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-7 text-[#d8e7de]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f4c77b] text-xs font-black text-[#1f473b]">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <aside className="mt-8 rounded-3xl bg-stone-100 p-6 text-sm leading-7 text-stone-600">
          이 글은 돈과 관련한 자기점검을 돕는 일반 정보입니다. 개인별 재정 자문, 법률 조언, 정신건강 진단을 제공하지 않습니다. 글의 구성과 문장은 돈결 편집 원칙에 따라 직접 작성하고 검토했습니다.
        </aside>
      </article>

      <section className="mx-auto mt-16 max-w-5xl border-t border-stone-200 pt-10">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-stone-950">이어서 읽기</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((candidate) => (
            <Link key={candidate.slug} href={`/guides/${candidate.slug}`} className="group rounded-3xl border border-stone-200 bg-white p-5 hover:shadow-md">
              <p className="text-xs font-black text-[#a34f32]">{candidate.category}</p>
              <h3 className="mt-3 font-black leading-6 text-stone-950">{candidate.title}</h3>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#315c4c]">읽기 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
