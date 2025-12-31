import type { NextConfig } from "next";
import bundle from "@next/bundle-analyzer";

const withBundleAnalyzer = bundle({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
};

export default withBundleAnalyzer(nextConfig);
