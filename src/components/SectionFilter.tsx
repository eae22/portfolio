import styles from "./SectionFilter.module.css";

export interface SectionFilterOption<Value extends string> {
  label: string;
  value: Value;
}

type SectionFilterProps<Value extends string> = {
  ariaLabel: string;
  options: readonly SectionFilterOption<Value>[];
  selected: Value;
  onChange: (value: Value) => void;
  layout?: "wrap" | "scroll";
};

export default function SectionFilter<Value extends string>({
  ariaLabel,
  options,
  selected,
  onChange,
  layout = "wrap",
}: SectionFilterProps<Value>) {
  return (
    <fieldset className={styles.group} data-layout={layout}>
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
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
