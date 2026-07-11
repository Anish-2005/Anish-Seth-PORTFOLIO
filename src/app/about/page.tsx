import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Anish Seth, a full-stack developer focused on Next.js, React, AI systems, and high-performance portfolio experiences.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: "Learn more about Anish Seth, a full-stack developer focused on Next.js, React, AI systems, and high-performance portfolio experiences.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <Container className="py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-2)]">About</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-5xl">
          Anish Seth builds performance-first web products with strong design systems.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-1)]">
          This page exists to make the portfolio easier to discover for people searching for Anish Seth, the portfolio, or the work behind the name.
        </p>
      </Container>

      <About />
    </main>
  );
}