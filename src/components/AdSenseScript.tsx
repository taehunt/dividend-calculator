"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const MONETIZABLE_PATHS = new Set([
  "/",
  "/types",
  "/methodology",
  "/result/steady-vault",
  "/result/future-architect",
  "/result/life-coordinator",
  "/result/family-planner",
  "/result/adaptive-guardian",
  "/result/quiet-opportunity-keeper",
  "/result/warm-pragmatist",
  "/result/flexible-supporter",
  "/result/planned-enjoyer",
  "/result/strategic-pioneer",
  "/result/experience-curator",
  "/result/shared-pioneer",
  "/result/spontaneous-explorer",
  "/result/bold-experimenter",
  "/result/social-spark",
  "/result/possibility-sponsor",
]);

export default function AdSenseScript() {
  const pathname = usePathname();

  if (!MONETIZABLE_PATHS.has(pathname)) return null;

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
