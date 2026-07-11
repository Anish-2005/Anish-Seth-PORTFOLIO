import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";

export const alt = `${siteConfig.name} portfolio and personal website`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          background:
            "radial-gradient(circle at 25% 25%, rgba(239,68,68,0.28), transparent 30%), radial-gradient(circle at 85% 20%, rgba(244,114,182,0.18), transparent 26%), linear-gradient(135deg, #09070d 0%, #190d14 100%)",
          color: "#fff7f7",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 36,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
              <div style={{ fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.74)" }}>
                {siteConfig.name}
              </div>
              <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 0.96, letterSpacing: -3 }}>
                Full-Stack Developer
                <br />
                Building with AI
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", fontSize: 24, color: "rgba(255,255,255,0.78)" }}>
              <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,0.06)" }}>
                anishseth.xyz
              </div>
              <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,0.06)" }}>
                @AnishSeth170734
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
            <div style={{ fontSize: 28, maxWidth: 780, lineHeight: 1.35, color: "rgba(255,255,255,0.82)" }}>
              Next.js, React, TypeScript, AI/ML, Web3, and product-grade portfolio work.
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>
              anishseth.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}