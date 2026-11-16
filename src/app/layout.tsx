import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import "./globals.css";

import { CommandPalette } from "@/components/site/CommandPalette";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { PointerFX } from "@/components/site/PointerFX";
import { RevealObserver } from "@/components/site/RevealObserver";
import WebVitalsReporter from "@/components/perf/WebVitalsReporter";
import { JsonLd } from "@/components/seo/JsonLd";
import { education, profile, skillGroups } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";
import { themeBootScript } from "@/lib/theme";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = `${siteConfig.name} — AI/ML Engineer · Agentic AI & LLM Systems`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
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
    creator: "@AnishSeth170734",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "CC99sQSiR-os5PBjY9ve-etZ4g2GdD7rF1nMRhC5SYI" },
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  alternateName: ["Anish", "anishseth", "Anish-2005", "_anish.seth_"],
  jobTitle: "AI/ML Engineer",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/profile.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: profile.current.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
  sameAs: [
    siteConfig.sameAs.github,
    siteConfig.sameAs.linkedin,
    siteConfig.sameAs.x,
    siteConfig.sameAs.instagram,
    siteConfig.sameAs.leetcode,
  ],
  knowsAbout: Array.from(new Set(skillGroups.slice(0, 5).flatMap((g) => g.items))).slice(0, 30),
  award: ["Smart India Hackathon 2024 — National Finalist", "Smart India Hackathon 2025 — National Finalist"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.locale,
  publisher: { "@id": `${siteConfig.url}/#person` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link rel="me" href={siteConfig.sameAs.github} />
        <link rel="me" href={siteConfig.sameAs.linkedin} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <span id="top" aria-hidden className="absolute top-0" />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-bg-elev focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
        <CommandPalette />
        <RevealObserver />
        <PointerFX />
        <WebVitalsReporter />
        <div className="noise" aria-hidden />
      </body>
    </html>
  );
}
