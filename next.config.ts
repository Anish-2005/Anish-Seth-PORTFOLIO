import type { NextConfig } from "next";
import bundle from "@next/bundle-analyzer";

const withBundleAnalyzer = bundle({ enabled: process.env.ANALYZE === "true" });

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
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
    // Retired placeholder case studies from the previous version of the site.
    return ["atlas", "chainkit", "signal"].map((slug) => ({
      source: `/projects/${slug}`,
      destination: "/projects",
      permanent: true,
    }));
  },
};

export default withBundleAnalyzer(nextConfig);
