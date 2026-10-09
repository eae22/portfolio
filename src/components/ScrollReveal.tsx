"use client";

import {
  type CSSProperties,
  createElement,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ScrollReveal.module.css";

type ScrollRevealProps = HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export default function ScrollReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  once = true,
  rootMargin = "0px 0px -6% 0px",
  threshold = 0.2,
  style,
  ...props
}: ScrollRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);

          if (once) {
            observer.unobserve(entry.target);
          }
          return;
        }

        if (!once) {
          setRevealed(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const classes = [styles.root, className].filter(Boolean).join(" ");
  const mergedStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ...props,
      ref: elementRef,
      className: classes,
      style: mergedStyle,
      "data-revealed": revealed,
    },
    children,
  );
}
