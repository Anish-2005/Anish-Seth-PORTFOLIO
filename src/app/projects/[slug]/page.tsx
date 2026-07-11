import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { getProjectById, getProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const project = getProjectById(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.tagline || project.body.slice(0, 160),
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline || project.body.slice(0, 160),
      url: `${siteConfig.url}/projects/${project.id}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Container className="py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-2)]">Project</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--text-1)]">{project.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-2 text-sm text-[color:var(--text-2)]">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-[color:var(--border)] px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <article className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8">
            <MarkdownRenderer content={project.body} />
          </article>
          <aside className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-2)]">Project details</p>
            <dl className="mt-4 space-y-4 text-sm">
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
                <dd className="mt-1 space-y-2">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} className="block font-medium text-[color:var(--accent)] underline underline-offset-4">
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
      </Container>
    </main>
  );
}