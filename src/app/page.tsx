import Contact from "@/sections/Contact";
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
      <Contact />
    </main>
  );
}
