"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";

const EMAIL = "eun0110@dgu.ac.kr";
const GMAIL_COMPOSE_URL =
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent("포트폴리오 사이트 관련 문의드립니다")}`;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("이메일 복사에 실패했습니다.", error);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <ScrollReveal delay={40}>
        <SectionHeader title="CONTACT" accent="contact" />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary">
            Let&apos;s connect
          </p>
          <p className="mb-8 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
            프로젝트, 협업, 프론트엔드 개발 이야기를 편하게 남겨주세요.
          </p>
          <div className="mb-4 flex flex-col items-center gap-2 rounded-2xl border-2 border-border-subtle bg-surface-card px-5 py-4 shadow-[0_18px_50px_rgba(5,10,30,0.18)] md:px-6">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              Email
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <p className="text-lg font-bold text-text-primary md:text-[1.2rem]">
                {EMAIL}
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`flex cursor-pointer items-center rounded-sm border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.98] md:px-5 ${
                  copied
                    ? "border-border-accent bg-surface-pill text-text-primary shadow-md"
                    : "border-border-subtle bg-bg-elevated text-text-primary hover:scale-[1.03] hover:bg-surface-pill-hover hover:shadow-md"
                }`}
                aria-live="polite"
              >
                <span className="relative inline-flex h-4 min-w-22 items-center justify-center overflow-hidden text-center">
                  <span
                    className={`inline-flex w-full items-center justify-center gap-2 transition-all duration-200 ${
                      copied
                        ? "-translate-y-6 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    <span>Copy email</span>
                    <Copy aria-hidden="true" className="h-4 w-4 stroke-[2.2]" />
                  </span>
                  <span
                    className={`absolute inset-0 inline-flex w-full items-center justify-center gap-2 transition-all duration-200 ${
                      copied
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    <span>Copied!</span>
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 stroke-[2.4]"
                    />
                  </span>
                </span>
              </button>
            </div>
            <p
              className={`text-xs transition-colors duration-200 ${
                copied ? "text-text-secondary" : "text-text-tertiary"
              }`}
            ></p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex cursor-pointer items-center gap-2 rounded-full border-2 border-blue-500 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-[0.98]"
            >
              {/* biome-ignore lint/performance/noImgElement: Small external Gmail brand icon is decorative and simplest as a raw img. */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain translate-y-px"
                loading="lazy"
                decoding="async"
              />
              Open Gmail
              <span
                aria-hidden="true"
                className="inline-flex transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
