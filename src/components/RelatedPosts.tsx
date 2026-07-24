"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { PostMeta } from "@/lib/posts";

const copy = {
  en: {
    title: "Related articles",
    subtitle: "Keep reading on dividends, FIRE, and compounding.",
  },
  ko: {
    title: "관련 글",
    subtitle: "배당·FIRE·복리 관련 글을 이어서 읽어보세요.",
  },
};

type Props = {
  posts: PostMeta[];
};

export default function RelatedPosts({ posts }: Props) {
  const { lang } = useLocale();
  const t = copy[lang];

  if (!posts.length) return null;

  return (
    <section className="mt-12 print:hidden">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h2>
      <p className="text-sm text-slate-500 mb-5">{t.subtitle}</p>
      <div className="grid grid-cols-1 gap-3">
        {posts.map((post) => {
          const title =
            lang === "ko" && post.titleKo ? post.titleKo : post.title;
          const excerpt =
            lang === "ko" && post.excerptKo ? post.excerptKo : post.excerpt;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 mb-1">
                  {post.date}
                </p>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {title}
                </h3>
                {excerpt ? (
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {excerpt}
                  </p>
                ) : null}
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
