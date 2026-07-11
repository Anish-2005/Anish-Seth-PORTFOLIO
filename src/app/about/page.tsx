import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { SubpageShell } from "@/components/layout/SubpageShell";
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
    <SubpageShell
      eyebrow="About"
      title="Anish Seth builds performance-first web products with strong design systems."
      description="This page exists to make the portfolio easier to discover for people searching for Anish Seth, the portfolio, or the work behind the name."
      chips={[
        "Next.js",
        "React",
        "AI Systems",
        "Performance Design",
      ]}
    >
      <About />
    </SubpageShell>
  );
}