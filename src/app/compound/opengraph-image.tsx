import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "YieldGrower Compound Interest Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Compound",
    title: "Watch contributions grow with compound returns",
    description:
      "Project how initial capital and monthly investing compound over years.",
    urlLabel: "yieldgrower.com/compound",
  });
}
