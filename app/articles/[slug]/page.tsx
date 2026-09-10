import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyChapterLink } from "@/components/CopyChapterLink";
import { articles } from "@/lib/articles";

// Prerenders every known article at build time — the list is small and
// fully static, so there's no need to fall back to on-demand rendering.
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} - Tharindu Munasinghe`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <Link
        href="/articles"
        className="text-body-sm text-muted-foreground transition-colors duration-500 ease-in-out hover:text-foreground"
      >
        ← Articles
      </Link>

      <p className="text-overline mt-6 text-muted-foreground">Article</p>
      <h1 className="text-h2 md:text-h1 mt-3">{article.title}</h1>
      <p className="text-body-lg mt-4 text-muted-foreground">
        {article.excerpt}
      </p>

      {/* Chapter table of contents — same vertical-line-with-dots pattern
          used for the Experience timeline. Each entry jumps to its
          #chapter-slug anchor (native hash scroll, smoothed via
          scroll-smooth on <html>). */}
      <section className="mt-8 rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
        <h2 className="text-h4">Chapters</h2>
        <ol className="relative mt-4 flex flex-col gap-4 border-l border-foreground/10 pl-6 md:pl-8">
          {article.chapters.map((chapter, index) => (
            <li key={chapter.slug} className="relative">
              <span className="absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary md:-left-9.25" />
              <a
                href={`#${chapter.slug}`}
                className="text-body-sm block font-medium text-foreground transition-colors duration-500 ease-in-out hover:text-primary"
              >
                {index + 1}. {chapter.title}
              </a>
              <p className="text-caption mt-1 text-muted-foreground">
                {chapter.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Chapters themselves. scroll-mt clears the sticky nav + header
          fade (see app/layout.tsx) so jumping to one via hash or the TOC
          above doesn't land the heading underneath them. */}
      <div className="mt-8 flex flex-col gap-4 sm:gap-6">
        {article.chapters.map((chapter, index) => (
          <section
            key={chapter.slug}
            id={chapter.slug}
            className="scroll-mt-28 rounded-2xl border border-foreground/10 bg-card p-6 md:scroll-mt-32 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-overline text-muted-foreground">
                  Chapter {index + 1}
                </p>
                <h2 className="text-h3 mt-1">{chapter.title}</h2>
              </div>
              <CopyChapterLink chapterSlug={chapter.slug} />
            </div>

            <p className="text-body-sm mt-3 text-muted-foreground">
              {chapter.summary}
            </p>

            {chapter.content && chapter.content.length > 0 ? (
              <div className="mt-4 flex flex-col gap-4">
                {chapter.content.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-body text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-foreground/20 bg-surface p-6 text-center">
                <p className="text-body-sm text-muted-foreground">
                  Chapter coming soon.
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
