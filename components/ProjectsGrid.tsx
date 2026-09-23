import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

// Alternating full-width rows (image left/right, flipping per project)
// instead of a uniform tile grid — reads as a designed sequence rather
// than a generic card grid, and scales cleanly whether there are 2 or 20
// projects since each one is its own full-width moment.
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 80}>
          <ProjectCard project={project} reverse={index % 2 === 1} />
        </Reveal>
      ))}
    </div>
  );
}
