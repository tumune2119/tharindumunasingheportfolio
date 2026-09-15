"use client";

import { useRef, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import type { Project } from "@/lib/projects";

const MAX_TILT_DEG = 7;

// Whole card is the click target (role="button", keyboard-operable) — the
// "Learn more" text is just a visual affordance, not a separate control.
// data-cursor picks up the label shown by CustomCursor while hovering.
export function ProjectCard({
  project,
  onLearnMore,
}: {
  project: Project;
  onLearnMore: (originRect: DOMRect | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - py) * MAX_TILT_DEG * 2;
    const tiltY = (px - 0.5) * MAX_TILT_DEG * 2;
    card.style.transition = "box-shadow 500ms ease-in-out";
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    card.style.setProperty("--spot-x", `${px * 100}%`);
    card.style.setProperty("--spot-y", `${py * 100}%`);
    card.style.setProperty("--spot-opacity", "1");
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 500ms ease-in-out, box-shadow 500ms ease-in-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.setProperty("--spot-opacity", "0");
  }

  function handleActivate() {
    onLearnMore(imageWrapRef.current?.getBoundingClientRect() ?? null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  }

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      data-cursor="Learn more"
      aria-label={`View ${project.title} project details`}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--spot-opacity": 0 } as CSSProperties}
      className="group relative flex h-105 cursor-pointer flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm will-change-transform hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light transition-opacity duration-500 ease-in-out"
        style={{
          opacity: "var(--spot-opacity, 0)",
          background:
            "radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-primary) 70%, transparent), transparent 45%)",
        }}
      />
      <div
        ref={imageWrapRef}
        className="flex h-48 shrink-0 items-center justify-center overflow-hidden bg-surface"
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- source image is part of the shared-element morph rect measurement, next/image's wrapper markup would break it
          <img
            src={project.coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <p className="text-body-sm px-6 text-center text-muted-foreground">
            Image coming soon
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 overflow-hidden p-6">
        <div className="flex flex-col gap-2 overflow-hidden">
          <h2 className="text-h4">{project.title}</h2>
          <p className="text-body-sm line-clamp-3 text-muted-foreground">
            {project.tagline}
          </p>
        </div>
        <span className="text-body-sm self-start font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out group-hover:decoration-primary">
          Learn more →
        </span>
      </div>
    </div>
  );
}
