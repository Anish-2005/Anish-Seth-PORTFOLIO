"use client";

import dynamic from "next/dynamic";

export const HeroMicroSceneLazy = dynamic(
  async () => {
    const mod = await import("@/components/three/HeroMicroScene");
    const anyMod = mod as any;
    return anyMod.HeroMicroScene ?? anyMod.default ?? anyMod;
  },
  { ssr: false }
);
