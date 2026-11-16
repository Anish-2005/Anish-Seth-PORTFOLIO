import { describe, expect, it } from "vitest";

import { categoryLabels, experience, faqs, projects, skillGroups } from "./portfolio";
import { seoNotes } from "../lib/seo-content";
import { formatCompact } from "../lib/utils";

describe("portfolio data", () => {
  it("has unique, URL-safe project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("gives every project a complete case study", () => {
    for (const p of projects) {
      expect(p.title.length).toBeGreaterThan(1);
      expect(p.summary.length).toBeGreaterThan(40);
      expect(p.problem.length).toBeGreaterThan(20);
      expect(p.approach.length).toBeGreaterThanOrEqual(2);
      expect(p.outcomes.length).toBeGreaterThanOrEqual(2);
      expect(p.stack.length).toBeGreaterThan(0);
      p.categories.forEach((c) => expect(categoryLabels[c]).toBeDefined());
    }
  });

  it("uses https for every external project link", () => {
    for (const p of projects) {
      for (const href of Object.values(p.links)) {
        if (href) expect(href).toMatch(/^https:\/\//);
      }
    }
  });

  it("features four projects on the home page", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(4);
  });

  it("lists the current role first", () => {
    expect(experience[0].current).toBe(true);
  });

  it("has no duplicate skills within a group", () => {
    for (const g of skillGroups) {
      expect(new Set(g.items).size).toBe(g.items.length);
    }
  });

  it("has FAQ answers and unique note slugs", () => {
    faqs.forEach((f) => expect(f.answer.length).toBeGreaterThan(20));
    const slugs = seoNotes.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("formatCompact", () => {
  it("formats counts for the hero", () => {
    expect(formatCompact(78)).toBe("78");
    expect(formatCompact(3842)).toBe("3.8k+");
    expect(formatCompact(5000)).toBe("5k+");
  });
});
