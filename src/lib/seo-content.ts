export type SeoProject = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  stack: string[];
  links: { label: string; href: string }[];
  highlights: string[];
  body: string;
};

export type SeoNote = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

export const seoProjects: SeoProject[] = [
  {
    slug: "atlas",
    title: "Atlas — Portfolio Intelligence",
    tagline: "A fast, accessible portfolio platform with MDX content and rich visuals.",
    period: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind", "MDX"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Static-first content pipeline with frontmatter.",
      "Motion system respecting prefers-reduced-motion.",
      "Lighthouse-minded performance budget.",
    ],
    body:
      "This project is a v0 case-study template. Replace this copy with the real project description from your LinkedIn/portfolio.\n\n- Problem: what you set out to build\n- Approach: the technical and product decisions\n- Outcome: measurable impact (users, performance, DX)",
  },
  {
    slug: "chainkit",
    title: "ChainKit — Web3 Product System",
    tagline: "Reusable crypto UI and transaction flows designed for fast shipping.",
    period: "2025",
    stack: ["Next.js", "Web3", "TypeScript", "Design Systems"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Composable UI patterns for wallet and transaction states.",
      "Focused on clarity, trust, and conversion in sensitive flows.",
      "Built as a reusable product layer for future apps.",
    ],
    body:
      "This is a portfolio case-study stub for ChainKit. Use it to describe the product problem, system design, and the shipping result.\n\n- Goal: what the system had to solve\n- Implementation: the important architecture choices\n- Result: the value delivered",
  },
  {
    slug: "signal",
    title: "Signal — Decision Support Dashboard",
    tagline: "An analytics-first interface for turning product data into action.",
    period: "2025",
    stack: ["React", "Next.js", "Analytics", "UX"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Designed for scanning, comparison, and decision making.",
      "Clear hierarchy for complex operational dashboards.",
      "Built to support fast iteration and stakeholder reviews.",
    ],
    body:
      "This placeholder project page can be expanded into a full case study. Focus on the problem statement, user flow, and the measurable improvement.\n\n- Context: what kind of dashboard this was\n- Design: how the UI reduced cognitive load\n- Outcome: what changed after shipping",
  },
];

export const seoNotes: SeoNote[] = [
  {
    slug: "shipping-polish",
    title: "Shipping Polish Without Slowing Down",
    date: "2025-11-01",
    summary: "A short note on building interfaces that feel calm, fast, and confident.",
    body: "In v0, this is a stub note to prove the content pipeline.",
  },
  {
    slug: "seo-entity-signals",
    title: "SEO Entity Signals for a Personal Portfolio",
    date: "2026-07-11",
    summary: "What actually helps a personal site connect a name, handle, and domain in search.",
    body:
      "For a personal portfolio, the strongest signals are consistent naming, visible profile links, accurate structured data, and enough indexable content for the site to look like a real authority page.\n\nThe biggest wins usually come from:\n\n- A clear canonical domain\n- Matching person/schema data\n- Real internal content pages\n- External links from social profiles and GitHub\n- Text on the homepage that repeats the exact name and handle users search",
  },
  {
    slug: "nextjs-indexing",
    title: "Next.js Indexing Basics That Actually Matter",
    date: "2026-07-10",
    summary: "A practical checklist for making a portfolio easier for search engines to crawl.",
    body:
      "In Next.js, the fastest SEO gains usually come from server-rendered metadata, useful internal links, crawlable content pages, and a sitemap that only lists URLs that actually exist.\n\nA simple rule: if a route helps a visitor understand your work, it probably helps search too.",
  },
  {
    slug: "portfolio-case-study",
    title: "How to Turn a Portfolio Into a Searchable Case Study Library",
    date: "2026-07-09",
    summary: "Why a single-page portfolio is weaker than a portfolio with supporting pages.",
    body:
      "One homepage can rank, but multiple supportive pages usually create a much better topic cluster. Projects, notes, about pages, and FAQs make the site feel more complete and more discoverable.\n\nFor personal brands, that extra surface area matters a lot.",
  },
];