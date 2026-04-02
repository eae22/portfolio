"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Profile", href: "#profile", id: "profile" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navListRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      const firstSection = sections[0];

      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();

        if (firstRect.top > viewportAnchor) {
          setActiveSection(null);
          return;
        }
      }

      const currentSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();

          return rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
        }) ??
        [...sections]
          .reverse()
          .find(
            (section) => section.getBoundingClientRect().top <= viewportAnchor,
          ) ??
        sections[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const updateHighlight = () => {
      const navList = navListRef.current;
      const activeItem = itemRefs.current[activeSection];

      if (!navList || !activeItem || !activeSection) {
        setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navList.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setHighlightStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);

    return () => {
      window.removeEventListener("resize", updateHighlight);
    };
  }, [activeSection]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string,
  ) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    const headerOffset = 96;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.replaceState(null, "", href);
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(null);
    window.history.replaceState(null, "", "/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-nav backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          className="my-1 text-lg font-bold text-text-primary"
          href="/"
          onClick={handleLogoClick}
        >
          Portfolio
        </Link>

        <ul
          ref={navListRef}
          className="relative flex items-center gap-3 rounded-full p-1 text-sm font-medium text-text-secondary"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1 left-0 rounded-full border border-border-subtle bg-surface-pill/95 shadow-[0_12px_28px_rgba(15,23,42,0.28)] transition-[transform,width,opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `${highlightStyle.width}px`,
              opacity: highlightStyle.opacity,
              transform: `translateX(${highlightStyle.left}px) scale(${highlightStyle.opacity ? 1 : 0.92})`,
              transformOrigin: "center",
            }}
          />
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.href} className="relative z-10">
                <Link
                  href={item.href}
                  ref={(element) => {
                    itemRefs.current[item.id] = element;
                  }}
                  onClick={(event) => handleNavClick(event, item.id, item.href)}
                  className={`block rounded-full px-5 py-2.5 transition-[color,transform] duration-300 ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
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
