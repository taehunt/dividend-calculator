"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { href: "/test", label: "성향 테스트" },
  { href: "/types", label: "16가지 유형" },
  { href: "/compatibility", label: "관계 비교" },
  { href: "/daily", label: "오늘의 선택" },
];

export default function MoneySiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf8]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#1f473b] text-[#fff8e8] shadow-sm transition-transform group-hover:-rotate-3">
            <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-black leading-none tracking-[-0.04em] text-stone-900">돈결</span>
            <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.16em] text-stone-500">MONEY GRAIN</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "bg-[#e8efe9] text-[#1f473b]"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-stone-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-stone-200 bg-[#fffdf8] px-4 py-3 md:hidden" aria-label="모바일 메뉴">
          <div className="mx-auto grid max-w-6xl gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-stone-700 hover:bg-stone-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
