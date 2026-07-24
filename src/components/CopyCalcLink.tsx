"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { SITE_URL } from "@/lib/site";

/**
 * Copies the current calculator URL (with synced query params) for sharing.
 */
export default function CopyCalcLink() {
  const { lang } = useLocale();
  const [copied, setCopied] = useState(false);

  const label = lang === "ko" ? "링크 복사" : "Copy link";
  const done = lang === "ko" ? "복사됨" : "Copied";

  const handleCopy = async () => {
    const path = `${window.location.pathname}${window.location.search}`;
    const url = `${SITE_URL}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(
        lang === "ko" ? "아래 링크를 복사하세요" : "Copy the link below",
        url
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors print:hidden"
    >
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      {copied ? done : label}
    </button>
  );
}
