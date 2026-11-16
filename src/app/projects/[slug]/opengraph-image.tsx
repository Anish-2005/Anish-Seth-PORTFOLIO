import { getProject, projects } from "@/data/portfolio";
import { clip, renderShareCard, wrapTitle } from "@/lib/share-card";

export const alt = "A project by Anish Seth, AI/ML engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects[0];
  const lines = wrapTitle(project.title, 16);
  return renderShareCard({
    brand: "ANISH SETH",
    eyebrow: `PROJECT · ${project.year}`,
    title: lines,
    titleSize: lines.length > 2 ? 60 : 72,
    tagline: clip(project.summary, 110),
    footer: [...project.stack.slice(0, 3).map((t) => ({ text: t })), { text: project.badge ?? "by Anish Seth", accent: true }],
  });
}
