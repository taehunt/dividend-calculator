import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compound Interest Calculator — Growth Over Time",
  description:
    "Free compound interest calculator with monthly contributions. Visualize how principal and regular investing grow over years.",
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
  return children;
}
