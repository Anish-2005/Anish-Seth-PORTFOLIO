import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Note, Project } from "@/lib/types";

const root = process.cwd();

function readAllFiles(dir: string) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [] as string[];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => path.join(abs, f));
}

export function getProjects(): Project[] {
  const files = readAllFiles("src/content/projects");
  const projects = files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);

    type FrontmatterLink = { label?: unknown; href?: unknown };

    const id = String(data.id ?? path.basename(file).replace(/\.(mdx|md)$/, ""));
    return {
      id,
      title: String(data.title ?? id),
      tagline: String(data.tagline ?? ""),
      period: String(data.period ?? ""),
      stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
      links: Array.isArray(data.links)
        ? (data.links as FrontmatterLink[]).map((l) => ({
            label: String(l?.label ?? "Link"),
            href: String(l?.href ?? "#"),
          }))
        : [],
      highlights: Array.isArray(data.highlights)
        ? data.highlights.map(String)
        : [],
      body: content.trim(),
    } satisfies Project;
  });

  return projects;
}

export function getNotes(): Note[] {
  const files = readAllFiles("src/content/notes");
  const notes = files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const slug = String(
      data.slug ?? path.basename(file).replace(/\.(mdx|md)$/, "")
    );

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      summary: String(data.summary ?? ""),
      body: content.trim(),
    } satisfies Note;
  });

  return notes.sort((a, b) => (a.date < b.date ? 1 : -1));
}
