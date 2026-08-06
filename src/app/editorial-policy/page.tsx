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
    updated: "Last updated: August 7, 2026",
    intro:
      "YieldGrower publishes educational calculators and articles about dividend income and long-term planning. Trust matters more than publishing frequency, so our process emphasizes reproducible assumptions, primary sources, clear limits, and visible corrections.",
    sections: [
      {
        icon: FileCheck2,
        title: "Who is responsible",
        paragraphs: [
          "YieldGrower Editorial is the site-level publisher byline. It does not imply that the publisher is a licensed investment adviser, tax professional, attorney, or accountant.",
          "The publisher is responsible for topic selection, source selection, calculator implementation, publication decisions, and corrections. Questions and correction requests can be sent to the contact address below.",
        ],
      },
      {
        icon: Bot,
        title: "How AI assistance is used",
        paragraphs: [
          "AI may assist with outlines, first drafts, or Korean-English translation. AI assistance is disclosed on the article page when it is used.",
          "Automated publication is disabled. Draft generation and public publication are separate steps: a generated draft is saved for review and cannot update the public site by itself.",
        ],
      },
      {
        icon: Scale,
        title: "What is checked before publication",
        paragraphs: [
          "Factual claims should be traceable to the source links in the article. Preference is given to government, regulator, and other primary or authoritative sources. Tax statements must identify their jurisdiction and must not be generalized globally.",
          "Worked examples are checked against the stated formula or the linked YieldGrower calculator. Articles must separate assumptions from forecasts, avoid guaranteed-return language, disclose material limitations, and direct personal decisions to qualified professionals.",
        ],
      },
      {
        icon: RefreshCw,
        title: "Updates and corrections",
        paragraphs: [
          "A materially revised article shows an updated date. If a source changes, a calculation cannot be reproduced, or wording is misleading, we correct or remove the affected material rather than silently changing its meaning.",
          `Report a possible error to ${CONTACT_EMAIL}. Include the article URL, the statement or result in question, and a source or calculation that helps reproduce the issue.`,
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
    updated: "최종 업데이트: 2026년 8월 7일",
    intro:
      "YieldGrower는 배당 소득과 장기 계획을 다루는 교육용 계산기와 글을 제공합니다. 발행 빈도보다 신뢰가 중요하므로 재현 가능한 가정, 1차 출처, 명확한 한계와 공개적인 정정을 우선합니다.",
    sections: [
      {
        icon: FileCheck2,
        title: "콘텐츠 책임 주체",
        paragraphs: [
          "YieldGrower Editorial은 사이트 차원의 발행자 표시입니다. 투자자문가·세무사·변호사·회계사 자격을 의미하지 않습니다.",
          "발행자는 주제와 출처 선정, 계산기 구현, 공개 여부 결정과 정정을 책임집니다. 질문과 정정 요청은 아래 연락처로 보낼 수 있습니다.",
        ],
      },
      {
        icon: Bot,
        title: "AI 보조 사용 방식",
        paragraphs: [
          "AI는 개요, 첫 초안 또는 한영 번역을 보조할 수 있습니다. AI를 사용한 글은 게시글 화면에 그 사실을 표시합니다.",
          "자동 발행은 중단되어 있습니다. 초안 생성과 공개 발행은 분리되며, 생성된 초안은 검토용으로만 저장되고 스스로 공개 사이트를 갱신할 수 없습니다.",
        ],
      },
      {
        icon: Scale,
        title: "게시 전 확인 항목",
        paragraphs: [
          "사실 주장은 본문에 연결된 출처로 추적할 수 있어야 합니다. 정부·규제기관 등 1차 또는 권위 있는 출처를 우선합니다. 세금 설명은 적용 국가를 밝혀야 하며 다른 국가에 일반화하지 않습니다.",
          "계산 예시는 제시된 식 또는 연결된 YieldGrower 계산기로 재현합니다. 가정과 예측을 구분하고, 수익 보장 표현을 금지하며, 중요한 한계를 밝히고 개인별 결정은 자격 있는 전문가에게 확인하도록 안내합니다.",
        ],
      },
      {
        icon: RefreshCw,
        title: "업데이트와 정정",
        paragraphs: [
          "내용이 실질적으로 바뀐 글에는 수정일을 표시합니다. 출처가 변경되거나 계산이 재현되지 않거나 표현이 오해를 만들면 의미를 몰래 바꾸지 않고 해당 내용을 정정하거나 삭제합니다.",
          `오류 가능성은 ${CONTACT_EMAIL}으로 알려주세요. 게시글 URL, 문제가 된 문장이나 결과, 문제를 재현할 수 있는 출처 또는 계산을 함께 보내면 확인에 도움이 됩니다.`,
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
