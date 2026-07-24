"use client";

import { useEffect, useRef, useState } from "react";
import { readStoredJson, writeStoredJson } from "@/lib/calculator-storage";
import {
  formatUrlNumber,
  readUrlBoolean,
  readUrlNumber,
  readUrlParam,
  writeUrlParam,
} from "@/lib/calculator-url";

type UrlOptions = {
  /** Short query key for shareable links. URL wins over localStorage. */
  urlParam?: string;
  urlType?: "number" | "boolean" | "string";
};

/**
 * Persist a calculator field in localStorage after first client hydrate.
 * Optional urlParam keeps the address bar shareable.
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  options?: UrlOptions
) {
  const [value, setValue] = useState<T>(defaultValue);
  const hydrated = useRef(false);
  const urlParam = options?.urlParam;
  const urlType = options?.urlType ?? "number";

  useEffect(() => {
    if (urlParam) {
      if (urlType === "boolean") {
        const fromUrl = readUrlBoolean(urlParam);
        if (fromUrl !== undefined) {
          setValue(fromUrl as T);
          hydrated.current = true;
          return;
        }
      } else if (urlType === "string") {
        const fromUrl = readUrlParam(urlParam);
        if (fromUrl !== undefined) {
          setValue(fromUrl as T);
          hydrated.current = true;
          return;
        }
      } else {
        const fromUrl = readUrlNumber(urlParam);
        if (fromUrl !== undefined) {
          setValue(fromUrl as T);
          hydrated.current = true;
          return;
        }
      }
    }

    const stored = readStoredJson<T>(key);
    if (stored !== undefined) {
      setValue(stored);
    }
    hydrated.current = true;
  }, [key, urlParam, urlType]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStoredJson(key, value);

    if (!urlParam) return;
    if (urlType === "boolean") {
      writeUrlParam(urlParam, value ? "1" : "0");
    } else if (urlType === "string") {
      writeUrlParam(urlParam, String(value));
    } else {
      writeUrlParam(urlParam, formatUrlNumber(Number(value)));
    }
  }, [key, value, urlParam, urlType]);

  return [value, setValue] as const;
}
