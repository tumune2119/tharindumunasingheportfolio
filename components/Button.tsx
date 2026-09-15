"use client";

import Link from "next/link";
import {
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";

// Solid (brand-colored) or outlined (bordered) look, both using the
// primary color token from globals.css.
type ButtonVariant = "primary" | "outline";

// transition-all (not just transition-colors) so hover/press scale and the
// disabled fade animate too, not just background color. Focus ring uses
// box-shadow under the hood, so it's covered by transition-all as well —
// it grows in on focus instead of just appearing.
const baseClasses =
  "inline-flex items-center justify-center rounded-full text-body font-medium px-6 py-3 " +
  "transition-all duration-500 ease-in-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100";

// The plain (non-magnetic) hover/press feedback. Magnetic buttons skip
// this and replicate the same scale in JS instead, since they also own
// the element's `transform` for the pull effect — an inline style always
// wins over a class, so these utilities would otherwise silently stop
// doing anything the moment magnetic tracking touches transform too.
const hoverPressClasses = "hover:scale-[1.03] active:scale-[0.97]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary-variant hover:shadow-md",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-surface",
};

const MAGNETIC_STRENGTH = 0.3;

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  // Pulls the button slightly toward the cursor when nearby — reserved
  // for primary CTAs (Download CV, Send message), not every button on
  // the site, since it'd be a lot of simultaneous motion on small/dense
  // controls like carousel arrows or the mobile menu's links.
  magnetic?: boolean;
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
  magnetic = false,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const classes = `${baseClasses} ${magnetic ? "" : hoverPressClasses} ${variantClasses[variant]} ${className}`;

  function applyTransform(scale: number, transitionMs: number) {
    const node = ref.current;
    if (!node) return;
    node.style.transition = `transform ${transitionMs}ms ease-in-out`;
    node.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px) scale(${scale})`;
  }

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    offset.current = {
      x: (event.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH,
      y: (event.clientY - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH,
    };
    applyTransform(1.03, 150);
  }

  function handleMouseLeave() {
    offset.current = { x: 0, y: 0 };
    applyTransform(1, 500);
  }

  function handleMouseDown() {
    applyTransform(0.97, 150);
  }

  function handleMouseUp() {
    applyTransform(1.03, 150);
  }

  const magneticHandlers = magnetic
    ? {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      }
    : {};

  // Presence of href decides which element gets rendered.
  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link
        ref={ref}
        href={href}
        className={classes}
        {...rest}
        {...magneticHandlers}
      />
    );
  }

  return (
    <button ref={ref} className={classes} {...props} {...magneticHandlers} />
  );
}
