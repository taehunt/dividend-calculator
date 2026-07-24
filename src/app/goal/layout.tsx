import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "Dividend Income Goal Calculator — Portfolio Size Needed";
const description =
  "Calculate how large a portfolio you need for a target monthly dividend income, including yield and tax assumptions.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/goal",
  keywords: [
    "dividend income goal calculator",
    "passive income portfolio size",
    "monthly dividend target",
    "required portfolio calculator",
  ],
});

export default function GoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Dividend Income Goal Calculator",
          path: "/goal",
          description,
        })}
      />
      {children}
    </>
  );
}
