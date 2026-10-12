import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { ARTICLES_ENABLED, articles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

// Every entry used to share one lastModified: the build time, recomputed on
// every deploy regardless of whether that page's content actually changed.
// That's an inaccurate signal to send Google — it makes unrelated pages look
// freshly updated on every deploy. This reads each route's real last-changed
// date from git instead, same way next.config.ts reads the commit count.
// Falls back to "now" if git isn't available (e.g. a shallow clone).
function lastModifiedOf(path: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${path}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return iso ? new Date(iso) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Project and article detail pages are all data-driven from one shared
  // file each, so that file's own last-changed date is the closest accurate
  // stand-in for "this project/article was last edited" without adding a
  // per-item date to the data itself.
  const projectsLastModified = lastModifiedOf("lib/projects.ts");
  const articlesLastModified = lastModifiedOf("lib/articles.ts");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastModifiedOf("app/page.tsx"), changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/experience`,
      lastModified: lastModifiedOf("app/experience/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: lastModifiedOf("app/projects/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: lastModifiedOf("app/contact/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  if (ARTICLES_ENABLED) {
    staticRoutes.push({
      url: `${SITE_URL}/articles`,
      lastModified: lastModifiedOf("app/articles/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: projectsLastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_ENABLED
    ? articles.map((article) => ({
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: articlesLastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      }))
    : [];

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
