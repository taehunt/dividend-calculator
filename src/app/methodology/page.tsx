import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AXES, AXIS_KEYS } from "@/lib/money-personality";

export const metadata: Metadata = {
  title: "돈결 테스트 설계 원칙과 채점 방법",
  description: "돈결 16유형의 네 가지 성향 축, 20개 문항 구성, 점수 계산, 결과 해석과 한계를 공개합니다.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">HOW IT WORKS</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">돈결은 무엇을 묻고<br />어떻게 결과를 만들까요?</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">돈결은 학술적으로 표준화된 심리검사나 임상 도구가 아닙니다. 일상적인 돈 선택에서 반복되는 기준을 관찰하고 대화를 돕기 위해 자체 설계한 자기보고형 프레임워크입니다.</p>

        <section className="mt-12">
          <p className="text-xs font-black tracking-[0.15em] text-[#a34f32]">01 · 측정하는 네 가지 축</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {AXIS_KEYS.map((key) => {
              const axis = AXES[key];
              return (
                <article key={key} className="rounded-3xl border border-stone-200 bg-white p-6">
                  <h2 className="text-xl font-black text-stone-950">{axis.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{axis.question}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[axis.low, axis.high].map((pole) => (
                      <div key={pole.code} className="rounded-2xl bg-stone-100 p-4"><p className="font-black text-stone-900">{pole.label}</p><p className="mt-2 text-xs leading-5 text-stone-600">{pole.description}</p></div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#1f473b] p-7 text-white sm:p-10">
          <p className="text-xs font-black tracking-[0.15em] text-[#f4c77b]">02 · 문항과 채점</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-3xl">각 축을 다섯 번, 총 20번 묻습니다</h2>
          <div className="mt-6 grid gap-5 text-sm leading-7 text-[#d8e7de] sm:grid-cols-2">
            <p>각 문항은 두 선택지 중 평소의 행동에 가까운 하나를 고르는 방식입니다. 이상적인 태도나 정답을 고르는 시험이 아닙니다.</p>
            <p>한 축에서 각 방향을 선택한 횟수를 백분율로 바꿉니다. 다섯 문항 중 세 번 이상 선택한 방향이 해당 축의 결과가 됩니다.</p>
            <p>네 축의 방향을 조합하면 2 × 2 × 2 × 2, 총 16가지 유형이 만들어집니다. 같은 유형 안에서도 축별 응답 강도는 다를 수 있습니다.</p>
            <p>응답과 축별 점수는 브라우저에만 저장됩니다. 결과 공유 URL에는 유형 이름만 포함되며 개인의 응답 점수는 포함하지 않습니다.</p>
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-[#cbd9ce] bg-[#edf4ef] p-7">
            <p className="text-xs font-black tracking-[0.15em] text-[#315c4c]">03 · 결과가 말할 수 있는 것</p>
            <ul className="mt-5 grid gap-3 text-sm font-bold leading-6 text-stone-700"><li>● 반복해서 편하게 느끼는 선택 기준</li><li>● 돈 문제에서 대화가 필요한 차이</li><li>● 압박 상황에서 놓치기 쉬운 관점</li><li>● 다음 대화를 시작할 구체적인 문장</li></ul>
          </article>
          <article className="rounded-3xl border border-[#ead1c3] bg-[#fff4ec] p-7">
            <p className="text-xs font-black tracking-[0.15em] text-[#a34f32]">04 · 결과가 말할 수 없는 것</p>
            <ul className="mt-5 grid gap-3 text-sm font-bold leading-6 text-stone-700"><li>● 정신건강 또는 성격에 대한 임상 진단</li><li>● 투자 능력, 신용도 또는 재정 건전성</li><li>● 연애나 결혼의 성공 가능성</li><li>● 시간이 지나도 변하지 않는 고정된 본성</li></ul>
          </article>
        </section>

        <section className="mt-12 rounded-3xl border border-stone-200 bg-white p-7 sm:p-9">
          <p className="text-xs font-black tracking-[0.15em] text-[#a34f32]">05 · 현재 한계와 개선 방향</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-stone-950">아직 검증된 심리척도가 아닙니다</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700">
            <p>현재 문항과 유형은 서비스 내부의 개념적 일관성, 중립적인 표현, 일상에서 이해하기 쉬운 상황을 기준으로 설계했습니다. 대표 표본을 대상으로 신뢰도, 재검사 일치도 또는 요인구조를 검증하지 않았습니다.</p>
            <p>따라서 결과를 전문적인 검사처럼 사용해서는 안 됩니다. 향후 충분한 익명 통계와 명시적인 참여 동의를 전제로 문항별 응답 분포와 결과 안정성을 검토할 수 있지만, 그 전까지는 자기이해와 대화를 위한 콘텐츠로만 제공합니다.</p>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/test" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#1f473b] px-6 text-sm font-black text-white">직접 테스트하기 <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/types" className="inline-flex min-h-12 items-center rounded-2xl border border-stone-300 bg-white px-6 text-sm font-black text-stone-700">16가지 유형 보기</Link>
        </div>
        <p className="mt-10 text-sm font-medium text-stone-500">버전 1.0 · 최종 검토일: 2026년 9월 11일</p>
      </article>
    </main>
  );
}
