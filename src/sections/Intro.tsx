import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLayout from "@/components/SectionLayout";

export default function Intro() {
  return (
    <SectionLayout
      id="intro"
      fullHeight
      className="flex cursor-default items-start justify-center pt-14 md:pt-16 md:pb-12 select-none"
    >
      <div className="w-full max-w-312">
        <div className="relative mx-auto overflow-hidden rounded-[2.25rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.08),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,8,23,0.96))] px-7 py-9 shadow-[0_28px_72px_rgba(2,8,23,0.26)] md:px-10 md:py-10 lg:max-w-272">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-sky-200/8 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-12 h-24 w-24 rounded-full bg-fuchsia-200/8 blur-3xl"
          />

          <div className="mx-auto max-w-[41rem] text-center lg:max-w-164">
            <ScrollReveal delay={80}>
              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.16em] text-text-tertiary uppercase">
                  Frontend Developer
                </p>
                <h1 className="mx-auto max-w-3xl text-[2.4rem] font-black leading-[1.02] tracking-[-0.05em] text-text-primary md:text-[2.8rem]">
                  사용자 관점으로 문제를 해결하는
                  <br />
                  개발자입니다.
                </h1>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={170}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <div className="h-7 w-1 rounded-full bg-sky-300/85 shadow-[0_0_12px_rgba(125,211,252,0.22)]" />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-200/78">
                  Focus
                </p>
                <span className="text-text-tertiary/60">|</span>
                {["정보 구조", "사용자 흐름", "문제 해결"].map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-200/70" />
                    {keyword}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="mx-auto mt-7 max-w-2xl space-y-2 text-base leading-8 text-text-secondary md:text-lg">
                <p>사용자의 입장에서 서비스를 고민하며</p>
                <p>실질적인 문제를 해결하는 개발자가 되고자 합니다.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={360}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-[1rem] border-2 border-white/10 bg-[#0f1b3d] px-4.5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-[#13234d] hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)]"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
