import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
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
    <main>
      <Container className="py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-2)]">Note</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-5xl">{note.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--text-1)]">{note.summary}</p>
        <p className="mt-3 text-sm font-medium tracking-[0.18em] text-[color:var(--text-2)]">{note.date}</p>
        <article className="mt-10 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 sm:p-8">
          <MarkdownRenderer content={note.body} />
        </article>
        <div className="mt-8">
          <Link href="/notes" className="font-medium text-[color:var(--accent)] underline underline-offset-4">
            Back to all notes
          </Link>
        </div>
      </Container>
    </main>
  );
}