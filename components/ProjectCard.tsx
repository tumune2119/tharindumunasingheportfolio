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
    <div className="flex h-105 flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card">
      {/* Fixed-height image area; object-cover crops to fill it exactly
          rather than stretching or leaving gaps, whatever the source image's
          own dimensions are. */}
      <div className="flex h-48 shrink-0 items-center justify-center bg-surface">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary case-study screenshots added later, no need for next/image optimization
          <img
            src={project.coverImage}
            alt=""
            className="h-full w-full object-cover"
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
