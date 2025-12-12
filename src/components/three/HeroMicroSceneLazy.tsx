"use client";

import dynamic from "next/dynamic";

export const HeroMicroSceneLazy = dynamic(
  async () => {
    const mod = await import("@/components/three/HeroMicroScene");
    return mod.HeroMicroScene;
  },
  { ssr: false }
);
