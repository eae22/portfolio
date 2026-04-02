"use client";

import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import SkillPill from "@/components/SkillPill";
import {
  type ExperienceItem,
  experienceCategoryLabels,
} from "@/content/experience";
import { getSkillsByKeys } from "@/content/skills";
import styles from "./ExperienceDetailModal.module.css";

type ExperienceDetailModalProps = {
  item: ExperienceItem;
  onClose: () => void;
};

type DetailSectionTitleProps = {
  number: string;
  title: string;
};

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
  const techStack = getSkillsByKeys(item.techStack);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop}>
      <button
        type="button"
        className={styles.dismissLayer}
        onClick={onClose}
        aria-label="경험 상세 모달 닫기"
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`experience-detail-title-${item.slug}`}
      >
        <header className={styles.header}>
          <div className={styles.headerStart}>
            <button
              type="button"
              onClick={onClose}
              className={styles.backButton}
              aria-label="경험 상세 모달 닫기"
            >
              <ArrowLeft className={styles.backButtonIcon} aria-hidden="true" />
              Back
            </button>

            <p className={styles.headerLabel}>{item.title}</p>
          </div>

          <a
            href={item.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.headerLink}
          >
            <GitBranch className={styles.githubIcon} aria-hidden="true" />
            GitHub
            <ArrowUpRight
              className={styles.githubLinkArrow}
              aria-hidden="true"
            />
          </a>
        </header>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h2
              id={`experience-detail-title-${item.slug}`}
              className={styles.heroTitle}
            >
              {item.headline}
            </h2>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.metaText}>{item.period}</span>
              </span>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.metaText}>
                  {experienceCategoryLabels[item.category]}
                </span>
              </span>
            </div>
          </div>

          <div className={styles.overviewLayout}>
            <div className={styles.imageCard}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className={styles.coverImage}
                priority
              />
            </div>

            <section className={styles.sidePanel}>
              <DetailSectionTitle number="1" title="프로젝트 개요" />
              <p className={styles.overviewText}>{item.overview}</p>
            </section>
          </div>

          <section className={styles.section}>
            <DetailSectionTitle number="2" title="주요 기능" />
            <div className={styles.featureGrid}>
              {item.keyFeatures.map((feature) => (
                <article key={feature.title} className={styles.featureCard}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <DetailSectionTitle number="3" title="기술 스택" />
            <div className={styles.techStackGroup}>
              {techStack.map((skill) => (
                <SkillPill key={skill.key} skill={skill} size="small" />
              ))}
            </div>
          </section>

          <div className={styles.detailColumns}>
            <section className={styles.sectionCard}>
              <DetailSectionTitle number="4" title="맡은 역할" />
              <ul className={styles.roleList}>
                {item.role.map((roleItem) => (
                  <li key={roleItem} className={styles.roleItem}>
                    {roleItem}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sectionCard}>
              <DetailSectionTitle number="5" title="문제 해결" />
              <div className={styles.problemList}>
                {item.problemSolving.map((problem) => (
                  <article key={problem.title} className={styles.problemCard}>
                    <h4 className={styles.problemTitle}>{problem.title}</h4>
                    <p className={styles.problemDescription}>
                      {problem.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
