import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  role: "AI/ML Engineer",
  shortRole: "AI/ML Engineer",
  description:
    "Anish Seth is an AI/ML engineer in Kolkata who builds AI agents that work with real data, mostly on AWS Bedrock with LangGraph and MCP, plus full-stack apps in Next.js and FastAPI. National finalist at Smart India Hackathon and IDE Bootcamp.",
  // Vercel serves the site on www (the apex redirects there), so www is the canonical address.
  url: "https://www.anishseth.in",
  locale: "en-US",
  sameAs: {
    linkedin: profile.links.linkedin,
    github: profile.links.github,
    instagram: profile.links.instagram,
    x: profile.links.x,
    leetcode: profile.links.leetcode,
    email: `mailto:${profile.email}`,
    website: "https://www.anishseth.in",
  },
  /** Every public profile that belongs to this person (schema.org sameAs and rel="me"). */
  profiles: [
    profile.links.github,
    profile.links.linkedin,
    profile.links.x,
    profile.links.instagram,
    profile.links.leetcode,
    "https://stackoverflow.com/users/27832882/anish-seth",
    "https://www.hackerrank.com/profile/anishseth0510",
    "https://www.geeksforgeeks.org/profile/anishse10t1",
    "https://www.figma.com/@anishseth",
    "https://www.facebook.com/anish.seth.313/",
  ],
  twitter: "@AnishSeth170734",
  /** Bump when page content changes; feeds sitemap lastmod (an honest date beats "now" on every build). */
  updated: "2026-11-24",
  location: profile.location,
  resume: {
    label: "Résumé",
    href: profile.links.resume,
  },
  nav: [
    { label: "About", href: "/#about", id: "about" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Work", href: "/#work", id: "work" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Writing", href: "/notes", id: "writing" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
