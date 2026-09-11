import type { Metadata } from "next";
import MoneyTest from "@/components/MoneyTest";

export const metadata: Metadata = {
  title: "돈 성향 테스트",
  description: "20개의 생활 속 선택으로 돈의 목적, 관리 방식, 관계 기준, 시간 관점을 살펴보는 무료 자기이해 테스트입니다.",
  alternates: { canonical: "/test" },
};

export default function TestPage() {
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">MONEY GRAIN TEST</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-stone-950 sm:text-5xl">나는 돈 앞에서 어떤 선택을 할까?</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600">답은 기기에만 임시 저장됩니다. 중간에 나가도 같은 브라우저에서 이어서 할 수 있습니다.</p>
      </div>
      <MoneyTest />
    </main>
  );
}
