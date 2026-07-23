import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Average Cost Calculator — Stock & DCA Cost Basis",
  description:
    "Free average cost calculator for stocks and ETFs. Track cost basis across multiple buys, averaging down or up, and see unrealized P/L.",
  path: "/average",
  keywords: [
    "average cost calculator",
    "cost basis calculator",
    "average down calculator",
    "DCA calculator",
    "stock average price",
  ],
});

export default function AverageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
