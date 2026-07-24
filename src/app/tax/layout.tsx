import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "Dividend Tax Calculator — Net Yield After Tax";
const description =
  "Estimate net dividend income after tax and see how tax drag affects DRIP reinvestment. Free after-tax dividend calculator.";

export const metadata: Metadata = pageMeta({
  title,
  description,
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
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Dividend Tax Calculator",
          path: "/tax",
          description,
        })}
      />
      {children}
    </>
  );
}
