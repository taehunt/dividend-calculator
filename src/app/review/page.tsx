import type { Metadata } from "next";
import WeeklyReview from "@/components/WeeklyReview";

export const metadata: Metadata = {
  title: "나의 선택 기록",
  description: "오늘의 돈 선택 기록을 최근 7일 기준으로 다시 읽고 다음 주의 작은 변화를 정해 보세요.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="max-w-2xl">
          <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">MY WEEKLY REVIEW</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">나의 선택 기록</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">최근 답을 한곳에서 다시 읽고 다음 선택에 쓸 질문을 남겨 보세요. 기록은 서버로 전송되지 않고 이 브라우저에서만 불러옵니다.</p>
        </header>
        <div className="mt-10"><WeeklyReview /></div>
      </div>
    </main>
  );
}
