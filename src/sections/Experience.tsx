"use client";

import {
  ArrowUpRight,
  BrainCircuit,
  ChartNoAxesColumnIncreasing,
  Database,
  type LucideIcon,
  Monitor,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionFilter from "@/components/SectionFilter";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import { getAwardByProject } from "@/content/achievements";
import {
  compareExperienceByLatest,
  describeExperienceRanking,
  type ExperienceArea,
  type ExperienceFilter,
  type ExperienceItem,
  experienceAreas,
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

// 아이콘은 Skills의 Data, AI, Web 카드와 맞춘다
const areaIcons: Record<ExperienceArea, LucideIcon> = {
  Data: Database,
  AI: BrainCircuit,
  Frontend: Monitor,
};

const areaOptions = experienceAreas.map(({ label, value }) => ({
  label,
  value,
  accent: "var(--color-experience-area)",
  icon: areaIcons[value],
}));

const FOCUS_PARAM = "focus";

// ?focus=data,ai → ["Data", "AI"] (모르는 값은 무시하고, 순서는 필터 버튼 순서로 맞춘다)
function readFocusAreas(search: string) {
  const raw = new URLSearchParams(search).get(FOCUS_PARAM) ?? "";
  const params = raw.toLowerCase().split(/[\s,]+/);

  return experienceAreas
    .filter((area) => params.includes(area.param))
    .map((area) => area.value);
}

// 고른 분야를 주소에 남겨서 그대로 복사해 보낼 수 있게 한다 (쉼표가 %2C로 바뀌지 않게 직접 붙인다)
function writeFocusAreas(areas: ExperienceArea[]) {
  const params = new URLSearchParams(window.location.search);
  params.delete(FOCUS_PARAM);

  const focus = experienceAreas
    .filter((area) => areas.includes(area.value))
    .map((area) => area.param)
    .join(",");
  const search = [params.toString(), focus ? `${FOCUS_PARAM}=${focus}` : ""]
    .filter(Boolean)
    .join("&");

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
  );
}

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
  const [selectedAreas, setSelectedAreas] = useState<ExperienceArea[]>([]);
  const [activeExperience, setActiveExperience] =
    useState<ExperienceItem | null>(null);
  const filteredExperiences = sortedExperiences.filter(
    (item) =>
      (selected === "all" || item.category === selected) &&
      (selectedAreas.length === 0 ||
        item.areas?.some((area) => selectedAreas.includes(area))),
  );
  const yearGroups = groupByYear(filteredExperiences);
  const filterKey = `${selected}-${selectedAreas.join(".")}`;
  const filtersRef = useRef<HTMLDivElement>(null);

  // 정적 페이지라 주소의 ?focus는 화면이 뜬 뒤에 읽는다
  useEffect(() => {
    setSelectedAreas(readFocusAreas(window.location.search));
  }, []);

  const updateAreas = (areas: ExperienceArea[]) => {
    setSelectedAreas(areas);
    writeFocusAreas(areas);
  };

  const toggleArea = (area: ExperienceArea) => {
    updateAreas(
      selectedAreas.includes(area)
        ? selectedAreas.filter((value) => value !== area)
        : [...selectedAreas, area],
    );
  };

  const resetFilters = () => {
    setSelected("all");
    updateAreas([]);
    // 누른 초기화 버튼이 사라지므로 포커스를 맨 앞 "All" 버튼으로 옮긴다
    filtersRef.current?.querySelector("button")?.focus();
  };

  return (
    <SectionLayout id="experience" className={styles.section}>
      <ScrollReveal delay={40}>
        <SectionHeader title="EXPERIENCE" accent="experience" />
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <div ref={filtersRef} className={styles.filters}>
          <SectionFilter
            ariaLabel="Filter experiences by category"
            options={filterOptions}
            selected={selected}
            onChange={setSelected}
            layout="wrap"
            tone="experience"
          />
          <SectionFilter
            ariaLabel="Filter experiences by area (multiple choice)"
            options={areaOptions}
            selected={selectedAreas}
            onChange={toggleArea}
            layout="wrap"
            tone="experience"
            appearance="tags"
            visibleLabel="Focus"
          />
        </div>
      </ScrollReveal>

      {/* 필터 결과가 바뀌면 스크린리더에 개수를 알린다 */}
      <output aria-live="polite" className="sr-only">
        {filteredExperiences.length > 0
          ? `경험 ${filteredExperiences.length}개`
          : "선택한 조건에 맞는 경험이 없어요"}
      </output>

      {filteredExperiences.length === 0 ? (
        <div className={styles.empty}>
          <p>선택한 조건에 맞는 경험이 없어요.</p>
          <button
            type="button"
            className={styles.emptyReset}
            onClick={resetFilters}
          >
            필터 초기화
          </button>
        </div>
      ) : null}

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
                  key={`${filterKey}-${item.id}`}
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
