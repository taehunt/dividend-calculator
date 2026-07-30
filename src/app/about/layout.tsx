import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About YieldGrower",
  description:
    "Learn how YieldGrower calculators and educational articles are created, what assumptions they use, and where their limits are.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
