import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "돈결 소개",
  description: "돈결이 왜 돈의 선택을 네 가지 성향 축과 16가지 유형으로 설명하는지 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">ABOUT MONEY GRAIN</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">돈에는 계산보다 먼저<br />사람의 기준이 있습니다</h1>
        <div className="mt-9 space-y-7 text-base leading-8 text-stone-700">
          <p>같은 금액을 두고도 누군가는 안전을, 누군가는 경험을 먼저 생각합니다. 누군가는 계획에서 안심하고 누군가는 바꿀 수 있을 때 편합니다. 돈결은 이 차이를 낭비와 절약, 옳음과 틀림으로 판단하지 않고 대화할 수 있는 언어로 바꾸기 위해 만들었습니다.</p>
          <p>돈결의 대표 테스트는 돈의 목적, 관리 방식, 결정 관계, 시간 관점이라는 네 축을 다룹니다. 각 축을 다섯 개의 서로 다른 생활 장면에서 반복해 묻고, 네 방향의 조합으로 가장 가까운 16가지 유형을 보여줍니다.</p>
          <p>운영자는 문항, 채점 규칙, 유형별 설명과 한계를 직접 검토합니다. 날짜에 따라 자동으로 바뀌는 오늘의 선택 역시 미리 검토된 질문만 사용합니다. 사용자 응답을 이용해 자동으로 새로운 공개 페이지를 대량 생성하지 않습니다.</p>
        </div>

        <section className="mt-12 rounded-[2rem] bg-[#edf4ef] p-7 sm:p-9">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-stone-950">돈결이 하지 않는 것</h2>
          <ul className="mt-5 grid gap-3 text-sm font-bold leading-6 text-stone-700">
            <li>● 정신건강이나 성격장애를 진단하지 않습니다.</li>
            <li>● 투자 적합성, 신용도 또는 재정 능력을 평가하지 않습니다.</li>
            <li>● 특정 유형이 더 우수하거나 성숙하다고 말하지 않습니다.</li>
            <li>● 결과만으로 연인, 가족 또는 동료와의 관계를 단정하지 않습니다.</li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/test" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#1f473b] px-6 text-sm font-black text-white">테스트 시작 <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/methodology" className="inline-flex min-h-12 items-center rounded-2xl border border-stone-300 bg-white px-6 text-sm font-black text-stone-700">설계 원칙 읽기</Link>
        </div>
        <p className="mt-10 text-sm font-medium text-stone-500">최종 검토일: 2026년 9월 11일</p>
      </article>
    </main>
  );
}
