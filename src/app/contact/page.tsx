"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL } from "@/lib/site";

const copy = {
  en: {
    back: "Back to Home",
    eyebrow: "Contact",
    title: "Get in touch with YieldGrower",
    intro:
      "Use the email below for calculator feedback, article corrections, privacy questions, or general inquiries.",
    emailLabel: "Email",
    button: "Send an email",
    note:
      "Please do not include passwords, account numbers, tax IDs, or other sensitive financial or personal information.",
  },
  ko: {
    back: "홈으로",
    eyebrow: "문의",
    title: "YieldGrower에 문의하기",
    intro:
      "계산기 의견, 게시글 정정 요청, 개인정보 관련 질문 또는 일반 문의는 아래 이메일로 보내주세요.",
    emailLabel: "이메일",
    button: "이메일 보내기",
    note:
      "비밀번호, 계좌번호, 주민등록번호 등 민감한 금융·개인정보는 보내지 마세요.",
  },
};

export default function ContactPage() {
  const { lang } = useLocale();
  const t = copy[lang];
  const subject =
    lang === "ko" ? "YieldGrower 문의" : "YieldGrower inquiry";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{t.intro}</p>
          </div>

          <div className="px-6 py-10 sm:px-10">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {t.emailLabel}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
                    className="mt-1 block break-all text-lg font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t.button}
            </a>

            <p className="mt-6 text-sm leading-6 text-slate-500">{t.note}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
