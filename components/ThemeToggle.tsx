"use client";

import { useTheme } from "@/lib/useTheme";
import { THEME_SWITCH_EVENT } from "@/lib/themeSwitch";

// A chamfered HUD switch: a square track with a mono label, and a chamfered
// thumb that slides to the other side and carries the sun or moon icon. The
// press also fires the theme-switch event, which plays the glitch overlay.
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  function handlePress() {
    toggleTheme();
    window.dispatchEvent(new Event(THEME_SWITCH_EVENT));
  }

  return (
    <button
      type="button"
      onClick={handlePress}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={`hud-switch relative inline-flex h-8 w-24 shrink-0 items-center transition-all duration-500 ease-in-out active:scale-95 ${
        isDark ? "pl-2 pr-10" : "pl-10 pr-2"
      }`}
    >
      <span
        aria-hidden="true"
        className={`hud-switch-thumb absolute left-1 top-1 flex h-6 w-7 items-center justify-center transition-transform duration-500 ease-in-out ${
          isDark ? "translate-x-15" : "translate-x-0"
        }`}
      >
        {/* Both icons stay mounted and crossfade, so the change animates. */}
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
      <span className="hud-label">{isDark ? "Dark" : "Light"}</span>
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
