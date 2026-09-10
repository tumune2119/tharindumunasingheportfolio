"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";

// Client-side filter over the full article list — fine at this scale, and
// works immediately for whatever gets added to lib/articles.ts later
// without needing a search backend.
export function ArticleSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.chapters.some((chapter) =>
          chapter.title.toLowerCase().includes(q),
        ),
    );
  }, [articles, query]);

  return (
    <div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="w-full rounded-xl border border-foreground/10 bg-surface py-3 pl-11 pr-4 text-body text-foreground outline-none transition-all duration-500 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {results.length === 0 ? (
        <p className="text-body-sm mt-8 text-center text-muted-foreground">
          No articles match “{query}”.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4 sm:gap-6">
          {results.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block rounded-2xl border border-foreground/10 bg-card p-6 transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-lg md:p-8"
            >
              <h2 className="text-h4 transition-colors duration-500 ease-in-out group-hover:text-primary">
                {article.title}
              </h2>
              <p className="text-body-sm mt-2 text-muted-foreground">
                {article.excerpt}
              </p>
              <p className="text-caption mt-4 text-muted-foreground">
                {article.chapters.length} chapters
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
