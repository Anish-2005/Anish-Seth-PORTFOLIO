import type { Metadata } from "next";
import Link from "next/link";

import { CornerMarks, Photo } from "@/components/photography/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SubpageShell } from "@/components/site/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { allPhotos, photoCount, photoSeries } from "@/data/photography";
import { abs, ids, ogDefaults, openGraphImage, personRef, photoNode } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

const description = `Photos of ${siteConfig.name}, AI/ML engineer in Kolkata: portraits in full resolution, with captions, credits and license details.`;

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
    images: photoSeries.map((s) => openGraphImage(s.cover)),
  },
};

/** How many photos of a series the index previews. */
const PREVIEW = 4;

export default function PhotographyPage() {
  return (
    <SubpageShell
      headerless
      eyebrow="Photography"
      title={
        <>
          Anish Seth, <span className="text-subtle">in pictures.</span>
        </>
      }
      description="The photos I'm happy to share, grouped into series. Each one comes with a caption and opens in full resolution."
      crumbs={[{ label: "Photography" }]}
      chips={[photoCount(allPhotos.length), `${photoSeries.length} series`]}
      meta={
        <ButtonLink href="/image-license" variant="secondary">
          Using a photo <Icon name="arrow-right" size={15} />
        </ButtonLink>
      }
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${abs("/photography")}#page`,
          url: abs("/photography"),
          name: `Photography · ${siteConfig.name}`,
          description,
          inLanguage: siteConfig.locale,
          isPartOf: { "@id": ids.website },
          author: personRef,
          primaryImageOfPage: photoNode(photoSeries[0].cover, `/photography/${photoSeries[0].slug}`),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: photoSeries.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: abs(`/photography/${s.slug}`),
            })),
          },
        }}
      />
      <ol className="border-t border-line">
        {photoSeries.map((series, index) => (
          <li key={series.slug} className="grid gap-8 border-b border-line py-10 md:py-14 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-3 lg:pr-10">
              <h2 className="text-[1.6rem] font-semibold tracking-[-0.025em] [font-stretch:110%]">
                <Link href={`/photography/${series.slug}`} className="transition-colors hover:text-accent-ink">
                  {series.title}
                </Link>
              </h2>
              <p className="label mt-3">{photoCount(series.photos.length)}</p>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted text-pretty">{series.summary}</p>
              <Link href={`/photography/${series.slug}`} className="link-u mt-5 inline-flex items-center gap-2 text-[0.92rem]">
                View the series <Icon name="arrow-right" size={14} className="text-accent-ink" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 items-start gap-4 sm:gap-8 lg:col-span-9 lg:pl-10">
              {series.photos.slice(0, PREVIEW).map((photo, i) => (
                <li key={photo.slug} className="relative">
                  <Link href={`/photography/${series.slug}#${photo.slug}`} className="group block overflow-hidden">
                    <Photo
                      photo={photo}
                      priority={index === 0 && i === 0}
                      sizes="(min-width: 1280px) 414px, (min-width: 1024px) 34vw, 46vw"
                      className="aspect-square object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.02]"
                    />
                  </Link>
                  <CornerMarks />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SubpageShell>
  );
}
