import type { Metadata } from "next";
import { ArticleSearch } from "@/components/ArticleSearch";
import { ARTICLES_ENABLED, articles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description:
    "Essays and case-study write-ups by Tharindu Munasinghe on UI/UX design, product decisions and front-end engineering.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Articles</p>
      <h1 className="text-h2 md:text-h1 mt-3">
        <span className="sr-only">Articles: </span>Writing.
      </h1>

      {ARTICLES_ENABLED ? (
        <div className="mt-8">
          <ArticleSearch articles={articles} />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-foreground/20 bg-surface p-8 text-center">
          <p className="text-body text-muted-foreground">
            Coming soon, I’m still writing these up.
          </p>
        </div>
      )}
    </main>
  );
}
