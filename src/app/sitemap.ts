import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    // Core pages
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
      priority: 0.8,
    },
    {
      url: `${base}/notes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Projects
    {
      url: `${base}/projects/atlas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/chainkit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/signal`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Notes
    {
      url: `${base}/notes/shipping-polish`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
