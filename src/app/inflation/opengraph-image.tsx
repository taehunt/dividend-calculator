import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower Inflation Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Inflation",
    title: "See how inflation changes purchasing power",
    description:
      "Estimate what today’s money may buy in the future under different inflation rates.",
    urlLabel: "yieldgrower.com/inflation",
  });
}
