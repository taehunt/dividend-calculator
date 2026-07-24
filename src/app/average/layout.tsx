import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "Average Cost Calculator — Stock & DCA Cost Basis";
const description =
  "Free average cost calculator for stocks and ETFs. Track cost basis across multiple buys, averaging down or up, and see unrealized P/L.";

export const metadata: Metadata = pageMeta({
  title,
  description,
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
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Average Cost Calculator",
          path: "/average",
          description,
        })}
      />
      {children}
    </>
  );
}
