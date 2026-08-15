"use client";

import Link from "next/link";
import { ArrowLeft, Bot, FileCheck2, RefreshCw, Scale } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL } from "@/lib/site";

const copy = {
  en: {
    back: "Back to Home",
    eyebrow: "Editorial Policy",
    title: "How YieldGrower content is produced and corrected",
    updated: "Last updated: August 16, 2026",
    intro:
      "YieldGrower publishes interactive calculators and their methodology notes. Trust matters more than publishing frequency, so the public site emphasizes reproducible formulas, worked examples, primary sources, clear limits, and visible corrections.",
    sections: [
      {
        icon: FileCheck2,
        title: "Who is responsible",
        paragraphs: [
          "The YieldGrower operator is responsible for calculator scope, source selection, implementation, publication decisions, and corrections. This role is described on the About page and can be contacted through the address below.",
          "YieldGrower does not claim that the operator is a licensed investment adviser, tax professional, attorney, or accountant. No unverified credential or fictional expert identity is used to support the calculators.",
        ],
      },
      {
        icon: Bot,
        title: "How AI assistance is used",
        paragraphs: [
          "AI may assist with outlines, first drafts, or Korean-English translation. It does not choose user assumptions, provide personal recommendations, or replace formula verification against the implementation.",
          "Automated publication is disabled. Generated blog drafts remain non-public; the current public site is centered on the calculators and their reviewed methodology pages.",
        ],
      },
      {
        icon: Scale,
        title: "What is checked before publication",
        paragraphs: [
          "Each public calculator must disclose its formula, operation order, worked example, material exclusions, and review date. Financial and economic context should link to government, regulator, or other primary sources; jurisdiction-specific tax material must be labeled.",
          "Examples are checked against the current calculation order. Pages must separate assumptions from forecasts, avoid guaranteed-return language, disclose fees or taxes that are excluded, and direct personal decisions to qualified professionals.",
        ],
      },
      {
        icon: RefreshCw,
        title: "Updates and corrections",
        paragraphs: [
          "A materially revised methodology page shows an updated review date. If a source changes, a calculation cannot be reproduced, or wording is misleading, the affected material is corrected or removed.",
          `Report a possible error to ${CONTACT_EMAIL}. Include the calculator URL, inputs, displayed result, and a source or calculation that helps reproduce the issue.`,
        ],
      },
    ],
    note:
      "YieldGrower content is general information, not personalized investment, tax, legal, or accounting advice.",
  },
  ko: {
    back: "홈으로",
    eyebrow: "편집 정책",
    title: "YieldGrower 콘텐츠의 작성·검증·정정 방식",
    updated: "최종 업데이트: 2026년 8월 16일",
    intro:
      "YieldGrower는 대화형 계산기와 계산 방법론을 공개합니다. 발행 빈도보다 신뢰가 중요하므로 재현 가능한 공식, 계산 예시, 1차 출처, 명확한 한계와 공개적인 정정을 우선합니다.",
    sections: [
      {
        icon: FileCheck2,
        title: "콘텐츠 책임 주체",
        paragraphs: [
          "YieldGrower 운영자가 계산기 범위, 출처 선정, 구현, 공개 여부 결정과 정정을 책임집니다. 실제 관리 역할은 소개 페이지에 공개하며 아래 연락처로 문의할 수 있습니다.",
          "운영자가 투자자문가·세무사·변호사·회계사 자격을 보유했다고 주장하지 않습니다. 계산기의 신뢰를 높이기 위해 확인되지 않은 경력이나 가상의 전문가를 사용하지 않습니다.",
        ],
      },
      {
        icon: Bot,
        title: "AI 보조 사용 방식",
        paragraphs: [
          "AI는 개요, 첫 초안 또는 한영 번역을 보조할 수 있습니다. 이용자의 입력값을 선택하거나 개인별 권유를 만들지 않으며 실제 구현과의 계산식 검증을 대신하지 않습니다.",
          "자동 발행은 중단되어 있습니다. 생성된 블로그 초안은 비공개로 유지하며 현재 공개 사이트는 계산기와 검토된 방법론 페이지를 중심으로 운영합니다.",
        ],
      },
      {
        icon: Scale,
        title: "게시 전 확인 항목",
        paragraphs: [
          "각 공개 계산기는 공식, 연산 순서, 재현 예시, 중요한 제외 항목, 검토일을 표시해야 합니다. 금융·경제 맥락은 정부·규제기관 등 1차 출처를 우선하고 국가별 세금 자료는 적용 국가를 밝힙니다.",
          "예시는 현재 계산 순서와 대조합니다. 가정과 예측을 구분하고 수익 보장 표현을 금지하며, 제외된 수수료·세금을 밝히고 개인별 결정은 자격 있는 전문가에게 확인하도록 안내합니다.",
        ],
      },
      {
        icon: RefreshCw,
        title: "업데이트와 정정",
        paragraphs: [
          "방법론 페이지가 실질적으로 바뀌면 검토일을 갱신합니다. 출처가 변경되거나 계산이 재현되지 않거나 표현이 오해를 만들면 해당 내용을 정정하거나 삭제합니다.",
          `오류 가능성은 ${CONTACT_EMAIL}으로 알려주세요. 계산기 URL, 입력값, 표시 결과, 문제를 재현할 수 있는 출처 또는 계산을 함께 보내면 확인에 도움이 됩니다.`,
        ],
      },
    ],
    note:
      "YieldGrower 콘텐츠는 일반 정보이며 개인 맞춤형 투자·세무·법률·회계 자문이 아닙니다.",
  },
};

export default function EditorialPolicyPage() {
  const { lang } = useLocale();
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader showLocaleControls showCurrencyControls={false} />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </Link>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-10 sm:px-10 sm:py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {t.eyebrow}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">{t.updated}</p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {t.intro}
            </p>
          </header>

          <div className="space-y-10 px-6 py-10 sm:px-10">
            {t.sections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.title} className="grid gap-4 sm:grid-cols-[auto_1fr]">
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

            <p className="border-t border-slate-200 pt-8 text-sm leading-6 text-slate-600">
              {t.note}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
