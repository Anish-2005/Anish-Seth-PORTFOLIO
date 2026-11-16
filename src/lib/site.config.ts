import { profile } from "@/data/portfolio";

export const siteConfig = {
  name: profile.name,
  role: "AI/ML Engineer",
  shortRole: "AI/ML Engineer",
  description:
    "Anish Seth is an AI/ML engineer in Kolkata who builds AI agents that work with real data, mostly on AWS Bedrock with LangGraph and MCP, plus full-stack apps in Next.js and FastAPI. Two-time Smart India Hackathon national finalist.",
  url: "https://anishseth.xyz",
  locale: "en-US",
  sameAs: {
    linkedin: profile.links.linkedin,
    github: profile.links.github,
    instagram: profile.links.instagram,
    x: profile.links.x,
    leetcode: profile.links.leetcode,
    email: `mailto:${profile.email}`,
    website: "https://anishseth.xyz",
  },
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
    { label: "Contact", href: "/#contact", id: "contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
