"use client";

import ReactMarkdown from "react-markdown";
import SiteHeader from "@/components/SiteHeader";
import BlogBreadcrumb from "@/components/BlogBreadcrumb";
import RelatedPosts from "@/components/RelatedPosts";
import RelatedTools from "@/components/RelatedTools";
import { useLocale } from "@/components/LocaleProvider";
import type { PostMeta } from "@/lib/posts";
import type { RelatedToolsKey } from "@/lib/related-tools";

type Props = {
  title: string;
  titleKo?: string;
  date: string;
  content: string;
  contentKo?: string;
  relatedPage?: RelatedToolsKey;
  relatedPosts?: PostMeta[];
};

export default function BlogPostClient({
  title,
  titleKo,
  date,
  content,
  contentKo,
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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {displayTitle}
            </h1>
            <p className="text-slate-500">{date}</p>
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
