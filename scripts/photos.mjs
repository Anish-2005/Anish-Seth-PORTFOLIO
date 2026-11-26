// Turns the originals listed in src/data/photography.catalog.ts into the files the site serves.
//
//   npm run photos           build anything new or changed
//   npm run photos -- --force  rebuild everything
//
// Needs Node 22.18 or newer (it imports the TypeScript catalog directly).
//
// For every photo it writes public/photos/<series>/<slug>-<width>.webp in a few sizes, with the
// owner's name, credit and license link embedded (EXIF + IPTC/XMP, which Google Images reads) and
// every other piece of metadata, GPS position included, removed. Sizes and a content hash go into
// src/data/photography.generated.json, which is committed alongside the images.
//
// The files are served exactly as written: going through the Next image optimiser would strip the
// embedded credit and replace the descriptive file name with a query string.
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { catalog } from "../src/data/photography.catalog.ts";
import { profile } from "../src/data/profile.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "photos");
const MANIFEST = join(ROOT, "src", "data", "photography.generated.json");
const SITE = "https://www.anishseth.in";
const LICENSE = `${SITE}/image-license`;

/** Display widths. Anything wider than the original is skipped; the original width is always kept. */
const WIDTHS = [640, 1024, 1600, 2400];
const QUALITY = 82;
/** Bump to rebuild every file when the processing itself changes. */
const PIPELINE = 2;

const force = process.argv.includes("--force");

const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** IPTC Photo Metadata as XMP: creator, credit, copyright and where to get a license. */
function xmpPacket({ photo, creator }) {
  const alt = (value) => `<rdf:Alt><rdf:li xml:lang="x-default">${xml(value)}</rdf:li></rdf:Alt>`;
  return [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about=""',
    ' xmlns:dc="http://purl.org/dc/elements/1.1/"',
    ' xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"',
    ' xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"',
    ' xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"',
    ` photoshop:Credit="${xml(creator)}"`,
    ' xmpRights:Marked="True"',
    ` xmpRights:WebStatement="${LICENSE}">`,
    `<dc:creator><rdf:Seq><rdf:li>${xml(creator)}</rdf:li></rdf:Seq></dc:creator>`,
    `<dc:title>${alt(photo.title)}</dc:title>`,
    `<dc:description>${alt(photo.caption)}</dc:description>`,
    `<dc:rights>${alt(`© ${creator}`)}</dc:rights>`,
    `<plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorURL>${LICENSE}</plus:LicensorURL></rdf:li></rdf:Seq></plus:Licensor>`,
    "</rdf:Description>",
    "</rdf:RDF>",
    "</x:xmpmeta>",
    '<?xpacket end="w"?>',
  ].join("");
}

/** EXIF text fields are ASCII, so spell the © out and drop accents. */
const ascii = (s) => s.replace(/©/g, "(C)").normalize("NFKD").replace(/[^\x20-\x7e]/g, "");

async function readManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

function assertCatalog() {
  const seen = new Set();
  for (const series of catalog) {
    for (const { slug } of series.photos) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`"${slug}" must be lowercase words joined by hyphens.`);
      if (seen.has(slug)) throw new Error(`Two photos share the slug "${slug}".`);
      seen.add(slug);
    }
  }
}

async function build(series, photo, previous) {
  const source = join(ROOT, photo.source);
  const creator = photo.photographer ?? profile.name;
  const files = (widths) => widths.map((w) => join(OUT, series.slug, `${photo.slug}-${w}.webp`));
  const built = previous?.series === series.slug && files(previous.widths).every(existsSync);

  if (!existsSync(source)) {
    // Originals stay on the owner's machine, so a missing one is fine once its files exist.
    if (built) return { entry: previous, status: "kept" };
    throw new Error(`${photo.slug}: original not found at ${photo.source}`);
  }

  const original = await readFile(source);
  const hash = createHash("sha256")
    .update(original)
    .update(JSON.stringify([PIPELINE, QUALITY, WIDTHS, creator, photo.title, photo.caption]))
    .digest("hex")
    .slice(0, 16);
  if (!force && built && previous.hash === hash) return { entry: previous, status: "unchanged" };

  // autoOrient first: phone photos store their rotation in metadata that is about to be dropped.
  const upright = await sharp(original).autoOrient().toBuffer({ resolveWithObject: true });
  const { width } = upright.info;
  const largest = Math.min(width, WIDTHS.at(-1));
  const widths = [...new Set([...WIDTHS.filter((w) => w < largest), largest])];

  await mkdir(join(OUT, series.slug), { recursive: true });
  let size;
  for (const [i, w] of widths.entries()) {
    const info = await sharp(upright.data)
      .resize({ width: w })
      .toColourspace("srgb")
      .withExif({ IFD0: { Artist: ascii(creator), Copyright: ascii(`© ${creator}`), ImageDescription: ascii(photo.caption) } })
      .withXmp(xmpPacket({ photo, creator }))
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(files(widths)[i]);
    size = { width: info.width, height: info.height };
  }

  // A tiny blurred preview, inlined as the placeholder while the real file loads.
  const blur = await sharp(upright.data).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();

  return {
    entry: { series: series.slug, ...size, widths, hash, blur: `data:image/webp;base64,${blur.toString("base64")}` },
    status: "built",
  };
}

/** Delete files whose photo has been renamed, moved or removed from the catalog. */
async function prune(manifest) {
  const wanted = new Set(
    Object.entries(manifest).flatMap(([slug, e]) => e.widths.map((w) => join(OUT, e.series, `${slug}-${w}.webp`))),
  );
  if (!existsSync(OUT)) return;
  for (const dir of await readdir(OUT, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const folder = join(OUT, dir.name);
    for (const name of await readdir(folder)) {
      const file = join(folder, name);
      if (name.endsWith(".webp") && !wanted.has(file)) {
        await rm(file);
        console.log(`removed   ${dir.name}/${name}`);
      }
    }
    if ((await readdir(folder)).length === 0) await rm(folder, { recursive: true });
  }
}

assertCatalog();
const previous = await readManifest();
const manifest = {};
for (const series of catalog) {
  for (const photo of series.photos) {
    const { entry, status } = await build(series, photo, previous[photo.slug]);
    manifest[photo.slug] = entry;
    console.log(`${status.padEnd(9)} ${series.slug}/${photo.slug} (${entry.width}×${entry.height})`);
    if (entry.width < 1200) console.warn(`  note: ${photo.slug} is under 1200px wide; a larger original will do better in image search.`);
  }
}
await prune(manifest);
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
