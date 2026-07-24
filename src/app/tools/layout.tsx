import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  toolsIndexJsonLd,
  webAppJsonLd,
} from "@/lib/json-ld";
import { catalogTools } from "@/lib/related-tools";
import { pageMeta } from "@/lib/seo";

const title = "Investment Tools — Dividend, FIRE & Growth Calculators";
const description =
  "Free YieldGrower tools: Income Pulse, DRIP dividend calculator, FIRE planner, compound interest, tax, CAGR, inflation, and more.";

export const metadata: Metadata = pageMeta({
  title,
  description,
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
  return (
    <>
      <JsonLd
        data={[
          webAppJsonLd({
            name: "YieldGrower Investment Tools",
            path: "/tools",
            description,
          }),
          toolsIndexJsonLd(catalogTools),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
