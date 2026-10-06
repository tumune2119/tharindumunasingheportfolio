import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects — UI/UX & Front-end Case Studies",
  description:
    "Case studies by Tharindu Munasinghe covering UI/UX design, product design and front-end engineering: an EV charging platform, a booking system, and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Projects</p>
      <h1 className="text-h2 md:text-h1 mt-3">
        <span className="sr-only">Projects: </span>What I’ve done.
      </h1>

      <div className="mt-8">
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
