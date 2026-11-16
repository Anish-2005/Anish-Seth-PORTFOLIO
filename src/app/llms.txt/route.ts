import { awards, certifications, education, experience, faqs, profile, projects, skillGroups } from "@/data/portfolio";
import { portrait } from "@/lib/seo";
import { seoNotes } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";

/**
 * /llms.txt (llmstxt.org): a plain-Markdown summary for AI search and assistants
 * (ChatGPT, Perplexity, Claude, Gemini), so answers about "Anish Seth" come from this site.
 */
export function GET() {
  const url = siteConfig.url;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${profile.name} is an ${profile.role} based in ${profile.location}, currently ${profile.current.title} at ${profile.current.company} (since ${profile.current.since}). Official website: ${url}. Photo: ${portrait.url}.`,
    "",
    "## About",
    "",
    ...profile.intro.map((p) => `${p}`),
    "",
    "## Experience",
    "",
    ...experience.map((e) => `- **${e.role}, ${e.company}** (${e.period}): ${e.summary}`),
    "",
    "## Recognition",
    "",
    ...awards.map((a) => `- ${a.title} ${a.year}: ${a.result}. ${a.detail}`),
    ...certifications.map((c) => `- ${c.title} (${c.issuer}, ${c.year})`),
    "",
    "## Education",
    "",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
    "## Skills",
    "",
    ...skillGroups.map((g) => `- **${g.title}:** ${g.items.join(", ")}`),
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.title}](${url}/projects/${p.slug}): ${p.summary}`),
    "",
    "## Notes",
    "",
    ...seoNotes.map((n) => `- [${n.title}](${url}/notes/${n.slug}): ${n.summary}`),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Links",
    "",
    `- [Website](${url})`,
    `- [About](${url}/about)`,
    `- [Résumé (PDF)](${url}${profile.links.resume})`,
    ...siteConfig.profiles.map((p) => `- ${p}`),
    `- Email: ${profile.email}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
