import { awards, education, profile, skillGroups } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

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
  representativeOfPage: true,
};

const personNode = {
  "@type": "Person",
  "@id": ids.person,
  name: profile.name,
  givenName: "Anish",
  familyName: "Seth",
  alternateName: ["Anish", "anishseth", "Anish-2005", "Anish Seth AI", "_anish.seth_"],
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
  alternateName: ["anishseth.xyz", "Anish Seth Portfolio"],
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
