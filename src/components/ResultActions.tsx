"use client";

import Link from "next/link";
import { Check, RefreshCw, Share2 } from "lucide-react";
import { useState } from "react";

export default function ResultActions({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = {
      title: `나의 돈 성향은 ${name}`,
      text: `돈결 테스트에서 나의 돈 성향은 ${name}이 나왔어요. 당신의 유형도 확인해보세요.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // A dismissed native share sheet is not an error the user needs to see.
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1f473b] px-5 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
      >
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {copied ? "링크를 복사했어요" : "결과 공유하기"}
      </button>
      <Link
        href="/test"
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-black text-stone-700 hover:bg-stone-50"
      >
        <RefreshCw className="h-4 w-4" /> 다시 테스트하기
      </Link>
    </div>
  );
}
