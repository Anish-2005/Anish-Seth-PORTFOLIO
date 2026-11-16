import { clip, renderShareCard, wrapTitle } from "@/lib/share-card";
import { formatNoteDate, getNote, seoNotes } from "@/lib/seo-content";

export const alt = "A note by Anish Seth, AI/ML engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return seoNotes.map((n) => ({ slug: n.slug }));
}

export default async function NoteImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug) ?? seoNotes[0];
  const lines = wrapTitle(note.title, 18);
  return renderShareCard({
    brand: "ANISH SETH",
    eyebrow: `NOTE · ${formatNoteDate(note.date).toUpperCase()}`,
    title: lines,
    titleSize: lines.length > 2 ? 58 : 68,
    tagline: clip(note.summary, 110),
    footer: [...note.tags.map((t) => ({ text: t })), { text: "by Anish Seth", accent: true }],
  });
}
