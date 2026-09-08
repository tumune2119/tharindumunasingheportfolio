"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { NavLink } from "./NavLink";

type NavItem = { href: string; label: string };

// Hamburger button + dropdown shown below the md breakpoint, replacing the
// horizontal pill nav that doesn't fit on small screens.
export function MobileMenu({ links }: { links: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Closes the dropdown on an outside click or Escape, but only while it's
  // actually open (no listeners sitting around the rest of the time).
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-card/70 text-foreground shadow-sm backdrop-blur-md"
      >
        <MenuIcon open={open} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 flex w-48 flex-col gap-1 rounded-2xl border border-foreground/10 bg-card/90 p-2 shadow-lg backdrop-blur-md">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              fullWidth
              // Close the menu once a link is actually clicked.
              onNavigate={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            href="/cv.pdf"
            download="Tharindu-Munasinghe-CV.pdf"
            variant="primary"
            className="mt-1 justify-center px-4 py-2 text-body-sm"
            onClick={() => setOpen(false)}
          >
            Download CV
          </Button>
        </div>
      )}
    </div>
  );
}

// Hamburger lines that morph into an X when the menu is open.
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}
