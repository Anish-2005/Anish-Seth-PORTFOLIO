import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/data/portfolio";

export const alt = "Anish Seth, AI/ML engineer in Kolkata who builds AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#ededec";
const MUTED = "#a3a3a1";
const SUBTLE = "#7c7c7a";
const LINE = "rgba(255,255,255,0.10)";
const ACCENT = "#ff4d63";

/** Archivo for the card (TTF via the Google Fonts CSS API); falls back to the default font offline. */
async function loadArchivo(weight: number, stretch: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@${stretch},${weight}&display=swap`, {
      signal: AbortSignal.timeout(5000),
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url, { signal: AbortSignal.timeout(5000) }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  // Read at build time (this route is statically prerendered).
  const portrait = await readFile(join(process.cwd(), "src/assets/portrait-og.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;
  const mark = await readFile(join(process.cwd(), "src/assets/mark-inverse.svg"));
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;
  const [display, text] = await Promise.all([loadArchivo(700, 112), loadArchivo(400, 100)]);
  const fonts = [
    ...(display ? [{ name: "Archivo", data: display, weight: 700 as const, style: "normal" as const }] : []),
    ...(text ? [{ name: "Archivo", data: text, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0b0b0c",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          color: INK,
          fontFamily: fonts.length ? "Archivo" : "sans-serif",
        }}
      >
        {/* Frame guides */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 64, width: 1, background: LINE }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 64, width: 1, background: LINE }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 1, background: LINE }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 64, height: 1, background: "rgba(255,255,255,0.18)" }} />

        {/* Portrait standing on the baseline */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 64,
            width: 640,
            height: 520,
            backgroundImage: "radial-gradient(ellipse at 50% 45%, rgba(255,226,196,0.17) 0%, rgba(255,226,196,0) 68%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={portraitSrc} alt="" width={331} height={470} style={{ position: "absolute", right: 120, bottom: 64 }} />

        <div style={{ display: "flex", flexDirection: "column", padding: "34px 96px 0 96px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: SUBTLE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
              <img src={markSrc} alt="" width={30} height={31} />
              ANISHSETH.XYZ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 9, height: 9, borderRadius: 9, background: "#3ddc97" }} />
              {`${profile.current.title.toUpperCase()} · ${profile.current.company.toUpperCase()}`}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 92, maxWidth: 640 }}>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 2.5, color: ACCENT }}>AI/ML ENGINEER · KOLKATA</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 116, fontWeight: 700, lineHeight: 0.88, letterSpacing: -3 }}>
              <span>ANISH</span>
              <span>SETH</span>
            </div>
            <div style={{ display: "flex", marginTop: 30, fontSize: 30, lineHeight: 1.3, color: MUTED, maxWidth: 600 }}>
              I build AI agents that do real work.
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 22,
            display: "flex",
            gap: 26,
            fontSize: 17,
            letterSpacing: 1.5,
            color: SUBTLE,
          }}
        >
          <span>LANGGRAPH</span>
          <span>AWS BEDROCK</span>
          <span>MCP</span>
          <span>GRAPHRAG</span>
          <span style={{ color: ACCENT }}>4× NATIONAL FINALIST</span>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
