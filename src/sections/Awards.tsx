"use client";

import { ArrowUpRight, BadgeCheck, Trophy } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import {
  awards,
  certificates,
  compareAchievementByLatest,
  formatAchievementDate,
} from "@/content/achievements";
import { type ExperienceItem, experiences } from "@/content/experience";
import styles from "./Awards.module.css";
import ExperienceDetailModal from "./ExperienceDetailModal";

const sortedAwards = [...awards].sort(compareAchievementByLatest);
const sortedCertificates = [...certificates].sort(compareAchievementByLatest);

function findExperience(id?: ExperienceItem["id"]) {
  return id ? experiences.find((item) => item.id === id) : undefined;
}

export default function Awards() {
  const [activeExperience, setActiveExperience] =
    useState<ExperienceItem | null>(null);

  return (
    <SectionLayout id="awards">
      <ScrollReveal delay={40}>
        <SectionHeader title="AWARDS & CERTIFICATES" accent="awards" />
      </ScrollReveal>

      <div className={styles.columns}>
        <ScrollReveal delay={140} className={styles.panel} data-kind="award">
          <h3 className={styles.panelHeader}>
            <Trophy className={styles.panelIcon} aria-hidden="true" />
            수상
            <span className={styles.panelCount}>{sortedAwards.length}</span>
          </h3>
          <ul className={styles.list}>
            {sortedAwards.map((award) => {
              const project = findExperience(award.project);

              return (
                <li key={award.name} className={styles.item}>
                  <p className={styles.itemName}>{award.name}</p>
                  <span className={styles.itemDate}>
                    {formatAchievementDate(award.date)}
                  </span>
                  <p className={styles.itemMeta}>
                    <span>{award.issuer}</span>
                    {project ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <button
                          type="button"
                          className={styles.projectLink}
                          onClick={() => setActiveExperience(project)}
                          aria-haspopup="dialog"
                          aria-label={`${project.title} 상세 보기`}
                        >
                          {project.title}
                          <ArrowUpRight
                            className={styles.projectLinkIcon}
                            aria-hidden="true"
                          />
                        </button>
                      </>
                    ) : null}
                  </p>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>

        <ScrollReveal
          delay={220}
          className={styles.panel}
          data-kind="certificate"
        >
          <h3 className={styles.panelHeader}>
            <BadgeCheck className={styles.panelIcon} aria-hidden="true" />
            자격증
            <span className={styles.panelCount}>
              {sortedCertificates.length}
            </span>
          </h3>
          <ul className={styles.list}>
            {sortedCertificates.map((certificate) => (
              <li key={certificate.name} className={styles.item}>
                <p className={styles.itemName}>{certificate.name}</p>
                <span className={styles.itemDate}>
                  {formatAchievementDate(certificate.date)}
                </span>
                <p className={styles.itemMeta}>{certificate.issuer}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
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
