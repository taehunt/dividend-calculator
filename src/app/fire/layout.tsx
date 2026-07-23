import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FIRE Calculator — When Can You Retire Early?",
  description:
    "Free FIRE calculator: estimate when your portfolio can cover living expenses with contributions, expected returns, and safe withdrawal rate. Plan Financial Independence, Retire Early.",
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
  return children;
}
