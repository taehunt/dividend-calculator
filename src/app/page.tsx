import Link from "next/link";
import { ArrowRight, CalendarDays, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { AXES, AXIS_KEYS, MONEY_TYPES } from "@/lib/money-personality";

const previewTypes = [MONEY_TYPES[1], MONEY_TYPES[6], MONEY_TYPES[9], MONEY_TYPES[12]];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,#f6d9bd_0%,rgba(246,217,189,0)_68%)] opacity-65" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e7c7af] bg-[#fff8ef] px-4 py-2 text-sm font-black text-[#9d4b31]">
            <Sparkles className="h-4 w-4" /> 20개의 선택으로 만나는 나의 돈결
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-[1.08] tracking-[-0.065em] text-stone-950 sm:text-7xl">
            돈 앞에서 드러나는<br /><span className="text-[#b65335]">나만의 결</span>이 있습니다
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-8 text-stone-600 sm:text-xl">
            왜 나는 쓰고도 불안하고, 누군가는 모으고도 답답할까요? 돈을 대하는 네 가지 기준을 통해 나의 선택과 관계를 이해해 보세요.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/test" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f473b] px-7 text-base font-black text-white shadow-[0_14px_35px_rgba(31,71,59,0.22)] transition-transform hover:-translate-y-0.5 sm:w-auto">
              내 돈 성향 알아보기 <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/types" className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-stone-300 bg-white/80 px-7 text-base font-black text-stone-700 hover:bg-white sm:w-auto">
              16가지 유형 먼저 보기
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-stone-500">약 3분 · 회원가입 없음 · 브라우저에만 결과 저장</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black tracking-[0.15em] text-[#a34f32]">MONEY GRAIN 16</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-stone-950 sm:text-5xl">같은 돈, 서로 다른 의미</h2>
            </div>
            <Link href="/types" className="inline-flex items-center gap-1.5 text-sm font-black text-[#315c4c]">전체 유형 보기 <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {previewTypes.map((type) => (
              <Link key={type.slug} href={`/result/${type.slug}`} className="group rounded-[1.75rem] border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(71,55,40,0.1)]">
                <span className="text-4xl" aria-hidden="true">{type.emoji}</span>
                <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-stone-950">{type.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{type.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-black text-[#a34f32]">이 유형 읽기 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1f473b] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black tracking-[0.15em] text-[#f4c77b]">FOUR GRAINS</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-5xl">사람을 가르는 선이 아니라<br />대화를 여는 네 가지 축</h2>
            <p className="mt-5 text-base leading-8 text-[#d8e7de]">어느 쪽도 더 성숙하거나 옳지 않습니다. 상황에 따라 장점과 부담이 달라지는 선택의 기준입니다.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AXIS_KEYS.map((key, index) => {
              const axis = AXES[key];
              return (
                <article key={key} className="rounded-3xl border border-white/15 bg-white/7 p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f4c77b] text-sm font-black text-[#1f473b]">{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-black">{axis.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#c9ddd1]">{axis.question}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                    <div className="rounded-2xl bg-white/10 p-3"><b>{axis.low.label}</b></div>
                    <span className="text-[#f4c77b]">↔</span>
                    <div className="rounded-2xl bg-white/10 p-3"><b>{axis.high.label}</b></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: HeartHandshake, title: "관계 비교", body: "두 유형이 편하게 통하는 기준과 번역이 필요한 차이를 구체적인 대화 문장으로 확인합니다.", href: "/compatibility", cta: "두 유형 비교하기" },
            { icon: CalendarDays, title: "오늘의 선택", body: "매일 한 문항으로 오늘의 상태를 기록합니다. 유형은 고정된 낙인이 아니라 현재를 돌아보는 출발점입니다.", href: "/daily", cta: "오늘 질문 받기" },
            { icon: ShieldCheck, title: "과장하지 않는 결과", body: "임상 진단이나 투자 조언이 아닙니다. 문항 구성과 점수 계산법, 한계를 모두 공개합니다.", href: "/methodology", cta: "설계 원칙 읽기" },
          ].map((item) => (
            <article key={item.title} className="flex flex-col rounded-[1.75rem] border border-stone-200 bg-[#fffdf8] p-7">
              <item.icon className="h-7 w-7 text-[#b65335]" />
              <h2 className="mt-5 text-2xl font-black tracking-[-0.035em] text-stone-950">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-stone-600">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-black text-[#315c4c]">{item.cta} <ArrowRight className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#f3dfce] px-6 py-12 text-center sm:px-12">
          <p className="text-sm font-black tracking-[0.15em] text-[#9d4b31]">START WITH YOUR CHOICE</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-stone-950 sm:text-5xl">당신에게 돈은 무엇인가요?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-700">좋아 보이는 답이 아니라 평소의 선택을 고르면 됩니다. 결과는 평가가 아니라 이해를 위한 언어입니다.</p>
          <Link href="/test" className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#b65335] px-7 text-base font-black text-white hover:bg-[#9f472c]">테스트 시작하기 <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </section>
    </main>
  );
}
