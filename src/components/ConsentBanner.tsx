"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { CONSENT_STORAGE_KEY } from "@/lib/site";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_EVENT = "yieldgrower:consent-changed";
export const OPEN_CONSENT_EVENT = "yieldgrower:open-consent";

const copy = {
  en: {
    title: "Cookie choices",
    body:
      "We use Google Analytics to understand site usage and Google AdSense for advertising. You can allow or reject non-essential storage.",
    privacy: "Privacy Policy",
    reject: "Reject non-essential",
    accept: "Accept all",
  },
  ko: {
    title: "쿠키 선택",
    body:
      "사이트 이용 분석을 위해 Google Analytics를, 광고를 위해 Google AdSense를 사용합니다. 필수 항목 외 저장을 허용하거나 거부할 수 있습니다.",
    privacy: "개인정보 처리방침",
    reject: "필수 항목 외 거부",
    accept: "모두 허용",
  },
};

function getConsentSnapshot(): ConsentChoice | null | "loading" {
  if (typeof window === "undefined") return "loading";
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

function updateGoogleConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export default function ConsentBanner() {
  const { lang } = useLocale();
  const t = copy[lang];
  const choice = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "loading"
  );
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setForceOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    } catch {
      // Consent still applies to the current page when storage is unavailable.
    }
    updateGoogleConsent(nextChoice);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setForceOpen(false);
  }

  if (choice === "loading" || (!forceOpen && choice !== null)) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur print:hidden"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 id="consent-title" className="font-semibold text-slate-900">
            {t.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {t.body}{" "}
            <Link
              href="/privacy"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              {t.privacy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => saveChoice("denied")}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => saveChoice("granted")}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
