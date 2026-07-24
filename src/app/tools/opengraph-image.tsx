import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower investment tools";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Tools",
    title: "Dividend, FIRE & growth calculators",
    description:
      "Free Income Pulse, DRIP, FIRE, compound, tax, CAGR, and inflation tools in one place.",
    urlLabel: "yieldgrower.com/tools",
  });
}
