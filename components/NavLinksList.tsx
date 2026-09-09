"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

// The desktop horizontal pill nav, with a single indicator pill that
// slides between links on route change instead of each link drawing its
// own static highlight. Measures the active link's DOM position relative
// to the nav container and animates the indicator to match.
export function NavLinksList({ links }: { links: NavItem[] }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeLink = linkRefs.current.get(pathname);
    if (container && activeLink) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    } else {
      setIndicator(null);
    }
  }, [pathname, links]);

  return (
    <nav
      ref={containerRef}
      className="relative flex items-center gap-1 rounded-full border border-foreground/10 bg-card/70 p-1.5 shadow-sm backdrop-blur-md"
    >
      {indicator && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 rounded-full bg-background shadow-sm transition-all duration-500 ease-in-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.href, el);
              else linkRefs.current.delete(link.href);
            }}
            aria-current={active ? "page" : undefined}
            className={`relative z-10 rounded-full px-4 py-2 text-body-sm font-medium transition-colors duration-500 ease-in-out ${
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
