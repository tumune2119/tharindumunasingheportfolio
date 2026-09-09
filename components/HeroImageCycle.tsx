"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const DISPLAY_MS = 3200;
const GLITCH_MS = 520;

// Cycles through `images`, swapping at the midpoint of a brief "digital
// glitch" burst (jagged clip-path slicing + a red/cyan channel-split,
// steps()-timed rather than eased) instead of a plain crossfade or hard
// cut. Reduced motion just crossfades between images with no glitch.
export function HeroImageCycle({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1) return;

    let displayTimeout: ReturnType<typeof setTimeout>;
    let swapTimeout: ReturnType<typeof setTimeout>;
    let endTimeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function cycle() {
      displayTimeout = setTimeout(() => {
        if (cancelled) return;

        if (reducedMotion) {
          setIndex((i) => (i + 1) % images.length);
          cycle();
          return;
        }

        setGlitching(true);
        // Swap the actual image at the glitch's visual dip (see the 50%
        // keyframe in globals.css), so the burst hides the seam.
        swapTimeout = setTimeout(() => {
          if (cancelled) return;
          setIndex((i) => (i + 1) % images.length);
        }, GLITCH_MS / 2);
        endTimeout = setTimeout(() => {
          if (cancelled) return;
          setGlitching(false);
          cycle();
        }, GLITCH_MS);
      }, DISPLAY_MS);
    }

    cycle();
    return () => {
      cancelled = true;
      clearTimeout(displayTimeout);
      clearTimeout(swapTimeout);
      clearTimeout(endTimeout);
    };
  }, [images.length, reducedMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- hero illustrations, no need for next/image optimization */}
      <img
        key={index}
        src={images[index]}
        alt={alt}
        className={`h-full w-full object-contain transition-opacity duration-500 ease-in-out ${
          glitching ? "animate-glitch-burst" : ""
        }`}
      />

      {glitching && (
        <>
          {/* Screen-blended, hue-shifted duplicates offset from the base
              image only during the burst — this channel split is what
              actually reads as a "glitch" rather than just a shaky image. */}
          <img
            src={images[index]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain mix-blend-screen animate-glitch-shift-r [filter:sepia(1)_saturate(8)_hue-rotate(-50deg)]"
          />
          <img
            src={images[index]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain mix-blend-screen animate-glitch-shift-b [filter:sepia(1)_saturate(8)_hue-rotate(140deg)]"
          />
        </>
      )}
    </div>
  );
}
