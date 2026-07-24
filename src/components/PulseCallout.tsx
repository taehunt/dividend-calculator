"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { usePulseVisitDelta } from "@/hooks/usePulseVisitDelta";
import {
  deltaTone,
  formatScoreDelta,
  scoreDelta,
  scoreTone,
  type IncomePulse,
} from "@/lib/income-pulse";
import { formatVisitDelta } from "@/lib/pulse-visit";

type Props = {
  /** compact = sidebar card; banner = full-width under hero */
  variant?: "compact" | "banner";
};

/**
 * Cross-link into Income Pulse from calculators / tools.
 */
export default function PulseCallout({ variant = "compact" }: Props) {
  const { lang } = useLocale();
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

  const title = lang === "ko" ? "오늘의 인컴 펄스" : "Today’s Income Pulse";
  const body =
    lang === "ko"
      ? "배당 ETF가 국채·물가 대비 얼마나 매력적인지 매일 갱신됩니다."
      : "See how attractive dividend ETF income looks vs Treasuries and inflation — updated daily.";
  const cta = lang === "ko" ? "점수 보기" : "View score";
  const delta = data ? scoreDelta(data.history) : null;
  const visitState = usePulseVisitDelta(data);
  const visitDelta =
    visitState.status === "changed" ? visitState.delta : null;

  if (variant === "banner") {
    return (
      <Link
        href="/pulse"
        className="block mb-8 print:hidden group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 hover:border-indigo-300 transition-colors">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900">
                {title}
                {data?.score != null && (
                  <span className={`ml-2 ${scoreTone(data.score)}`}>
                    {data.score}
                    <span className="text-slate-500 font-semibold text-xs ml-1">
                      {data.scoreLabel[lang]}
                    </span>
                    {delta !== null && (
                      <span
                        className={`ml-2 text-xs font-semibold ${deltaTone(delta)}`}
                      >
                        {formatScoreDelta(delta, lang)}
                      </span>
                    )}
                    {visitDelta !== null && (
                      <span
                        className={`ml-2 text-xs font-semibold ${deltaTone(visitDelta)}`}
                      >
                        {formatVisitDelta(visitDelta, lang)}
                      </span>
                    )}
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                {data ? data.brief[lang] : body}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 shrink-0">
            {cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/pulse"
      className="block print:hidden group"
    >
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 hover:border-indigo-300 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <p className="text-sm font-bold text-slate-900">{title}</p>
        </div>
        {data?.score != null && (
          <p className={`text-3xl font-extrabold mb-1 ${scoreTone(data.score)}`}>
            {data.score}
            <span className="text-sm font-semibold text-slate-500 ml-2">
              {data.scoreLabel[lang]}
            </span>
          </p>
        )}
        {delta !== null && (
          <p className={`text-xs font-semibold mb-1 ${deltaTone(delta)}`}>
            {formatScoreDelta(delta, lang)}
          </p>
        )}
        {visitDelta !== null && (
          <p className={`text-xs font-semibold mb-2 ${deltaTone(visitDelta)}`}>
            {formatVisitDelta(visitDelta, lang)}
          </p>
        )}
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {data ? data.brief[lang] : body}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
          {cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
