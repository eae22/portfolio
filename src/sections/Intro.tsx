export default function Intro() {
  return (
    <section
      id="intro"
      className="mx-auto flex min-h-screen max-w-5xl scroll-mt-16 flex-col items-center justify-center px-6 text-center"
    >
      <div className="mb-6 rounded-full bg-surface-badge px-5 py-2 text-sm text-text-secondary">
        👋 Welcome to my portfolio
      </div>

      <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl">
        한 줄 소개가 들어갈 자리
      </h1>

      <p className="mb-1 text-lg text-text-secondary md:text-xl">
        여기에 간단한 자기소개 문장이 들어갑니다.
      </p>
      <p className="mb-7 text-lg text-text-secondary md:text-xl">
        두 줄 정도의 간단한 소개 텍스트를 배치할 예정입니다.
      </p>

      <a
        href="#contact"
        className="rounded-full bg-surface-pill px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-pill-hover"
      >
        Contact me →
      </a>
    </section>
  );
}
