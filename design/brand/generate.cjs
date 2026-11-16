// Builds the "Trace" brand kit (public/brand, app icons, brand sheet) from one geometry definition.
// usage (from the repo root):  npm i --no-save opentype.js && node design/brand/generate.cjs .
// Keep TRACE in sync with src/components/site/Logo.tsx.
/* eslint-disable @typescript-eslint/no-require-imports -- plain Node build script */
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const ROOT = path.resolve(process.argv[2] || ".");
const sharp = require(path.join(ROOT, "node_modules/sharp"));

const OUT = path.join(ROOT, "public/brand");
const APP = path.join(ROOT, "src/app");
const DESIGN = path.join(ROOT, "design/brand");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DESIGN, { recursive: true });

// ── Palette ───────────────────────────────────────────
const P = {
  ink: "#111110",
  paper: "#f6f5f2",
  night: "#0b0b0c",
  bone: "#ededec",
  crimson: "#c8193c", // accent on light
  signal: "#ff4d63", // accent on dark
};

// ── Mark geometry (64-unit grid) ──────────────────────
const TRACE =
  "M10 52.5 L22.2 13.2 L33.2 47.2 C35 52.6 40.4 55.2 46.2 54.8 C52.6 54.4 56.2 50.2 54.6 45.6 C53 41.2 47.4 39.6 43 37.6 C37.8 35.2 36.2 30.2 38.8 25.8 C41.6 21.2 47.4 20.2 51.6 22.4";
const NODE = { cx: 55.6, cy: 24.6 };
const W_STD = 6.6; // display weight
const W_SMALL = 8.4; // optical weight for <= 32px
const W_UI = 7.4; // weight used in UI lockups (nav, footer)

const markInner = ({ stroke, accent, w = W_STD }) =>
  `<path d="${TRACE}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="12"/>` +
  `<circle cx="${NODE.cx}" cy="${NODE.cy}" r="${(w * 0.68).toFixed(2)}" fill="${accent}"/>`;

const raster = (svg, size) => sharp(Buffer.from(svg), { density: 288 }).resize(size, size).png().toBuffer();

async function bbox(w) {
  // Rasterise the bare mark at 16px/unit and trim to find its true extent (incl. miter + node).
  const big = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 80 80" width="1280" height="1280">${markInner({ stroke: "#000", accent: "#000", w })}</svg>`;
  const { info } = await sharp(Buffer.from(big)).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const u = 1280 / 80;
  return { x: -8 - info.trimOffsetLeft / u, y: -8 - info.trimOffsetTop / u, w: info.width / u, h: info.height / u };
}

// ── Icon tile (square, optional rounding) ─────────────
const tileSvg = ({ bg, stroke, accent, w = W_STD, scale = 0.78, rx = 14, size }) => {
  // Centre the visual mass: the mark's bbox centre, not the grid centre.
  const cx = MB.x + MB.w / 2;
  const cy = MB.y + MB.h / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${size ? ` width="${size}" height="${size}"` : ""}>` +
    `<rect width="64" height="64" rx="${rx}" fill="${bg}"/>` +
    `<g transform="translate(32 32) scale(${scale}) translate(${-cx} ${-cy})">${markInner({ stroke, accent, w })}</g></svg>`
  );
};

// ── Bare mark with tight viewBox ──────────────────────
const markSvg = ({ stroke, accent, w = W_STD }) => {
  const pad = 1;
  const vb = [MB.x - pad, MB.y - pad, MB.w + 2 * pad, MB.h + 2 * pad].map((n) => +n.toFixed(2));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" width="${vb[2] * 4}" height="${vb[3] * 4}">${markInner({ stroke, accent, w })}</svg>`;
};

let MB;

