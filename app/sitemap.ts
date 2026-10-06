import type { MetadataRoute } from "next";
import { ARTICLES_ENABLED, articles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/experience`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];

  if (ARTICLES_ENABLED) {
    staticRoutes.push({
      url: `${SITE_URL}/articles`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_ENABLED
    ? articles.map((article) => ({
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      }))
    : [];

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
