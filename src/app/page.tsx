import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { Recognition } from "@/components/sections/Recognition";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGitHubStats } from "@/lib/github";
import { ids, isoDateTime, personRef } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";

// Static HTML, regenerated in the background so GitHub numbers stay fresh.
export const revalidate = 43200;

export default async function Home() {
  const stats = await getGitHubStats();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${siteConfig.url}/#profilepage`,
          url: siteConfig.url,
          name: `${siteConfig.name} · AI/ML Engineer`,
          description: siteConfig.description,
          inLanguage: siteConfig.locale,
          dateCreated: isoDateTime("2025-12-12"),
          dateModified: isoDateTime(siteConfig.updated),
          isPartOf: { "@id": ids.website },
          primaryImageOfPage: { "@id": ids.portrait },
          mainEntity: personRef,
        }}
      />
      <Hero contributions={stats.contributionsLastYear} repos={stats.publicRepos} />
      <About />
      <Experience />
      <Work repoCount={stats.publicRepos} />
      <Capabilities />
      <OpenSource stats={stats} />
      <Recognition />
      <Contact />
    </>
  );
}
