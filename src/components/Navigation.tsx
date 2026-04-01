"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";

const navItems = [
  { label: "Profile", href: "#profile", id: "profile" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-nav backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          className="my-1 text-lg font-bold text-text-primary"
          href="/"
          onClick={handleBrandClick}
        >
          Portfolio
        </Link>

        <ul className="flex items-center gap-6 text-sm font-medium text-text-secondary">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-5 py-2.5 transition-all duration-200 ${
                    isActive
                      ? "bg-surface-pill text-text-primary"
                      : "text-text-secondary hover:bg-surface-badge hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
