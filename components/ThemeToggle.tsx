"use client";

import { useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

// The user's explicit choice, persisted across visits. null means they
// haven't picked one yet, so the OS-level preference should decide.
function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

// Falls back to the OS/browser color-scheme preference when there's no
// stored override.
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  // The server always renders "light" — it has no access to localStorage or
  // the client's system preference. Matching that here means hydration
  // compares identical output; useLayoutEffect below corrects the icon to
  // the real theme before the browser paints, and also re-applies the
  // data-theme attribute React's Strict Mode remount clears in development.
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored ?? getSystemTheme());
    if (stored) document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Flips the theme: updates the button's own state, applies it to <html>
  // immediately (so globals.css's [data-theme="dark"] rules kick in), and
  // saves the choice so it sticks on the next visit.
  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — theme
      // still applies for this page view, it just won't persist.
    }
  }

  const isDark = theme === "dark";

  // A pill track with a sliding circular thumb; the thumb's icon and
  // position both reflect the current theme.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-foreground/10 bg-surface px-1 transition-colors"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <MoonIcon className="h-3.5 w-3.5" />
        ) : (
          <SunIcon className="h-3.5 w-3.5" />
        )}
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
