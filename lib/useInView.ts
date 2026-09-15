"use client";

import { useEffect, useRef, useState } from "react";

// Fires once when the ref'd element first scrolls into view, then
// disconnects. A ref-based sibling to Reveal for components that need the
// boolean directly (to drive a style on an inner element) instead of
// wrapping their children in an extra div.
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
