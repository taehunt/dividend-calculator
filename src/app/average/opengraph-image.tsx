import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower Average Cost Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Average Cost",
    title: "Track cost basis across multiple buys",
    description:
      "Calculate average share price for DCA and averaging-down strategies.",
    urlLabel: "yieldgrower.com/average",
  });
}
