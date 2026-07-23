import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Flame,
  Sprout,
  Target,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import PulseClient from "@/components/PulseClient";
import type { IncomePulse } from "@/lib/income-pulse";

export const metadata: Metadata = {
  title: "Income Pulse — Dividend Attractiveness Score | YieldGrower",
  description:
    "Daily dividend attractiveness score vs Treasuries and inflation. Track real yield, the curve regime, VIX, and popular dividend ETF yields.",
  openGraph: {
    title: "Income Pulse — Dividend Attractiveness Score | YieldGrower",
    description:
      "See whether dividend income looks attractive vs bonds and inflation — updated daily.",
    url: "https://yieldgrower.com/pulse",
    siteName: "YieldGrower",
    type: "website",
  },
};

async function loadPulse(): Promise<IncomePulse> {
  const filePath = path.join(process.cwd(), "public", "data", "income-pulse.json");
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as IncomePulse;
}

export default async function PulsePage() {
  const data = await loadPulse();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="pulse" showLocaleControls={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3">
            <Activity className="w-4 h-4" />
            Income Pulse
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Dividend Attractiveness Score
          </h1>
          <p className="text-lg text-slate-600">
            A YieldGrower-processed daily readout: how attractive dividend ETF income
            looks versus Treasuries, inflation, and market stress.
          </p>
        </div>

        <PulseClient initialData={data} />

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/goal"
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <Target className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Dividend Income Goal</h3>
            <p className="text-sm text-slate-600 mb-3">
              Size the portfolio you need for a monthly dividend target.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              Open calculator <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/fire"
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <Flame className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">FIRE Calculator</h3>
            <p className="text-sm text-slate-600 mb-3">
              Estimate when passive income can cover living expenses.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              Open calculator <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/compound"
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <Sprout className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Compound Interest</h3>
            <p className="text-sm text-slate-600 mb-3">
              Project how contributions grow under different return assumptions.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              Open calculator <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
