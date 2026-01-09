"use client";

import dynamic from "next/dynamic";

export const HeroMicroSceneLazy = dynamic(
  () => import("@/components/three/HeroMicroScene").then((mod) => mod.HeroMicroScene),
  { ssr: false }
);
