"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
const GLITCH_MS = 900;
const TOAST_MS = 2400;

// Triggered two ways: the hidden Konami code (the actual "discovery"), or
// Ctrl/Cmd+Shift+G as a quick, memorable shortcut once you know it's
// there — mainly so it doesn't take retyping all 10 keys every time.
// Glitches the real page (document.body), not a screenshot — reuses the
// same clip-path/steps() keyframe as HeroImageCycle's per-image swap,
// just stretched to animate-page-glitch's longer duration. A confirmation
// toast follows since a silent glitch would just read as a bug rather
// than a discovered feature.
export function GlitchEasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let buffer: string[] = [];

    function fireGlitch() {
      setTriggered(true);
      if (!reducedMotion) {
        document.body.classList.add("animate-page-glitch");
        window.setTimeout(() => {
          document.body.classList.remove("animate-page-glitch");
        }, GLITCH_MS);
      }
      window.setTimeout(() => setTriggered(false), TOAST_MS);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "g"
      ) {
        event.preventDefault();
        fireGlitch();
        return;
      }

      buffer = [...buffer, event.key.toLowerCase()].slice(
        -KONAMI_CODE.length,
      );
      if (buffer.join(",") === KONAMI_CODE.join(",")) fireGlitch();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reducedMotion]);

  if (!triggered) return null;

  return (
    <div
      role="status"
      className="animate-fade-in-up fixed bottom-6 left-1/2 z-100 -translate-x-1/2 rounded-full border border-foreground/10 bg-card px-5 py-3 text-body-sm font-medium text-foreground shadow-lg"
    >
      🎮 You found it.
    </div>
  );
}
