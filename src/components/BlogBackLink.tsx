"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function BlogBackLink() {
  const { lang } = useLocale();
  const label = lang === "ko" ? "블로그로" : "Back to Blog";

  return (
    <div className="mb-8">
      <Link
        href="/blog"
        className="text-sm font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> {label}
      </Link>
    </div>
  );
}
