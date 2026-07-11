import type { Metadata } from "next";
import Link from "next/link";

import { Projects } from "@/components/sections/Projects";
import { Container } from "@/components/ui/Container";
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
    <main>
      <Container className="py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-2)]">
          Projects
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-5xl">
          Portfolio work by Anish Seth
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-1)]">
          A focused collection of product work, hackathon builds, and technical experiments spanning AI, mobile apps, observability, and Web3.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-2)]">
          For search engines and visitors alike, this page concentrates the project signals behind <Link className="font-semibold text-[color:var(--accent)]" href="/">{siteConfig.name}</Link> and links the portfolio into one crawlable destination.
        </p>
      </Container>

      <Projects />
    </main>
  );
}