import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About YieldGrower",
  description:
    "Learn who maintains YieldGrower, how its calculator formulas are reviewed, what assumptions they use, and where their limits are.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
