import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dividend Tax Calculator — Net Yield After Tax",
  description:
    "Estimate net dividend income after tax and see how tax drag affects DRIP reinvestment. Free after-tax dividend calculator.",
  path: "/tax",
  keywords: [
    "dividend tax calculator",
    "after tax dividend yield",
    "dividend tax drag",
    "net dividend income",
  ],
});

export default function TaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
