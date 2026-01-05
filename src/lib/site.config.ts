export const siteConfig = {
  name: "Anish Seth",
  role: "Full-Stack Developer | Next.js, React, Web Apps & AI",
  description: "Portfolio of Anish Seth, a full-stack developer building scalable web and app solutions using Next.js, React, TypeScript, AI/ML, and Web3 technologies.",
  url: "https://www.anishseth.xyz",
  locale: "en-US",
  accent: "cyan",
  sameAs: {
  linkedin: "https://www.linkedin.com/in/anishseth",
  github: "https://github.com/Anish-2005",
  email: "mailto:anishseth0510@gmail.com",
  website: "https://www.anishseth.xyz",
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
