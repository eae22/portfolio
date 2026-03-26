"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { type SkillCategory, skillCategories, skills } from "@/content/skills";

export default function Skills() {
  const [selected, setSelected] = useState<SkillCategory>("all");

  const filteredSkills = useMemo(() => {
    if (selected === "all") return skills;

    return skills.filter((skill) => skill.categories.includes(selected));
  }, [selected]);

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      {/* 타이틀 */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-8 w-1 rounded-full bg-(--color-text-primary)" />
        <h2 className="text-base font-bold tracking-(--letter-spacing-section) text-(--color-text-primary)">
          SKILLS
        </h2>
      </div>
      {/* 카테고리 버튼 */}
      <div className="mb-10 flex flex-wrap gap-3">
        {skillCategories.map((cat) => {
          const isActive = selected === cat.value;

          return (
            <button
              type="button"
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-(--color-surface-pill) text-(--color-text-primary)"
                  : "bg-(--color-surface-card) text-(--color-text-secondary) hover:bg-(--color-surface-pill-hover) hover:text-(--color-text-primary)"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      {/* 스킬 리스트 */}
      <div className="flex min-h-35 flex-wrap content-start gap-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="
            flex cursor-pointer items-center gap-2 rounded-full border border-(--color-border-subtle)
            bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm
            transition-all duration-200
            hover:scale-[1.03] hover:shadow-md hover:bg-gray-100"
          >
            <div className="flex items-center gap-1">
              {Array.isArray(skill.icon) ? (
                skill.icon.map((icon) => (
                  <img
                    key={icon}
                    src={`https://cdn.simpleicons.org/${icon}`}
                    alt={icon}
                    className="h-4 w-4"
                  />
                ))
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${skill.icon}`}
                  alt={skill.name}
                  className="h-4 w-4"
                />
              )}
            </div>
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}
