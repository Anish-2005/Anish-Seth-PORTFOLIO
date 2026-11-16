import { ImageResponse } from "next/og";

import { profile } from "@/data/portfolio";

export const alt = "Anish Seth — AI/ML Engineer building agentic AI, LLM systems and enterprise automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["Agentic AI", "LangGraph", "AWS Bedrock", "MCP", "GraphRAG", "Next.js"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#f5f2f3",
          backgroundColor: "#0a090b",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(255,77,109,0.32), transparent 42%), radial-gradient(circle at 95% 20%, rgba(255,138,91,0.20), transparent 38%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 56px 56px, 56px 56px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "#f5f2f3",
                color: "#0a090b",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              AS
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#aca4a8" }}>anishseth.xyz</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 22,
              color: "#aca4a8",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#3ddc97" }} />
            {`${profile.current.title} · ${profile.current.company}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Anish Seth</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 40, color: "#d9d2d5", letterSpacing: -1 }}>
            AI/ML Engineer —{" "}
            <span style={{ marginLeft: 12, color: "#ff4d6d" }}>agentic AI that holds up in production.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 22,
                  color: "#d9d2d5",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#857d81" }}>2× SIH National Finalist</div>
        </div>
      </div>
    ),
    size,
  );
}
