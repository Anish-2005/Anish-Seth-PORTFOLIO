import type { Metadata } from "next";
import Link from "next/link";

import { SubpageShell } from "@/components/site/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { ogDefaults } from "@/lib/seo";
import { formatNoteDate, readingMinutes, seoNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

const description =
  "Write-ups from Anish Seth on building AI agents that hold up with real data: retries, observability, cost and GraphRAG, plus a few notes on the web.";

export const metadata: Metadata = {
  title: "Notes",
  description,
  alternates: { canonical: "/notes" },
  openGraph: { ...ogDefaults, title: `Notes · ${siteConfig.name}`, description, url: `${siteConfig.url}/notes`, type: "website" },
};

export default function NotesPage() {
  // Newest first; same-day notes keep the order they are listed in.
  const notes = [...seoNotes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <SubpageShell
      eyebrow="Notes"
      title={
        <>
          Notes, <span className="text-subtle">mostly to my future self.</span>
        </>
      }
      description="Write-ups on building AI agents that hold up with real data, and a few things I learned the hard way along the way."
      crumbs={[{ label: "Notes" }]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Notes · ${siteConfig.name}`,
          description,
          url: `${siteConfig.url}/notes`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: notes.filter((n) => !n.noindex).map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n.title, url: `${siteConfig.url}/notes/${n.slug}` })),
          },
        }}
      />
      <ol className="border-t border-line lg:ml-[25%] lg:pl-10">
        {notes.map((n) => (
          <li key={n.slug} data-reveal>
            <Link
              href={`/notes/${n.slug}`}
              className="group grid gap-2 border-b border-line py-7 transition-colors sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-[0.78rem] text-subtle">
                <time dateTime={n.date}>{formatNoteDate(n.date)}</time>
                <span className="block">{readingMinutes(n.body)} min read</span>
              </span>
              <span>
                <span className="block text-[1.25rem] font-semibold tracking-tight transition-colors group-hover:text-accent-ink">{n.title}</span>
                <span className="mt-1.5 block text-[0.95rem] text-muted">{n.summary}</span>
              </span>
              <Icon name="arrow-right" size={18} className="hidden text-subtle transition-transform group-hover:translate-x-1 group-hover:text-fg sm:block" />
            </Link>
          </li>
        ))}
      </ol>
    </SubpageShell>
  );
}
