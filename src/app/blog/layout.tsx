import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "YieldGrower Tools",
  robots: { index: false, follow: true },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
