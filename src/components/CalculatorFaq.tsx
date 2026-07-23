"use client";

import { useLocale } from "@/components/LocaleProvider";
import {
  calculatorFaqs,
  type CalculatorFaqKey,
} from "@/lib/calculator-faq";

const titles = {
  en: "Frequently asked questions",
  ko: "자주 묻는 질문",
};

type Props = {
  page: CalculatorFaqKey;
};

export default function CalculatorFaq({ page }: Props) {
  const { lang } = useLocale();
  const items = calculatorFaqs[page][lang];
  const title = titles[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="mt-16 pt-12 border-t border-slate-200 print:hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.q}
            className="group bg-white border border-slate-200 rounded-2xl px-5 py-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-start justify-between gap-4">
              <span>{item.q}</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
