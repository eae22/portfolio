import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import styles from "./SectionFilter.module.css";

export interface SectionFilterOption<Value extends string> {
  label: string;
  value: Value;
  // 버튼마다 다른 강조색 (점, 활성 테두리). 없으면 그룹 색을 쓴다
  accent?: string;
  // 점 대신 보여줄 아이콘
  icon?: LucideIcon;
}

type SectionFilterProps<Value extends string> = {
  ariaLabel: string;
  options: readonly SectionFilterOption<Value>[];
  // 하나만 고르는 필터는 값 하나, 여러 개를 고르는 필터는 배열을 넘긴다
  selected: Value | readonly Value[];
  onChange: (value: Value) => void;
  layout?: "wrap" | "scroll";
  tone?: "default" | "experience";
  // capsule: 테두리 있는 기본 모양, tags: 테두리 없이 작은 태그로 보이는 보조 필터
  appearance?: "capsule" | "tags";
  // tags 모양에서 태그 앞에 보이는 작은 라벨 (스크린리더는 ariaLabel을 읽는다)
  visibleLabel?: string;
};

export default function SectionFilter<Value extends string>({
  ariaLabel,
  options,
  selected,
  onChange,
  layout = "wrap",
  tone = "default",
  appearance = "capsule",
  visibleLabel,
}: SectionFilterProps<Value>) {
  const isSelected = (value: Value) =>
    typeof selected === "string"
      ? selected === value
      : selected.includes(value);

  return (
    <fieldset
      className={styles.group}
      data-layout={layout}
      data-tone={tone}
      data-appearance={appearance}
    >
      <legend className={styles.legend}>{ariaLabel}</legend>
      {visibleLabel ? (
        <span className={styles.visibleLabel} aria-hidden="true">
          {visibleLabel}
        </span>
      ) : null}
      {options.map((option) => {
        const isActive = isSelected(option.value);
        const Icon = option.icon;

        return (
          <button
            type="button"
            key={option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            data-active={isActive}
            className={styles.button}
            style={
              option.accent
                ? ({
                    "--section-filter-accent": option.accent,
                    "--section-filter-dot-idle": option.accent,
                  } as CSSProperties)
                : undefined
            }
          >
            {Icon ? (
              <Icon className={styles.icon} aria-hidden="true" />
            ) : (
              <span className={styles.dot} aria-hidden="true" />
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
