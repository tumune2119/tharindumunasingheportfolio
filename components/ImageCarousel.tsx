"use client";

import { useState } from "react";

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

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center bg-surface">
        <p className="text-body-sm text-muted-foreground">
          Images coming soon
        </p>
      </div>
    );
  }

  // Wraps around at both ends so prev/next always cycles.
  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <div className="relative aspect-video bg-surface">
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
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-110 hover:bg-card active:scale-95"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-110 hover:bg-card active:scale-95"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-in-out hover:scale-125 ${
                  i === index ? "w-4 bg-primary" : "w-1.5 bg-card/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
