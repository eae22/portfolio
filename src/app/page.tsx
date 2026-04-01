import SectionLayout from "@/components/SectionLayout";
import Experience from "@/sections/Experience";
import Intro from "@/sections/Intro";
import Profile from "@/sections/Profile";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <main>
      <Intro />
      <Profile />
      <Skills />
      <Experience />
      <SectionLayout id="contact" fullHeight>
        <h1>Contact</h1>
      </SectionLayout>
    </main>
  );
}
