import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";
import { LocaleProvider } from "@/components/LocaleProvider";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import {
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  SITE_URL,
} from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

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
            var yieldGrowerConsent = null;
            try {
              yieldGrowerConsent = localStorage.getItem(${JSON.stringify(
                CONSENT_STORAGE_KEY
              )});
            } catch (error) {}
            var yieldGrowerConsentState =
              yieldGrowerConsent === "granted" ? "granted" : "denied";
            gtag("consent", "default", {
              ad_storage: yieldGrowerConsentState,
              ad_user_data: yieldGrowerConsentState,
              ad_personalization: yieldGrowerConsentState,
              analytics_storage: yieldGrowerConsentState,
              wait_for_update: 500
            });
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <LocaleProvider>
          {children}
          <ConsentBanner />
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
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8003367600295337"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
