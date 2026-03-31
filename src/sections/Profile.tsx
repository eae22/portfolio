export default function Profile() {
  return (
    <section id="profile" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-8 w-1 rounded-full bg-text-primary" />
        <h2 className="text-base font-bold tracking-wide text-text-primary">
          PROFILE
        </h2>
      </div>

      <div className="mx-auto max-w-302.5 rounded-4xl border border-border-subtle bg-surface-card px-16 pt-16 pb-12 shadow-lg">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-16">
          <div className="space-y-5 text-right">
            <h3 className="text-lg font-semibold text-text-primary">
              Eunjae Jang (장은재)
            </h3>
            <p className="text-base text-text-secondary">
              Dongguk University, Senior
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-lg font-medium text-text-primary">
              Seoul, South Korea
            </p>
            <p className="text-base text-text-secondary">eun0110@dgu.ac.kr</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <a
            href="https://github.com/eae22"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-surface-secondary px-7 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary-hover"
          >
            GitHub →
          </a>

          <a
            href="https://blog.naver.com/eae0110"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border-subtle bg-surface-pill px-7 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-pill-hover"
          >
            Blog →
          </a>
        </div>
      </div>
    </section>
  );
}
