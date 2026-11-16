import type { Metadata } from "next";

import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCard";
import { WorkFilter } from "@/components/work/WorkFilter";
import { categoryLabels, projects, type ProjectCategory } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

const description =
  "Case studies by Anish Seth — agentic AI pipelines, GraphRAG knowledge systems, fraud detection, and full-stack products built with Next.js, FastAPI and Django.";

export const metadata: Metadata = {
  title: "Case studies",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Case studies — ${siteConfig.name}`, description, url: `${siteConfig.url}/projects`, type: "website" },
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const cats = Object.keys(categoryLabels) as ProjectCategory[];
  const tabs = [
    { id: "all", label: "All", count: rest.length },
    ...cats.map((c) => ({ id: c, label: categoryLabels[c], count: rest.filter((p) => p.categories.includes(c)).length })),
  ];

  return (
    <SubpageShell
      eyebrow={`${projects.length} case studies`}
      title={
        <>
          Work, with the <span className="serif-em">reasoning</span> left in.
        </>
      }
      description="Every project below lists the problem, the approach and what shipped — the engineering decisions, not just the screenshots."
      crumbs={[{ label: "Case studies" }]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Case studies — ${siteConfig.name}`,
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
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {featured.map((p, i) => (
          <FeaturedProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="mt-16">
        <WorkFilter tabs={tabs}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </WorkFilter>
      </div>
    </SubpageShell>
  );
}
