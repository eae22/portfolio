import type { AnchorHTMLAttributes, ReactNode } from "react";

type PillLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClassNames = {
  primary: "bg-surface-pill hover:bg-surface-pill-hover",
  secondary: "bg-surface-secondary hover:bg-surface-secondary-hover",
  outline:
    "border border-border-subtle bg-surface-pill hover:bg-surface-pill-hover",
};

export default function PillLink({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: PillLinkProps) {
  const classes = [
    "rounded-full text-sm font-semibold text-text-primary transition-colors",
    variantClassNames[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
