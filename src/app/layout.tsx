import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

import { CommandPalette } from "@/components/site/CommandPalette";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Frame } from "@/components/site/Frame";
import { EncoderDial } from "@/components/site/EncoderDial";
import { RevealObserver } from "@/components/site/RevealObserver";
import WebVitalsReporter from "@/components/perf/WebVitalsReporter";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";
import { themeBootScript } from "@/lib/theme";

// One variable grotesk (weight + width axes) carries the whole typographic system:
// expanded for display, normal width for reading. Plex Mono handles technical labels.
const sans = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
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
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
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
        <EncoderDial />
        <Nav />
        <main id="content" className="relative z-[1]">
          {children}
        </main>
        <Footer />
        <CommandPalette />
        <RevealObserver />
        <WebVitalsReporter />
        <div className="noise" aria-hidden />
      </body>
    </html>
  );
}
