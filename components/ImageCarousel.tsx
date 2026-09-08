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
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary case-study screenshots added later, no need for next/image optimization */}
      <img
        src={images[index]}
        alt={`${alt} screenshot ${index + 1} of ${images.length}`}
        className="h-full w-full object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm"
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
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-primary" : "bg-card/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
