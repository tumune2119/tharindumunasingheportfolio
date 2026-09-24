import Link from "next/link";
import type { Project } from "@/lib/projects";

// Browsing aid at the end of a case study — every other project (in
// existing order), not a real "relatedness" recommendation — same idea as
// an app store's "more from this developer" row. Deliberately lighter/
// smaller than the main ProjectCard used on the /projects listing page,
// since this isn't a second full gallery.
export function MoreProjects({
  projects,
  currentSlug,
}: {
  projects: Project[];
  currentSlug: string;
}) {
  const others = projects.filter((project) => project.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
      <h2 className="text-h4">More projects</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {others.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            title={`View ${project.title} project details`}
            className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-surface transition-all duration-500 ease-in-out hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="relative h-28 overflow-hidden bg-card">
              {project.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- small compact thumbnail, no need for next/image optimization
                <img
                  src={project.coverImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-caption px-4 text-center text-muted-foreground">
                    Image coming soon
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <p className="text-body-sm font-medium text-foreground transition-colors duration-500 ease-in-out group-hover:text-primary">
                {project.title}
              </p>
              <p className="text-caption line-clamp-2 text-muted-foreground">
                {project.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
