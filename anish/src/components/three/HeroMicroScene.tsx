"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function SceneContent() {
  const reduce = useReducedMotion();
  const group = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; label: string }> = [];
    const labels = ["Next.js", "ML", "Web3", "DX"];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      out.push({
        pos: [Math.cos(a) * 1.35, Math.sin(a) * 0.35, Math.sin(a) * 1.35],
        label: labels[i]!,
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
              fontSize: 12,
              padding: "6px 8px",
              borderRadius: 10,
              background: "rgba(10,16,24,0.65)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(248,250,252,0.92)",
              whiteSpace: "nowrap",
            }}
            transform={false}
            distanceFactor={10}
          >
            {p.label}
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
