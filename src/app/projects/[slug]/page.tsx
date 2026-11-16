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
    title: `${project.title} · ${project.kicker}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
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

  const details = [
    { label: "Year", value: project.year },
    { label: "Category", value: project.categories.map((c) => categoryLabels[c]).join(" · ") },
    ...(project.badge ? [{ label: "Recognition", value: project.badge }] : []),
    { label: "Stack", value: project.stack.join(" / ") },
  ];

  return (
    <SubpageShell
      eyebrow={project.kicker}
      title={project.title}
      description={project.summary}
      crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
      meta={
        <div className="flex flex-wrap items-center gap-3">
          {project.links.live ? (
            <ButtonLink href={project.links.live}>
              Visit live site <Icon name="arrow-up-right" size={15} />
            </ButtonLink>
          ) : null}
          {project.links.github ? (
            <ButtonLink href={project.links.github} variant="secondary">
              View source <Icon name="github" size={15} />
            </ButtonLink>
          ) : null}
          {!project.links.live && !project.links.github ? (
            <p className="label">Private project. Happy to walk you through it.</p>
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
          headline: `${project.title} · ${project.kicker}`,
          description: project.summary,
          url: `${siteConfig.url}/projects/${project.slug}`,
          dateCreated: project.year,
          keywords: project.stack.join(", "),
          author: { "@id": `${siteConfig.url}/#person` },
          ...(project.links.github ? { codeRepository: project.links.github } : {}),
        }}
      />

      <div className="grid lg:grid-cols-12">
        {/* Specs column */}
        <aside className="mb-12 lg:col-span-3 lg:mb-0 lg:pr-10">
          <dl className="border-t border-line lg:sticky lg:top-28" data-reveal>
            {details.map((d) => (
              <div key={d.label} className="border-b border-line py-4">
                <dt className="label">{d.label}</dt>
                <dd className="mt-1.5 text-[0.92rem] leading-snug">{d.value}</dd>
              </div>
            ))}
            <div className="py-5">
              <Link href="/#contact" className="link-u inline-flex items-center gap-2 text-[0.9rem]">
                Ask me about this one <Icon name="arrow-right" size={14} className="text-accent-ink" />
              </Link>
            </div>
          </dl>
        </aside>

        <article className="min-w-0 lg:col-span-9 lg:pl-10">
          <figure className="fade-in" data-reveal style={{ "--d": "320ms" } as React.CSSProperties}>
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden bg-bg-elev">
                <ProjectArt kind={project.art} id={`hero-${project.slug}`} />
              </div>
              <span aria-hidden className="xh left-0 top-0" />
              <span aria-hidden className="xh left-full top-0" />
              <span aria-hidden className="xh left-0 top-full" />
              <span aria-hidden className="xh left-full top-full" />
            </div>
            <figcaption className="label mt-4">{project.title}, sketched</figcaption>
          </figure>

          <section aria-labelledby="problem" className="mt-16 grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr] md:gap-10" data-reveal>
            <p className="label text-accent-ink">Context</p>
            <div>
              <h2 id="problem" className="text-[1.6rem] font-semibold tracking-[-0.025em] [font-stretch:110%]">
                The problem
              </h2>
              <p className="mt-4 text-[1.06rem] leading-[1.8] text-muted text-pretty">{project.problem}</p>
            </div>
          </section>

          <section aria-labelledby="approach" className="mt-14 grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr] md:gap-10" data-reveal>
            <p className="label text-accent-ink">Approach</p>
            <div>
              <h2 id="approach" className="text-[1.6rem] font-semibold tracking-[-0.025em] [font-stretch:110%]">
                How I built it
              </h2>
              <ol className="mt-6 border-t border-line">
                {project.approach.map((step) => (
                  <li key={step} className="grid grid-cols-[1.4rem_1fr] border-b border-line py-5">
                    <span aria-hidden className="mt-[0.72em] h-px w-3 bg-accent" />
                    <p className="text-[1rem] leading-relaxed text-pretty">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="outcomes" className="mt-14 grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr] md:gap-10" data-reveal>
            <p className="label text-accent-ink">Result</p>
            <div>
              <h2 id="outcomes" className="text-[1.6rem] font-semibold tracking-[-0.025em] [font-stretch:110%]">
                What came out of it
              </h2>
              <ul className="mt-6 grid gap-px border-y border-line bg-line sm:grid-cols-3">
                {project.outcomes.map((o, i) => (
                  <li key={o} className={`bg-bg py-5 sm:pr-5 ${i > 0 ? "sm:pl-5" : ""}`}>
                    <Icon name="check" size={16} className="text-accent-ink" />
                    <p className="mt-3 text-[0.94rem] leading-snug">{o}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </div>

      <nav aria-label="More projects" className="mt-24 grid gap-px border-y border-line bg-line sm:grid-cols-2">
        {[
          { p: prev, dir: "Previous" },
          { p: next, dir: "Next" },
        ].map(({ p, dir }) => (
          <Link
            key={dir}
            href={`/projects/${p.slug}`}
            className={`group flex flex-col bg-bg py-8 ${dir === "Next" ? "sm:items-end sm:pl-8 sm:text-right" : "sm:pr-8"}`}
          >
            <span className="label">{dir === "Previous" ? "← Previous" : "Next →"}</span>
            <span className="mt-3 text-[1.35rem] font-semibold tracking-[-0.025em] transition-colors [font-stretch:110%] group-hover:text-accent-ink">
              {p.title}
            </span>
            <span className="mt-1 text-[0.86rem] text-subtle">{p.kicker}</span>
          </Link>
        ))}
      </nav>
    </SubpageShell>
  );
}
