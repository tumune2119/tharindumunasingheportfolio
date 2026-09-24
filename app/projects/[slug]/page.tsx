import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCarousel } from "@/components/ImageCarousel";
import { MoreProjects } from "@/components/MoreProjects";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon, MailIcon } from "@/components/icons";
import { projects, sectionSlug, sourceRequestMailto } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
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
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
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
        href="/projects"
        title="Back to Projects"
        className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-surface px-4 py-2 text-body-sm font-medium text-muted-foreground transition-all duration-500 ease-in-out hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Projects
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
                title={`Jump to "${section.title}"`}
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
              {project.links?.map((link) => {
                const Icon = link.label === "GitHub" ? GithubIcon : ExternalLinkIcon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${link.label} (opens in a new tab)`}
                    className="text-body-sm inline-flex w-fit items-center gap-1.5 text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}
              {project.sourceNote && (
                <div className="flex flex-col items-start gap-2">
                  <p className="text-body-sm text-muted-foreground">
                    {project.sourceNote}
                  </p>
                  <a
                    href={sourceRequestMailto(project.title)}
                    title={`Email a source access request for ${project.title}`}
                    className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary bg-transparent px-4 py-2 text-body-sm font-medium text-primary transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-surface active:scale-[0.97]"
                  >
                    <MailIcon className="h-4 w-4" />
                    Request source access
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        <MoreProjects projects={projects} currentSlug={project.slug} />
      </div>
    </main>
  );
}
