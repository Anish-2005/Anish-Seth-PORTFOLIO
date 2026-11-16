import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything public is crawlable, including /_next/ (CSS, JS and optimized images Google needs to render the page).
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
