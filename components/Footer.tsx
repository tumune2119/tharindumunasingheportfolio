import Link from "next/link";
import packageJson from "@/package.json";
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

// Build identity for the footer readout. Vercel sets these on every
// deployment, so a live build shows the exact branch and commit it was made
// from. Local runs have no Git env, so they show "local".
const buildRef = process.env.VERCEL_GIT_COMMIT_REF ?? "local";
const buildCommit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";

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
        <p className="text-foreground/70">
          BUILD v{packageJson.version} · {buildRef}@{buildCommit}
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
