
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  return [
    { url: `${base}/` },
    { url: `${base}/#about` },
    { url: `${base}/#work` },
    { url: `${base}/#visuals` },
    { url: `${base}/#notes` },
    { url: `${base}/#contact` },
    // Projects
    { url: `${base}/projects/atlas` },
    { url: `${base}/projects/chainkit` },
    { url: `${base}/projects/signal` },
    // Notes
    { url: `${base}/notes/shipping-polish` },
  ];
}
