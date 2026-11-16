import { agentObservability } from "../content/notes/agent-observability";
import { graphragAgent } from "../content/notes/graphrag-agent";
import { safeToRetry } from "../content/notes/safe-to-retry";

export type SeoNote = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
  /** Slug of the project this write-up is about, if any (linked both ways). */
  project?: string;
};

/** Rough reading time at ~220 words a minute, never less than one. */
export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

export const seoNotes: SeoNote[] = [
  safeToRetry,
  agentObservability,
  graphragAgent,
  {
    slug: "shipping-polish",
    title: "Polish without the slowdown",
    date: "2025-11-01",
    summary: "Small details make a site feel good. Here's how I add them without missing deadlines.",
    tags: ["Frontend", "UX"],
    body: "Most polish goes unnoticed until it's missing. Even spacing, motion that doesn't fight you, and a layout that doesn't jump around while the page loads.\n\nMy rule is simple. Get the basics solid first: type, spacing and loading. Then add motion as the finishing touch, not the main event. If an animation makes something harder to read, it goes.",
  },
  {
    slug: "seo-entity-signals",
    title: "Getting Google to know who you are",
    date: "2026-07-11",
    summary: "What actually helped my name, my handle and my domain show up together in search.",
    tags: ["SEO", "Next.js"],
    body:
      "For a personal site, Google mostly needs to be sure that the name, the social profiles and the domain all belong to the same person.\n\nWhat made the biggest difference for me:\n\n- One main domain, used everywhere\n- Structured data that says who I am and links to my profiles\n- A few real pages beyond the homepage\n- Links back to the site from GitHub and my socials\n- My actual name and handle written on the page, not just in the logo",
  },
  {
    slug: "nextjs-indexing",
    title: "Next.js SEO basics that actually matter",
    date: "2026-07-10",
    summary: "A short checklist for making a Next.js site easy for search engines to read.",
    tags: ["Next.js", "SEO"],
    body:
      "Most of the easy wins come from four things: metadata rendered on the server, sensible internal links, pages with real content on them, and a sitemap that only lists pages that actually exist.\n\nA good test: if a page helps a person understand your work, it probably helps search engines too.",
  },
  {
    slug: "portfolio-case-study",
    title: "Why a one-page portfolio isn't enough",
    date: "2026-07-09",
    summary: "Turning my portfolio into a small library of project pages made it much easier to find.",
    tags: ["Portfolio", "Content"],
    body:
      "A single homepage can rank, but a handful of supporting pages does a lot more. Project write-ups, notes and an about page give people and search engines more ways in.\n\nThe point isn't more pages for the sake of it. Each page should answer a real question someone might have about you or your work.",
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
