import { renderShareCard } from "@/lib/share-card";

export const alt = "Anish Seth, AI/ML engineer in Kolkata who builds AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderShareCard({
    brand: "ANISHSETH.IN",
    eyebrow: "AI/ML ENGINEER · KOLKATA",
    title: ["Anish", "Seth"],
    titleSize: 116,
    uppercase: true,
    tagline: "I build AI agents that do real work.",
    footer: [
      { text: "LangGraph" },
      { text: "AWS Bedrock" },
      { text: "MCP" },
      { text: "GraphRAG" },
      { text: "4× national finalist", accent: true },
    ],
  });
}
