"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  en: {
    back: "Back to Home",
    title: "Privacy Policy",
    updated: "Last updated: July 23, 2026",
    sections: [
      {
        h: "1. Introduction",
        p: 'Welcome to YieldGrower ("we," "our," or "us"). We respect your privacy and are committed to protecting it through our compliance with this privacy policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website yieldgrower.com (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.',
      },
      {
        h: "2. Information We Collect",
        p: "We do not require users to create an account, log in, or provide personal financial data to use our calculator. All calculations are performed locally in your browser. However, we may collect certain information automatically when you visit our Website:",
        ul: [
          "Usage Details: Information about your internet connection, the equipment you use to access our Website, and usage details.",
          "Cookies and Tracking Technologies: We use cookies and similar tracking technologies to track the activity on our Website and hold certain information. This includes Google AdSense cookies for advertising purposes.",
        ],
      },
      {
        h: "3. How We Use Your Information",
        p: "We use information that we collect about you or that you provide to us:",
        ul: [
          "To present our Website and its contents to you.",
          "To improve our Website and user experience.",
          "To display advertisements via Google AdSense.",
        ],
      },
      {
        h: "4. Third-Party Services",
        p: "We use third-party services that may collect information used to identify you:",
        ul: [
          "Google AdSense: We use Google AdSense to display ads. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google's Ads Settings.",
          "Vercel: Our website is hosted on Vercel, which may collect basic server logs.",
        ],
      },
      {
        h: "5. Data Security",
        p: "We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Since we do not collect sensitive personal or financial data, the risk is minimal.",
      },
      {
        h: "6. Changes to Our Privacy Policy",
        p: "It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page.",
      },
      {
        h: "7. Contact Information",
        p: "To ask questions or comment about this privacy policy and our privacy practices, contact us at: support@yieldgrower.com",
      },
    ],
  },
  ko: {
    back: "홈으로",
    title: "개인정보 처리방침",
    updated: "최종 업데이트: 2026년 7월 23일",
    sections: [
      {
        h: "1. 소개",
        p: 'YieldGrower("당사")는 이용자의 개인정보를 존중하며 본 개인정보 처리방침에 따라 보호합니다. 이 방침은 yieldgrower.com(이하 "웹사이트") 방문 시 수집될 수 있는 정보와 그 정보의 수집·이용·보관·보호·제공 방식을 설명합니다.',
      },
      {
        h: "2. 수집하는 정보",
        p: "계산기 이용을 위해 계정 생성, 로그인, 개인 금융 정보 입력을 요구하지 않습니다. 모든 계산은 브라우저에서 로컬로 수행됩니다. 다만 웹사이트 방문 시 아래 정보가 자동으로 수집될 수 있습니다.",
        ul: [
          "이용 정보: 인터넷 연결, 접속 기기, 이용 내역 등",
          "쿠키 및 유사 기술: 웹사이트 활동 추적을 위해 쿠키 등을 사용하며, 광고 목적의 Google AdSense 쿠키가 포함될 수 있습니다.",
        ],
      },
      {
        h: "3. 정보 이용 목적",
        p: "수집하거나 제공받은 정보는 다음 목적으로 이용합니다.",
        ul: [
          "웹사이트 및 콘텐츠 제공",
          "웹사이트와 사용자 경험 개선",
          "Google AdSense를 통한 광고 표시",
        ],
      },
      {
        h: "4. 제3자 서비스",
        p: "이용자를 식별하는 데 사용될 수 있는 정보를 수집하는 제3자 서비스를 이용합니다.",
        ul: [
          "Google AdSense: 광고 표시에 사용합니다. Google과 파트너는 광고 쿠키를 사용해 본 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 게재할 수 있습니다. 맞춤 광고는 Google 광고 설정에서 옵트아웃할 수 있습니다.",
          "Vercel: 웹사이트 호스팅에 사용하며 기본 서버 로그를 수집할 수 있습니다.",
        ],
      },
      {
        h: "5. 정보 보안",
        p: "개인정보의 우발적 손실, 무단 접근·이용·변경·공개를 막기 위한 조치를 적용합니다. 민감한 개인·금융 정보를 수집하지 않으므로 관련 위험은 낮습니다.",
      },
      {
        h: "6. 방침 변경",
        p: "개인정보 처리방침 변경 시 본 페이지에 게시합니다. 개인정보 취급 방식에 중요한 변경이 있으면 웹사이트 홈페이지 공지로 안내할 수 있습니다.",
      },
      {
        h: "7. 문의",
        p: "본 방침 관련 문의: support@yieldgrower.com",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const { lang } = useLocale();
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="privacy"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
        </div>
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <h1>{t.title}</h1>
          <p>{t.updated}</p>
          {t.sections.map((section) => (
            <div key={section.h}>
              <h2>{section.h}</h2>
              <p>{section.p}</p>
              {"ul" in section && section.ul && (
                <ul>
                  {section.ul.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
