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
  const [isScrolled, setIsScrolled] = useState(false);
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
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 18);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  useEffect(() => {
    const updateHighlight = () => {
      const navList = navListRef.current;

      if (!navList || !activeSection) {
        setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeItem = itemRefs.current[activeSection];

      if (!activeItem) {
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
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-white/10 bg-[linear-gradient(180deg,rgba(2,8,23,0.9),rgba(2,8,23,0.72))] shadow-[0_18px_40px_rgba(2,8,23,0.22)] backdrop-blur-xl"
          : "border-border-subtle bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(192,132,252,0.08),transparent_28%),rgba(2,8,23,0.78)] backdrop-blur"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-[padding] duration-500 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <Link
          className="group my-1 inline-flex items-center gap-3 text-lg font-bold text-text-primary transition-transform duration-300 hover:-translate-y-0.5"
          href="/"
          onClick={handleLogoClick}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-sky-300/24 blur-[6px] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-[1px] rounded-full bg-linear-to-br from-sky-100 via-sky-200 to-cyan-300 shadow-[0_0_12px_rgba(125,211,252,0.28)] transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span className="bg-linear-to-r from-white via-slate-100 to-sky-100 bg-clip-text text-transparent transition-[letter-spacing] duration-300 group-hover:tracking-[0.01em]">
            Portfolio
          </span>
        </Link>

        <ul
          ref={navListRef}
          className={`relative flex items-center gap-2 rounded-full border px-1 py-1 text-sm font-medium text-text-secondary transition-all duration-500 ${
            isScrolled
              ? "border-white/8 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(2,8,23,0.12)]"
              : "border-white/7 bg-white/[0.018] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          }`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1 left-0 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_18px_rgba(15,23,42,0.16)] backdrop-blur-md transition-[transform,width,opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                  className={`block rounded-full px-4.5 py-2 transition-[color,transform,letter-spacing,opacity] duration-300 ${
                    isActive
                      ? "font-semibold tracking-[0.01em] text-white"
                      : "text-text-secondary/88 hover:-translate-y-0.5 hover:text-white"
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
