import type { NextConfig } from "next";
import bundle from "@next/bundle-analyzer";

const withBundleAnalyzer = bundle({ enabled: process.env.ANALYZE === "true" });

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // No host redirects here: www vs apex is decided by the domain settings in Vercel.
    // A rule here that disagrees with Vercel's causes an endless redirect loop.
    return [
      // The résumé moved to a name-bearing URL; keep old links (and the PDF's own links) working.
      { source: "/resume.pdf", destination: "/anish-seth-resume.pdf", permanent: true },
      // Retired placeholder case studies from the previous version of the site.
      ...["atlas", "chainkit", "signal"].map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/projects",
        permanent: true,
      })),
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
