"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import {
  relatedToolsMap,
  type RelatedToolsKey,
} from "@/lib/related-tools";

const copy = {
  en: {
    title: "Related tools",
    subtitle: "Keep planning with these YieldGrower calculators.",
  },
  ko: {
    title: "관련 도구",
    subtitle: "이어서 보면 좋은 YieldGrower 계산기입니다.",
  },
};

type Props = {
  page: RelatedToolsKey;
};

export default function RelatedTools({ page }: Props) {
  const { lang } = useLocale();
  const t = copy[lang];
  const items = relatedToolsMap[page];

  return (
    <section className="mt-12 print:hidden">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h2>
      <p className="text-sm text-slate-500 mb-5">{t.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {tool.title[lang]}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              {tool.desc[lang]}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
