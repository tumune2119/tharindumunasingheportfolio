import Link from "next/link";
import { Button } from "./Button";
import { MobileMenu } from "./MobileMenu";
import { NavLinksList } from "./NavLinksList";
import { ThemeToggle } from "./ThemeToggle";

// Shared between the desktop pill nav and the mobile dropdown so both stay in sync.
const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact me" },
];

// Site-wide header: logo on the left, nav + theme toggle + CV download on
// the right. Below the md breakpoint the nav/CV cluster collapses into
// MobileMenu's hamburger dropdown instead.
export function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="Tharindu Munasinghe - Home">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand mark, no need for next/image optimization */}
          <img src="/logo.svg" alt="" className="h-7 w-auto md:h-8" />
        </Link>

        {/* Desktop: full pill nav + toggle + CV button, hidden below md. */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLinksList links={links} />
          <ThemeToggle />
          <Button
            href="/Tharindu-Munasinghe-CV.pdf"
            download="Tharindu-Munasinghe-CV.pdf"
            variant="primary"
            className="px-5 py-2.5 text-body-sm"
          >
            Download CV
          </Button>
        </div>

        {/* Mobile: just the toggle and hamburger; nav links + CV button
            live inside the MobileMenu dropdown instead. */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
