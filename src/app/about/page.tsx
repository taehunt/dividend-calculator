"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Calculator, ShieldCheck, UserRound } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  en: {
    back: "Back to Home",
    eyebrow: "About YieldGrower",
    title: "Clearer assumptions for long-term income planning",
    updated: "Last reviewed: August 16, 2026",
    intro:
      "YieldGrower is an independently maintained collection of free calculators for exploring dividend income, compounding, FIRE, taxes, inflation, and other long-term investing scenarios.",
    sections: [
      {
        icon: UserRound,
        title: "Who builds and maintains YieldGrower",
        paragraphs: [
          "The YieldGrower operator selects the calculator scope, implements and maintains the code, documents the formulas, and decides what is published. The operator can be contacted through the address on the Contact page.",
          "YieldGrower does not claim that its operator is a licensed investment adviser, tax professional, attorney, or accountant. The site publishes the role and limits that can be verified without inventing credentials or an expert persona.",
        ],
      },
      {
        icon: Calculator,
        title: "How the calculators work",
        paragraphs: [
          "Calculations run locally in your browser. The values you enter are not sent to or stored by YieldGrower.",
          "Inputs such as dividend yield, price growth, contribution growth, taxes, and inflation are scenario assumptions—not forecasts or guaranteed returns. Where applicable, price appreciation and dividend yield are modeled separately.",
        ],
      },
      {
        icon: BookOpenCheck,
        title: "How calculator explanations are reviewed",
        paragraphs: [
          "Each calculator page states the formula used by the current implementation, gives a worked example, lists material exclusions, and links primary or regulatory references for financial and economic context.",
          "AI may assist with drafting or translation, but automated publication is disabled. Generated blog drafts are not part of the public site. Formula descriptions and examples must be checked against the implementation before publication.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "What YieldGrower does not provide",
        paragraphs: [
          "YieldGrower does not provide personalized investment, tax, legal, or accounting advice. Results are educational estimates and may differ from real outcomes because laws, tax treatment, fees, exchange rates, and market conditions change.",
          "Verify important decisions with current primary sources and a qualified professional who understands your circumstances.",
        ],
      },
    ],
    privacyLead: "For information about cookies and data handling, read our",
    privacy: "Privacy Policy",
    editorialLead: "For authorship, AI-use, sourcing, and correction standards, read our",
    editorial: "Editorial Policy",
  },
  ko: {
    back: "홈으로",
    eyebrow: "YieldGrower 소개",
    title: "장기 소득 계획의 가정을 더 명확하게",
    updated: "최종 검토일: 2026년 8월 16일",
    intro:
      "YieldGrower는 배당 소득, 복리, FIRE, 세금, 인플레이션 등 장기 투자 시나리오를 살펴보는 무료 계산기 모음으로 독립 운영됩니다.",
    sections: [
      {
        icon: UserRound,
        title: "YieldGrower 제작·관리 주체",
        paragraphs: [
          "YieldGrower 운영자가 계산기 범위를 정하고 코드를 구현·유지하며, 계산식을 문서화하고 공개 여부를 결정합니다. 운영자에게는 문의 페이지의 이메일로 연락할 수 있습니다.",
          "운영자가 투자자문가·세무사·변호사·회계사 자격을 보유했다고 주장하지 않습니다. 확인할 수 없는 경력이나 전문가 인물을 만들어 표시하지 않고 실제 관리 역할과 한계를 공개합니다.",
        ],
      },
      {
        icon: Calculator,
        title: "계산 방식",
        paragraphs: [
          "계산은 이용자의 브라우저에서 로컬로 실행됩니다. 입력한 값은 YieldGrower 서버로 전송되거나 저장되지 않습니다.",
          "배당률, 주가 상승률, 납입액 증가율, 세금, 물가상승률 등의 입력값은 예측이나 보장 수익률이 아닌 시나리오 가정입니다. 해당 계산기에서는 주가 상승과 배당 수익률을 서로 구분해 계산합니다.",
        ],
      },
      {
        icon: BookOpenCheck,
        title: "계산기 설명 검토 방식",
        paragraphs: [
          "각 계산기 페이지에 현재 구현이 사용하는 공식, 재현 가능한 예시, 중요한 제외 항목, 금융·경제 맥락을 확인할 1차 기관 또는 규제기관 출처를 표시합니다.",
          "AI는 초안이나 번역을 보조할 수 있지만 자동 발행은 중단되어 있습니다. 생성된 블로그 초안은 공개 사이트에 포함하지 않습니다. 계산식 설명과 예시는 공개 전에 실제 구현과 대조해야 합니다.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "제공하지 않는 것",
        paragraphs: [
          "YieldGrower는 개인 맞춤형 투자·세무·법률·회계 자문을 제공하지 않습니다. 결과는 교육 목적의 추정치이며 법률, 세금, 수수료, 환율, 시장 환경 변화로 실제 결과와 다를 수 있습니다.",
          "중요한 의사결정 전에는 최신 1차 자료와 이용자의 상황을 이해하는 자격 있는 전문가를 통해 다시 확인하세요.",
        ],
      },
    ],
    privacyLead: "쿠키와 정보 처리 방식은",
    privacy: "개인정보 처리방침",
    editorialLead: "작성 주체, AI 사용, 출처 및 정정 기준은",
    editorial: "편집 정책",
  },
};

export default function AboutPage() {
  const { lang } = useLocale();
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </Link>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {t.eyebrow}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {t.intro}
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">{t.updated}</p>
          </div>

          <div className="space-y-10 px-6 py-10 sm:px-10">
            {t.sections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.title}
                  className="grid gap-4 sm:grid-cols-[auto_1fr]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {section.title}
                    </h2>
                    <div className="mt-3 space-y-3 text-base leading-7 text-slate-600">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}

            <div className="space-y-2 border-t border-slate-200 pt-8 text-sm text-slate-600">
              <p>
                {t.editorialLead}{" "}
                <Link
                  href="/editorial-policy"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {t.editorial}
                </Link>
                {lang === "ko" ? "에서 확인하세요." : "."}
              </p>
              <p>
                {t.privacyLead}{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {t.privacy}
                </Link>
                {lang === "ko" ? "을 확인하세요." : "."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
