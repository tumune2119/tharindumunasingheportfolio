import Link from "next/link";
import { ProjectPreviewCards } from "@/components/ProjectPreviewCards";
import { projects } from "@/lib/projects";

// Home page scroll-down summary of the Projects section — same reasoning as
// ExperiencePreview: a visitor scrolling the landing page should see what's
// been built without first clicking into the nav.
export function ProjectsPreview() {
  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-overline text-muted-foreground">Projects</p>
          <h2 className="text-h3 mt-1">Selected work.</h2>
        </div>
        <Link
          href="/projects"
          title="View all projects"
          className="text-body-sm shrink-0 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
        >
          View all projects →
        </Link>
      </div>

      <div className="mt-6">
        <ProjectPreviewCards projects={projects} />
      </div>
    </section>
  );
}
