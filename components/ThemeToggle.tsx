"use client";

import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // A pill track with a sliding circular thumb; the thumb's icon and
  // position both reflect the current theme.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-foreground/10 bg-surface px-1 transition-all duration-500 ease-in-out active:scale-95"
    >
      <span
        className={`relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-500 ease-in-out ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {/* Both icons stay mounted and crossfade + morph via opacity/scale/
            rotate — swapping them outright (conditional render) would just
            cut instantly with no transition at all. */}
        <SunIcon
          className={`absolute h-3.5 w-3.5 transition-all duration-500 ease-in-out ${
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <MoonIcon
          className={`absolute h-3.5 w-3.5 transition-all duration-500 ease-in-out ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

// Shown in light mode.
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

// Shown in dark mode.
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
    </svg>
  );
}
