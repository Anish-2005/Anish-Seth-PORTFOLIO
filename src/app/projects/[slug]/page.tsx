import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SubpageShell } from "@/components/layout/SubpageShell";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoProjects } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return seoProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const project = seoProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.tagline || project.body.slice(0, 160),
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline || project.body.slice(0, 160),
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = seoProjects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SubpageShell
      eyebrow="Project"
      title={project.title}
      description={project.tagline}
      chips={project.stack}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/projects/${project.slug}` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.tagline,
          url: `${siteConfig.url}/projects/${project.slug}`,
          author: {
            "@type": "Person",
            name: siteConfig.name,
          },
          inLanguage: siteConfig.locale,
          keywords: project.stack,
          about: project.highlights,
        }}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <article className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.16)]">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_var(--accent)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-2)]">Case study</span>
          </div>
          <MarkdownRenderer content={project.body} />
        </article>

        <aside className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-2)]">Project details</p>
          <dl className="mt-4 space-y-5 text-sm">
            <div>
              <dt className="text-[color:var(--text-2)]">Period</dt>
              <dd className="mt-1 font-medium text-[color:var(--text-0)]">{project.period}</dd>
            </div>
            <div>
              <dt className="text-[color:var(--text-2)]">Highlights</dt>
              <dd className="mt-1 space-y-2 text-[color:var(--text-1)]">
                {project.highlights.map((highlight) => (
                  <p key={highlight}>{highlight}</p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[color:var(--text-2)]">Links</dt>
              <dd className="mt-2 space-y-2">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)] px-4 py-3 font-medium text-[color:var(--accent)] transition-colors hover:bg-[color:var(--surface-2)]">
                    {link.label}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[color:var(--text-2)]">Portfolio</dt>
              <dd className="mt-1">
                <Link href="/projects" className="font-medium text-[color:var(--accent)] underline underline-offset-4">
                  Back to all projects
                </Link>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </SubpageShell>
  );
}