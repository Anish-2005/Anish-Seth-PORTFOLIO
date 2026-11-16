import type { Metadata } from "next";

import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { FeaturedGrid } from "@/components/work/FeaturedGrid";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { projects } from "@/data/portfolio";
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

  return (
    <SubpageShell
      eyebrow={`${projects.length} case studies`}
      title={
        <>
          Work, with the reasoning <span className="text-subtle">left in.</span>
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
      <FeaturedGrid projects={featured} />
      <div className="mt-20">
        <h2 className="mb-8 text-[1.3rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">Index</h2>
        <ProjectIndex projects={rest} startAt={featured.length + 1} />
      </div>
    </SubpageShell>
  );
}
