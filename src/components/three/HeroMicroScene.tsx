"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { useTheme } from "@/context/ThemeContext";
import type { ThemeName } from "@/lib/themes";

const cards = [
  { label: "Next.js", img: "/window.svg" },
  { label: "ML", img: "/globe.svg" },
  { label: "Web3", img: "/file.svg" },
  { label: "DX", img: "/next.svg" },
];

type ScenePalette = {
  core: string;
  node: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  chipBorder: string;
  chipBg: string;
  shadow: string;
};

function SceneContent({ theme }: { theme: ThemeName }) {
  const reduce = useReducedMotion();
  const group = useRef<THREE.Group>(null);

  const palette = useMemo<ScenePalette>(() => {
    if (theme === "light") {
      return {
        core: "#d73333",
        node: "#e74974",
        cardBg: "rgba(255, 255, 255, 0.9)",
        cardBorder: "rgba(12, 18, 32, 0.12)",
        text: "rgba(32, 16, 20, 0.9)",
        chipBorder: "rgba(12, 18, 32, 0.14)",
        chipBg: "linear-gradient(135deg, rgba(215,51,51,0.2), rgba(232,73,116,0.14))",
        shadow: "0 12px 40px rgba(215,51,51,0.16)",
      } satisfies ScenePalette;
    }
    return {
      core: "#f87171",
      node: "#fb7185",
      cardBg: "rgba(10, 6, 12, 0.8)",
      cardBorder: "rgba(255, 245, 245, 0.12)",
      text: "#ffffff",
      chipBorder: "rgba(255, 245, 245, 0.14)",
      chipBg: "linear-gradient(135deg, rgba(239,68,68,0.24), rgba(244,114,182,0.18))",
      shadow: "0 12px 40px rgba(239,68,68,0.22)",
    } satisfies ScenePalette;
  }, [theme]);

  const points = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; label: string; img: string }> = [];
    for (let i = 0; i < cards.length; i++) {
      const a = (i / 4) * Math.PI * 2;
      out.push({
        pos: [Math.cos(a) * 1.35, Math.sin(a) * 0.35, Math.sin(a) * 1.35],
        label: cards[i]!.label,
        img: cards[i]!.img,
      });
    }
    return out;
  }, []);

  useFrame((_s, dt) => {
    if (reduce) return;
    if (!group.current) return;
    group.current.rotation.y += dt * 0.25;
    group.current.rotation.x = Math.sin(_s.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshPhysicalMaterial
          color={new THREE.Color(palette.core)}
          transparent
          opacity={theme === "light" ? 0.24 : 0.2}
          roughness={0.18}
          metalness={0.12}
          clearcoat={0.72}
        />
      </mesh>

      {points.map((p) => (
        <group key={p.label} position={p.pos}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color(palette.node)} />
          </mesh>
          <Html
            center
            style={{
              padding: "10px 12px",
              borderRadius: 14,
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              color: palette.text,
              boxShadow: palette.shadow,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backdropFilter: "blur(10px)",
            }}
            transform={false}
            distanceFactor={10}
          >
            <span
              style={{
                display: "inline-flex",
                width: 42,
                height: 42,
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${palette.chipBorder}`,
                background: palette.chipBg,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </span>
            <span style={{ fontSize: 13, letterSpacing: 0.2 }}>{p.label}</span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function HeroMicroScene() {
  const { theme } = useTheme();

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)]">
      <Suspense
        fallback={
          <div className="grid h-full w-full place-items-center text-sm text-[color:var(--text-2)]">
            Loading…
          </div>
        }
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.2, 3.1], fov: 42 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 3, 2]} intensity={0.75} />
          <SceneContent theme={theme} />
        </Canvas>
      </Suspense>
    </div>
  );
}
