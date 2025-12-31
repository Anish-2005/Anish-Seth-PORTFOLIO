import type { Metadata } from "next";
import { Inter, Roboto_Mono, Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { FloatingThemeToggle } from "@/components/ui/FloatingThemeToggle";
import { siteConfig } from "@/lib/site.config";

const heading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Anish Seth",
    "Anish",
    "ANISH SETH",
    "Full-Stack Developer",
    "Web Developer",
    "App Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Machine Learning",
    "Web3 Developer",
    "Blockchain",
    "Portfolio",
    "Software Engineer",
    "India",
    "Developer India",
    "Full Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Three.js Developer",
    "AI Developer",
    "Smart Contracts",
    "Ethereum Developer",
    "Portfolio Website",
    "Developer Portfolio",
    "Anish Seth Portfolio",
    "Smart India Hackathon",
    "AI Developer India",
    "Web3 Developer India",
    "Blockchain Developer India",
    "Machine Learning Engineer",
    "React Native Developer",
    "Expo Developer",
    "Legal Tech",
    "Social Impact Tech",
    "Healthcare Tech",
    "Agriculture Tech",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
    creator: "@anishseth", // Update if you have Twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "CC99sQSiR-os5PBjY9ve-etZ4g2GdD7rF1nMRhC5SYI",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0f1724",
};

function StructuredData() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: ["Anish", "ANISH SETH"],
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    sameAs: [
      siteConfig.sameAs.github,
      siteConfig.sameAs.linkedIn,
      siteConfig.sameAs.email,
    ].filter(Boolean),
    knowsAbout: [
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Machine Learning",
      "Web3",
      "Blockchain",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: siteConfig.role,
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
    },
    award: ["Smart India Hackathon 2024 Finalist"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://anishseth.xyz/" />
        <link rel="me" href={siteConfig.sameAs.github} />
        <link rel="me" href={siteConfig.sameAs.linkedIn} />
      </head>
      <body
        className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider>
          <StructuredData />
          <FloatingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
