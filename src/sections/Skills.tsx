import { Braces, type LucideIcon, Monitor, Server, Wrench } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import SectionLayout from "@/components/SectionLayout";
import SkillPill from "@/components/SkillPill";
import { type SkillCategory, skillGroups, skills } from "@/content/skills";
import styles from "./Skills.module.css";

const groupIconMap: Record<SkillCategory, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  languages: Braces,
  tools: Wrench,
};

function SkillGroupIcon({
  category,
  className,
}: {
  category: SkillCategory;
  className?: string;
}) {
  const Icon = groupIconMap[category];

  return <Icon className={className} aria-hidden="true" />;
}

export default function Skills() {
  return (
    <SectionLayout id="skills" className={styles.section}>
      <ScrollReveal delay={40}>
        <SectionHeader title="SKILLS" accent="skills" />
      </ScrollReveal>

      <div className={styles.groups}>
        {skillGroups.map((group, index) => {
          const groupSkills = skills.filter((skill) =>
            skill.categories.includes(group.value),
          );

          return (
            <ScrollReveal
              key={group.value}
              className={styles.group}
              delay={140 + index * 60}
            >
              <h3 className={styles.groupHeader}>
                <SkillGroupIcon
                  category={group.value}
                  className={styles.groupIcon}
                />
                {group.label}
              </h3>
              <div className={styles.pills}>
                {groupSkills.map((skill) => (
                  <SkillPill key={skill.key} skill={skill} />
                ))}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionLayout>
  );
}
