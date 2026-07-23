import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "CAGR Calculator — Compound Annual Growth Rate",
  description:
    "Free CAGR calculator: measure annualized growth between a starting and ending portfolio value over any time period.",
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
  return children;
}
