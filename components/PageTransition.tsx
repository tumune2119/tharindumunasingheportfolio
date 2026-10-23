"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { playPageTransitionSound } from "@/lib/clickSound";

// Replays a brightness-flicker "boot" + slight slide-up on every route
// change. key={pathname} forces React to remount this wrapper (and
// therefore its children) on navigation, which retriggers the
// animate-page-enter CSS animation — React's <ViewTransition> would be the
// native way to do this, but it isn't available in this project's React
// build (canary-only API), so this is the dependency-free stand-in. Lives
// in the layout, outside <Navbar>, so the nav itself never re-animates on
// navigation.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mounted = useRef(false);

  // Skips the very first render (the initial page load, not a navigation)
  // so a visitor doesn't hear a sound before they've done anything.
  useEffect(() => {
    if (mounted.current) playPageTransitionSound();
    mounted.current = true;
  }, [pathname]);

  return (
    <div key={pathname} className="flex flex-1 flex-col animate-page-enter">
      {children}
    </div>
  );
}
