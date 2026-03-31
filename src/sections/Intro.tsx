import PillLink from "@/components/PillLink";
import SectionLayout from "@/components/SectionLayout";

export default function Intro() {
  return (
    <SectionLayout
      id="intro"
      fullHeight
      className="flex flex-col items-center justify-center text-center"
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

      <PillLink href="#contact" className="px-6 py-2.5">
        Contact me →
      </PillLink>
    </SectionLayout>
  );
}