(async () => {
  MB = await bbox(W_STD);
  console.log("mark bbox", MB);

  // ── Lockup: mark · hairline · ANISH SETH (IBM Plex Mono 500, tracked) ──
  // Proportions mirror the UI lockup: mark 24px, gap 12px, hairline 18px @ 25%, name 11.5px, tracking 0.14em.
  const font = opentype.loadSync(path.join(__dirname, "ibm-plex-mono-500.ttf"));
  const upm = font.unitsPerEm;
  const capH = (font.tables.os2.sCapHeight || 0.7 * upm) / upm;
  const px = MB.h / 24; // units per UI pixel
  const fontSize = 11.5 * px;
  const tracking = 0.14 * fontSize;
  const gap = 12 * px;
  const ruleX = MB.x + MB.w + gap;
  const ruleW = 1 * px;
  const ruleH = 18 * px;
  const cy = MB.y + MB.h / 2;
  let penX = ruleX + ruleW + gap;
  const startX = penX;
  const baseline = cy + (capH * fontSize) / 2;
  const glyphPaths = [];
  for (const ch of "ANISH SETH") {
    const g = font.charToGlyph(ch);
    glyphPaths.push(g.getPath(penX, baseline, fontSize).toPathData(2));
    penX += (g.advanceWidth / upm) * fontSize + tracking;
  }
  const textW = penX - tracking - startX;
  const lockW = startX + textW - MB.x;
  const pad = MB.h * 0.14;
  const lockVB = [MB.x - pad, MB.y - pad, lockW + 2 * pad, MB.h + 2 * pad].map((n) => +n.toFixed(2));
  const lockupSvg = ({ stroke, accent, text }) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${lockVB.join(" ")}" width="${Math.round(lockVB[2] * 6)}" height="${Math.round(lockVB[3] * 6)}">` +
    markInner({ stroke, accent, w: W_UI }) +
    `<rect x="${ruleX.toFixed(2)}" y="${(cy - ruleH / 2).toFixed(2)}" width="${ruleW.toFixed(2)}" height="${ruleH.toFixed(2)}" fill="${text}" fill-opacity="0.25"/>` +
    `<path d="${glyphPaths.join("")}" fill="${text}"/></svg>`;

  // ── Write SVGs ──────────────────────────────────────
  const files = {
    "mark.svg": markSvg({ stroke: P.ink, accent: P.crimson }),
    "mark-inverse.svg": markSvg({ stroke: P.bone, accent: P.signal }),
    "mark-mono-black.svg": markSvg({ stroke: "#000000", accent: "#000000" }),
    "mark-mono-white.svg": markSvg({ stroke: "#ffffff", accent: "#ffffff" }),
    "icon.svg": tileSvg({ bg: P.night, stroke: P.bone, accent: P.signal }),
    "icon-light.svg": tileSvg({ bg: P.paper, stroke: P.ink, accent: P.crimson }),
    "lockup.svg": lockupSvg({ stroke: P.ink, accent: P.crimson, text: P.ink }),
    "lockup-inverse.svg": lockupSvg({ stroke: P.bone, accent: P.signal, text: P.bone }),
  };
  for (const [name, svg] of Object.entries(files)) fs.writeFileSync(path.join(OUT, name), svg);

  // ── PNGs ────────────────────────────────────────────
  const smallTile = (size) => tileSvg({ bg: P.night, stroke: P.bone, accent: P.signal, w: W_SMALL, scale: 0.9, rx: 13, size });
  const stdTile = (size, light = false) =>
    tileSvg(light ? { bg: P.paper, stroke: P.ink, accent: P.crimson, size } : { bg: P.night, stroke: P.bone, accent: P.signal, size });

  for (const s of [16, 32, 48]) fs.writeFileSync(path.join(OUT, `icon-${s}.png`), await raster(smallTile(s), s));
  for (const s of [64, 128, 192, 256, 512, 1024]) fs.writeFileSync(path.join(OUT, `icon-${s}.png`), await raster(stdTile(s), s));
  for (const s of [512, 1024]) fs.writeFileSync(path.join(OUT, `icon-light-${s}.png`), await raster(stdTile(s, true), s));

  // Maskable (PWA/Android): full-bleed, mark inside the 80% safe zone.
  const maskable = tileSvg({ bg: P.night, stroke: P.bone, accent: P.signal, scale: 0.6, rx: 0, size: 512 });
  fs.writeFileSync(path.join(OUT, "icon-maskable-512.png"), await raster(maskable, 512));

  // Apple touch icon: full-bleed square (iOS applies its own rounding).
  const apple = tileSvg({ bg: P.night, stroke: P.bone, accent: P.signal, scale: 0.74, rx: 0, size: 180 });
  fs.writeFileSync(path.join(OUT, "apple-touch-icon.png"), await raster(apple, 180));

  // Transparent mark + lockups at high res
  const toPng = (svg, width) => sharp(Buffer.from(svg), { density: 300 }).resize({ width }).png().toBuffer();
  fs.writeFileSync(path.join(OUT, "mark-1024.png"), await toPng(files["mark.svg"], 1024));
  fs.writeFileSync(path.join(OUT, "mark-inverse-1024.png"), await toPng(files["mark-inverse.svg"], 1024));
  fs.writeFileSync(path.join(OUT, "lockup-2400.png"), await toPng(files["lockup.svg"], 2400));
  fs.writeFileSync(path.join(OUT, "lockup-inverse-2400.png"), await toPng(files["lockup-inverse.svg"], 2400));

  // favicon.ico (16/32/48 PNG entries)
  const icoSizes = [16, 32, 48];
  const pngs = await Promise.all(icoSizes.map((s) => raster(smallTile(s), s)));
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(icoSizes.length, 4);
  let offset = 6 + 16 * icoSizes.length;
  const dirs = icoSizes.map((s, i) => {
    const d = Buffer.alloc(16);
    d.writeUInt8(s, 0);
    d.writeUInt8(s, 1);
    d.writeUInt16LE(1, 4);
    d.writeUInt16LE(32, 6);
    d.writeUInt32LE(pngs[i].length, 8);
    d.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return d;
  });
  const ico = Buffer.concat([head, ...dirs, ...pngs]);
  fs.writeFileSync(path.join(OUT, "favicon.ico"), ico);

  // ── Next.js app icons ───────────────────────────────
  fs.writeFileSync(path.join(APP, "favicon.ico"), ico);
  fs.writeFileSync(path.join(APP, "icon.svg"), tileSvg({ bg: P.night, stroke: P.bone, accent: P.signal, w: W_SMALL, scale: 0.9, rx: 13 }));
  fs.writeFileSync(path.join(APP, "apple-icon.png"), await raster(apple, 180));

  // Share-card copy of the inverse mark (read by opengraph-image at build time)
  fs.writeFileSync(path.join(ROOT, "src/assets/mark-inverse.svg"), files["mark-inverse.svg"]);

  // ── Brand sheet preview ─────────────────────────────
  const S = 1600;
  const layers = [];
  const put = async (svg, w, left, top) => layers.push({ input: await toPng(svg, w), left, top });
  const label = (t, left, top, fill = "#6b6b68") =>
    layers.push({
      input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="24"><text x="0" y="17" font-family="Consolas, monospace" font-size="15" letter-spacing="2" fill="${fill}">${t}</text></svg>`),
      left,
      top,
    });
  // Panels
  layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="640"><rect width="800" height="640" fill="${P.night}"/></svg>`), left: 0, top: 0 });
  layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="640"><rect width="800" height="640" fill="${P.paper}"/></svg>`), left: 800, top: 0 });
  await put(files["mark-inverse.svg"], 230, 285, 90);
  await put(files["mark.svg"], 230, 1085, 90);
  label("MARK — INVERSE", 40, 30, "#7c7c7a");
  label("MARK — PRIMARY", 840, 30);
  await put(files["lockup-inverse.svg"], 520, 140, 420);
  await put(files["lockup.svg"], 520, 940, 420);
  // Icons row
  let x = 40;
  label("APP ICON + FAVICON", 40, 680);
  for (const s of [180, 120, 64, 48, 32, 16]) {
    layers.push({ input: await raster(s <= 32 ? smallTile(s) : stdTile(s), s), left: x, top: 720 + (180 - s) });
    x += s + 36;
  }
  layers.push({ input: await raster(stdTile(180, true), 180), left: x + 20, top: 720 });
  // Palette
  const sw = [["NIGHT", P.night], ["BONE", P.bone], ["SIGNAL", P.signal], ["INK", P.ink], ["PAPER", P.paper], ["CRIMSON", P.crimson]];
  label("PALETTE", 1040, 680);
  sw.forEach(([n, c], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    layers.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="170" height="86"><rect width="170" height="56" fill="${c}" stroke="#bbb" stroke-width="1"/><text x="0" y="78" font-family="Consolas, monospace" font-size="13" fill="#444">${n} ${c}</text></svg>`,
      ),
      left: 1040 + col * 180,
      top: 720 + row * 100,
    });
  });
  await sharp({ create: { width: S, height: 960, channels: 4, background: "#e9e8e4" } }).composite(layers).png().toFile(path.join(DESIGN, "brand-sheet.png"));

  console.log("lockup viewBox", lockVB, "fontSize", fontSize.toFixed(2), "capH", capH);
  console.log("written:", fs.readdirSync(OUT).join(", "));
})();
