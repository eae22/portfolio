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
import ScrollReveal from "@/components/ScrollReveal";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import {
  type ExperienceCategory,
  type ExperienceIcon,
  type ExperienceItem,
  experienceCategories,
  experienceCategoryLabels,
  experiences,
} from "@/content/experience";
import styles from "./Experience.module.css";
import ExperienceDetailModal from "./ExperienceDetailModal";

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
  const [activeExperience, setActiveExperience] =
    useState<ExperienceItem | null>(null);
  const filteredExperiences =
    selected === "all"
      ? experiences
      : experiences.filter((item) => item.category === selected);

  return (
    <SectionLayout id="experience" className={styles.section}>
      <ScrollReveal delay={40}>
        <SectionHeader title="EXPERIENCE" />
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <SectionFilter
          ariaLabel="Filter experiences by category"
          options={experienceCategories}
          selected={selected}
          onChange={setSelected}
          layout="wrap"
          tone="experience"
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <div className={styles.grid}>
          {filteredExperiences.map((item, index) => (
            <button
              type="button"
              key={`${selected}-${item.title}`}
              className={styles.card}
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => setActiveExperience(item)}
              aria-haspopup="dialog"
              aria-label={`${item.title} 상세 보기`}
            >
              <div className={styles.cardContent}>
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
              </div>
            </button>
          ))}
        </div>
      </ScrollReveal>

      {activeExperience ? (
        <ExperienceDetailModal
          item={activeExperience}
          onClose={() => setActiveExperience(null)}
        />
      ) : null}
    </SectionLayout>
  );
}
