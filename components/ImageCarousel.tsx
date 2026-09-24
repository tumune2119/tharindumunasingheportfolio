"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
  images: string[];
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
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary case-study screenshots added later, no need for next/image optimization */}
        <img
          key={index}
          src={images[index]}
          alt={`${alt} screenshot ${index + 1} of ${images.length}`}
          className="h-full w-full object-contain animate-scale-fade-in"
        />

        {images.length > 1 && (
          <>
            {/* Solid dark circle (independent of the light/dark theme)
                rather than the card-tinted background these used to have —
                a screenshot behind the arrow can be any color, so a
                theme-matched background sometimes nearly disappeared
                against it. Sized to a 40x40px hit target per WCAG's minimum
                touch-target guidance. */}
            <button
              type="button"
              onClick={() => handleManualNav(index - 1)}
              aria-label="Previous image"
              title="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 hover:bg-black/75 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => handleManualNav(index + 1)}
              aria-label="Next image"
              title="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 hover:bg-black/75 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip replaces plain dots — communicates at a glance how
          many images exist and lets a visitor jump straight to one, not
          just step through sequentially. Scrolls horizontally on mobile
          instead of wrapping or shrinking illegibly small. */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${alt} image thumbnails`}
          className="flex gap-2 overflow-x-auto p-3"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to image ${i + 1} of ${images.length}`}
              title={`Go to image ${i + 1} of ${images.length}`}
              onClick={() => handleManualNav(i)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ease-in-out ${
                i === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small thumbnail reusing an existing screenshot, no need for next/image optimization */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
