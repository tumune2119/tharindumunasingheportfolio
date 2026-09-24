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

// Rendered once in the root layout (outside PageTransition), so it stays
// put across navigations instead of re-animating on every route change.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-caption text-muted-foreground">
          © {year} Tharindu Munasinghe. All rights reserved.{" "}
          <span
            title="Site version"
            className="text-foreground/40"
          >
            v{packageJson.version}
          </span>
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
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-500 ease-in-out hover:bg-surface hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
