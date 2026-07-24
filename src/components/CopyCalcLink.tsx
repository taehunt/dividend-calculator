"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { shareOrCopy } from "@/lib/share";
import { SITE_URL } from "@/lib/site";

/**
 * Shares or copies the current calculator URL (with synced query params).
 */
export default function CopyCalcLink() {
  const { lang } = useLocale();
  const [feedback, setFeedback] = useState<"copied" | "shared" | null>(null);

  const label = lang === "ko" ? "링크 공유" : "Share link";
  const done =
    feedback === "shared"
      ? lang === "ko"
        ? "공유됨"
        : "Shared"
      : lang === "ko"
        ? "복사됨"
        : "Copied";

  const handleShare = async () => {
    const path = `${window.location.pathname}${window.location.search}`;
    const url = `${SITE_URL}${path}`;
    const title =
      lang === "ko" ? "YieldGrower 계산기" : "YieldGrower Calculator";
    const result = await shareOrCopy({
      title,
      text: title,
      url,
      clipboardText: url,
    });
    if (result === "cancelled") return;
    setFeedback(result);
    window.setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors print:hidden"
    >
      {feedback ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      {feedback ? done : label}
    </button>
  );
}
