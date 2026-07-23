import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yieldgrower.com"),
  title: {
    default: "Dividend Reinvestment & Compound Interest Calculator",
    template: "%s | YieldGrower",
  },
  description:
    "Calculate how your investments grow over time with the power of compound interest and dividend reinvestment (DRIP). Free visual calculator for FIRE movement and dividend investors.",
  keywords:
    "dividend calculator, compound interest, DRIP, investment calculator, FIRE movement, stock calculator, yield growth",
  alternates: {
    canonical: "https://yieldgrower.com",
  },
  openGraph: {
    title: "Dividend Reinvestment & Compound Interest Calculator",
    description:
      "Visualize your dividend snowball. Calculate how your investments grow over time with the power of compound interest and DRIP.",
    url: "https://yieldgrower.com",
    siteName: "YieldGrower",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dividend Reinvestment & Compound Interest Calculator",
    description:
      "Visualize your dividend snowball. Calculate how your investments grow over time with the power of compound interest and DRIP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8003367600295337"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <LocaleProvider>
          {children}
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
