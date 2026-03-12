import Intro from "@/sections/Intro";
import Profile from "@/sections/Profile";

export default function Home() {
  const sectionClassName =
    "mx-auto min-h-screen max-w-5xl scroll-mt-16 px-6 py-24";

  return (
    <main>
      <section id="intro">
        <Intro />
      </section>

      <section id="profile">
        <Profile />
      </section>

      <section id="skills" className={sectionClassName}>
        <h1>Skills</h1>
      </section>

      <section id="experience" className={sectionClassName}>
        <h1>Experience</h1>
      </section>

      <section id="contact" className={sectionClassName}>
        <h1>Contact</h1>
      </section>
    </main>
  );
}
