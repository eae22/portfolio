"use client";

import {
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import { getAwardByProject } from "@/content/achievements";
import {
  compareExperienceByLatest,
  describeExperienceRanking,
  type ExperienceFilter,
  type ExperienceItem,
  experienceCategoryColors,
  experienceFilters,
  experiences,
  formatExperiencePeriod,
  formatExperienceRanking,
  getExperienceYear,
} from "@/content/experience";
import styles from "./Experience.module.css";
import ExperienceDetailModal from "./ExperienceDetailModal";

const STACK_PREVIEW_COUNT = 3;

const sortedExperiences = [...experiences].sort(compareExperienceByLatest);

// 필터 점 색을 카테고리 색과 맞춰 범례로 쓴다 (All은 중립색)
const filterOptions = experienceFilters.map((option) => ({
  ...option,
  accent:
    option.value === "all"
      ? "var(--color-text-secondary)"
      : experienceCategoryColors[option.value],
}));

function groupByYear(items: ExperienceItem[]) {
  const groups: { year: string; items: ExperienceItem[] }[] = [];

  for (const item of items) {
    const year = getExperienceYear(item);
    const lastGroup = groups.at(-1);

    if (lastGroup?.year === year) {
      lastGroup.items.push(item);
    } else {
      groups.push({ year, items: [item] });
    }
  }

  return groups;
}

function getStackPreview(stack: string[]) {
  return {
    names: stack.slice(0, STACK_PREVIEW_COUNT).join(" · "),
    restCount: Math.max(0, stack.length - STACK_PREVIEW_COUNT),
  };
}

function ExperienceCard({
  item,
  animationDelayMs,
  onSelect,
}: {
  item: ExperienceItem;
  animationDelayMs: number;
  onSelect: (item: ExperienceItem) => void;
}) {
  const award = getAwardByProject(item.id);
  const stackPreview = getStackPreview(item.stack);

  return (
    <button
      type="button"
      className={styles.card}
      data-category={item.category}
      style={{ animationDelay: `${animationDelayMs}ms` }}
      onClick={() => onSelect(item)}
      aria-haspopup="dialog"
      aria-label={`${item.title} 상세 보기`}
      data-cursor="detail"
    >
      <span className={styles.cardMeta}>
        <span className={styles.category}>
          <span className={styles.categoryDot} aria-hidden="true" />
          {item.category}
        </span>
        <span className={styles.cardPeriod}>
          {formatExperiencePeriod(item.period)}
        </span>
        {award ? (
          <span className={styles.award}>
            <Trophy className={styles.awardIcon} aria-hidden="true" />
            {award.shortName}
          </span>
        ) : null}
        {item.ranking ? (
          <span
            className={styles.ranking}
            data-tooltip={describeExperienceRanking(item.ranking)}
            data-tooltip-side="left"
          >
            <ChartNoAxesColumnIncreasing
              className={styles.awardIcon}
              aria-hidden="true"
            />
            {formatExperienceRanking(item.ranking)}
          </span>
        ) : null}
      </span>

      <span className={styles.cardHeading}>
        <span className={styles.cardTitle}>{item.title}</span>
        {item.subtitle ? (
          <span className={styles.cardSubtitle}>{item.subtitle}</span>
        ) : null}
      </span>
      <span className={styles.cardSummary}>{item.summary}</span>

      <span className={styles.cardFooter}>
        {item.stack.length > 0 ? (
          <span className={styles.cardStack}>
            <span className={styles.cardStackNames}>{stackPreview.names}</span>
            {stackPreview.restCount > 0 ? (
              <span className={styles.cardStackMore}>
                +{stackPreview.restCount}
              </span>
            ) : null}
          </span>
        ) : null}
        <ArrowUpRight className={styles.cardArrow} aria-hidden="true" />
      </span>
    </button>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState<ExperienceFilter>("all");
  const [activeExperience, setActiveExperience] =
    useState<ExperienceItem | null>(null);
  const filteredExperiences =
    selected === "all"
      ? sortedExperiences
      : sortedExperiences.filter((item) => item.category === selected);
  const yearGroups = groupByYear(filteredExperiences);

  return (
    <SectionLayout id="experience" className={styles.section}>
      <ScrollReveal delay={40}>
        <SectionHeader title="EXPERIENCE" accent="experience" />
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <SectionFilter
          ariaLabel="Filter experiences by category"
          options={filterOptions}
          selected={selected}
          onChange={setSelected}
          layout="wrap"
          tone="experience"
        />
      </ScrollReveal>

      <div className={styles.timeline}>
        {yearGroups.map((group) => (
          // 연도 묶음은 화면보다 길어질 수 있어 비율(threshold) 대신 조금이라도 보이면 드러낸다
          <ScrollReveal
            key={group.year}
            className={styles.yearGroup}
            delay={120}
            threshold={0}
          >
            <div className={styles.yearRail}>
              <h3 className={styles.yearLabel}>
                <span className={styles.yearDot} aria-hidden="true" />
                {group.year}
              </h3>
            </div>

            <div className={styles.grid}>
              {group.items.map((item) => (
                <ExperienceCard
                  key={`${selected}-${item.id}`}
                  item={item}
                  animationDelayMs={filteredExperiences.indexOf(item) * 60}
                  onSelect={setActiveExperience}
                />
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {activeExperience ? (
        <ExperienceDetailModal
          item={activeExperience}
          onClose={() => setActiveExperience(null)}
        />
      ) : null}
    </SectionLayout>
  );
}
