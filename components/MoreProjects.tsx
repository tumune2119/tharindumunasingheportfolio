import { ProjectPreviewCards } from "@/components/ProjectPreviewCards";
import type { Project } from "@/lib/projects";

// Browsing aid at the end of a case study — every other project (in
// existing order), not a real "relatedness" recommendation — same idea as
// an app store's "more from this developer" row.
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
      <div className="mt-4">
        <ProjectPreviewCards projects={others} />
      </div>
    </section>
  );
}
