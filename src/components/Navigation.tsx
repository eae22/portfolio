"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Profile", href: "#profile", id: "profile" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Awards", href: "#awards", id: "awards" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

// 메뉴·로고 클릭으로 스크롤되는 동안 scroll-spy를 잠근다. 스크롤이 150ms 멈추면(또는 스크롤이 없으면) 풀린다
function armClickRelease(
  lockRef: { current: string | null },
  timerRef: { current: number | undefined },
) {
  window.clearTimeout(timerRef.current);
  timerRef.current = window.setTimeout(() => {
    lockRef.current = null;
  }, 150);
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
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
  // 메뉴 클릭으로 스크롤되는 동안은 클릭한 섹션을 활성으로 유지한다
  const clickedSectionRef = useRef<string | null>(null);
  const clickReleaseTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      const firstSection = sections[0];
      const lastSection = sections.at(-1);

      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();

        if (firstRect.top > viewportAnchor) {
          setActiveSection(null);
          return;
        }
      }

      // 마지막 섹션은 짧아서 기준선까지 못 올라올 수 있으니, 페이지 끝에 닿으면 활성으로 본다
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom && lastSection) {
        setActiveSection(lastSection.id);
        return;
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

    const handleScroll = () => {
      if (clickedSectionRef.current) {
        armClickRelease(clickedSectionRef, clickReleaseTimerRef);
        return;
      }

      updateActiveSection();
    };

    const handleResize = () => {
      if (!clickedSectionRef.current) {
        updateActiveSection();
      }
    };

    // 사용자가 직접 스크롤을 시작하면(휠·터치·키보드) 클릭 잠금을 바로 풀고 다시 계산하게 한다
    const releaseClickLock = () => {
      clickedSectionRef.current = null;
      window.clearTimeout(clickReleaseTimerRef.current);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", releaseClickLock, { passive: true });
    window.addEventListener("touchstart", releaseClickLock, { passive: true });
    window.addEventListener("keydown", releaseClickLock);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", releaseClickLock);
      window.removeEventListener("touchstart", releaseClickLock);
      window.removeEventListener("keydown", releaseClickLock);
      window.clearTimeout(clickReleaseTimerRef.current);
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
        // 하이라이트는 ul의 테두리 안쪽 기준으로 놓이므로 테두리 두께(clientLeft)를 빼준다
        left: itemRect.left - navRect.left - navList.clientLeft,
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

  // 모바일 메뉴: Esc나 헤더 바깥을 누르면 닫는다
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      // 메뉴 안에 있던 키보드 포커스가 사라지지 않게 메뉴 버튼으로 돌려준다
      if (headerRef.current?.contains(document.activeElement)) {
        menuButtonRef.current?.focus();
      }
      setIsMenuOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string,
  ) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    clickedSectionRef.current = id;
    armClickRelease(clickedSectionRef, clickReleaseTimerRef);
    setActiveSection(id);
    window.history.replaceState(null, "", href);
    // 헤더 아래 여백은 globals.css의 scroll-padding-top 하나로 맞춘다 (직접 링크로 들어올 때와 같은 위치)
    target.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    // 맨 위로 올라가는 동안 하이라이트가 섹션들을 훑지 않게 잠근다
    clickedSectionRef.current = "top";
    armClickRelease(clickedSectionRef, clickReleaseTimerRef);
    setActiveSection(null);
    window.history.replaceState(null, "", "/");
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior(),
    });
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-white/10 bg-[linear-gradient(180deg,rgba(2,8,23,0.9),rgba(2,8,23,0.72))] shadow-[0_18px_40px_rgba(2,8,23,0.22)] backdrop-blur-xl"
          : "border-border-subtle bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(192,132,252,0.08),transparent_28%),rgba(2,8,23,0.78)] backdrop-blur"
      }`}
    >
      {/* 헤더 높이를 스크롤에 따라 바꾸면 문서가 밀리면서 임계값을 다시 넘나들어 떨린다. 높이는 고정하고 배경만 바꾼다 */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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
          className={`relative hidden items-center gap-2 rounded-full border px-1 py-1 text-sm font-medium text-text-secondary transition-all duration-500 md:flex ${
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

        <button
          ref={menuButtonRef}
          type="button"
          className="my-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/3 text-text-secondary transition-colors duration-300 hover:bg-white/6 hover:text-white md:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className="absolute inset-x-0 top-full border-b border-white/10 bg-bg-canvas shadow-[0_18px_40px_rgba(2,8,23,0.45)] md:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      handleNavClick(event, item.id, item.href);
                      setIsMenuOpen(false);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[0.95rem] font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-white/7 text-white"
                        : "text-text-secondary hover:bg-white/4 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-sky-300"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
