import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "Inflation Calculator — Purchasing Power Over Time";
const description =
  "See how inflation erodes purchasing power and what today’s money may buy in the future. Free inflation calculator for investors.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/inflation",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "future value inflation",
    "real return inflation",
  ],
});

export default function InflationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Inflation Calculator",
          path: "/inflation",
          description,
        })}
      />
      {children}
    </>
  );
}
