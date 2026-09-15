"use client";

import { useEffect, useState } from "react";

// Thin fixed bar tracking how far down the page the reader has scrolled —
// used on the article page given its multi-chapter structure. Uses a
// short 150ms transition (not the site's usual 500-700ms) since a
// progress indicator needs to track the actual scroll position closely;
// the slower site-wide duration would make it visibly lag behind.
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-70 h-1 bg-transparent"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-in-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
