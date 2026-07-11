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
    tagline: "A fast, accessible portfolio platform with MDX content, rich visuals, and strong entity signals.",
    period: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind", "MDX"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Static-first content pipeline with frontmatter and content-driven pages.",
      "Motion system that stays accessible with reduced-motion fallbacks.",
      "Performance-focused structure designed to keep LCP, CLS, and crawlability strong.",
    ],
    body:
      "Atlas is the content-and-portfolio system behind this site: a static-first Next.js build with themed motion, clear information hierarchy, and route-based SEO.\n\n- Problem: turn a single portfolio into a searchable, multi-page brand surface\n- Approach: build a design system around content, motion, and metadata instead of a one-off landing page\n- Outcome: a faster site with stronger crawl paths, cleaner internal linking, and better search visibility for Anish Seth",
  },
  {
    slug: "chainkit",
    title: "ChainKit — Web3 Product System",
    tagline: "Reusable crypto UI and transaction flows designed for trust, clarity, and fast shipping.",
    period: "2025",
    stack: ["Next.js", "Web3", "TypeScript", "Design Systems"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Composable UI patterns for wallet and transaction states.",
      "Focused on clarity, trust, and conversion in sensitive flows.",
      "Built as a reusable product layer for future apps and proof-of-concept work.",
    ],
    body:
      "ChainKit is the Web3-oriented product system in the portfolio stack. The goal is to keep crypto and wallet UI understandable instead of intimidating.\n\n- Goal: reduce friction in wallet, transaction, and verification flows\n- Implementation: modular UI states, clear visual hierarchy, and a system that scales across product ideas\n- Result: a reusable interface approach that can be adapted quickly for future blockchain products",
  },
  {
    slug: "signal",
    title: "Signal — Decision Support Dashboard",
    tagline: "An analytics-first interface for turning product data into action and helping users decide faster.",
    period: "2025",
    stack: ["React", "Next.js", "Analytics", "UX"],
    links: [{ label: "GitHub", href: "https://github.com/Anish-2005" }],
    highlights: [
      "Designed for scanning, comparison, and decision making.",
      "Clear hierarchy for complex operational dashboards.",
      "Built to support fast iteration and stakeholder reviews.",
    ],
    body:
      "Signal is the portfolio's dashboard-style case study. It frames how Anish Seth approaches information density, prioritization, and product clarity.\n\n- Context: a dashboard experience where fast reading matters more than decorative complexity\n- Design: compact hierarchy, strong contrast, and clean spacing for lower cognitive load\n- Outcome: a pattern for turning noisy product data into a usable decision surface",
  },
];

export const seoNotes: SeoNote[] = [
  {
    slug: "shipping-polish",
    title: "Shipping Polish Without Slowing Down",
    date: "2025-11-01",
    summary: "A short note on building interfaces that feel calm, fast, and confident.",
    body: "The best polish is the kind users notice only when it is missing. For portfolio work, that means crisp spacing, gentle motion, stable layout, and clear content hierarchy without piling on unnecessary effects.\n\nThis note exists to prove the content pipeline, but the idea is real: finish the fundamentals first, then add motion as a support layer instead of the main event.",
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
      "One homepage can rank, but multiple supportive pages usually create a much better topic cluster. Projects, notes, about pages, and FAQs make the site feel more complete and more discoverable.\n\nFor personal brands, that extra surface area matters a lot. The goal is not just more pages — it is more useful pages that answer real search intent and reinforce the same identity.",
  },
];