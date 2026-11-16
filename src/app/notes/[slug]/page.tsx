import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { formatNoteDate, getNote, seoNotes } from "@/lib/seo-content";
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
    openGraph: {
      title: `${note.title} · ${siteConfig.name}`,
      description: note.summary,
      url: `${siteConfig.url}/notes/${note.slug}`,
      type: "article",
      publishedTime: note.date,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <SubpageShell
      eyebrow={formatNoteDate(note.date)}
      title={note.title}
      description={note.summary}
      chips={note.tags}
      crumbs={[{ label: "Notes", href: "/notes" }, { label: note.title }]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description: note.summary,
          datePublished: note.date,
          dateModified: note.date,
          author: { "@id": `${siteConfig.url}/#person` },
          mainEntityOfPage: `${siteConfig.url}/notes/${note.slug}`,
          inLanguage: siteConfig.locale,
        }}
      />
      <article className="max-w-2xl lg:ml-[25%] lg:pl-10">
        <MarkdownRenderer content={note.body} />
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
