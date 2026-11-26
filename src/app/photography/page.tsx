import type { Metadata } from "next";
import Link from "next/link";

import "./photography.css";

import { LeaningPortrait } from "@/components/photography/LeaningPortrait";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { featuredPhoto } from "@/data/photography";
import { profile } from "@/data/profile";
import { abs, ids, ogDefaults, openGraphImage, personRef, photoNode } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

const { photoSite } = siteConfig;

const description = `${siteConfig.name}, an AI/ML engineer in Kolkata, also does photography. The work has its own site at ${photoSite.host}.`;

export const metadata: Metadata = {
  title: "Photography",
  description,
  alternates: { canonical: "/photography" },
  openGraph: {
    ...ogDefaults,
    title: `Photography · ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/photography`,
    type: "website",
    images: [openGraphImage(featuredPhoto)],
  },
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** A short introduction, on one screen. The photographs themselves live on the dedicated site. */
export default function PhotographyPage() {
  return (
    <section aria-labelledby="photography-title" className="photo-intro relative isolate overflow-hidden pt-10 md:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${abs("/photography")}#page`,
          url: abs("/photography"),
          name: `Photography · ${siteConfig.name}`,
          description,
          inLanguage: siteConfig.locale,
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.person },
          author: personRef,
          primaryImageOfPage: photoNode(featuredPhoto, "/photography"),
          significantLink: photoSite.url,
        }}
      />
      <div aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      {/* No bottom padding: the portrait stands on the footer's rule. */}
      {/* The height leaves room for the section's top padding, so on desktop that rule sits at the screen's edge. */}
      <div className="container-x relative grid lg:min-h-[calc(min(100svh,56rem)-3.5rem-2px)] lg:grid-cols-12">
        {/* The header is hidden here, so the page carries its own theme switch, level with the breadcrumbs. */}
        <ThemeToggle className="absolute -top-2.5 right-[var(--pad)] z-10 rounded-[3px] border border-line-strong hover:border-fg" />

        <div className="relative z-[2] flex flex-col lg:col-span-5 lg:pb-16">
          <Breadcrumbs crumbs={[{ label: "Photography" }]} />

          <div className="mt-12 pb-12 lg:my-auto lg:pb-0 lg:pt-10">
            <p className="label fade-in text-accent-ink" style={delay(60)}>
              Photography
            </p>
            <h1
              id="photography-title"
              className="fade-in mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance [font-stretch:112%]"
              style={delay(120)}
            >
              I also take <span className="text-subtle">photographs.</span>
            </h1>
            <p className="lede fade-in mt-6 max-w-md" style={delay(180)}>
              Away from the code, I do photography. It has a place of its own, separate from my engineering work.
            </p>
            <div className="fade-in mt-9 flex flex-wrap gap-3" style={delay(240)}>
              {/* Same tab: it's the next step of this visit, not a side reference. */}
              <ButtonLink href={photoSite.url} size="lg" target="_self" rel="me">
                Visit {photoSite.host} <Icon name="arrow-up-right" size={15} />
              </ButtonLink>
              <ButtonLink href="/" size="lg" variant="secondary">
                Back to portfolio
              </ButtonLink>
            </div>
            <p className="label fade-in mt-10 flex flex-wrap items-center gap-x-5 gap-y-2" style={delay(300)}>
              <span>{profile.location}</span>
              <Link href="/image-license" className="link-u hover:text-fg">
                Image license
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-end lg:col-span-7">
          <LeaningPortrait photo={featuredPhoto} href={photoSite.url} label={`See ${profile.name}'s photographs at ${photoSite.host}`} />
        </div>
      </div>
    </section>
  );
}
