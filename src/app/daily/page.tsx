import type { Metadata } from "next";
import DailyChoice from "@/components/DailyChoice";

export const metadata: Metadata = {
  title: "오늘의 돈 선택",
  description: "매일 하나의 생활 속 돈 질문에 답하고 오늘의 선택을 기록하세요. 답은 사용자의 브라우저에만 저장됩니다.",
  alternates: { canonical: "/daily" },
};

export default function DailyPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">ONE CHOICE A DAY</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">오늘의 나는 어떤 선택을 할까?</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">유형은 평소의 경향이고 오늘의 선택은 현재의 상태입니다. 하루 한 문항을 가볍게 기록해 보세요.</p>
        </div>
        <div className="mt-10"><DailyChoice /></div>
        <section className="mt-10 rounded-3xl border border-stone-200 bg-[#fffdf8] p-6">
          <h2 className="text-lg font-black text-stone-950">기록은 어디에 저장되나요?</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">오늘의 답과 연속 참여 기록은 이 브라우저의 로컬 저장소에만 남습니다. 회원 계정이나 서버로 전송하지 않으며 브라우저 데이터를 지우면 함께 삭제됩니다.</p>
        </section>
      </div>
    </main>
  );
}
