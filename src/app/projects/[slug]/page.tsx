import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "@/components/work/ProjectArt";
import { categoryLabels, getProject, projects } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${project.kicker}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <SubpageShell
      eyebrow={project.kicker}
      title={project.title}
      description={project.summary}
      crumbs={[{ label: "Case studies", href: "/projects" }, { label: project.title }]}
      meta={
        <div className="flex flex-wrap items-center gap-3">
          {project.links.live ? (
            <ButtonLink href={project.links.live} size="md">
              Visit live site <Icon name="arrow-up-right" size={15} />
            </ButtonLink>
          ) : null}
          {project.links.github ? (
            <ButtonLink href={project.links.github} size="md" variant="secondary">
              <Icon name="github" size={16} /> View source
            </ButtonLink>
          ) : null}
          {!project.links.live && !project.links.github ? (
            <span className="chip !h-9 !px-4">
              <Icon name="shield" size={14} /> Private build — walkthrough available on request
            </span>
          ) : null}
          {project.badge ? (
            <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft px-4 text-[0.82rem] font-medium text-accent-ink">
              <Icon name="trophy" size={14} />
              {project.badge}
            </span>
          ) : null}
        </div>
      }
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Case studies", item: `${siteConfig.url}/projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/projects/${project.slug}` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: `${project.title} — ${project.kicker}`,
          description: project.summary,
          url: `${siteConfig.url}/projects/${project.slug}`,
          dateCreated: project.year,
          keywords: project.stack.join(", "),
          author: { "@id": `${siteConfig.url}/#person` },
          ...(project.links.github ? { codeRepository: project.links.github } : {}),
        }}
      />

      <div className="card fade-in aspect-[16/8] overflow-hidden p-0 sm:aspect-[21/8]" style={{ "--d": "320ms" } as React.CSSProperties}>
        <ProjectArt kind={project.art} id={`hero-${project.slug}`} />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <article className="lg:col-span-8">
          <section aria-labelledby="problem" data-reveal>
            <p className="eyebrow">01 — Context</p>
            <h2 id="problem" className="mt-3 text-[1.6rem] font-semibold tracking-tight">
              The problem
            </h2>
            <p className="mt-4 text-[1.08rem] leading-[1.8] text-muted text-pretty">{project.problem}</p>
          </section>

          <section aria-labelledby="approach" className="mt-14" data-reveal>
            <p className="eyebrow">02 — Engineering</p>
            <h2 id="approach" className="mt-3 text-[1.6rem] font-semibold tracking-tight">
              The approach
            </h2>
            <ol className="mt-6 space-y-4">
              {project.approach.map((step, i) => (
                <li key={step} className="card flex gap-5 p-5 sm:p-6">
                  <span className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[1rem] leading-relaxed text-fg/90 text-pretty">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="outcomes" className="mt-14" data-reveal>
            <p className="eyebrow">03 — Result</p>
            <h2 id="outcomes" className="mt-3 text-[1.6rem] font-semibold tracking-tight">
              What shipped
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {project.outcomes.map((o) => (
                <li key={o} className="rounded-2xl border border-line bg-bg-elev-2/50 p-5">
                  <Icon name="check" size={18} className="text-accent-ink" />
                  <p className="mt-3 text-[0.94rem] leading-snug">{o}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="lg:col-span-4">
          <div className="card p-6 lg:sticky lg:top-28" data-reveal>
            <dl className="space-y-5 text-[0.9rem]">
              <div>
                <dt className="eyebrow !text-[0.64rem]">Year</dt>
                <dd className="mt-1.5 font-medium">{project.year}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.64rem]">Category</dt>
                <dd className="mt-1.5 font-medium">{project.categories.map((c) => categoryLabels[c]).join(" · ")}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.64rem]">Stack</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="hairline my-6" />
            <p className="text-[0.9rem] text-muted">Want the deeper technical walkthrough?</p>
            <ButtonLink href="/#contact" size="md" className="mt-4 w-full">
              Let&apos;s talk <Icon name="arrow-right" size={15} />
            </ButtonLink>
          </div>
        </aside>
      </div>

      <nav aria-label="More case studies" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {[
          { p: prev, dir: "Previous" },
          { p: next, dir: "Next" },
        ].map(({ p, dir }) => (
          <Link
            key={dir}
            href={`/projects/${p.slug}`}
            className={`card group flex flex-col p-6 transition-colors hover:border-line-strong ${dir === "Next" ? "sm:items-end sm:text-right" : ""}`}
          >
            <span className="eyebrow flex items-center gap-1.5">
              {dir === "Previous" ? <Icon name="arrow-right" size={12} className="rotate-180" /> : null}
              {dir}
              {dir === "Next" ? <Icon name="arrow-right" size={12} /> : null}
            </span>
            <span className="mt-3 text-[1.15rem] font-semibold tracking-tight transition-colors group-hover:text-accent-ink">{p.title}</span>
            <span className="mt-1 text-[0.86rem] text-subtle">{p.kicker}</span>
          </Link>
        ))}
      </nav>
    </SubpageShell>
  );
}
