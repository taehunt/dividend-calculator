import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Investment Tools — Dividend, FIRE & Growth Calculators",
  description:
    "Free YieldGrower tools: Income Pulse, DRIP dividend calculator, FIRE planner, compound interest, tax, CAGR, inflation, and more.",
  path: "/tools",
  keywords: [
    "investment calculators",
    "dividend tools",
    "FIRE calculator tools",
    "YieldGrower tools",
  ],
});

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
