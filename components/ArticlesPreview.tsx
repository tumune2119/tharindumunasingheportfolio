import Link from "next/link";
import { ARTICLES_ENABLED, articles } from "@/lib/articles";

// Home page scroll-down summary of the Articles section. While the section
// is switched off (see lib/articles.ts's ARTICLES_ENABLED), this still
// shows the section itself with a "coming soon" placeholder — matching what
// the /articles list page shows directly — rather than omitting the section
// entirely, so a scrolling visitor knows writing is planned, not absent.
export function ArticlesPreview() {
  const featured = articles.slice(0, 2);
  const showArticles = ARTICLES_ENABLED && featured.length > 0;

  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-overline text-muted-foreground">Articles</p>
          <h2 className="text-h3 mt-1">Writing.</h2>
        </div>
        <Link
          href="/articles"
          title="View all articles"
          className="text-body-sm shrink-0 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
        >
          View all articles →
        </Link>
      </div>

      {showArticles ? (
        <div className="mt-6 flex flex-col gap-4">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              title={`Read "${article.title}"`}
              className="group rounded-xl border border-foreground/10 bg-surface p-5 transition-all duration-500 ease-in-out hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="text-h4 transition-colors duration-500 ease-in-out group-hover:text-primary">
                {article.title}
              </h3>
              <p className="text-body-sm mt-2 text-muted-foreground">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-foreground/20 bg-surface p-8 text-center">
          <p className="text-body text-muted-foreground">
            Coming soon, I’m still writing these up.
          </p>
        </div>
      )}
    </section>
  );
}
