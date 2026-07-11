import type { Metadata } from "next";
import Link from "next/link";

import { Notes } from "@/components/sections/Notes";
import { SubpageShell } from "@/components/layout/SubpageShell";
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
    <SubpageShell
      eyebrow="Notes"
      title="Short build notes and engineering thoughts"
      description="A compact writing surface for performance lessons, implementation details, and product craft from the portfolio work."
      chips={[
        "Performance",
        "UX",
        "Frontend",
        "Shipping",
      ]}
    >
      <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-2)]">
        The notes here help search engines connect Anish Seth with practical frontend and portfolio engineering topics.
      </p>
      <Notes notes={notes} />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--cta-secondary-border-hover)] hover:bg-[color:var(--surface-2)]">
              <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">{note.date}</p>
              <h2 className="mt-2 text-xl font-semibold text-[color:var(--text-0)]">{note.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-1)]">{note.summary}</p>
            </Link>
          ))}
      </div>
    </SubpageShell>
  );
}