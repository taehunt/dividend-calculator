"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type TcfData = {
  gdprApplies?: boolean;
};

type GoogleFcApi = {
  callbackQueue?: Array<Record<string, () => void>>;
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    googlefc?: GoogleFcApi;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: TcfData | undefined, success: boolean) => void
    ) => void;
  }
}

const copy = {
  en: "Cookie Settings",
  ko: "쿠키 설정",
};

function getGoogleFc() {
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
  return window.googlefc;
}

export default function GooglePrivacySettingsButton() {
  const { lang } = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const googlefc = getGoogleFc();

    googlefc.callbackQueue?.push({
      CONSENT_API_READY: () => {
        if (cancelled || typeof window.__tcfapi !== "function") return;

        window.__tcfapi("addEventListener", 0, (data, success) => {
          if (!cancelled) {
            setIsVisible(Boolean(success && data?.gdprApplies));
          }
        });
      },
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function openPrivacySettings() {
    const googlefc = getGoogleFc();
    googlefc.callbackQueue?.push({
      CONSENT_API_READY: () => {
        window.googlefc?.showRevocationMessage?.();
      },
    });
  }

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={openPrivacySettings}
      className="text-slate-500 hover:text-indigo-600 transition-colors"
    >
      {copy[lang]}
    </button>
  );
}
