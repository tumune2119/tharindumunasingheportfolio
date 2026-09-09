"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Replays a fade + slight slide-up on every route change. key={pathname}
// forces React to remount this wrapper (and therefore its children) on
// navigation, which retriggers the animate-page-enter CSS animation —
// React's <ViewTransition> would be the native way to do this, but it
// isn't available in this project's React build (canary-only API), so
// this is the dependency-free stand-in. Lives in the layout, outside
// <Navbar>, so the nav itself never re-animates on navigation.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="flex flex-1 flex-col animate-page-enter">
      {children}
    </div>
  );
}
