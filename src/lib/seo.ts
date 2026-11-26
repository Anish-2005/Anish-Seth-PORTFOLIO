import type { ResolvedPhoto } from "@/data/photography";
import { awards, certifications, education, profile, skillGroups } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

/**
 * Site-wide Open Graph fields. A page's own openGraph replaces the layout's rather than merging
 * with it, so every page spreads these in to keep og:site_name and og:locale.
 */
export const ogDefaults = { siteName: siteConfig.name, locale: "en_US" } as const;

/**
 * Schema.org DateTime for a YYYY-MM-DD date: midnight in Kolkata. Google's rich results want a
 * time and a timezone, and flag a bare date as an invalid datetime.
 */
export const isoDateTime = (date: string) => `${date}T00:00:00+05:30`;

/**
 * One connected knowledge graph for the whole site. Every page points back to the same Person
 * (by @id), so search engines treat the site, the photo and the profiles as one entity: Anish Seth.
 */
const URL = siteConfig.url;

export const ids = {
  person: `${URL}/#person`,
  website: `${URL}/#website`,
  portrait: `${URL}/#portrait`,
  employer: `${URL}/#employer`,
  school: `${URL}/#school`,
};

/** Square headshot at a name-bearing URL; the one image every schema node and sitemap points to. */
export const portrait = {
  url: `${URL}/anish-seth.jpg`,
  width: 1200,
  height: 1200,
  alt: "Anish Seth",
};

/** Google Images shows these as a photo's license details ("Licensable" badge, "Get this image"). */
const licensing = {
  license: `${URL}/image-license`,
  acquireLicensePage: `${URL}/image-license`,
};

/** Short Person reference with the fields rich-result validators expect on author/mainEntity. */
export const personRef = {
  "@type": "Person",
  "@id": ids.person,
  name: profile.name,
  url: URL,
  image: portrait.url,
};

const portraitNode = {
  "@type": "ImageObject",
  "@id": ids.portrait,
  url: portrait.url,
  contentUrl: portrait.url,
  width: portrait.width,
  height: portrait.height,
  name: "Anish Seth",
  caption: "Anish Seth, AI/ML engineer in Kolkata",
  creditText: "Anish Seth",
  creator: { "@id": ids.person },
  copyrightNotice: `© ${new Date().getFullYear()} Anish Seth`,
  ...licensing,
  representativeOfPage: true,
};

const personNode = {
  "@type": "Person",
  "@id": ids.person,
  name: profile.name,
  givenName: "Anish",
  familyName: "Seth",
  alternateName: ["Anish", "anishseth", "Anish-2005", "Anish Seth AI", "anishseth.in"],
  url: URL,
  mainEntityOfPage: URL,
  image: { "@id": ids.portrait },
  description: siteConfig.description,
  jobTitle: profile.role,
  hasOccupation: {
    "@type": "Occupation",
    name: profile.role,
    occupationLocation: { "@type": "City", name: "Kolkata" },
    skills: skillGroups
      .flatMap((g) => g.items)
      .slice(0, 20)
      .join(", "),
  },
  worksFor: { "@id": ids.employer },
  alumniOf: { "@id": ids.school },
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    credentialCategory: "certificate",
    dateCreated: c.year,
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
  homeLocation: {
    "@type": "Place",
    name: profile.location,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  email: `mailto:${profile.email}`,
  knowsAbout: Array.from(new Set(skillGroups.slice(0, 5).flatMap((g) => g.items))).slice(0, 30),
  award: awards.map(
    (a) => `${a.title} ${a.year}, ${a.result.toLowerCase()}${a.detail.startsWith("Phase") ? ` (${a.detail.split(" · ")[0]})` : ""}`,
  ),
  sameAs: siteConfig.profiles,
};

const websiteNode = {
  "@type": "WebSite",
  "@id": ids.website,
  name: profile.name,
  alternateName: ["anishseth.in", "Anish Seth Portfolio"],
  url: URL,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
  publisher: { "@id": ids.person },
  about: { "@id": ids.person },
};

const employerNode = {
  "@type": "Organization",
  "@id": ids.employer,
  name: profile.current.company,
};

const schoolNode = {
  "@type": "CollegeOrUniversity",
  "@id": ids.school,
  name: education[0].school.replace(/,\s*Kolkata$/, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
};

/** Rendered once in the root layout, so every page carries the full entity. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [personNode, portraitNode, websiteNode, employerNode, schoolNode],
};

/** Breadcrumb trail; the last item may omit its URL (it's the current page). */
export function breadcrumbs(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path !== undefined ? { item: `${URL}${item.path}` } : {}),
    })),
  };
}

/** Absolute URL helper for schema fields. */
export const abs = (path: string) => `${URL}${path}`;

/** One gallery photo, tied to the page it appears on and (for portraits) to the same Person. */
export function photoNode(photo: ResolvedPhoto, pagePath: string) {
  const own = photo.creator === profile.name;
  return {
    "@type": "ImageObject",
    "@id": `${abs(pagePath)}#${photo.slug}`,
    url: abs(photo.src),
    contentUrl: abs(photo.src),
    thumbnailUrl: abs(photo.thumbnail),
    encodingFormat: "image/webp",
    width: photo.width,
    height: photo.height,
    name: photo.title,
    caption: photo.caption,
    description: photo.alt,
    creator: own ? personRef : { "@type": "Person", name: photo.creator },
    creditText: photo.creator,
    copyrightNotice: `© ${photo.creator}`,
    ...licensing,
    ...(photo.portrait ? { about: { "@id": ids.person } } : {}),
    ...(photo.location ? { contentLocation: { "@type": "Place", name: photo.location } } : {}),
    ...(photo.taken ? { dateCreated: isoDateTime(photo.taken) } : {}),
  };
}

/** The same photo as an Open Graph image, so a shared gallery link shows the picture itself. */
export const openGraphImage = (photo: ResolvedPhoto) => ({
  url: abs(photo.src),
  width: photo.width,
  height: photo.height,
  alt: photo.alt,
  type: "image/webp",
});
