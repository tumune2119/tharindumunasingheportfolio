import type { Project } from "@/lib/projects";
import { Button } from "./Button";

// Presentational only — no hooks here, so it works fine as a child of the
// client-side ProjectsGrid without needing "use client" itself.
export function ProjectCard({
  project,
  onLearnMore,
}: {
  project: Project;
  onLearnMore: () => void;
}) {
  return (
    // Fixed overall height so every card in the grid matches regardless of
    // how long its tagline is — the tagline clamps instead of growing the
    // card, and the button always sits at the same spot at the bottom.
    // group + hover:-translate-y-1/shadow give the whole card a subtle
    // lift; the image zooms slightly via group-hover on its own img below.
    // Scoped to just transform + box-shadow (not transition-all) with a
    // decelerating curve, so the lift starts immediately and settles
    // smoothly instead of easing in with a slow start like the rest of the
    // site's toggles/color transitions.
    <div className="group flex h-105 flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:shadow-lg">
      {/* Fixed-height image area; object-cover crops to fill it exactly
          rather than stretching or leaving gaps, whatever the source image's
          own dimensions are. overflow-hidden clips the zoomed image to
          this box instead of spilling over the card's rounded corners. */}
      <div className="flex h-48 shrink-0 items-center justify-center overflow-hidden bg-surface">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary case-study screenshots added later, no need for next/image optimization
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
        <Button
          type="button"
          variant="outline"
          onClick={onLearnMore}
          className="self-start px-5 py-2.5 text-body-sm"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
