import type { CSSProperties } from "react";
import styles from "./SectionFilter.module.css";

export interface SectionFilterOption<Value extends string> {
  label: string;
  value: Value;
  // 버튼마다 다른 강조색 (점, 활성 테두리). 없으면 그룹 색을 쓴다
  accent?: string;
}

type SectionFilterProps<Value extends string> = {
  ariaLabel: string;
  options: readonly SectionFilterOption<Value>[];
  selected: Value;
  onChange: (value: Value) => void;
  layout?: "wrap" | "scroll";
  tone?: "default" | "experience";
};

export default function SectionFilter<Value extends string>({
  ariaLabel,
  options,
  selected,
  onChange,
  layout = "wrap",
  tone = "default",
}: SectionFilterProps<Value>) {
  return (
    <fieldset className={styles.group} data-layout={layout} data-tone={tone}>
      <legend className={styles.legend}>{ariaLabel}</legend>
      {options.map((option) => {
        const isActive = selected === option.value;

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
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
