import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dividend Income Goal Calculator — Portfolio Size Needed",
  description:
    "Calculate how large a portfolio you need for a target monthly dividend income, including yield and tax assumptions.",
  path: "/goal",
  keywords: [
    "dividend income goal calculator",
    "passive income portfolio size",
    "monthly dividend target",
    "required portfolio calculator",
  ],
});

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
