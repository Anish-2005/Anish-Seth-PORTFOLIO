import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

import vercel from "../../vercel.json";
import { catalog } from "./photography.catalog";
import manifest from "./photography.generated.json";

const photos = catalog.flatMap((s) => s.photos.map((p) => ({ ...p, series: s.slug })));
const generated: Record<string, { series: string; width: number; height: number; widths: number[] }> = manifest;
const file = (series: string, slug: string, width: number) => join(process.cwd(), "public/photos", series, `${slug}-${width}.webp`);
const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

describe("photography catalog", () => {
  it("has unique, URL-safe slugs", () => {
    for (const list of [catalog.map((s) => s.slug), photos.map((p) => p.slug)]) {
      expect(new Set(list).size).toBe(list.length);
      list.forEach((slug) => expect(slug).toMatch(slugPattern));
    }
  });

  it("describes every series", () => {
    for (const s of catalog) {
      expect(s.summary.length).toBeGreaterThanOrEqual(50);
      expect(s.summary.length).toBeLessThanOrEqual(160);
      expect(s.story.length).toBeGreaterThan(0);
      expect(s.updated).toMatch(isoDate);
    }
  });

  it("gives every photo its own readable alt text and caption", () => {
    const alts = photos.map((p) => p.alt);
    expect(new Set(alts).size).toBe(alts.length);
    for (const p of photos) {
      expect(p.alt.length).toBeGreaterThan(20);
      expect(p.alt.length).toBeLessThanOrEqual(160);
      expect(p.caption.length).toBeGreaterThan(20);
      if (p.taken) expect(p.taken).toMatch(isoDate);
    }
  });
});

describe("photography files", () => {
  it("matches the generated manifest to the catalog", () => {
    expect(Object.keys(generated).sort()).toEqual(photos.map((p) => p.slug).sort());
    for (const p of photos) expect(generated[p.slug].series).toBe(p.series);
  });

  it("has every size on disk", () => {
    for (const p of photos) {
      for (const w of generated[p.slug].widths) expect(existsSync(file(p.series, p.slug, w)), `${p.slug}-${w}`).toBe(true);
    }
  });

  it("embeds the credit and license, and no location data", async () => {
    for (const p of photos) {
      const { widths } = generated[p.slug];
      const meta = await sharp(readFileSync(file(p.series, p.slug, widths[widths.length - 1]))).metadata();
      const xmp = meta.xmp?.toString("utf8") ?? "";
      expect(xmp).toContain(`photoshop:Credit="${p.photographer ?? "Anish Seth"}"`);
      expect(xmp).toContain("/image-license");
      expect(xmp).not.toMatch(/GPS(Latitude|Longitude)/);
      expect(meta.exif?.toString("latin1")).toContain("(C)");
      expect(meta.width).toBe(generated[p.slug].width);
    }
  });
});

describe("photos subdomain", () => {
  const rules = vercel.redirects.filter((r) => r.has.some((h) => h.value === "photos.anishseth.in"));

  it("sends everything, the bare host included, to the canonical site permanently", () => {
    expect(rules.map((r) => r.source)).toEqual(["/", "/photos/:path*", "/photography/:path*", "/:path*"]);
    for (const r of rules) {
      expect(r.permanent).toBe(true);
      expect(r.destination).toMatch(/^https:\/\/www\.anishseth\.in\/photo/);
    }
  });
});
