import Link from "next/link";
import { MailIcon, LinkedinIcon, PhoneIcon } from "./icons";

const socialLinks = [
  {
    href: "mailto:tumune2119@gmail.com",
    title: "Email tumune2119@gmail.com",
    icon: MailIcon,
  },
  {
    href: "https://www.linkedin.com/in/tharindu-munasinghe-45b053184/",
    title: "Open LinkedIn profile",
    icon: LinkedinIcon,
  },
  {
    href: "/contact",
    title: "Go to the Contact page",
    icon: PhoneIcon,
  },
];

// Version format is vPORTFOLIO.UI.BUILD. PORTFOLIO is the portfolio generation
// (3), UI is the interface generation (2 = the HUD), and BUILD is the branch's
// commit count, set in next.config.ts at build time.
const PORTFOLIO_VERSION = 3;
const UI_VERSION = 2;
const buildNumber = process.env.SITE_BUILD_NUMBER ?? "dev";
const siteVersion = `v${PORTFOLIO_VERSION}.${UI_VERSION}.${buildNumber}`;

// Rendered once in the root layout (outside PageTransition), so it stays
// put across navigations instead of re-animating on every route change.
// No top border: the HUD frame's bottom edge is what closes the page.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hud-footer px-4 pt-10 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>
          <span className="text-accent">SYS // </span>
          © {year} Tharindu Munasinghe. All rights reserved.
        </p>
        <p className="text-foreground/70" title="Portfolio · UI · build">
          {siteVersion}
        </p>
        <nav className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              title={link.title}
              aria-label={link.title}
              className="hud-footer-link"
            >
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
