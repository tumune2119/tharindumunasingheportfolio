"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HudScrollArea } from "./HudScrollArea";

const AUTOPLAY_MS = 4500;
// How long after a manual click before autoplay resumes — long enough that
// it doesn't fight a visitor actively clicking through images, short enough
// that it doesn't feel like autoplay just silently died.
const RESUME_AFTER_MS = 6500;

// Shown inside the project modal. With no images yet (until PNGs are
// added), it just renders a placeholder instead of prev/next controls.
export function ImageCarousel({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const reducedMotion = useReducedMotion();
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wraps around at both ends so prev/next always cycles.
  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  // A manual click pauses autoplay, then restarts it after a period of no
  // further interaction — distinct from hover-pause (see `hovering`),
  // which resumes immediately on mouse-leave rather than on a timer.
  function handleManualNav(next: number) {
    goTo(next);
    setManualPause(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setManualPause(false), RESUME_AFTER_MS);
  }

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || hovering || manualPause || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, hovering, manualPause, images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center bg-surface">
        <p className="text-body-sm text-muted-foreground">
          Images coming soon
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative aspect-video bg-surface"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={() => setHovering(true)}
        onTouchEnd={() => setHovering(false)}
      >
        {/* object-contain (not cover): screenshots range from wide desktop
            admin screens to tall phone screens, so the whole image should
            stay visible inside the fixed box rather than being cropped to
            fill it. bg-surface behind fills any letterboxed space.
            key={index} remounts the img on every slide change, which
            retriggers animate-scale-fade-in (a CSS animation plays on
            mount; a transition wouldn't, since src changing on the same
            element isn't itself an animatable state change). */}
        <Image
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          priority={index === 0}
          className="object-contain animate-scale-fade-in"
        />

        {images.length > 1 && (
          <>
            {/* Chamfered HUD arrows sized to a 40x40px hit target per WCAG's
                minimum touch-target guidance. Tinted from the theme
                background so they read on both light and dark screenshots. */}
            <button
              type="button"
              onClick={() => handleManualNav(index - 1)}
              aria-label="Previous image"
              title="Previous image"
              className="hud-arrow absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleManualNav(index + 1)}
              aria-label="Next image"
              title="Next image"
              className="hud-arrow absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip replaces plain dots — communicates at a glance how
          many images exist and lets a visitor jump straight to one, not
          just step through sequentially. Scrolls horizontally on mobile
          instead of wrapping or shrinking illegibly small. */}
      {images.length > 1 && (
        <HudScrollArea
          axis="x"
          role="tablist"
          aria-label={`${alt} image thumbnails`}
          className="flex gap-2 p-3"
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to image ${i + 1} of ${images.length}`}
              title={`Go to image ${i + 1} of ${images.length}`}
              onClick={() => handleManualNav(i)}
              className={`hud-thumb relative h-12 w-16 shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                i === index ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </HudScrollArea>
      )}
    </div>
  );
}
