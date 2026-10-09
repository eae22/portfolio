"use client";

import { useEffect, useRef } from "react";
import "@/styles/custom-cursor.css";
import styles from "./CustomCursor.module.css";

// 이 요소들 위에서는 링이 커진다. data-cursor="detail"(상세가 열리는 카드)에서는 가운데 점이 "?"로 바뀐다
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], label, summary, [data-cursor]';

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotAnchorRef = useRef<HTMLDivElement | null>(null);
  const ringAnchorRef = useRef<HTMLDivElement | null>(null);
  const shapeRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // 마우스가 있는 기기에서만 켠다 (터치 기기는 기본 동작 그대로)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const root = rootRef.current;
    const dotAnchor = dotAnchorRef.current;
    const ringAnchor = ringAnchorRef.current;
    const shape = shapeRef.current;
    const ripple = rippleRef.current;
    if (!root || !dotAnchor || !ringAnchor || !shape || !ripple) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let frame = 0;
    let isVisible = false;

    document.documentElement.dataset.customCursor = "";

    // 링은 살짝 늦게 따라오고, 빨리 움직일수록 움직이는 방향으로 늘어난다
    const renderRing = () => {
      const dx = pointer.x - ring.x;
      const dy = pointer.y - ring.y;
      const follow = reducedMotion ? 1 : 0.2;

      ring.x += dx * follow;
      ring.y += dy * follow;

      const canStretch = !reducedMotion;
      const stretch = canStretch
        ? Math.min(1 + Math.hypot(dx, dy) / 90, 1.5)
        : 1;
      const angle = Math.atan2(dy, dx);

      ringAnchor.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      shape.style.transform = `rotate(${angle}rad) scale(${stretch}, ${1 / stretch})`;

      frame =
        Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1
          ? window.requestAnimationFrame(renderRing)
          : 0;
    };

    const show = () => {
      isVisible = true;
      root.dataset.visible = "true";
    };

    const hide = () => {
      isVisible = false;
      root.dataset.visible = "false";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        hide();
        return;
      }

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      dotAnchor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

      if (!isVisible) {
        ring.x = pointer.x;
        ring.y = pointer.y;
        show();
      }

      if (!frame) {
        frame = window.requestAnimationFrame(renderRing);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest(INTERACTIVE_SELECTOR)
          : null;
      const isDetail = target?.getAttribute("data-cursor") === "detail";

      root.dataset.state = isDetail ? "detail" : target ? "link" : "default";
    };

    const handlePointerDown = () => {
      root.dataset.pressed = "true";
    };

    const handlePointerUp = () => {
      root.dataset.pressed = "false";

      // 클릭하면 링에서 물결이 한 번 퍼진다 (애니메이션을 처음부터 다시 시작)
      ripple.dataset.active = "false";
      void ripple.offsetWidth;
      ripple.dataset.active = "true";
    };

    const handleMouseOut = (event: MouseEvent) => {
      // 마우스가 창 밖으로 나가면 숨긴다
      if (!event.relatedTarget) {
        hide();
      }
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(frame);
      delete document.documentElement.dataset.customCursor;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-visible="false"
      data-state="default"
      aria-hidden="true"
    >
      <div ref={ringAnchorRef} className={styles.anchor}>
        <div ref={shapeRef} className={styles.shape}>
          <div className={styles.ring} />
        </div>
        <span ref={rippleRef} className={styles.ripple} />
      </div>
      <div ref={dotAnchorRef} className={styles.anchor}>
        <div className={styles.dot} />
        <span className={styles.question}>?</span>
      </div>
    </div>
  );
}
