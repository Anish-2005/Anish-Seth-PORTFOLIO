import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { getProject } from "@/data/portfolio";
import { formatNoteDate, getNote, readingMinutes, seoNotes } from "@/lib/seo-content";
import { abs, ids, isoDateTime, ogDefaults, personRef } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return seoNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    ...(note.noindex ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } } : {}),
    openGraph: {
      ...ogDefaults,
      title: `${note.title} · ${siteConfig.name}`,
      description: note.summary,
      url: `${siteConfig.url}/notes/${note.slug}`,
      type: "article",
      publishedTime: note.date,
      authors: [siteConfig.url],
      tags: note.tags,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const project = note.project ? getProject(note.project) : undefined;

  return (
    <SubpageShell
      eyebrow={`${formatNoteDate(note.date)} · ${readingMinutes(note.body)} min read`}
      title={note.title}
      description={note.summary}
      chips={note.tags}
      crumbs={[{ label: "Notes", href: "/notes" }, { label: note.title }]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: note.title,
          description: note.summary,
          datePublished: isoDateTime(note.date),
          dateModified: isoDateTime(note.date),
          image: abs(`/notes/${note.slug}/opengraph-image`),
          keywords: note.tags.join(", "),
          wordCount: note.body.split(/\s+/).length,
          ...(project ? { about: { "@type": "CreativeWork", name: project.title, url: abs(`/projects/${project.slug}`) } } : {}),
          author: personRef,
          publisher: personRef,
          isPartOf: { "@id": ids.website },
          mainEntityOfPage: abs(`/notes/${note.slug}`),
          inLanguage: siteConfig.locale,
        }}
      />
      <article className="max-w-2xl lg:ml-[25%] lg:pl-10">
        <MarkdownRenderer content={note.body} />
        {project ? (
          <Link
            href={`/projects/${project.slug}`}
            className="group mt-12 flex items-center justify-between gap-6 border border-line p-5 transition-colors hover:border-line-strong"
          >
            <span>
              <span className="label block">The project</span>
              <span className="mt-1.5 block text-[1.1rem] font-semibold tracking-tight">{project.title}</span>
              <span className="mt-1 block text-[0.9rem] text-muted">{project.summary}</span>
            </span>
            <Icon name="arrow-right" size={18} className="shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-fg" />
          </Link>
        ) : null}
        <div className="mt-14 flex items-center justify-between border-t border-line pt-6">
          <Link href="/notes" className="inline-flex items-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-fg">
            <Icon name="arrow-right" size={14} className="rotate-180" /> All notes
          </Link>
          <Link href="/#contact" className="text-[0.9rem] text-accent-ink underline-offset-4 hover:underline">
            Say hello
          </Link>
        </div>
      </article>
    </SubpageShell>
  );
}
