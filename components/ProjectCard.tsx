"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type MouseEvent } from "react";
import { useInView } from "@/lib/useInView";
import type { Project } from "@/lib/projects";
import { Tag } from "./Tag";

const MAX_TILT_DEG = 4;

// The whole card is one link to the project's own page — the "Learn more"
// text is just a visual affordance, not a separate control. `reverse`
// flips the image to the right for alternating rows (see ProjectsGrid)
// instead of every project sitting in an identical tile.
export function ProjectCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  // Triggers the cover image's clip-path wipe-in once the card scrolls
  // into view.
  const { ref: imageWrapRef, inView: imageInView } = useInView<HTMLDivElement>();
  // techStack is a "·"-joined string for prose use elsewhere (the project
  // page's "At a glance" card) — split it back out for tag pills here
  // rather than keeping a second, separately-maintained list of tags.
  const tags = project.techStack.split("·").map((tag) => tag.trim()).slice(0, 4);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - py) * MAX_TILT_DEG * 2;
    const tiltY = (px - 0.5) * MAX_TILT_DEG * 2;
    card.style.transition = "box-shadow 500ms ease-in-out";
    card.style.transform = `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.setProperty("--spot-x", `${px * 100}%`);
    card.style.setProperty("--spot-y", `${py * 100}%`);
    card.style.setProperty("--spot-opacity", "1");
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 500ms ease-in-out, box-shadow 500ms ease-in-out";
    card.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--spot-opacity", "0");
  }

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} project details`}
      title={`View ${project.title} project details`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--spot-opacity": 0 } as CSSProperties}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm will-change-transform hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
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
        className="relative h-56 shrink-0 overflow-hidden bg-surface sm:h-72 md:h-auto md:w-2/5"
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the clip-path reveal simple; no need for next/image's wrapper markup
          <img
            src={project.coverImage}
            alt=""
            style={{ clipPath: imageInView ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
            className="h-full w-full object-cover transition-[clip-path,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-body-sm px-6 text-center text-muted-foreground">
              Image coming soon
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-10">
        <h2 className="text-h3">{project.title}</h2>
        <p className="text-body text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="text-body-sm mt-1 self-start font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out group-hover:decoration-primary">
          Learn more →
        </span>
      </div>
    </Link>
  );
}
