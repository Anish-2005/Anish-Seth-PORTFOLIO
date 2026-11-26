import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PhotoFigure } from "@/components/photography/PhotoFigure";
import { JsonLd } from "@/components/seo/JsonLd";
import { SubpageShell } from "@/components/site/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getSeries, photoCount, photoSeries } from "@/data/photography";
import { abs, ids, ogDefaults, openGraphImage, personRef, photoNode } from "@/lib/seo";
import { formatNoteDate } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

type Props = { params: Promise<{ series: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return photoSeries.map((s) => ({ series: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = getSeries((await params).series);
  if (!series) return { title: "Series not found" };
  return {
    title: series.title,
    description: series.summary,
    alternates: { canonical: `/photography/${series.slug}` },
    openGraph: {
      ...ogDefaults,
      title: `${series.title} · ${siteConfig.name}`,
      description: series.summary,
      url: `${siteConfig.url}/photography/${series.slug}`,
      type: "website",
      images: series.photos.map(openGraphImage),
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const series = getSeries((await params).series);
  if (!series) notFound();

  const path = `/photography/${series.slug}`;
  const [opening, ...rest] = series.story;
  const others = photoSeries.filter((s) => s.slug !== series.slug);

  return (
    <SubpageShell
      headerless
      eyebrow="Photography"
      title={series.title}
      description={opening}
      crumbs={[{ label: "Photography", href: "/photography" }, { label: series.title }]}
      chips={[photoCount(series.photos.length), `Updated ${formatNoteDate(series.updated)}`]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "@id": `${abs(path)}#gallery`,
          url: abs(path),
          name: `${series.title} · ${siteConfig.name}`,
          description: series.summary,
          inLanguage: siteConfig.locale,
          dateModified: series.updated,
          isPartOf: { "@id": ids.website },
          author: personRef,
          ...(series.photos.every((p) => p.portrait) ? { about: { "@id": ids.person } } : {}),
          primaryImageOfPage: { "@id": `${abs(path)}#${series.cover.slug}` },
          associatedMedia: series.photos.map((p) => photoNode(p, path)),
        }}
      />

      <div className="lg:ml-[25%] lg:pl-10">
        <div className="grid items-start gap-x-8 gap-y-14 sm:grid-cols-2">
          {series.photos.map((photo, i) => (
            <PhotoFigure key={photo.slug} photo={photo} priority={i === 0} />
          ))}
        </div>

        <div className="mt-16 max-w-2xl">
          {rest.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-[1.05rem] leading-relaxed text-muted text-pretty">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/image-license">
              Image license <Icon name="arrow-right" size={15} />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              About me
            </ButtonLink>
          </div>
        </div>
      </div>

      {others.length ? (
        <nav aria-label="More series" className="mt-24 grid gap-px border-y border-line bg-line sm:grid-cols-2">
          {others.map((s) => (
            <Link key={s.slug} href={`/photography/${s.slug}`} className="group flex flex-col bg-bg py-8 sm:pr-8">
              <span className="label">{photoCount(s.photos.length)}</span>
              <span className="mt-3 text-[1.35rem] font-semibold tracking-[-0.025em] transition-colors [font-stretch:110%] group-hover:text-accent-ink">
                {s.title}
              </span>
              <span className="mt-1 text-[0.86rem] text-subtle">{s.summary}</span>
            </Link>
          ))}
        </nav>
      ) : null}
    </SubpageShell>
  );
}
