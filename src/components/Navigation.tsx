"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Profile", href: "#profile", id: "profile" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navigation() {
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

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-nav-border) bg-(--color-nav-bg) backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          className="my-1 text-lg font-bold text-(--color-nav-text)"
          href="/"
        >
          Portfolio
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-(--color-nav-text-muted)">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-5 py-2.5 transition-all duration-200 ${
                    isActive
                      ? "bg-(--color-nav-pill) text-(--color-nav-text)"
                      : "text-(--color-nav-text-muted) hover:bg-(--color-nav-hover) hover:text-(--color-nav-text)"
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
