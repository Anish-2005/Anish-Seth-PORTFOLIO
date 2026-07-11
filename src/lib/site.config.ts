export const siteConfig = {
  name: "Anish Seth",
  role: "Full-Stack Developer | Next.js, React, Web Apps & AI",
  description: "Anish Seth is a full-stack developer building high-performance web apps with Next.js, React, TypeScript, AI/ML, and Web3. Find his portfolio, projects, and social profiles at anishseth.xyz.",
  url: "https://anishseth.xyz",
  locale: "en-US",
  accent: "cyan",
  sameAs: {
    linkedin: "https://www.linkedin.com/in/anishseth",
    github: "https://github.com/Anish-2005",
    instagram: "https://www.instagram.com/_anish.seth_/",
    x: "https://x.com/AnishSeth170734",
    email: "mailto:anishseth0510@gmail.com",
    website: "https://anishseth.xyz",
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
