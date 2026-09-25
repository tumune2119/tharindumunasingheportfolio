"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Home-page-only sibling to Reveal: same fade + slide-up treatment, but the
// IntersectionObserver is never disconnected and toggles `visible` both
// ways — so a section animates back out when it scrolls out of view, then
// animates back in again the next time it crosses the threshold, instead of
// firing once and staying revealed forever. Deliberately kept separate from
// Reveal (used everywhere else on the site) rather than changing Reveal's
// behavior globally.
export function ScrollFade({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Reduced motion: skip the hidden/re-hidden state entirely rather than
    // animating a near-instant transition every time the section crosses
    // the viewport edge.
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      // The same "expo-out" curve ProjectCard's own cover-image reveal uses
      // — a longer, decelerating glide reads noticeably smoother here than
      // the site's default ease-in-out, especially with this toggling back
      // and forth on every scroll pass. Scale added alongside the existing
      // fade/slide for a touch more polish without changing the distance
      // it travels.
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-6 scale-[0.98] opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
