"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Globe, PieChart } from "lucide-react";

type Lang = "en" | "ko";
type Currency = "USD" | "KRW";

type SiteHeaderProps = {
  active?:
    | "dividend"
    | "fire"
    | "average"
    | "tax"
    | "compound"
    | "goal"
    | "cagr"
    | "tools"
    | "blog"
    | "privacy";
  lang?: Lang;
  currency?: Currency;
  onLangChange?: (lang: Lang) => void;
  onCurrencyChange?: (currency: Currency) => void;
  showLocaleControls?: boolean;
};

const labels = {
  en: {
    tools: "Tools",
    dividend: "Dividend Calculator",
    fire: "FIRE Calculator",
    average: "Average Cost Calculator",
    tax: "Dividend Tax Calculator",
    compound: "Compound Interest Calculator",
    goal: "Dividend Income Goal",
    cagr: "CAGR Calculator",
    allTools: "All Tools",
    blog: "Blog",
  },
  ko: {
    tools: "도구",
    dividend: "배당 계산기",
    fire: "FIRE 계산기",
    average: "평단가 계산기",
    tax: "배당세 계산기",
    compound: "복리 계산기",
    goal: "배당 목표 소득",
    cagr: "CAGR 계산기",
    allTools: "전체 도구",
    blog: "블로그",
  },
};

export default function SiteHeader({
  active,
  lang = "en",
  currency = "USD",
  onLangChange,
  onCurrencyChange,
  showLocaleControls = false,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const t = labels[lang];

  const toolActive =
    active === "dividend" ||
    active === "fire" ||
    active === "average" ||
    active === "tax" ||
    active === "compound" ||
    active === "goal" ||
    active === "cagr" ||
    active === "tools";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            YieldGrower
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          {showLocaleControls && (
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
              <div className="flex items-center pl-2 pr-1 border-r border-slate-200">
                <Globe className="w-4 h-4 text-slate-400 mr-1" />
                <select
                  value={lang}
                  onChange={(e) => onLangChange?.(e.target.value as Lang)}
                  className="text-sm bg-transparent text-slate-700 py-1 pr-2 focus:outline-none cursor-pointer font-medium"
                >
                  <option value="en">EN</option>
                  <option value="ko">한국어</option>
                </select>
              </div>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange?.(e.target.value as Currency)}
                className="text-sm bg-transparent text-slate-700 py-1 pl-2 pr-2 focus:outline-none cursor-pointer font-medium"
              >
                <option value="USD">USD ($)</option>
                <option value="KRW">KRW (₩)</option>
              </select>
            </div>
          )}

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className={`inline-flex items-center gap-1 hover:text-indigo-600 transition-colors ${
                  toolActive ? "text-indigo-600" : ""
                }`}
                onClick={() => setOpen((v) => !v)}
              >
                {t.tools}
                <ChevronDown className="w-4 h-4" />
              </button>
              {open && (
                <div className="absolute left-0 top-full pt-2 w-64">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-2">
                    <Link
                      href="/"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "dividend" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.dividend}
                    </Link>
                    <Link
                      href="/fire"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "fire" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.fire}
                    </Link>
                    <Link
                      href="/average"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "average" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.average}
                    </Link>
                    <Link
                      href="/tax"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "tax" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.tax}
                    </Link>
                    <Link
                      href="/compound"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "compound" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.compound}
                    </Link>
                    <Link
                      href="/goal"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "goal" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.goal}
                    </Link>
                    <Link
                      href="/cagr"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "cagr" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.cagr}
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <Link
                      href="/tools"
                      className={`block px-4 py-2.5 hover:bg-slate-50 ${
                        active === "tools" ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {t.allTools}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/blog"
              className={`hover:text-indigo-600 transition-colors ${
                active === "blog" ? "text-indigo-600" : ""
              }`}
            >
              {t.blog}
            </Link>
          </nav>

          {/* Mobile quick links */}
          <nav className="flex md:hidden items-center gap-3 text-sm font-medium text-slate-600">
            <Link href="/tools" className={toolActive ? "text-indigo-600" : ""}>
              {t.tools}
            </Link>
            <Link href="/blog" className={active === "blog" ? "text-indigo-600" : ""}>
              {t.blog}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
