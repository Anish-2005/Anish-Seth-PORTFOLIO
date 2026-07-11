import type { Metadata } from "next";
import Link from "next/link";

import { Notes } from "@/components/sections/Notes";
import { Container } from "@/components/ui/Container";
import { seoNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Notes",
  description: "Read short notes from Anish Seth on shipping polish, performance, UX details, and practical frontend lessons.",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: `Notes — ${siteConfig.name}`,
    description: "Read short notes from Anish Seth on shipping polish, performance, UX details, and practical frontend lessons.",
    url: `${siteConfig.url}/notes`,
    type: "website",
  },
};

export default function NotesPage() {
  const notes = seoNotes;

  return (
    <main>
      <Container className="py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-2)]">
          Notes
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-5xl">
          Short build notes and engineering thoughts
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-1)]">
          A compact writing surface for performance lessons, implementation details, and product craft from the portfolio work.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-2)]">
          The notes here help search engines connect Anish Seth with practical frontend and portfolio engineering topics.
        </p>
      </Container>

      <Notes notes={notes} />

      <Container className="py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">{note.date}</p>
              <h2 className="mt-2 text-xl font-semibold text-[color:var(--text-0)]">{note.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-1)]">{note.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}