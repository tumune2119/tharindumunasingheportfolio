"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const DURATION_MS = 900;

// Counts up from 0 to `end` once on mount, eased so it settles instead of
// ticking at a constant rate. Renders the final value immediately (server
// and first client render both show `end`, the same hydration-safe
// pattern used elsewhere in this project) and only animates from 0 after
// mount — reduced motion skips the animation and just keeps the final value.
export function CountUp({
  end,
  suffix = "",
  className,
}: {
  end: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(end);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setValue(end);
      return;
    }

    setValue(0);
    let frameId: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end, reducedMotion]);

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}
