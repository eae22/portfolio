"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import SkillPill from "@/components/SkillPill";
import { type SkillCategory, skillCategories, skills } from "@/content/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  const [selected, setSelected] = useState<SkillCategory>("all");
  const filteredSkills =
    selected === "all"
      ? skills
      : skills.filter((skill) => skill.categories.includes(selected));

  return (
    <SectionLayout id="skills" className={styles.section}>
      <ScrollReveal delay={40}>
        <SectionHeader title="SKILLS" accent="skills" />
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <SectionFilter
          ariaLabel="Filter skills by category"
          options={skillCategories}
          selected={selected}
          onChange={setSelected}
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, index) => (
            <SkillPill
              key={`${selected}-${skill.name}`}
              skill={skill}
              animationDelayMs={index * 45}
            />
          ))}
        </div>
      </ScrollReveal>
    </SectionLayout>
  );
}
