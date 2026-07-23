import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Investment Blog — Dividends, FIRE & Compound Interest",
    description:
      "Daily insights on dividend investing, DRIP, compound interest, and financial independence from YieldGrower.",
    path: "/blog",
    keywords: [
      "dividend investing blog",
      "FIRE blog",
      "compound interest tips",
      "DRIP investing",
    ],
  }),
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
