import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { projects, sectionSlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} - Tharindu Munasinghe`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  const details = [
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
    { label: "Platform", value: project.platform },
    { label: "Tools", value: project.tools },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <ScrollProgressBar />
      <Link
        href="/work"
        className="text-body-sm text-muted-foreground transition-colors duration-500 ease-in-out hover:text-foreground"
      >
        ← Work
      </Link>

      <p className="text-overline mt-6 text-muted-foreground">Case study</p>
      <h1 className="text-h2 md:text-h1 mt-3">{project.title}</h1>
      <p className="text-body-lg mt-4 max-w-3xl text-muted-foreground">
        {project.tagline}
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/10 bg-card">
        <ImageCarousel images={project.images} alt={project.title} />
      </div>

      <section className="mt-4 rounded-2xl border border-foreground/10 bg-card p-6 sm:mt-6 md:p-8">
        <h2 className="text-h4">At a glance</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {details.map((item) => (
            <div key={item.label}>
              <dt className="text-overline text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-body-sm mt-1 text-foreground">{item.value}</dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-overline text-muted-foreground">Tech stack</dt>
            <dd className="text-body-sm mt-1 text-foreground">
              {project.techStack}
            </dd>
          </div>
        </dl>
      </section>

      {/* Same vertical-line-with-dots table of contents as the article
          pages; each entry jumps to its #section-slug anchor. */}
      <section className="mt-4 rounded-2xl border border-foreground/10 bg-card p-6 sm:mt-6 md:p-8">
        <h2 className="text-h4">Sections</h2>
        <ol className="relative mt-4 flex flex-col gap-3 border-l border-foreground/10 pl-6 md:pl-8">
          {project.sections.map((section, sectionIndex) => (
            <li key={section.title} className="relative">
              <span className="absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary md:-left-9.25" />
              <a
                href={`#${sectionSlug(section.title)}`}
                className="text-body-sm block font-medium text-foreground transition-colors duration-500 ease-in-out hover:text-primary"
              >
                {sectionIndex + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* scroll-mt clears the sticky nav + header fade so a hash or TOC
          jump doesn't land the heading underneath them. */}
      <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-6">
        {project.sections.map((section, sectionIndex) => {
          const id = sectionSlug(section.title);
          return (
            <section
              key={section.title}
              id={id}
              className="scroll-mt-28 rounded-2xl border border-foreground/10 bg-card p-6 md:scroll-mt-32 md:p-8"
            >
              <p className="text-overline text-muted-foreground">
                Section {sectionIndex + 1}
              </p>
              <h2 className="text-h3 mt-1">{section.title}</h2>

              {section.body && (
                <p className="text-body mt-4 text-muted-foreground">
                  {section.body}
                </p>
              )}
              {section.points && (
                <ul className="mt-4 flex flex-col gap-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-body text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {(project.links || project.sourceNote) && (
          <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
            <h2 className="text-h4">Links</h2>
            <div className="mt-3 flex flex-col gap-2">
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm w-fit text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
                >
                  {link.label} ↗
                </a>
              ))}
              {project.sourceNote && (
                <p className="text-body-sm text-muted-foreground">
                  {project.sourceNote}
                </p>
              )}
            </div>
          </section>
        )}

        {nextProject.slug !== project.slug && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="group rounded-2xl border border-foreground/10 bg-card p-6 transition-shadow duration-500 ease-in-out hover:shadow-lg md:p-8"
          >
            <p className="text-overline text-muted-foreground">Next project</p>
            <p className="text-h4 mt-1 transition-colors duration-500 ease-in-out group-hover:text-primary">
              {nextProject.title} →
            </p>
          </Link>
        )}
      </div>
    </main>
  );
}
