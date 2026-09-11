import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AdSenseScript from "@/components/AdSenseScript";
import JsonLd from "@/components/JsonLd";
import MoneySiteFooter from "@/components/MoneySiteFooter";
import MoneySiteHeader from "@/components/MoneySiteHeader";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });
const GOOGLE_CMP_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE",
  "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT",
  "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "돈결 - 돈을 대하는 방식 16유형",
    template: "%s | 돈결",
  },
  description: "20개의 생활 속 선택으로 알아보는 돈 성향 테스트. 나의 소비, 계획, 관계, 시간 관점과 정반대 유형을 확인하세요.",
  keywords: ["돈 성향 테스트", "소비 성향", "심리테스트", "돈 궁합", "재정 대화", "16유형"],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "돈결 - 돈을 대하는 방식 16유형",
    description: "돈 앞에서 드러나는 나만의 결을 20개의 선택으로 만나보세요.",
    url: SITE_URL,
    siteName: "돈결",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "돈결 - 돈을 대하는 방식 16유형",
    description: "돈 앞에서 드러나는 나만의 결을 20개의 선택으로 만나보세요.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" style={{ colorScheme: "light" }}>
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
      <body className={`${inter.className} bg-[#fffdf8] text-stone-900`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <MoneySiteHeader />
        {children}
        <MoneySiteFooter />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
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
