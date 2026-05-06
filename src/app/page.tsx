import SectionLayout from "@/components/SectionLayout";
import Intro from "@/sections/Intro";
import Profile from "@/sections/Profile";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <main>
      <Intro />
      <Profile />
      <Skills />
      <SectionLayout id="experience" fullHeight>
        <h1>Experience</h1>
      </SectionLayout>
      <SectionLayout id="contact" fullHeight>
        <h1>Contact</h1>
      </SectionLayout>
    </main>
  );
}
