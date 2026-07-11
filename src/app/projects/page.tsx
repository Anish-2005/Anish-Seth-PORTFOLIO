import type { Metadata } from "next";
import Link from "next/link";

import { Projects } from "@/components/sections/Projects";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoProjects } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Anish Seth's portfolio projects, case studies, and production builds across AI, Next.js, mobile apps, and Web3.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description: "Browse Anish Seth's portfolio projects, case studies, and production builds across AI, Next.js, mobile apps, and Web3.",
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  const itemList = seoProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    url: `${siteConfig.url}/projects/${project.slug}`,
  }));

  return (
    <SubpageShell
      eyebrow="Projects"
      title="Portfolio work by Anish Seth"
      description="A focused collection of product work, hackathon builds, and technical experiments spanning AI, mobile apps, observability, and Web3."
      chips={[
        "Case Studies",
        "AI",
        "Mobile",
        "Web3",
      ]}
    >
      <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-2)]">
        For search engines and visitors alike, this page concentrates the project signals behind <Link className="font-semibold text-[color:var(--accent)]" href="/">{siteConfig.name}</Link> and links the portfolio into one crawlable destination.
      </p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Projects — ${siteConfig.name}`,
          description: "Browse Anish Seth's portfolio projects, case studies, and production builds across AI, Next.js, mobile apps, and Web3.",
          url: `${siteConfig.url}/projects`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: itemList,
          },
        }}
      />
      <Projects />
    </SubpageShell>
  );
}