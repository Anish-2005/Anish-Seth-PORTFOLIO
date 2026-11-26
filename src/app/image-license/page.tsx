import type { Metadata } from "next";
import Link from "next/link";

import { SubpageShell } from "@/components/site/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/portfolio";
import { ogDefaults } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

const description = `Photos on this site are © ${profile.name} unless credited otherwise, all rights reserved. How to ask to use one.`;

/**
 * The page every photo's structured data and embedded metadata point to for "license" and "acquireLicensePage", so
 * Google Images can show who owns the photo and how to ask for it. A utility page, so noindex.
 */
export const metadata: Metadata = {
  title: "Image license",
  description,
  alternates: { canonical: "/image-license" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { ...ogDefaults, title: `Image license · ${siteConfig.name}`, description, url: `${siteConfig.url}/image-license`, type: "website" },
};

export default function ImageLicensePage() {
  return (
    <SubpageShell
      eyebrow="Image license"
      title={
        <>
          Using my photos. <span className="text-subtle">Just ask first.</span>
        </>
      }
      description={`Photos on this site are © ${profile.name} unless credited otherwise. All rights reserved.`}
      crumbs={[{ label: "Image license" }]}
      meta={
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}?subject=Using%20your%20photo`}>
            Email me <Icon name="arrow-right" size={15} />
          </ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Contact form
          </ButtonLink>
        </div>
      }
    >
      <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-muted lg:ml-[25%] lg:pl-10">
        <p>
          If you&apos;d like to use one of them, for an event page, an article or an interview, email me at{" "}
          <a href={`mailto:${profile.email}`} className="link-u text-fg">
            {profile.email}
          </a>{" "}
          and tell me where it will appear.
        </p>
        <p>
          Wherever it&apos;s used, please credit it as <span className="text-fg">&ldquo;{profile.name}&rdquo;</span>, or the
          photographer named under the picture. You can see them all on the{" "}
          <Link href="/photography" className="link-u text-fg">
            photography page
          </Link>
          .
        </p>
      </div>
    </SubpageShell>
  );
}
