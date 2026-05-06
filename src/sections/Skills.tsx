"use client";

import { type CSSProperties, useMemo, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import {
  type SkillAccent,
  type SkillCategory,
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

export default function Skills() {
  const [selected, setSelected] = useState<SkillCategory>("all");

  const filteredSkills = useMemo(() => {
    if (selected === "all") return skills;

    return skills.filter((skill) => skill.categories.includes(selected));
  }, [selected]);

  return (
    <SectionLayout id="skills" className={styles.section}>
      <SectionHeader title="SKILLS" />

      <div className={styles.filterGroup}>
        {skillCategories.map((cat) => {
          const isActive = selected === cat.value;

          return (
            <button
              type="button"
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              aria-pressed={isActive}
              data-active={isActive}
              className={styles.filterButton}
            >
              <span className={styles.filterButtonDot} aria-hidden="true" />
              <span className={styles.filterButtonLabel}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.skillsGrid}>
        {filteredSkills.map((skill, index) => (
          <div
            key={`${selected}-${skill.name}`}
            className={styles.skillChip}
            style={getSkillChipStyle(
              skill.accent,
              skill.secondaryAccent,
              index,
            )}
          >
            <div className={styles.skillChipIcons}>
              {Array.isArray(skill.icon) ? (
                skill.icon.map((icon) => (
                  <img
                    key={icon}
                    src={`https://cdn.simpleicons.org/${icon}`}
                    alt={icon}
                    className={styles.skillIcon}
                  />
                ))
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${skill.icon}`}
                  alt={skill.name}
                  className={styles.skillIcon}
                />
              )}
            </div>
            {skill.name}
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}
