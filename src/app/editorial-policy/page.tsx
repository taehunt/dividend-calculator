import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "콘텐츠 원칙",
  description: "돈결의 문항과 유형 설명을 작성하고 검토하는 기준, 자동화 범위와 수정 원칙을 안내합니다.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">CONTENT PRINCIPLES</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">콘텐츠 작성과 검토 원칙</h1>
        <div className="mt-10 grid gap-5">
          {[
            ["중립적인 양쪽 선택", "각 성향 축의 양쪽을 좋음과 나쁨으로 나누지 않습니다. 모든 선택지는 상황에 따라 장점과 부담을 가질 수 있도록 작성합니다."],
            ["반복 측정", "한 문항으로 유형을 단정하지 않습니다. 각 성향 축을 서로 다른 다섯 장면에서 반복해 묻고 응답 방향을 합산합니다."],
            ["과장하지 않는 표현", "정신건강, 성격장애, 지능, 신용도, 투자 적합성을 진단하거나 예측한다고 주장하지 않습니다. 관계 비교 역시 성공 가능성을 점수로 단정하지 않습니다."],
            ["자동화 범위의 제한", "오늘의 선택은 날짜에 따라 자동 노출되지만 모든 질문과 해설은 공개 전에 검토한 고정 목록에서 가져옵니다. 사용자별 자동 생성 페이지를 검색엔진에 대량 공개하지 않습니다."],
            ["수정과 검토", "오해를 부르거나 한쪽을 부정적으로 묘사하는 문항은 수정합니다. 기능과 콘텐츠를 변경하면 화면, 채점, 모바일 접근성과 검색 메타데이터를 함께 검토합니다."],
          ].map(([title, body], index) => (
            <section key={title} className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7">
              <div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f3dfce] text-sm font-black text-[#9d4b31]">{index + 1}</span><div><h2 className="text-xl font-black text-stone-950">{title}</h2><p className="mt-3 text-sm leading-7 text-stone-700">{body}</p></div></div>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-stone-600">세부 채점 구조와 해석 한계는 <Link href="/methodology" className="font-black text-[#315c4c] underline underline-offset-4">설계 원칙</Link>에서 확인할 수 있습니다.</p>
        <p className="mt-8 text-sm font-medium text-stone-500">최종 검토일: 2026년 9월 11일</p>
      </article>
    </main>
  );
}
