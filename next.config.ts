import type { NextConfig } from "next";
import bundle from "@next/bundle-analyzer";

import { profile } from "./src/data/profile";

const withBundleAnalyzer = bundle({ enabled: process.env.ANALYZE === "true" });

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Set on www.anishseth.xyz, so includeSubDomains only covers hosts under www.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const DAY = 60 * 60 * 24;
/**
 * Public files keep their names when they change, so they get a fresh-for-a-while lifetime plus a
 * long stale-while-revalidate: browsers and the CDN serve the cached copy instantly and refresh it
 * quietly in the background. (Build files under /_next/static are content-hashed and already
 * cached forever by Next.)
 */
const cacheFor = (maxAge: number, staleFor = 365 * DAY) => [
  { key: "Cache-Control", value: `public, max-age=${maxAge}, stale-while-revalidate=${staleFor}` },
];

/** Vanity links (anishseth.xyz/github …). As config redirects they're answered by the router itself, with no function call. */
const vanity: [path: string, to: string, permanent: boolean][] = [
  ["/github", profile.links.github, true],
  ["/linkedin", profile.links.linkedin, true],
  ["/x", profile.links.x, false],
  ["/twitter", profile.links.x, false],
  ["/instagram", profile.links.instagram, false],
  ["/leetcode", profile.links.leetcode, false],
  ["/resume", profile.links.resume, false],
  ["/discord", "https://discord.com/users/1245782193348018238", false],
  ["/facebook", "https://www.facebook.com/anish.seth.313/", false],
  ["/figma", "https://www.figma.com/@anishseth", false],
  ["/geeksforgeeks", "https://www.geeksforgeeks.org/profile/anishse10t1", false],
  ["/hackerrank", "https://www.hackerrank.com/profile/anishseth0510", false],
  ["/stackoverflow", "https://stackoverflow.com/users/27832882/anish-seth", false],
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  // Tried experimental.inlineCss: Next embeds the styles twice per HTML page (style tag + page data)
  // and again in every prefetch, which costs more bytes than the round trip it saves. Left off.
  images: {
    formats: ["image/avif", "image/webp"],
    // 448 and 512 give phones (1.75x-2x screens, ~240 CSS px wide portrait) a right-sized file instead of 640px.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448, 512],
    // Optimised images are reused for a month (browser and CDN), so they're rarely re-generated.
    minimumCacheTTL: 31 * DAY,
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/brand/:path*", headers: cacheFor(30 * DAY) },
      { source: "/anish-seth.jpg", headers: cacheFor(7 * DAY) },
      { source: "/profile.jpg", headers: cacheFor(7 * DAY) },
      { source: "/anish-seth-resume.pdf", headers: cacheFor(DAY, 7 * DAY) },
      { source: "/manifest.webmanifest", headers: cacheFor(DAY) },
      { source: "/offline.html", headers: cacheFor(DAY) },
      // The service worker itself must always be checked for a newer version.
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
  async redirects() {
    // No host redirects here: www vs apex is decided by the domain settings in Vercel.
    // A rule here that disagrees with Vercel's causes an endless redirect loop.
    return [
      ...vanity.map(([source, destination, permanent]) => ({ source, destination, permanent })),
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
