"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Variant = "default" | "pointer" | "text" | "label";

// Matches anything the browser would natively show an I-beam over. Excludes
// non-text input types (checkbox/radio/etc.) which are really just buttons.
const TEXT_SELECTOR =
  "input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=submit]):not([type=button]):not([type=file]):not([type=color]), textarea, [contenteditable=''], [contenteditable=true]";
const POINTER_SELECTOR = "a, button, [role=button], select, summary, .cursor-pointer";

const SIZE: Record<Variant, string> = {
  default: "h-4 w-4",
  pointer: "h-11 w-11",
  text: "h-6 w-0.5",
  label: "h-24 w-24",
};

// Fraction of the remaining distance to the real pointer closed per
// animation frame — smaller trails more (softer), larger snaps tighter.
const TRAIL_EASE = 0.2;

// Global replacement for the native cursor. Any element can opt into a
// custom label by adding data-cursor="..." — the ring grows into a
// glowing label bubble showing that text while hovering it (see
// ProjectCard's "Learn more" card). Position tracking is done by writing
// directly to the DOM node's transform (not React state) so it can follow
// mousemove at full frequency without triggering re-renders; only the
// variant/label (which change far less often, on mouseover) go through
// state.
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    // Progressive enhancement only: touch/coarse-pointer devices keep
    // their native behavior (there's no mouse to track anyway).
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!supportsHover) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    // target = latest real pointer position, pos = where the dot is
    // currently drawn. Each animation frame nudges pos a fraction of the
    // way toward target instead of snapping straight there, giving the
    // cursor a soft trailing follow instead of an instant jump.
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let hasMoved = false;
    let frameId: number;

    function handleMouseMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!hasMoved) {
        // Snap on the very first move so the cursor doesn't glide in
        // from the top-left corner when the page loads.
        pos.x = target.x;
        pos.y = target.y;
        hasMoved = true;
      }
    }

    function tick() {
      pos.x += (target.x - pos.x) * TRAIL_EASE;
      pos.y += (target.y - pos.y) * TRAIL_EASE;
      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    // Classifies whatever's under the pointer into one of our own cursor
    // styles, standing in for the native pointer/text affordance that the
    // global "cursor: none" override (see globals.css) hides — we can't
    // read that back from getComputedStyle since "none" is now what's
    // actually computed there, so classification goes by element/role
    // instead of the (overridden) CSS cursor value.
    function handleMouseOver(event: MouseEvent) {
      const hoveredEl = event.target as HTMLElement;

      const labelSource = hoveredEl.closest<HTMLElement>("[data-cursor]");
      if (labelSource) {
        setVariant("label");
        setLabel(labelSource.dataset.cursor ?? null);
        return;
      }
      setLabel(null);

      if (hoveredEl.closest(TEXT_SELECTOR)) {
        setVariant("text");
      } else if (hoveredEl.closest(POINTER_SELECTOR)) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={
        {
          "--cursor-glow": "color-mix(in srgb, var(--color-primary) 55%, transparent)",
        } as CSSProperties
      }
      className={`pointer-events-none fixed left-0 top-0 z-100 flex items-center justify-center text-center text-body-sm font-medium text-primary shadow-[0_0_18px_4px_var(--cursor-glow)] transition-[width,height] duration-300 ease-in-out ${SIZE[variant]} ${
        variant === "text"
          ? "rounded-sm bg-primary"
          : "rounded-full border-2 border-primary bg-transparent backdrop-blur-[1px]"
      }`}
    >
      {variant === "label" ? label : null}
    </div>
  );
}
