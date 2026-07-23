"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";

type PostMeta = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

const copy = {
  en: {
    back: "Back to Tools",
    title: "Investment Blog",
    subtitle:
      "Daily insights on dividend investing, compound interest, and financial independence.",
    readMore: "Read more →",
  },
  ko: {
    back: "전체 도구로",
    title: "투자 블로그",
    subtitle:
      "배당 투자, 복리, 경제적 자립에 대한 인사이트를 제공합니다.",
    readMore: "더 읽기 →",
  },
};

export default function BlogIndexClient({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLocale();
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="blog"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/tools"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600">{t.subtitle}</p>
        </div>

        <div className="space-y-8">
          {posts.map(({ slug, date, title, excerpt }) => (
            <article
              key={slug}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-slate-500 mb-2">{date}</p>
              <Link href={`/blog/${slug}`}>
                <h2 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-3">
                  {title}
                </h2>
              </Link>
              <p className="text-slate-600 leading-relaxed mb-4">{excerpt}</p>
              <Link
                href={`/blog/${slug}`}
                className="text-indigo-600 font-semibold text-sm hover:underline"
              >
                {t.readMore}
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
