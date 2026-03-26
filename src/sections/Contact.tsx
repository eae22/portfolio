"use client";

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
        <div className="h-8 w-1 rounded-full bg-(--color-text-primary)" />
        <h2 className="text-base font-bold tracking-(--letter-spacing-section) text-(--color-text-primary)">
          CONTACT
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-10 text-2xl font-bold text-(--color-text-primary) md:text-4xl">
          {EMAIL}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-(--color-border-subtle) bg-(--color-surface-card) px-8 py-3 text-sm font-semibold text-(--color-text-primary) transition-all duration-200 hover:scale-[1.03] hover:bg-(--color-surface-pill-hover) hover:shadow-md active:scale-[0.98]"
          >
            {copied ? "Copied!" : "Copy email"}
            <span aria-hidden="true">{copied ? "✓" : "📋"}</span>
          </button>
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-blue-500 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:scale-[1.03] hover:bg-gray-100 hover:shadow-md active:scale-[0.98]"
          >
            <span aria-hidden="true">✉️</span>
            Open Gmail
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
