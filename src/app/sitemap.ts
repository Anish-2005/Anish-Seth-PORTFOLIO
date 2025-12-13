import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://www.anishseth.xyz/",
    },
  ];
}
