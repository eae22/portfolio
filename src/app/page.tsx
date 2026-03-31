import SectionLayout from "@/components/SectionLayout";
import Intro from "@/sections/Intro";
import Profile from "@/sections/Profile";

export default function Home() {
  return (
    <main>
      <Intro />
      <Profile />
      <SectionLayout id="skills" fullHeight>
        <h1>Skills</h1>
      </SectionLayout>
      <SectionLayout id="experience" fullHeight>
        <h1>Experience</h1>
      </SectionLayout>
      <SectionLayout id="contact" fullHeight>
        <h1>Contact</h1>
      </SectionLayout>
    </main>
  );
}
