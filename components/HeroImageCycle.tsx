"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// three.js/@react-three/fiber touch the WebGL canvas and window-level
// pointer state, so this can only ever run client-side — ssr: false skips
// it during the server render (Next.js renders nothing in its place until
// the client picks it up after mount).
const DynamicLiquidImage = dynamic(
  () => import("./three/LiquidImage").then((mod) => mod.LiquidImage),
  { ssr: false },
);

const DISPLAY_MS = 3200;
const GLITCH_MS = 520;

// All three hero illustrations share this exact source size. Used to
// compute one single "contain-fit" box in plain pixels (see boxSize below)
// that both the glitch <img> stack and the WebGL LiquidImage render inside
// — previously each sized itself independently (CSS object-contain vs. an
// r3f viewport calculation), and the two didn't agree, which is what made
// the image visibly shrink specifically during the glitch transition.
const HERO_IMAGE_ASPECT = 896 / 1195;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  // Measures the container once (and on resize) and computes the same
  // "contain-fit" box in explicit pixels for every consumer below, instead
  // of each one re-deriving it in a different unit system.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const { width: containerWidth, height: containerHeight } =
        el.getBoundingClientRect();
      if (containerWidth === 0 || containerHeight === 0) return;
      const containerAspect = containerWidth / containerHeight;
      if (HERO_IMAGE_ASPECT > containerAspect) {
        setBoxSize({
          width: containerWidth,
          height: containerWidth / HERO_IMAGE_ASPECT,
        });
      } else {
        setBoxSize({
          width: containerHeight * HERO_IMAGE_ASPECT,
          height: containerHeight,
        });
      }
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {boxSize && (
        <div
          className="relative"
          style={{ width: boxSize.width, height: boxSize.height }}
        >
          {/* Mounted once for the component's whole lifetime — not swapped
              in/out per glitch cycle — and just faded out during the burst
              below instead. Swapping it via a ternary (as an earlier version
              did) meant a fresh <Canvas> (WebGL context, internal clock,
              texture load) got created and torn down on every single cycle,
              forever, which is what was spamming the console with
              "WebGLRenderer: Context Lost" every ~3.7s. Reduced motion skips
              it entirely — the whole liquid effect is motion by definition,
              and reduced-motion visitors get the plain crossfade below instead. */}
          {!reducedMotion && (
            <DynamicLiquidImage
              src={images[index]}
              alt={alt}
              className={`h-full w-full transition-opacity duration-300 ease-in-out ${
                glitching ? "opacity-0" : "opacity-100"
              }`}
            />
          )}

          {reducedMotion && (
            // eslint-disable-next-line @next/next/no-img-element -- hero illustrations, no need for next/image optimization
            <img
              key={index}
              src={images[index]}
              alt={alt}
              className="h-full w-full object-contain transition-opacity duration-500 ease-in-out"
            />
          )}

          {glitching && (
            <>
              {/* The base glitch frame, plus screen-blended hue-shifted
                  duplicates offset from it — that channel split is what
                  actually reads as a "glitch" rather than just a shaky
                  image. Rendered on top of the liquid layer above (which is
                  faded to opacity-0, not unmounted, for the duration). */}
              <img
                key={index}
                src={images[index]}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain animate-glitch-burst"
              />
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
      )}
    </div>
  );
}
