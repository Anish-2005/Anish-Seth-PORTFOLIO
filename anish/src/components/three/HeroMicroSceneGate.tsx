"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { HeroFallback } from "@/components/sections/HeroFallback";
import { HeroMicroSceneLazy } from "@/components/three/HeroMicroSceneLazy";
import { useTheme } from "@/context/ThemeContext";

function isLowCapabilityDevice() {
  if (typeof navigator === "undefined") return false;

  const dm = (navigator as any).deviceMemory as number | undefined;
  const hc = navigator.hardwareConcurrency;

  // Conservative thresholds for a non-blocking micro-scene.
  if (typeof dm === "number" && dm <= 4) return true;
  if (typeof hc === "number" && hc <= 4) return true;

  return false;
}

export function HeroMicroSceneGate() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  const { theme } = useTheme();

  const [lowCap, setLowCap] = useState(false);

  useEffect(() => {
    setLowCap(isLowCapabilityDevice());
  }, []);

  const shouldRender3D = useMemo(() => {
    if (reduce) return false;
    if (lowCap) return false;
    return inView;
  }, [reduce, lowCap, inView]);

  return (
    <div ref={ref}>
      {shouldRender3D ? <HeroMicroSceneLazy key={`hero-3d-${theme}`} /> : <HeroFallback key={`hero-fallback-${theme}`} />}
    </div>
  );
}
