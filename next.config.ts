import type { NextConfig } from "next";
import bundle from "@next/bundle-analyzer";

const withBundleAnalyzer = bundle({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "@headlessui/react", "d3"],
  },
  turbopack: {
    root: __dirname,
  },
};

export default withBundleAnalyzer(nextConfig);
