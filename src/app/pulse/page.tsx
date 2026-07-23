import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import PulseClient from "@/components/PulseClient";
import type { IncomePulse } from "@/lib/income-pulse";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Income Pulse — Daily Dividend Attractiveness Score",
  description:
    "Free daily Income Pulse: YieldGrower’s dividend attractiveness score vs 10Y Treasuries, CPI inflation, VIX, and popular dividend ETF yields (SCHD, VYM, JEPI, and more).",
  path: "/pulse",
  keywords: [
    "income pulse",
    "dividend attractiveness score",
    "dividend ETF yield",
    "treasury yield vs dividend",
    "SCHD yield",
    "real yield",
    "FIRE income",
    "YieldGrower",
  ],
});

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

function jsonLd(data: IncomePulse) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YieldGrower Income Pulse",
    url: "https://yieldgrower.com/pulse",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Daily dividend attractiveness score comparing dividend ETF yields with Treasuries, inflation, and market stress.",
    dateModified: data.updatedAt,
    provider: {
      "@type": "Organization",
      name: "YieldGrower",
      url: "https://yieldgrower.com",
    },
  };
}

export default async function PulsePage() {
  const data = await loadPulse();
  const ld = jsonLd(data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <PulseClient initialData={data} />
    </>
  );
}
