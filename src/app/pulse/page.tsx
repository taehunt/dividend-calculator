import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import PulseClient from "@/components/PulseClient";
import type { IncomePulse } from "@/lib/income-pulse";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

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

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadPulse();
  const score = data.score ?? "—";
  const label = data.scoreLabel.en;
  const title = `Income Pulse ${score}/100 (${label}) — Daily Dividend Score`;
  const description =
    data.brief.en.length > 155
      ? `${data.brief.en.slice(0, 152)}...`
      : data.brief.en;

  return pageMeta({
    title,
    description,
    path: "/pulse",
    keywords: [
      "income pulse",
      "dividend attractiveness score",
      `dividend score ${score}`,
      "dividend ETF yield",
      "treasury yield vs dividend",
      "SCHD yield",
      "real yield",
      "FIRE income",
      "YieldGrower",
    ],
  });
}

function jsonLd(data: IncomePulse) {
  const score = data.score ?? "—";
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YieldGrower Income Pulse",
    url: `${SITE_URL}/pulse`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: `Today’s Attractiveness Score: ${score}/100 (${data.scoreLabel.en}). ${data.brief.en}`,
    dateModified: data.updatedAt,
    provider: {
      "@type": "Organization",
      name: "YieldGrower",
      url: SITE_URL,
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
