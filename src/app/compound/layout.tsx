import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";
import { pageMeta } from "@/lib/seo";

const title = "Compound Interest Calculator — Growth Over Time";
const description =
  "Free compound interest calculator with monthly contributions. Visualize how principal and regular investing grow over years.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/compound",
  keywords: [
    "compound interest calculator",
    "compound growth calculator",
    "monthly contribution calculator",
    "investment growth chart",
  ],
});

export default function CompoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Compound Interest Calculator",
          path: "/compound",
          description,
        })}
      />
      {children}
    </>
  );
}
