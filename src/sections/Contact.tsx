"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
      <div className="mb-20 flex items-center gap-4">
        <div className="h-8 w-1 rounded-full bg-text-primary" />
        <h2 className="text-base font-bold tracking-(--letter-spacing-section) text-text-primary">
          CONTACT
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <p className="text-xl font-bold text-text-primary md:text-3xl">
            {EMAIL}
          </p>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
              copied
                ? "border-border-accent bg-surface-pill text-text-primary shadow-md"
                : "border-border-subtle bg-surface-card text-text-primary hover:scale-[1.03] hover:bg-surface-pill-hover hover:shadow-md"
            }`}
            aria-live="polite"
          >
            <span className="relative inline-flex h-5 min-w-34 items-center justify-center overflow-hidden text-center">
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
                <Check aria-hidden="true" className="h-4 w-4 stroke-[2.4]" />
              </span>
            </span>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-blue-500 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:scale-[1.03] hover:bg-gray-100 hover:shadow-md active:scale-[0.98]"
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
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
