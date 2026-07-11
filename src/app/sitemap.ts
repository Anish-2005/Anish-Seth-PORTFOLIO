import type { MetadataRoute } from "next";
import { seoNotes, seoProjects } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/notes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...seoProjects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...seoNotes.map((note) => ({
      url: `${base}/notes/${note.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
