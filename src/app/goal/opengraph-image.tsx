import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower Dividend Income Goal Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Income Goal",
    title: "Portfolio size for your dividend target",
    description:
      "Find how large a portfolio you need for a monthly dividend income goal, including yield and tax.",
    urlLabel: "yieldgrower.com/goal",
  });
}
