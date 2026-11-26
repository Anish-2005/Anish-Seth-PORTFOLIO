import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

import { CommandPaletteLoader } from "@/components/site/CommandPaletteLoader";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Frame } from "@/components/site/Frame";
import { EncoderDialLoader } from "@/components/site/EncoderDialLoader";
import { RevealObserver } from "@/components/site/RevealObserver";
import { ServiceWorker } from "@/components/perf/ServiceWorker";
import WebVitalsReporter from "@/components/perf/WebVitalsReporter";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";
import { themeBootScript } from "@/lib/theme";

// One variable grotesk (weight + width axes) carries the whole typographic system:
// expanded for display, normal width for reading. Plex Mono handles technical labels.
const sans = localFont({
  // Archivo variable, self-hosted as a trimmed subset (see src/fonts/README.md): 64KB instead of 88KB.
  src: "../fonts/archivo-variable-subset.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  // The width axis is driven with font-stretch, so the face has to declare its range.
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  adjustFontFallback: "Arial",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // Small labels only: loading them a moment later frees bandwidth for the hero portrait (the mobile LCP).
  preload: false,
});

const title = `${siteConfig.name} · AI/ML Engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Anish Seth",
    "AI/ML Engineer",
    "Agentic AI",
    "LLM Engineer",
    "Multi-Agent Systems",
    "LangGraph",
    "LangChain",
    "AWS Bedrock",
    "AgentCore",
    "Model Context Protocol",
    "MCP",
    "RAG",
    "GraphRAG",
    "Neo4j",
    "Enterprise Automation",
    "Full-Stack Developer",
    "Next.js",
    "FastAPI",
    "Python",
    "TypeScript",
    "Smart India Hackathon Finalist",
    "Kolkata",
    "India",
    "Digital Alpha",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
    firstName: "Anish",
    lastName: "Seth",
    username: "Anish-2005",
  },
  // No title, description or image here: Next fills those in from each page's own openGraph, so a
  // shared project or note shows its own card on X instead of the home page's.
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "CC99sQSiR-os5PBjY9ve-etZ4g2GdD7rF1nMRhC5SYI",
    // Set in the host's env to verify Bing Webmaster Tools (optional).
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } } : {}),
  },
  category: "technology",
  other: { "color-scheme": "dark light" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a090b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {/* Identity links: tie the domain to each profile (also used for profile verification). */}
        {siteConfig.profiles.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title={`Notes · ${siteConfig.name}`} />
        <JsonLd data={siteGraph} />
      </head>
      <body>
        <span id="top" aria-hidden className="absolute top-0" />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-bg-elev focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>
        <Frame />
        <EncoderDialLoader />
        <Nav />
        <main id="content" className="relative z-[1]">
          {children}
        </main>
        <Footer />
        <CommandPaletteLoader />
        <RevealObserver />
        {/* Only ship the vitals reporter when there is somewhere to send the numbers (or when debugging). */}
        {process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT || process.env.NEXT_PUBLIC_WEB_VITALS_DEBUG === "1" || process.env.NODE_ENV !== "production" ? (
          <WebVitalsReporter />
        ) : null}
        {/* Cookieless page views (enable "Web Analytics" for the project in the Vercel dashboard). */}
        <Analytics />
        <ServiceWorker />
        <div className="noise" aria-hidden />
      </body>
    </html>
  );
}
