"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

// Owns "which project's modal is open" so cards themselves can stay simple.
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((project) => project.slug === openSlug);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onLearnMore={() => setOpenSlug(project.slug)}
          />
        ))}
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  );
}
