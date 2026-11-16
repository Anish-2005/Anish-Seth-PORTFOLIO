export type SeoNote = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
};

export const seoNotes: SeoNote[] = [
  {
    slug: "shipping-polish",
    title: "Shipping Polish Without Slowing Down",
    date: "2025-11-01",
    summary: "A short note on building interfaces that feel calm, fast, and confident.",
    tags: ["Frontend", "UX"],
    body: "The best polish is the kind users notice only when it is missing. For portfolio work, that means crisp spacing, gentle motion, stable layout, and clear content hierarchy without piling on unnecessary effects.\n\nThe idea is simple: finish the fundamentals first, then add motion as a support layer instead of the main event.",
  },
  {
    slug: "seo-entity-signals",
    title: "SEO Entity Signals for a Personal Portfolio",
    date: "2026-07-11",
    summary: "What actually helps a personal site connect a name, handle, and domain in search.",
    tags: ["SEO", "Next.js"],
    body:
      "For a personal portfolio, the strongest signals are consistent naming, visible profile links, accurate structured data, and enough indexable content for the site to look like a real authority page.\n\nThe biggest wins usually come from:\n\n- A clear canonical domain\n- Matching person/schema data\n- Real internal content pages\n- External links from social profiles and GitHub\n- Text on the homepage that repeats the exact name and handle users search",
  },
  {
    slug: "nextjs-indexing",
    title: "Next.js Indexing Basics That Actually Matter",
    date: "2026-07-10",
    summary: "A practical checklist for making a portfolio easier for search engines to crawl.",
    tags: ["Next.js", "SEO"],
    body:
      "In Next.js, the fastest SEO gains usually come from server-rendered metadata, useful internal links, crawlable content pages, and a sitemap that only lists URLs that actually exist.\n\nA simple rule: if a route helps a visitor understand your work, it probably helps search too.",
  },
  {
    slug: "portfolio-case-study",
    title: "How to Turn a Portfolio Into a Searchable Case Study Library",
    date: "2026-07-09",
    summary: "Why a single-page portfolio is weaker than a portfolio with supporting pages.",
    tags: ["Portfolio", "Content"],
    body:
      "One homepage can rank, but multiple supportive pages usually create a much better topic cluster. Projects, notes, about pages, and FAQs make the site feel more complete and more discoverable.\n\nFor personal brands, that extra surface area matters a lot. The goal is not just more pages — it is more useful pages that answer real search intent and reinforce the same identity.",
  },
];

export function getNote(slug: string) {
  return seoNotes.find((n) => n.slug === slug);
}

export function formatNoteDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
