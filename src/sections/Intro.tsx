import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLayout from "@/components/SectionLayout";

export default function Intro() {
  return (
    // 헤더(약 5rem)를 뺀 첫 화면 높이 안에서 상자를 세로 가운데에 둔다 (위에 붙어 아래가 비어 보이지 않게)
    <SectionLayout
      id="intro"
      className="flex min-h-[calc(100svh-5rem)] cursor-default items-center justify-center pt-10 pb-12 select-none md:pt-12 md:pb-16"
    >
      <div className="w-full max-w-312">
        <div className="relative mx-auto overflow-hidden rounded-[2.25rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.08),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,8,23,0.96))] px-5 py-8 shadow-[0_28px_72px_rgba(2,8,23,0.26)] sm:px-7 sm:py-9 md:px-10 md:py-10 lg:max-w-272">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-sky-200/8 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-12 h-24 w-24 rounded-full bg-fuchsia-200/8 blur-3xl"
          />

          {/* 큰 화면에서는 헤드라인이 '활용하고,' 뒤에서만 끊겨 두 줄이 되도록 글자 칸을 48rem까지 넓힌다 */}
          <div className="mx-auto max-w-[41rem] text-center lg:max-w-3xl">
            <ScrollReveal delay={80}>
              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.16em] text-text-tertiary uppercase">
                  Data &amp; AI Engineer
                </p>
                {/* 휴대폰에서는 '모으고,' 뒤에서도 끊어 '데이터를 모으고, / AI로 활용하고, / 화면까지 직접 만드는 / 엔지니어입니다.' 4줄로 맞춘다 */}
                <h1 className="mx-auto max-w-3xl text-[1.75rem] font-black leading-[1.15] tracking-[-0.05em] text-text-primary sm:text-[2rem] md:text-[2.4rem] md:leading-[1.06] lg:text-[2.8rem]">
                  데이터를 모으고,
                  <br className="sm:hidden" /> AI로 활용하고,
                  <br />
                  화면까지 직접 만드는 엔지니어입니다.
                </h1>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={170}>
              {/* 좁은 화면에서는 FOCUS 라벨을 위에, 키워드 세 개를 아래 한 줄에 둔다 */}
              <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-1 rounded-full bg-sky-300/85 shadow-[0_0_12px_rgba(125,211,252,0.22)]" />
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-200/78">
                    Focus
                  </p>
                </div>
                <span className="hidden text-text-tertiary/60 sm:inline">
                  |
                </span>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  {["데이터 수집", "AI 모델링", "화면 구현"].map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-200/70" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="mx-auto mt-7 max-w-2xl space-y-2 text-base leading-8 text-text-secondary md:text-lg">
                <p>데이터는 자동으로 모이도록 만들고,</p>
                <p>모델은 검증 기준을 세워 개선합니다.</p>
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
