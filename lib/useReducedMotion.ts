"use client";

import { useEffect, useState } from "react";

// Mirrors the OS "reduce motion" accessibility setting for JS-driven
// animation logic (timers, IntersectionObserver reveals) that CSS's
// prefers-reduced-motion media query alone can't reach — e.g. skipping a
// setTimeout delay or an observer-triggered entrance outright.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handleChange = () => setReduced(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
