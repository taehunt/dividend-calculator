import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description: "돈결 테스트의 오류, 문항, 개인정보 또는 제휴 관련 문의 방법입니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">CONTACT</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">돈결에 알려주세요</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">문항이 이해되지 않거나 결과 설명에서 불편한 표현을 발견했다면 구체적인 화면과 함께 알려주세요.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="mt-10 flex items-center gap-5 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_20px_60px_rgba(71,55,40,0.08)] hover:border-[#c9b29f]">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#edf4ef] text-[#315c4c]"><Mail className="h-6 w-6" /></span>
          <span><span className="block text-xs font-black tracking-[0.14em] text-stone-500">EMAIL</span><span className="mt-1 block break-all text-base font-black text-stone-950 sm:text-xl">{CONTACT_EMAIL}</span></span>
        </a>
        <section className="mt-8 rounded-3xl bg-stone-100 p-6">
          <h2 className="text-lg font-black text-stone-950">문의할 수 있는 내용</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-stone-700"><li>● 테스트 진행 또는 결과 화면 오류</li><li>● 문항과 유형 설명에 대한 의견</li><li>● 개인정보 및 쿠키 관련 요청</li><li>● 콘텐츠 또는 브랜드 제휴 문의</li></ul>
        </section>
        <p className="mt-8 text-sm leading-7 text-stone-500">개별 재정 상담, 투자 종목 추천, 임상 심리 상담은 제공하지 않습니다.</p>
      </div>
    </main>
  );
}
