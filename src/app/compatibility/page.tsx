import type { Metadata } from "next";
import CompatibilityClient from "@/components/CompatibilityClient";

export const metadata: Metadata = {
  title: "돈 성향 관계 비교",
  description: "두 돈 성향이 자연스럽게 통하는 기준과 대화가 필요한 차이를 비교해 보세요. 연인, 가족, 친구의 돈 대화를 돕습니다.",
  alternates: { canonical: "/compatibility" },
};

export default function CompatibilityPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">MONEY RELATIONSHIP</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">돈 얘기만 하면 왜 어긋날까?</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">궁합 점수 대신 두 사람이 같은 기준과 서로 번역해야 할 기준을 보여드립니다.</p>
        </div>
        <div className="mt-10"><CompatibilityClient /></div>
      </div>
    </main>
  );
}
