import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import PulseClient from "@/components/PulseClient";
import type { IncomePulse } from "@/lib/income-pulse";

export const metadata: Metadata = {
  title: "Income Pulse — Is Dividend Income Attractive Today? | YieldGrower",
  description:
    "Daily dividend attractiveness score vs Treasuries, inflation, and VIX. Track real yield, the yield curve, and popular dividend ETF yields — updated every day.",
  openGraph: {
    title: "Income Pulse — Dividend Attractiveness Score | YieldGrower",
    description:
      "A daily YieldGrower readout: how attractive dividend ETF income looks versus bonds and inflation.",
    url: "https://yieldgrower.com/pulse",
    siteName: "YieldGrower",
    type: "website",
  },
};

async function loadPulse(): Promise<IncomePulse> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "income-pulse.json"
  );
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as IncomePulse;
}

export default async function PulsePage() {
  const data = await loadPulse();
  return <PulseClient initialData={data} />;
}
