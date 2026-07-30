"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

const copy = {
  en: {
    disclaimer:
      "Disclaimer: YieldGrower is for informational and educational purposes only. It is not financial advice.",
    about: "About",
    privacy: "Privacy Policy",
    contact: "Contact",
  },
  ko: {
    disclaimer:
      "면책: YieldGrower는 정보·교육 목적이며 투자 자문이 아닙니다.",
    about: "소개",
    privacy: "개인정보 처리방침",
    contact: "문의",
  },
};

export default function SiteFooter() {
  const { lang } = useLocale();
  const t = copy[lang];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 text-center pt-8 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500 mb-4">{t.disclaimer}</p>
        <div className="flex justify-center gap-6 text-sm">
          <Link
            href="/about"
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {t.about}
          </Link>
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {t.privacy}
          </Link>
          <Link
            href="/contact"
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
