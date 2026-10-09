import type { ReactNode } from "react";

type SectionLayoutProps = {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
};

export default function SectionLayout({
  id,
  children,
  className = "",
  fullHeight = false,
}: SectionLayoutProps) {
  const classes = [
    "mx-auto max-w-5xl px-6 py-24",
    fullHeight ? "min-h-screen" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}
