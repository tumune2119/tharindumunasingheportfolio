import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 60}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
