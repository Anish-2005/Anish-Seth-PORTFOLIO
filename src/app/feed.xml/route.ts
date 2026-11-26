import { profile } from "@/data/profile";
import { abs } from "@/lib/seo";
import { indexedNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

/**
 * /feed.xml: RSS for the notes. Feed readers and aggregators pick up new write-ups from it, and
 * Search Console accepts it as a sitemap, which gets new notes crawled sooner.
 */
export function GET() {
  const notes = [...indexedNotes].sort((a, b) => b.date.localeCompare(a.date));
  const items = notes.map((n) =>
    [
      "    <item>",
      `      <title>${esc(n.title)}</title>`,
      `      <link>${abs(`/notes/${n.slug}`)}</link>`,
      `      <guid isPermaLink="true">${abs(`/notes/${n.slug}`)}</guid>`,
      `      <pubDate>${rfc822(n.date)}</pubDate>`,
      `      <dc:creator>${esc(profile.name)}</dc:creator>`,
      ...n.tags.map((t) => `      <category>${esc(t)}</category>`),
      `      <description>${esc(n.summary)}</description>`,
      "    </item>",
    ].join("\n"),
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${esc(`Notes · ${siteConfig.name}`)}</title>`,
    `    <link>${abs("/notes")}</link>`,
    `    <atom:link href="${abs("/feed.xml")}" rel="self" type="application/rss+xml" />`,
    `    <description>${esc(`Write-ups from ${profile.name}, ${profile.role}, on building AI agents that hold up with real data.`)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${rfc822(notes[0].date)}</lastBuildDate>`,
    "    <image>",
    `      <url>${abs("/brand/icon-512.png")}</url>`,
    `      <title>${esc(`Notes · ${siteConfig.name}`)}</title>`,
    `      <link>${abs("/notes")}</link>`,
    "    </image>",
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
