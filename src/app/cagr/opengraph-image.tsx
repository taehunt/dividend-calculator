import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower CAGR Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "CAGR",
    title: "Measure annualized investment growth",
    description:
      "Calculate compound annual growth rate between a start and end portfolio value.",
    urlLabel: "yieldgrower.com/cagr",
  });
}
