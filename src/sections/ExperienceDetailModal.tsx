"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  GitBranch,
  Link2,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SkillPill from "@/components/SkillPill";
import { getAwardByProject } from "@/content/achievements";
import {
  describeExperienceRanking,
  type ExperienceItem,
  formatExperiencePeriod,
  formatExperienceRanking,
} from "@/content/experience";
import { getTechBadge } from "@/content/skills";
import styles from "./ExperienceDetailModal.module.css";

type ExperienceDetailModalProps = {
  item: ExperienceItem;
  onClose: () => void;
};

type DetailSectionTitleProps = {
  number: number;
  title: string;
};

type DetailSectionKey =
  | "overview"
  | "features"
  | "stack"
  | "roles"
  | "problems";

// 모달이 열려 있는 동안 뒤 페이지를 잠근다: 스크롤을 막고, 헤더와 본문을 inert로 만들어
// Tab 포커스와 스크린리더가 모달 밖으로 나가지 않게 한다. 마지막 모달이 닫힐 때만 되돌린다
const BACKGROUND_SELECTOR = "body > header, body > main";
let backgroundLockCount = 0;
let bodyOverflowBeforeLock = "";

function lockBackground() {
  if (backgroundLockCount === 0) {
    bodyOverflowBeforeLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    for (const element of document.querySelectorAll(BACKGROUND_SELECTOR)) {
      element.setAttribute("inert", "");
    }
  }
  backgroundLockCount += 1;
}

function unlockBackground() {
  backgroundLockCount = Math.max(0, backgroundLockCount - 1);
  if (backgroundLockCount === 0) {
    document.body.style.overflow = bodyOverflowBeforeLock;
    for (const element of document.querySelectorAll(BACKGROUND_SELECTOR)) {
      element.removeAttribute("inert");
    }
  }
}

function DetailSectionTitle({ number, title }: DetailSectionTitleProps) {
  return (
    <div className={styles.sectionTitle}>
      <span className={styles.sectionTitleNumber}>{number}.</span>
      <h3 className={styles.sectionTitleText}>{title}</h3>
    </div>
  );
}

