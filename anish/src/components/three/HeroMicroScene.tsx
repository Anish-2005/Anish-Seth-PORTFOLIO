"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const cards = [
  { label: "Next.js", img: "/window.svg" },
  { label: "ML", img: "/globe.svg" },
  { label: "Web3", img: "/file.svg" },
  { label: "DX", img: "/next.svg" },
];

function SceneContent() {
  const reduce = useReducedMotion();
  const group = useRef<THREE.Group>(null);

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
          color={new THREE.Color("#88f0ff")}
          transparent
          opacity={0.18}
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.7}
        />
      </mesh>

      {points.map((p) => (
        <group key={p.label} position={p.pos}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#0ea5e9")} />
          </mesh>
          <Html
            center
            style={{
              padding: "10px 12px",
              borderRadius: 14,
              background: "rgba(10,16,24,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(248,250,252,0.92)",
              boxShadow: "0 12px 40px rgba(6,182,212,0.18)",
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
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(14,165,233,0.1))",
              }}
            >
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
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
