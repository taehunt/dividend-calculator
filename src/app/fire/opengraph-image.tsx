import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower FIRE Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "FIRE",
    title: "When can you retire early?",
    description:
      "Estimate when your portfolio can cover living expenses with contributions, returns, and safe withdrawal rate.",
    urlLabel: "yieldgrower.com/fire",
  });
}
