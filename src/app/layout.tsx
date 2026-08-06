import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";
import AdSenseScript from "@/components/AdSenseScript";

const inter = Inter({ subsets: ["latin"] });
const GOOGLE_CMP_REGIONS = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dividend Reinvestment & Compound Interest Calculator",
    template: "%s | YieldGrower",
  },
  description:
    "Calculate how your investments grow over time with the power of compound interest and dividend reinvestment (DRIP). Free visual calculator for FIRE movement and dividend investors.",
  keywords:
    "dividend calculator, compound interest, DRIP, investment calculator, FIRE movement, stock calculator, yield growth",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Dividend Reinvestment & Compound Interest Calculator",
    description:
      "Visualize your dividend snowball. Calculate how your investments grow over time with the power of compound interest and DRIP.",
    url: SITE_URL,
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
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <script
          id="google-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("consent", "default", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              analytics_storage: "denied",
              wait_for_update: 500,
              region: ${JSON.stringify(GOOGLE_CMP_REGIONS)}
            });
            gtag("consent", "default", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
              analytics_storage: "granted"
            });
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <LocaleProvider>
          {children}
          <SiteFooter />
        </LocaleProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", ${JSON.stringify(GA_MEASUREMENT_ID)});
          `}
        </Script>
        <AdSenseScript />
      </body>
    </html>
  );
}
