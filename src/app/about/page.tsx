import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Recognition } from "@/components/sections/Recognition";
import { SubpageShell } from "@/components/site/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

const description =
  "About Anish Seth — AI/ML engineer at Digital Alpha building agentic AI, LLM systems and enterprise automation; B.Tech CSBS at Techno Main Salt Lake; two-time Smart India Hackathon national finalist.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About — ${siteConfig.name}`, description, url: `${siteConfig.url}/about`, type: "profile" },
};

export default function AboutPage() {
  return (
    <>
      <SubpageShell
        eyebrow="About"
        title={
          <>
            {profile.name} — {profile.role.toLowerCase().replace("ai/ml", "AI/ML")} building{" "}
            <span className="serif-em">trustworthy agents.</span>
          </>
        }
        description={profile.summary}
        crumbs={[{ label: "About" }]}
        meta={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={profile.links.resume}>
              Download résumé <Icon name="download" size={15} />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Get in touch <Icon name="arrow-right" size={15} />
            </ButtonLink>
          </div>
        }
      />
      <div className="[&>section:first-child]:pt-6 md:[&>section:first-child]:pt-10">
        <About />
        <Experience />
        <Recognition />
      </div>
    </>
  );
}
