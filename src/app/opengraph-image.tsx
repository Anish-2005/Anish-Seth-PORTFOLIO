import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";

export const alt = `${siteConfig.name} portfolio and personal website`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at top left, rgba(239,68,68,0.28), transparent 32%), radial-gradient(circle at 85% 15%, rgba(244,114,182,0.22), transparent 28%), linear-gradient(135deg, #08070d 0%, #120a11 52%, #1d0f14 100%)",
          color: "#fff7f7",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  width: "fit-content",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: 22,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Anish Seth
              </div>
              <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.96, letterSpacing: -3, maxWidth: 820 }}>
                Full-Stack Developer
                <br />
                &amp; AI Builder
              </div>
              <div style={{ fontSize: 28, lineHeight: 1.35, maxWidth: 760, color: "rgba(255,255,255,0.82)" }}>
                Next.js, React, TypeScript, AI/ML, Web3, and product-focused engineering.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 12,
                fontSize: 24,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                anishseth.xyz
              </div>
              <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                @AnishSeth170734
              </div>
              <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                _anish.seth_
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: "#fb7185", boxShadow: "0 0 40px rgba(251,113,133,0.55)" }} />
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.78)" }}>
                Portfolio, projects, and social profiles in one place.
              </div>
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>
              anishseth.vercel.app • anishseth.xyz
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}