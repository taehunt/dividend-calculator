import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "FIRE Calculator — When Can You Retire Early?";
const description =
  "Free FIRE calculator: estimate when your portfolio can cover living expenses with contributions, expected returns, and safe withdrawal rate. Plan Financial Independence, Retire Early.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/fire",
  keywords: [
    "FIRE calculator",
    "financial independence",
    "retire early calculator",
    "safe withdrawal rate",
    "passive income calculator",
  ],
});

export default function FireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower FIRE Calculator",
          path: "/fire",
          description,
        })}
      />
      {children}
    </>
  );
}
