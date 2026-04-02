"use client";

import type { CSSProperties } from "react";
import {
  getSkillIconSrc,
  type SkillAccent,
  type SkillItem,
} from "@/content/skills";
import styles from "./SkillPill.module.css";

const fallbackSkillAccent = "var(--color-skill-neutral)";

type SkillPillStyle = CSSProperties & {
  "--skill-accent": string;
  "--skill-accent-secondary": string;
};

type SkillPillProps = {
  skill: Pick<SkillItem, "name" | "icon" | "accent" | "secondaryAccent">;
  animationDelayMs?: number;
  size?: "default" | "small";
};

function getSkillAccentVar(accent?: SkillAccent) {
  return accent ? `var(--color-skill-${accent})` : fallbackSkillAccent;
}

function getSkillPillStyle(
  accent: SkillAccent,
  secondaryAccent: SkillAccent | undefined,
  animationDelayMs?: number,
): SkillPillStyle {
  return {
    "--skill-accent": getSkillAccentVar(accent),
    "--skill-accent-secondary": getSkillAccentVar(secondaryAccent ?? accent),
    animationDelay:
      typeof animationDelayMs === "number"
        ? `${animationDelayMs}ms`
        : undefined,
  };
}

export default function SkillPill({
  skill,
  animationDelayMs,
  size = "default",
}: SkillPillProps) {
  const icons = Array.isArray(skill.icon) ? skill.icon : [skill.icon];

  return (
    <div
      className={
        size === "small" ? `${styles.pill} ${styles.small}` : styles.pill
      }
      style={getSkillPillStyle(
        skill.accent,
        skill.secondaryAccent,
        animationDelayMs,
      )}
    >
      <div className={styles.icons}>
        {icons.map((iconName) => (
          // biome-ignore lint/performance/noImgElement: Simple Icons SVGs are tiny decorative CDN assets, so raw img is the simpler fit here.
          <img
            key={`${skill.name}-${iconName}`}
            src={getSkillIconSrc(iconName)}
            alt=""
            aria-hidden="true"
            className={styles.icon}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <span className={styles.label}>{skill.name}</span>
    </div>
  );
}
