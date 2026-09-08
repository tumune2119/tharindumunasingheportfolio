import Link from "next/link";
import { Button } from "./Button";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact me" },
];

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="Tharindu Munasinghe - Home">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand mark, no need for next/image optimization */}
          <img src="/logo.svg" alt="" className="h-7 w-auto md:h-8" />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-1 rounded-full border border-foreground/10 bg-card/70 p-1.5 shadow-sm backdrop-blur-md">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
          <Button
            href="/cv.pdf"
            download="Tharindu-Munasinghe-CV.pdf"
            variant="primary"
            className="px-5 py-2.5 text-body-sm"
          >
            Download CV
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
