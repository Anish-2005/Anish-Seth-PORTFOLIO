import type { Metadata } from "next";
import Link from "next/link";

import { Projects } from "@/components/sections/Projects";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Anish Seth's portfolio projects, case studies, and production builds across AI, Next.js, mobile apps, and Web3.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description: "Browse Anish Seth's portfolio projects, case studies, and production builds across AI, Next.js, mobile apps, and Web3.",
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <SubpageShell
      eyebrow="Projects"
      title="Portfolio work by Anish Seth"
      description="A focused collection of product work, hackathon builds, and technical experiments spanning AI, mobile apps, observability, and Web3."
      chips={[
        "Case Studies",
        "AI",
        "Mobile",
        "Web3",
      ]}
    >
      <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-2)]">
        For search engines and visitors alike, this page concentrates the project signals behind <Link className="font-semibold text-[color:var(--accent)]" href="/">{siteConfig.name}</Link> and links the portfolio into one crawlable destination.
      </p>
      <Projects />
    </SubpageShell>
  );
}