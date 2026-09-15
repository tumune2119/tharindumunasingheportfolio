"use client";

import { useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark";

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

// Used by ThemeToggle to read/write the theme state without duplicating
// the localStorage/data-theme logic
// (and its hydration-safety subtleties) in two places.
export function useTheme() {
  // The server always renders "light" — it has no access to localStorage
  // or the client's system preference. Matching that here means hydration
  // compares identical output; useLayoutEffect below corrects it to the
  // real theme before the browser paints.
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored ?? getSystemTheme());
    if (stored) document.documentElement.setAttribute("data-theme", stored);
  }, []);

  function setThemeAndPersist(next: Theme) {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private browsing, blocked storage) —
      // theme still applies for this page view, it just won't persist.
    }
  }

  function toggleTheme() {
    setThemeAndPersist(theme === "dark" ? "light" : "dark");
  }

  return { theme, toggleTheme };
}
