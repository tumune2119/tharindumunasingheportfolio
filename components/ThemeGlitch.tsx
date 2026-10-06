"use client";

import { useEffect, useState } from "react";
import { THEME_SWITCH_EVENT } from "@/lib/themeSwitch";
import { useReducedMotion } from "@/lib/useReducedMotion";

const GLITCH_MS = 520;

// A short digital glitch over the page when the theme changes, built from the
// same keyframes as the hero image cycle: clipped bands jitter the overlay and
// two tinted, screen-blended copies split the colour.
export function ThemeGlitch() {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function onSwitch() {
      setActive(true);
      clearTimeout(timer);
      timer = setTimeout(() => setActive(false), GLITCH_MS);
    }

    window.addEventListener(THEME_SWITCH_EVENT, onSwitch);
    return () => {
      window.removeEventListener(THEME_SWITCH_EVENT, onSwitch);
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <div className="absolute inset-0 bg-background/85 animate-glitch-burst" />
      <div className="absolute inset-0 bg-primary/30 mix-blend-screen animate-glitch-shift-r" />
      <div className="absolute inset-0 bg-accent/30 mix-blend-screen animate-glitch-shift-b" />
    </div>
  );
}
