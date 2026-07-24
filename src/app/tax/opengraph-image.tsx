import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower Dividend Tax Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Dividend Tax",
    title: "See net yield after tax drag",
    description:
      "Estimate after-tax dividend income and how tax slows reinvestment.",
    urlLabel: "yieldgrower.com/tax",
  });
}