export default function ExperienceDetailModal({
  item,
  onClose,
}: ExperienceDetailModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = `experience-detail-title-${item.id}`;
  const award = getAwardByProject(item.id);

  // 내용이 빈 섹션은 숨기고, 보이는 섹션끼리 번호를 다시 매긴다
  const sectionVisibility: Record<DetailSectionKey, boolean> = {
    overview: item.overview.length > 0,
    features: item.features.length > 0,
    stack: item.stack.length > 0,
    roles: item.roles.length > 0,
    problems: item.problems.length > 0,
  };
  const visibleSections = (
    Object.keys(sectionVisibility) as DetailSectionKey[]
  ).filter((key) => sectionVisibility[key]);
  const getSectionNumber = (key: DetailSectionKey) =>
    visibleSections.indexOf(key) + 1;
  const hasBothDetailColumns =
    sectionVisibility.roles && sectionVisibility.problems;

  const handleRequestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
    }, 320);
  }, [onClose]);

  useEffect(() => {
    // 모달을 연 버튼(카드 등)을 기억했다가 닫힐 때 포커스를 돌려준다
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    lockBackground();
    // 처음 포커스는 대화상자 자체에 둔다 (스크린리더가 제목을 읽고, 첫 Tab이 Back으로 간다)
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      unlockBackground();
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
      if (opener?.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleRequestClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRequestClose]);

  // body 바로 아래에 그려야 뒤 페이지(header, main)만 inert로 잠글 수 있다
  return createPortal(
    <div className={styles.backdrop} data-closing={isClosing}>
      {/* 바깥 클릭으로 닫기용 레이어. 키보드·스크린리더용 닫기는 Back 버튼이 맡는다 */}
      <button
        type="button"
        className={styles.dismissLayer}
        onClick={handleRequestClose}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className={styles.dialog}
        data-closing={isClosing}
        data-category={item.category}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div className={styles.headerStart}>
            <button
              type="button"
              onClick={handleRequestClose}
              className={styles.backButton}
              aria-label="경험 상세 모달 닫기"
            >
              <ArrowLeft className={styles.backButtonIcon} aria-hidden="true" />
              Back
            </button>

            <div className={styles.headerTitleGroup}>
              <p id={titleId} className={styles.headerLabel}>
                {item.title}
              </p>
              {item.subtitle ? (
                <p className={styles.headerSubLabel}>{item.subtitle}</p>
              ) : null}
            </div>
          </div>

          {item.link || item.github ? (
            <div className={styles.headerLinks}>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.headerLink}
                  aria-label={`Link - ${item.title} (새 탭)`}
                >
                  <Link2 className={styles.headerLinkIcon} aria-hidden="true" />
                  Link
                  <ArrowUpRight
                    className={styles.headerLinkArrow}
                    aria-hidden="true"
                  />
                </a>
              ) : null}

              {item.github ? (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.headerLink}
                  aria-label={`GitHub - ${item.title} (새 탭)`}
                >
                  <GitBranch
                    className={styles.headerLinkIcon}
                    aria-hidden="true"
                  />
                  GitHub
                  <ArrowUpRight
                    className={styles.headerLinkArrow}
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h2 className={styles.heroTitle}>{item.summary}</h2>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.metaText}>
                  {formatExperiencePeriod(item.period)}
                </span>
              </span>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.metaCategory}>{item.category}</span>
              </span>
              {award ? (
                <span className={styles.metaAward}>
                  <Trophy className={styles.metaAwardIcon} aria-hidden="true" />
                  {award.name}
                </span>
              ) : null}
              {item.ranking ? (
                <span
                  className={styles.metaRanking}
                  data-tooltip={describeExperienceRanking(item.ranking)}
                >
                  <ChartNoAxesColumnIncreasing
                    className={styles.metaAwardIcon}
                    aria-hidden="true"
                  />
                  {formatExperienceRanking(item.ranking)}
                </span>
              ) : null}
            </div>
          </div>

          <div className={styles.sections}>
            {sectionVisibility.overview ? (
              <section className={styles.section}>
                <DetailSectionTitle
                  number={getSectionNumber("overview")}
                  title="개요"
                />
                <p className={styles.overviewText}>{item.overview}</p>
              </section>
            ) : null}

            {sectionVisibility.features ? (
              <section className={styles.section}>
                <DetailSectionTitle
                  number={getSectionNumber("features")}
                  title="주요 기능"
                />
                <div
                  className={styles.featureGrid}
                  data-columns={item.features.length > 1 ? 2 : 1}
                >
                  {item.features.map((feature) => (
                    <article key={feature.title} className={styles.featureCard}>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureDescription}>
                        {feature.desc}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {sectionVisibility.stack ? (
              <section className={styles.section}>
                <DetailSectionTitle
                  number={getSectionNumber("stack")}
                  title="기술 스택"
                />
                <div className={styles.techStackGroup}>
                  {item.stack.map((name) => (
                    <SkillPill
                      key={name}
                      skill={getTechBadge(name)}
                      size="small"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {sectionVisibility.roles || sectionVisibility.problems ? (
              <div
                className={styles.detailColumns}
                data-columns={hasBothDetailColumns ? 2 : 1}
              >
                {sectionVisibility.roles ? (
                  <section className={styles.section}>
                    <DetailSectionTitle
                      number={getSectionNumber("roles")}
                      title="맡은 역할"
                    />
                    <ul className={styles.roleList}>
                      {item.roles.map((roleItem) => (
                        <li key={roleItem} className={styles.roleItem}>
                          {roleItem}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {sectionVisibility.problems ? (
                  <section className={styles.section}>
                    <DetailSectionTitle
                      number={getSectionNumber("problems")}
                      title="문제 해결"
                    />
                    <div className={styles.problemList}>
                      {item.problems.map((problem) => (
                        <article
                          key={problem.title}
                          className={styles.problemCard}
                        >
                          <h4 className={styles.problemTitle}>
                            {problem.title}
                          </h4>
                          <p className={styles.problemDescription}>
                            {problem.desc}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
