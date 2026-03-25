export default function Profile() {
  return (
    <section id="profile" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-8 w-1 rounded-full bg-(--color-text-primary)" />
        <h2 className="text-base font-bold tracking-wide text-(--color-text-primary)">
          PROFILE
        </h2>
      </div>

      <div className="mx-auto max-w-302.5 rounded-4xl border border-(--color-border-subtle) bg-(--color-surface-card) px-16 pt-16 pb-12 shadow-lg">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-16">
          <div className="space-y-5 text-right">
            <h3 className="text-lg font-semibold text-(--color-text-primary)">
              Eunjae Jang (장은재)
            </h3>
            <p className="text-base text-(--color-text-secondary)">
              Dongguk University, Senior
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-lg font-medium text-(--color-text-primary)">
              Seoul, South Korea
            </p>
            <p className="text-base text-(--color-text-secondary)">
              eun0110@dgu.ac.kr
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <a
            href="https://github.com/eae22"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-(--color-surface-secondary) px-7 py-2 text-sm font-semibold text-(--color-text-primary) transition-colors hover:bg-(--color-surface-secondary-hover)"
          >
            GitHub →
          </a>

          <a
            href="https://blog.naver.com/eae0110"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-(--color-border-subtle) bg-(--color-surface-pill) px-7 py-2 text-sm font-semibold text-(--color-text-primary) transition-colors hover:bg-(--color-surface-pill-hover)"
          >
            Blog →
          </a>
        </div>
      </div>
    </section>
  );
}
