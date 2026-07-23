import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dividend Reinvestment & Compound Interest Calculator",
  description: "Calculate how your investments grow over time with the power of compound interest and dividend reinvestment (DRIP). Free visual calculator for FIRE movement and dividend investors.",
  keywords: "dividend calculator, compound interest, DRIP, investment calculator, FIRE movement, stock calculator, yield growth",
  openGraph: {
    title: "Dividend Reinvestment & Compound Interest Calculator",
    description: "Visualize your dividend snowball. Calculate how your investments grow over time with the power of compound interest and DRIP.",
    url: "https://yieldgrower.com",
    siteName: "YieldGrower",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dividend Reinvestment & Compound Interest Calculator",
    description: "Visualize your dividend snowball. Calculate how your investments grow over time with the power of compound interest and DRIP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
