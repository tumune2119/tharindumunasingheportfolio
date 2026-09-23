import type { ReactNode } from "react";

// Shared pill used both for the hero's role tags (app/page.tsx) and each
// project card's tech-stack tags (ProjectCard) — one small pattern reused
// in both places instead of two different tag styles.
export function Tag({
  children,
  delay,
  className = "",
}: {
  children: ReactNode;
  // When set, the pill fades/slides in on mount with this delay (ms) —
  // used for the hero's staggered entrance. Omitted for project tags,
  // which just ride in with the card's own Reveal instead.
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-caption font-medium text-primary ${
        delay !== undefined ? "animate-fade-in-up" : ""
      } ${className}`}
      style={delay !== undefined ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </span>
  );
}
