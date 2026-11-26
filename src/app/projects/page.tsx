import type { Metadata } from "next";

import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { FeaturedGrid } from "@/components/work/FeaturedGrid";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { projects, toProjectRow } from "@/data/portfolio";
import { ogDefaults } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

const description =
  "Projects by Anish Seth: AI agents, knowledge graphs, fraud detection and full-stack apps built with Next.js, FastAPI and Django.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { ...ogDefaults, title: `Projects · ${siteConfig.name}`, description, url: `${siteConfig.url}/projects`, type: "website" },
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SubpageShell
      eyebrow={`${projects.length} projects`}
      title={
        <>
          Everything I&apos;ve built, <span className="text-subtle">and why.</span>
        </>
      }
      description="Each one covers the problem, how I went about it and what came out the other end."
      crumbs={[{ label: "Projects" }]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Projects · ${siteConfig.name}`,
          description,
          url: `${siteConfig.url}/projects`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `${siteConfig.url}/projects/${p.slug}`,
            })),
          },
        }}
      />
      <FeaturedGrid projects={featured} />
      <div className="mt-20">
        <h2 className="mb-8 text-[1.3rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">More projects</h2>
        <ProjectIndex projects={rest.map(toProjectRow)} />
      </div>
    </SubpageShell>
  );
}
