"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";

// Owns "which project's modal is open" (and the rect it was opened from,
// for the shared-element morph) so cards themselves can stay simple.
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const openProject = projects.find((project) => project.slug === openSlug);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard
              project={project}
              onLearnMore={(rect) => {
                setOriginRect(rect);
                setOpenSlug(project.slug);
              }}
            />
          </Reveal>
        ))}
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          originRect={originRect}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  );
}
