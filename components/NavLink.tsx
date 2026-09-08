"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

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
