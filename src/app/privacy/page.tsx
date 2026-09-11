import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "돈결의 브라우저 저장, 분석 도구, 광고 쿠키와 개인정보 처리 방식을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  { title: "테스트 응답과 결과", body: "성향 테스트의 진행 상태, 최근 결과, 오늘의 선택과 연속 참여 기록은 사용자의 브라우저 로컬 저장소에만 저장됩니다. 돈결 서버로 전송하거나 회원 프로필로 보관하지 않습니다. 브라우저 데이터를 삭제하면 이 기록도 삭제됩니다." },
  { title: "자동으로 처리될 수 있는 정보", body: "웹 호스팅, 보안 및 접속 로그 과정에서 IP 주소, 브라우저 종류, 요청 시간, 방문 경로 같은 기술 정보가 일시적으로 처리될 수 있습니다. 이는 서비스 제공, 장애 확인과 보안을 위한 범위에서 사용됩니다." },
  { title: "Google Analytics", body: "서비스 개선을 위해 Google Analytics를 사용할 수 있습니다. 이 과정에서 방문 페이지, 대략적인 지역, 기기와 브라우저 정보, 이용 흐름이 처리될 수 있습니다. 법적으로 동의가 필요한 지역에서는 동의 상태에 따라 저장과 측정 기능이 제한됩니다." },
  { title: "Google AdSense", body: "광고가 제공되는 페이지에서는 Google과 광고 파트너가 쿠키, 웹 비콘, IP 주소 등을 사용해 광고 제공·측정·부정 사용 방지 업무를 수행할 수 있습니다. 광고 개인화 여부는 지역과 사용자의 동의 설정에 따라 달라질 수 있습니다." },
  { title: "제3자 제공과 국외 처리", body: "Google 서비스와 Vercel 호스팅을 사용하는 과정에서 기술 정보가 해당 사업자의 시스템에서 처리될 수 있습니다. 각 사업자의 보관 기간과 처리 방식은 해당 사업자의 개인정보 정책을 따릅니다." },
  { title: "사용자의 선택", body: "브라우저 설정에서 쿠키 또는 로컬 저장소를 삭제하거나 차단할 수 있습니다. 단, 차단하면 테스트 이어하기, 최근 결과, 오늘의 선택 기록이 유지되지 않을 수 있습니다. 동의 대상 지역에서는 하단의 쿠키 설정을 통해 선택을 변경할 수 있습니다." },
  { title: "문의", body: `개인정보 관련 문의는 ${CONTACT_EMAIL}으로 보낼 수 있습니다. 요청 내용을 확인한 뒤 필요한 범위에서 답변합니다.` },
];

export default function PrivacyPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-black tracking-[0.16em] text-[#a34f32]">PRIVACY</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-stone-950 sm:text-6xl">개인정보 처리방침</h1>
        <p className="mt-5 text-base leading-8 text-stone-600">돈결은 테스트를 이용하는 데 이름, 생년월일, 전화번호 또는 회원가입을 요구하지 않습니다.</p>
        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7">
              <h2 className="text-xl font-black text-stone-950">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-700">{section.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm font-medium text-stone-500">시행일 및 최종 검토일: 2026년 9월 11일</p>
      </article>
    </main>
  );
}
