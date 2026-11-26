import type { MetadataRoute } from "next";

import { allPhotos, photographyUpdated, photoSeries } from "@/data/photography";
import { projects } from "@/data/portfolio";
import { abs, portrait } from "@/lib/seo";
import { indexedNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  // A real "last changed" date: stamping every URL with the build time teaches crawlers to ignore lastmod.
  const updated = new Date(`${siteConfig.updated}T00:00:00Z`);

  return [
    {
      url: abs("/"),
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
      images: [portrait.url, abs("/opengraph-image")],
    },
    {
      url: abs("/about"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [portrait.url],
    },
    {
      // The résumé PDF gets indexed on its own, so a search for "Anish Seth resume" can land on it.
      url: abs("/anish-seth-resume.pdf"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: abs("/projects"),
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: abs("/notes"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // The image entries get every photo discovered without waiting for a crawl of the page.
    {
      url: abs("/photography"),
      lastModified: new Date(`${photographyUpdated}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.8,
      images: allPhotos.map((p) => abs(p.src)),
    },
    ...photoSeries.map((s) => ({
      url: abs(`/photography/${s.slug}`),
      lastModified: new Date(`${s.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: s.photos.map((p) => abs(p.src)),
    })),
    ...projects.map((p) => ({
      url: abs(`/projects/${p.slug}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.7 : 0.6,
      images: [abs(`/projects/${p.slug}/opengraph-image`)],
    })),
    ...indexedNotes.map((n) => ({
      url: abs(`/notes/${n.slug}`),
      lastModified: new Date(`${n.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.4,
      images: [abs(`/notes/${n.slug}/opengraph-image`)],
    })),
  ];
}
