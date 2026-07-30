"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Calculator, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  en: {
    back: "Back to Home",
    eyebrow: "About YieldGrower",
    title: "Clearer assumptions for long-term income planning",
    intro:
      "YieldGrower provides free calculators and educational articles that help you explore dividend income, compounding, FIRE, taxes, inflation, and other long-term investing scenarios.",
    sections: [
      {
        icon: Calculator,
        title: "How the calculators work",
        paragraphs: [
          "Calculations run locally in your browser. The values you enter are not sent to or stored by YieldGrower.",
          "Inputs such as dividend yield, price growth, contribution growth, taxes, and inflation are scenario assumptions—not forecasts or guaranteed returns. Where applicable, price appreciation and dividend yield are modeled separately.",
        ],
      },
      {
        icon: BookOpen,
        title: "How articles are produced",
        paragraphs: [
          "Articles may begin with automated drafting. Before publication, they must pass programmatic checks for structure, duplicated content, calculation consistency, source links, and prohibited return-guarantee language.",
          "Those checks are not a substitute for individual human financial review. Sources are linked in each article when external facts are used, and errors may still occur.",
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
  },
  ko: {
    back: "홈으로",
    eyebrow: "YieldGrower 소개",
    title: "장기 소득 계획의 가정을 더 명확하게",
    intro:
      "YieldGrower는 배당 소득, 복리, FIRE, 세금, 인플레이션 등 장기 투자 시나리오를 살펴볼 수 있는 무료 계산기와 교육용 콘텐츠를 제공합니다.",
    sections: [
      {
        icon: Calculator,
        title: "계산 방식",
        paragraphs: [
          "계산은 이용자의 브라우저에서 로컬로 실행됩니다. 입력한 값은 YieldGrower 서버로 전송되거나 저장되지 않습니다.",
          "배당률, 주가 상승률, 납입액 증가율, 세금, 물가상승률 등의 입력값은 예측이나 보장 수익률이 아닌 시나리오 가정입니다. 해당 계산기에서는 주가 상승과 배당 수익률을 서로 구분해 계산합니다.",
        ],
      },
      {
        icon: BookOpen,
        title: "콘텐츠 제작 방식",
        paragraphs: [
          "게시글은 자동 초안으로 시작할 수 있습니다. 게시 전 구조, 중복 콘텐츠, 계산 일관성, 출처 링크, 수익 보장 표현 금지 여부를 프로그램으로 검사합니다.",
          "이 검사는 개별 전문가의 금융 검토를 대신하지 않습니다. 외부 사실을 사용할 때는 게시글에 출처를 연결하지만 오류가 남을 수 있습니다.",
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

            <p className="border-t border-slate-200 pt-8 text-sm text-slate-600">
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
        </section>
      </main>
    </div>
  );
}
