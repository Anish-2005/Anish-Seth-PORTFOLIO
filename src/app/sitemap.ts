import type { MetadataRoute } from "next";

import { projects } from "@/data/portfolio";
import { seoNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/notes`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.7,
    })),
    ...seoNotes.map((n) => ({
      url: `${base}/notes/${n.slug}`,
      lastModified: new Date(`${n.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
