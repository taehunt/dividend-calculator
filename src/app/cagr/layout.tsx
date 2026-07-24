import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "CAGR Calculator — Compound Annual Growth Rate";
const description =
  "Free CAGR calculator: measure annualized growth between a starting and ending portfolio value over any time period.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/cagr",
  keywords: [
    "CAGR calculator",
    "compound annual growth rate",
    "annualized return calculator",
    "investment CAGR",
  ],
});

export default function CagrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower CAGR Calculator",
          path: "/cagr",
          description,
        })}
      />
      {children}
    </>
  );
}
