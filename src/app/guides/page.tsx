import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "돈 대화와 선택 가이드",
  description: "돈 때문에 생기는 생활과 관계의 문제를 스스로 정리할 수 있는 대화 순서, 회고 질문, 실천 도구를 제공합니다.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">MONEY CONVERSATION GUIDES</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">결과를 읽은 다음,<br />생활에서 써보는 방법</h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">유형 이름만 확인하고 끝나지 않도록 실제 대화와 선택에 사용할 수 있는 질문과 실습을 정리했습니다. 누구에게나 같은 답을 권하지 않고, 자신의 조건에 맞게 기준을 만드는 데 초점을 둡니다.</p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2" aria-label="돈결 가이드 목록">
          {GUIDES.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`group rounded-[1.8rem] border border-stone-200 p-7 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(71,55,40,0.1)] ${index === 0 ? "bg-[#edf4ef] md:col-span-2" : "bg-white"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#315c4c]">
                  <BookOpenText className="h-3.5 w-3.5" /> {guide.category}
                </span>
                <span className="text-xs font-bold text-stone-500">약 {guide.readMinutes}분</span>
              </div>
              <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-stone-950 sm:text-3xl">{guide.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{guide.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-black text-[#a34f32]">가이드 읽기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </section>

        <aside className="mt-12 rounded-[1.75rem] border border-stone-200 bg-[#fffdf8] p-6 text-sm leading-7 text-stone-600 sm:p-8">
          <strong className="text-stone-900">이 가이드의 범위</strong>
          <p className="mt-2">돈결 가이드는 생활 속 자기점검과 대화를 돕는 교육용 콘텐츠입니다. 개인의 소득·부채·법적 상황을 반영한 재정 자문이나 정신건강 상담을 대신하지 않습니다. 실제 연체, 채무, 사기 피해처럼 긴급한 문제가 있다면 관련 금융기관이나 공인된 전문기관에 문의하세요.</p>
        </aside>
      </div>
    </main>
  );
}
