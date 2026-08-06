"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const NON_CONTENT_PATHS = new Set([
  "/about",
  "/contact",
  "/editorial-policy",
  "/privacy",
]);

export default function AdSenseScript() {
  const pathname = usePathname();

  if (NON_CONTENT_PATHS.has(pathname)) return null;

  return (
    <Script
      id="google-adsense"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8003367600295337"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
