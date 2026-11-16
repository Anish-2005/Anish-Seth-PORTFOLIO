import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { Recognition } from "@/components/sections/Recognition";
import { SubpageShell } from "@/components/site/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

const description =
  "About Anish Seth: AI/ML engineer at Digital Alpha, B.Tech student at Techno Main Salt Lake in Kolkata, and two-time Smart India Hackathon national finalist.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About · ${siteConfig.name}`, description, url: `${siteConfig.url}/about`, type: "profile" },
};

export default function AboutPage() {
  return (
    <>
      <SubpageShell
        eyebrow="About"
        title={
          <>
            Hi, I&apos;m Anish. <span className="text-subtle">Nice to meet you.</span>
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
        <About portrait />
        <Experience />
        <Recognition />
        <FAQ />
      </div>
    </>
  );
}
