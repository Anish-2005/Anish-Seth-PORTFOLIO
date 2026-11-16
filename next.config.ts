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
    return [
      // One canonical host: www and any other alias collapse onto the apex domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.anishseth.xyz" }],
        destination: "https://anishseth.xyz/:path*",
        permanent: true,
      },
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
