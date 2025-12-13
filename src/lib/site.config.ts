export const siteConfig = {
  name: "Anish Seth",
  role: "Full-Stack Web & App Developer · ML & Web3",
  description:
    "Building polished web apps and immersive data experiences. Next.js, React, TypeScript, ML pipelines & blockchain integrations.",
  url: "https://anishseth.xyz",
  locale: "en-US",
  accent: "cyan",
  sameAs: {
    linkedIn: "https://www.linkedin.com/in/anishseth",
    github: "https://github.com/Anish-2005",
    email: "mailto:anishseth0510@gmail.com",
  },
  location: "India",
  resume: {
    label: "Resume",
    href: "/resume.pdf",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Visuals", href: "#visuals" },
    { label: "Notes", href: "#notes" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
