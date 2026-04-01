"use client";

import { type CSSProperties, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import {
  type SkillAccent,
  type SkillCategory,
  type SkillItem,
  skillCategories,
  skills,
} from "@/content/skills";
import styles from "./Skills.module.css";

const fallbackSkillAccent = "var(--color-skill-neutral)";

type SkillChipStyle = CSSProperties & {
  "--skill-accent": string;
  "--skill-accent-secondary": string;
};

function getSkillAccentVar(accent?: SkillAccent) {
  return accent ? `var(--color-skill-${accent})` : fallbackSkillAccent;
}

function getSkillChipStyle(
  accent: SkillAccent,
  secondaryAccent: SkillAccent | undefined,
  index: number,
): SkillChipStyle {
  return {
    "--skill-accent": getSkillAccentVar(accent),
    "--skill-accent-secondary": getSkillAccentVar(secondaryAccent ?? accent),
    animationDelay: `${index * 45}ms`,
  };
}

function getSkillIconSrc(icon: string) {
  return `https://cdn.simpleicons.org/${icon}`;
}

function SkillIcons({ icon, name }: Pick<SkillItem, "icon" | "name">) {
  const icons = Array.isArray(icon) ? icon : [icon];

  return icons.map((iconName) => (
    // biome-ignore lint/performance/noImgElement: Simple Icons SVGs are tiny decorative CDN assets, so raw img is the simpler fit here.
    <img
      key={`${name}-${iconName}`}
      src={getSkillIconSrc(iconName)}
      alt=""
      aria-hidden="true"
      className={styles.skillIcon}
      loading="lazy"
      decoding="async"
    />
  ));
}

export default function Skills() {
  const [selected, setSelected] = useState<SkillCategory>("all");
  const filteredSkills =
    selected === "all"
      ? skills
      : skills.filter((skill) => skill.categories.includes(selected));

  return (
    <SectionLayout id="skills" className={styles.section}>
      <ScrollReveal delay={80}>
        <SectionHeader title="SKILLS" />
      </ScrollReveal>

      <ScrollReveal delay={220}>
        <SectionFilter
          ariaLabel="Filter skills by category"
          options={skillCategories}
          selected={selected}
          onChange={setSelected}
        />
      </ScrollReveal>

      <div className={styles.skillsGrid}>
        {filteredSkills.map((skill, index) => (
          <ScrollReveal
            as="div"
            key={`${selected}-${skill.name}`}
            className={styles.skillChip}
            delay={340 + index * 70}
            style={getSkillChipStyle(
              skill.accent,
              skill.secondaryAccent,
              index,
            )}
          >
            <div className={styles.skillChipIcons}>
              <SkillIcons icon={skill.icon} name={skill.name} />
            </div>
            {skill.name}
          </ScrollReveal>
        ))}
      </div>
    </SectionLayout>
  );
}
