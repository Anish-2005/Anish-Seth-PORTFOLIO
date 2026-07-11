import type { Metadata } from "next";
import { Inter, Roboto_Mono, Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import ClientFloatingThemeToggle from "@/components/ClientFloatingThemeToggle";
import WebVitalsReporter from "@/components/perf/WebVitalsReporter";
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
    "AnishSeth170734",
    "_anish.seth_",
    "anishseth",
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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio and personal website`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/twitter-image"],
    creator: "@AnishSeth170734",
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
  const profileImage = `${siteConfig.url}/profile.jpg`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: ["Anish", "ANISH SETH", "anishseth", "_anish.seth_"],
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    image: profileImage,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    sameAs: [
      siteConfig.sameAs.github,
      siteConfig.sameAs.linkedin,
      siteConfig.sameAs.instagram,
      siteConfig.sameAs.x,
      siteConfig.sameAs.website,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "professional inquiry",
        email: "anishseth0510@gmail.com",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
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
    inLanguage: siteConfig.locale,
    sameAs: [
      siteConfig.sameAs.github,
      siteConfig.sameAs.linkedin,
      siteConfig.sameAs.instagram,
      siteConfig.sameAs.x,
    ].filter(Boolean),
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${siteConfig.name} portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
        <link rel="canonical" href={siteConfig.url} />
        <link rel="me" href={siteConfig.sameAs.github} />
        <link rel="me" href={siteConfig.sameAs.linkedin} />
        <link rel="me" href={siteConfig.sameAs.instagram} />
        <link rel="me" href={siteConfig.sameAs.x} />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider>
          <StructuredData />
          <WebVitalsReporter />
          <ClientFloatingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
