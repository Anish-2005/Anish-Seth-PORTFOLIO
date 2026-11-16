import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { Recognition } from "@/components/sections/Recognition";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGitHubStats } from "@/lib/github";
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
          name: `${siteConfig.name} — portfolio`,
          url: siteConfig.url,
          mainEntity: { "@id": `${siteConfig.url}/#person` },
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
      <FAQ />
    </>
  );
}
