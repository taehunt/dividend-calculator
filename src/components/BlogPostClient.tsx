"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BlogBreadcrumb from "@/components/BlogBreadcrumb";
import RelatedPosts from "@/components/RelatedPosts";
import RelatedTools from "@/components/RelatedTools";
import { useLocale } from "@/components/LocaleProvider";
import type { PostMeta } from "@/lib/posts";
import type { RelatedToolsKey } from "@/lib/related-tools";
import { categoryLabel } from "@/lib/blog-taxonomy";

type Props = {
  title: string;
  titleKo?: string;
  date: string;
  updated?: string;
  content: string;
  contentKo?: string;
  author?: string;
  generationMethod?: string;
  category?: string;
  tags?: string[];
  relatedPage?: RelatedToolsKey;
  relatedPosts?: PostMeta[];
};

export default function BlogPostClient({
  title,
  titleKo,
  date,
  updated,
  content,
  contentKo,
  author = "YieldGrower Editorial",
  generationMethod,
  category,
  tags = [],
  relatedPage = "dividend",
  relatedPosts = [],
}: Props) {
  const { lang } = useLocale();
  const displayTitle = lang === "ko" && titleKo ? titleKo : title;
  const displayContent = lang === "ko" && contentKo ? contentKo : content;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="blog"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogBreadcrumb title={displayTitle} />
        <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <header className="mb-10 text-center border-b border-slate-100 pb-8">
            {category && (
              <p className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 mb-4">
                {categoryLabel(category, lang)}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {displayTitle}
            </h1>
            <p className="text-slate-500">
              {lang === "ko" ? "게시" : "Published"}: {date}
              {updated && updated !== date && (
                <> · {lang === "ko" ? "수정" : "Updated"}: {updated}</>
              )}
            </p>
            <div className="mt-4 text-sm text-slate-600">
              <p>
                {lang === "ko" ? "작성" : "By"}: {author}{" "}
                ·{" "}
                <Link
                  href="/editorial-policy"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  {lang === "ko" ? "편집 기준" : "Editorial standards"}
                </Link>
              </p>
              {generationMethod && (
                <p className="mt-1 text-xs text-slate-500">
                  {lang === "ko"
                    ? "AI 보조 사용 · 출처와 계산 가정은 본문에서 확인 가능"
                    : "AI-assisted · sources and calculation assumptions are available in the article"}
                </p>
              )}
            </div>
            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <div className="prose prose-slate prose-indigo max-w-none">
            <ReactMarkdown>{displayContent}</ReactMarkdown>
          </div>
        </article>
        <RelatedPosts posts={relatedPosts} />
        <RelatedTools page={relatedPage} />
      </main>
    </div>
  );
}
