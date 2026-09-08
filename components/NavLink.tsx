// usePathname requires this to run on the client.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// A single nav item shared by the desktop pill nav and the mobile dropdown.
// - fullWidth: stacks as a full-width row for the vertical mobile menu
//   instead of the horizontal pill's inline sizing.
// - onNavigate: lets the mobile menu close itself after a link is clicked.
export function NavLink({
  href,
  fullWidth = false,
  onNavigate,
  children,
}: {
  href: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  // Highlights the link matching the current route.
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
        fullWidth ? "block w-full text-left" : ""
      } ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
