import Link from "next/link";
import type { Project } from "@/lib/projects";

// Compact project card grid — shared by MoreProjects (end of a case study,
// "more from this developer") and ProjectsPreview (Home page's scroll-down
// summary). Deliberately lighter/smaller than the main ProjectCard used on
// the /projects listing page, since neither caller is a second full gallery.
export function ProjectPreviewCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
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
  );
}
