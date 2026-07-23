import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Inflation Calculator — Purchasing Power Over Time",
  description:
    "See how inflation erodes purchasing power and what today’s money may buy in the future. Free inflation calculator for investors.",
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
  return children;
}
