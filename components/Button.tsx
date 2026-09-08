import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

// Solid (brand-colored) or outlined (bordered) look, both using the
// primary color token from globals.css.
type ButtonVariant = "primary" | "outline";

const baseClasses =
  "inline-flex items-center justify-center rounded-full text-body font-medium transition-colors px-6 py-3 disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-variant",
  outline:
    "border border-primary text-primary hover:bg-surface bg-transparent",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
};

// No href => renders a real <button> (for onClick actions like the mobile menu's).
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

// href present => renders a next/link so navigation still uses client-side routing.
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// One component, two possible shapes — TypeScript picks the right one based
// on whether `href` was passed, so callers can't accidentally mix onClick-only
// props with a link or vice versa.
type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // Presence of href decides which element gets rendered.
  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...props} />;
}
