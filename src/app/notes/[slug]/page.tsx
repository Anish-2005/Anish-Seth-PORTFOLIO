import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SubpageShell } from "@/components/layout/SubpageShell";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return seoNotes.map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const note = seoNotes.find((entry) => entry.slug === slug);

  if (!note) {
    return { title: "Note not found" };
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
    openGraph: {
      title: `${note.title} — ${siteConfig.name}`,
      description: note.summary,
      url: `${siteConfig.url}/notes/${note.slug}`,
      type: "article",
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = params;
  const note = seoNotes.find((entry) => entry.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <SubpageShell
      eyebrow="Note"
      title={note.title}
      description={note.summary}
      chips={[note.date, "Frontend", "Performance"]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Notes", item: `${siteConfig.url}/notes` },
            { "@type": "ListItem", position: 3, name: note.title, item: `${siteConfig.url}/notes/${note.slug}` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description: note.summary,
          datePublished: note.date,
          dateModified: note.date,
          author: {
            "@type": "Person",
            name: siteConfig.name,
          },
          mainEntityOfPage: `${siteConfig.url}/notes/${note.slug}`,
          inLanguage: siteConfig.locale,
        }}
      />
      <article className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.16)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_var(--accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-2)]">Article</span>
        </div>
        <MarkdownRenderer content={note.body} />
      </article>
      <div className="mt-6">
        <Link href="/notes" className="font-medium text-[color:var(--accent)] underline underline-offset-4">
          Back to all notes
        </Link>
      </div>
    </SubpageShell>
  );
}