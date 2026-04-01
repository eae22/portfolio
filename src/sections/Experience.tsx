"use client";

import {
  ArrowUpRight,
  CodeXml,
  GraduationCap,
  type LucideIcon,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import {
  type ExperienceCategory,
  type ExperienceIcon,
  experienceCategories,
  experienceCategoryLabels,
  experiences,
} from "@/content/experience";
import styles from "./Experience.module.css";

const experienceIconMap: Record<ExperienceIcon, LucideIcon> = {
  rocket: Rocket,
  trophy: Trophy,
  terminal: CodeXml,
  users: Users,
  graduation: GraduationCap,
  sparkles: Sparkles,
};

function ExperienceIconGlyph({
  icon,
  className,
}: {
  icon: ExperienceIcon;
  className?: string;
}) {
  const Icon = experienceIconMap[icon];

  return <Icon className={className} aria-hidden="true" />;
}

export default function Experience() {
  const [selected, setSelected] = useState<ExperienceCategory>("all");
  const filteredExperiences =
    selected === "all"
      ? experiences
      : experiences.filter((item) => item.category === selected);

  return (
    <SectionLayout id="experience" className={styles.section}>
      <SectionHeader title="EXPERIENCE" />

      <SectionFilter
        ariaLabel="Filter experiences by category"
        options={experienceCategories}
        selected={selected}
        onChange={setSelected}
        layout="scroll"
      />

      <div className={styles.grid}>
        {filteredExperiences.map((item, index) => (
          <article
            key={`${selected}-${item.title}`}
            className={styles.card}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className={styles.cardMeta}>
              <div className={styles.iconTile}>
                <ExperienceIconGlyph
                  icon={item.icon}
                  className={styles.iconGlyph}
                />
              </div>
              <div className={styles.cardMetaCopy}>
                <span className={styles.categoryBadge}>
                  {experienceCategoryLabels[item.category]}
                </span>
                <p className={styles.cardPeriod}>{item.period}</p>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>

            {item.tags?.length ? (
              <div className={styles.tagGroup}>
                {item.tags.map((tag) => (
                  <span key={`${item.title}-${tag}`} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.cardLink} aria-hidden="true">
              <ArrowUpRight className={styles.cardLinkArrow} />
            </div>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}
