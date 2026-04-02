import PillLink from "@/components/PillLink";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";

export default function Profile() {
  return (
    <SectionLayout id="profile">
      <ScrollReveal delay={40}>
        <SectionHeader title="PROFILE" />
      </ScrollReveal>

      <ScrollReveal delay={150}>
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
            <PillLink
              href="https://github.com/eae22"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="px-7 py-2"
            >
              GitHub →
            </PillLink>

            <PillLink
              href="https://blog.naver.com/eae0110"
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="px-7 py-2"
            >
              Blog →
            </PillLink>
          </div>
        </div>
      </ScrollReveal>
    </SectionLayout>
  );
}
