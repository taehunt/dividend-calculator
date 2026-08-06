"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import type { PostMeta } from "@/lib/posts";
import { categoryLabel } from "@/lib/blog-taxonomy";

const copy = {
  en: {
    back: "Back to Tools",
    title: "Investment Blog",
    subtitle:
      "Source-linked guides for testing dividend, compounding, and financial independence assumptions.",
    readMore: "Read more →",
    rss: "RSS feed",
    all: "All",
  },
  ko: {
    back: "전체 도구로",
    title: "투자 블로그",
    subtitle:
      "배당·복리·경제적 자립의 가정을 직접 검증할 수 있는 출처 기반 가이드입니다.",
    readMore: "더 읽기 →",
    rss: "RSS 피드",
    all: "전체",
  },
};

export default function BlogIndexClient({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLocale();
  const t = copy[lang];
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  ) as string[];
  const visiblePosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <SiteHeader
        active="blog"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
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
          <a
            href="/feed.xml"
            className="inline-block mt-3 text-sm font-medium text-indigo-600 hover:underline"
          >
            {t.rss}
          </a>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200"
            }`}
          >
            {t.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200"
              }`}
            >
              {categoryLabel(category, lang)}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {visiblePosts.map((post) => {
            const title =
              lang === "ko" && post.titleKo ? post.titleKo : post.title;
            const excerpt =
              lang === "ko" && post.excerptKo ? post.excerptKo : post.excerpt;
            return (
              <article
                key={post.slug}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-slate-500 mb-2">
                  {categoryLabel(post.category, lang)} · {post.date}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-3">
                    {title}
                  </h2>
                </Link>
                <p className="text-slate-600 leading-relaxed mb-4">{excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-indigo-600 font-semibold text-sm hover:underline"
                >
                  {t.readMore}
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
