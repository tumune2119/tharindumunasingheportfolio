import Link from "next/link";

const links = [
  { label: "Email", href: "mailto:tumune2119@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tharindu-munasinghe-45b053184/",
  },
  { label: "Contact", href: "/contact" },
];

// Rendered once in the root layout (outside PageTransition), so it stays
// put across navigations instead of re-animating on every route change.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-caption text-muted-foreground">
          © {year} Tharindu Munasinghe. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-caption text-muted-foreground transition-colors duration-500 ease-in-out hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
