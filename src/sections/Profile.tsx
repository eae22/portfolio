import { ArrowUpRight, GitBranch, NotebookPen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";

export default function Profile() {
  return (
    <SectionLayout id="profile">
      <ScrollReveal delay={40}>
        <SectionHeader title="PROFILE" accent="profile" />
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="relative cursor-default select-none overflow-hidden rounded-[2rem] border border-border-subtle bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,8,23,0.94))] px-6 py-6 shadow-[0_24px_56px_rgba(2,8,23,0.24)] md:px-8 md:py-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-6 h-28 w-28 rounded-full bg-sky-200/6 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-10 h-24 w-24 rounded-full bg-slate-200/6 blur-3xl"
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.85fr)]">
            <div className="h-full rounded-[1.65rem] border border-white/8 bg-white/[0.02] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:px-8 md:py-7">
              <p className="mb-3 text-sm font-medium tracking-[0.14em] text-text-tertiary uppercase">
                장은재
              </p>
              <h3 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-text-primary md:text-[3rem]">
                Eunjae Jang
              </h3>
              <p className="mt-4 max-w-lg text-base leading-8 text-text-secondary md:text-lg">
                차분하고 구조적인 화면을 설계하는 프론트엔드 개발자입니다.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/eae22"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-[1rem] border-2 border-white/10 bg-[#0f1b3d] px-4.5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-[#13234d] hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)]"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8">
                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  GitHub
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://blog.naver.com/eae0110"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-[1rem] border-2 border-white/10 bg-white/[0.04] px-4.5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200/25 hover:bg-white/[0.07] hover:shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/6">
                    <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  Blog
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="grid h-full gap-2 [grid-template-rows:repeat(3,minmax(0,1fr))]">
              {[
                { label: "Based in", value: "Seoul, South Korea" },
                { label: "Studying at", value: "Dongguk University, Senior" },
                { label: "Email", value: "eun0110@dgu.ac.kr" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex h-full flex-col justify-center rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-200/80">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-text-primary md:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionLayout>
  );
}
