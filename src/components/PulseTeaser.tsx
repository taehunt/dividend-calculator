"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import {
  formatUpdatedAt,
  scoreTone,
  type IncomePulse,
  type PulseLang,
} from "@/lib/income-pulse";

type Props = {
  lang?: PulseLang;
};

export default function PulseTeaser({ lang = "en" }: Props) {
  const [data, setData] = useState<IncomePulse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/income-pulse.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json as IncomePulse);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const title = lang === "ko" ? "Income Pulse" : "Income Pulse";
  const cta = lang === "ko" ? "전체 보기" : "View full pulse";
  const loading = lang === "ko" ? "지표 불러오는 중…" : "Loading live pulse…";

  return (
    <Link
      href="/pulse"
      className="block max-w-3xl mx-auto mb-10 print:hidden group"
    >
      <div className="bg-gradient-to-r from-indigo-50 via-white to-violet-50 border border-indigo-100 rounded-2xl p-5 sm:p-6 hover:border-indigo-300 hover:shadow-sm transition-all text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {title}
              </p>
              {data ? (
                <p className={`text-3xl font-extrabold leading-none ${scoreTone(data.score)}`}>
                  {data.score ?? "—"}
                  <span className="text-sm font-semibold text-slate-500 ml-2">
                    {data.scoreLabel[lang]}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-slate-500">{loading}</p>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
              {data ? data.brief[lang] : "—"}
            </p>
            {data && (
              <p className="text-xs text-slate-400 mt-1">
                {formatUpdatedAt(data.updatedAt, lang)}
              </p>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all shrink-0">
            {cta}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
