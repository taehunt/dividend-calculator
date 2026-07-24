"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  title: string;
};

export default function BlogBreadcrumb({ title }: Props) {
  const { lang } = useLocale();
  const home = lang === "ko" ? "홈" : "Home";
  const blog = lang === "ko" ? "블로그" : "Blog";

  return (
    <nav
      aria-label={lang === "ko" ? "경로" : "Breadcrumb"}
      className="mb-6 text-sm text-slate-500 print:hidden"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            {home}
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">
          /
        </li>
        <li>
          <Link
            href="/blog"
            className="hover:text-indigo-600 transition-colors"
          >
            {blog}
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">
          /
        </li>
        <li className="text-slate-700 font-medium truncate max-w-[16rem] sm:max-w-md">
          {title}
        </li>
      </ol>
    </nav>
  );
}
