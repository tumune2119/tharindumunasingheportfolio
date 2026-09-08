import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Work</p>
      <h1 className="text-h2 md:text-h1 mt-3">Selected projects.</h1>

      <div className="mt-8">
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
