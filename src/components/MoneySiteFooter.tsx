import Link from "next/link";
import GooglePrivacySettingsButton from "@/components/GooglePrivacySettingsButton";

export default function MoneySiteFooter() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-[#f4f0e6]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-lg font-black tracking-[-0.03em] text-stone-900">돈결</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
            돈을 대하는 방식을 이해하고 대화를 시작하기 위한 비임상적 자기이해 도구입니다. 심리 진단이나 재정 자문을 제공하지 않습니다.
          </p>
          <p className="mt-4 text-xs text-stone-600">© 2026 Money Grain, a YieldGrower project.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-stone-600" aria-label="보조 메뉴">
          <Link href="/methodology" className="hover:text-stone-950">설계 원칙</Link>
          <Link href="/about" className="hover:text-stone-950">소개</Link>
          <Link href="/privacy" className="hover:text-stone-950">개인정보</Link>
          <Link href="/contact" className="hover:text-stone-950">문의</Link>
          <GooglePrivacySettingsButton />
        </nav>
      </div>
    </footer>
  );
}
