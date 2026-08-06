import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Editorial Policy",
  description:
    "How YieldGrower selects, checks, discloses, updates, and corrects financial education content.",
  path: "/editorial-policy",
});

export default function EditorialPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
