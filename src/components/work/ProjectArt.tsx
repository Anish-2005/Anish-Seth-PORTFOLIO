import type { ReactNode } from "react";

import type { ArtKind } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Procedural, theme-aware cover art for each project. Pure SVG — no image requests,
 * crisp at every density, and it re-colours with the active theme.
 */
export function ProjectArt({ kind, id, className }: { kind: ArtKind; id: string; className?: string }) {
  const g = `art-g-${id}`;
  const glow = `art-glow-${id}`;
  const grid = `art-grid-${id}`;
  const A = `url(#${g})`;
  const L = "var(--line-strong)";
  const S = "var(--fg-subtle)";
  const E = "var(--bg-elev-2)";

  const motifs: Record<ArtKind, ReactNode> = {
    graph: (() => {
      const n = [
        [80, 70], [150, 50], [215, 95], [300, 60], [335, 140], [255, 175], [170, 160], [95, 185], [205, 125],
      ];
      const e = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 8], [8, 5], [2, 8], [6, 8], [0, 6]];
      const hot = new Set(["1-8", "8-5", "5-4"]);
      return (
        <g>
          {e.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]}
              stroke={hot.has(`${a}-${b}`) ? A : L}
              strokeWidth={hot.has(`${a}-${b}`) ? 2 : 1}
            />
          ))}
          {n.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 8 ? 11 : [1, 5, 4].includes(i) ? 8 : 6}
              fill={[8, 1, 5, 4].includes(i) ? A : E} stroke={[8, 1, 5, 4].includes(i) ? "none" : L} />
          ))}
          <text x={219} y={129} fill="var(--accent-fg)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Q</text>
        </g>
      );
    })(),
    shield: (
      <g fill="none">
        {[1, 0.78, 0.56].map((s, i) => (
          <path
            key={s}
            transform={`translate(200 122) scale(${s}) translate(-200 -122)`}
            d="M200 30 L270 58 V118 C270 162 240 196 200 210 C160 196 130 162 130 118 V58 Z"
            stroke={i === 0 ? A : L}
            strokeWidth={i === 0 ? 2 : 1}
            fill={i === 2 ? E : "none"}
          />
        ))}
        <path d="M182 122 l12 12 l24 -26" stroke={A} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {[[70, 60, "UPI"], [300, 70, "OTP"], [60, 170, "URL"], [310, 175, "SMS"]].map(([x, y, t]) => (
          <g key={t as string}>
            <rect x={(x as number) - 22} y={(y as number) - 11} width="44" height="22" rx="11" fill={E} stroke={L} />
            <text x={x} y={(y as number) + 4} fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">{t}</text>
          </g>
        ))}
      </g>
    ),
    chart: (
      <g>
        {[60, 100, 140, 180].map((y) => (
          <line key={y} x1="40" x2="360" y1={y} y2={y} stroke={L} strokeDasharray="2 5" />
        ))}
        <path d="M40 185 L80 170 L115 176 L150 140 L185 150 L220 112 L255 120 L290 84 L325 92 L360 55 L360 200 L40 200 Z" fill={A} opacity="0.14" />
        <path d="M40 185 L80 170 L115 176 L150 140 L185 150 L220 112 L255 120 L290 84 L325 92 L360 55" fill="none" stroke={A} strokeWidth="2.5" strokeLinejoin="round" />
        {[[70, 150, 30], [110, 160, 22], [150, 125, 28], [190, 132, 26], [230, 98, 30], [270, 100, 22], [310, 72, 26]].map(([x, y, h], i) => (
          <rect key={i} x={x - 4} y={y} width="8" height={h} rx="2" fill={i % 3 === 1 ? "var(--fg-subtle)" : E} stroke={L} opacity="0.9" />
        ))}
        <circle cx="360" cy="55" r="6" fill={A} />
        <circle cx="360" cy="55" r="12" fill="none" stroke={A} opacity="0.4" />
      </g>
    ),
    map: (
      <g fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${70 + i * 18} ${120} C ${70 + i * 18} ${50 + i * 14}, ${330 - i * 18} ${40 + i * 14}, ${330 - i * 18} ${118} S ${90 + i * 18} ${205 - i * 14}, ${70 + i * 18} ${120} Z`}
            stroke={i === 4 ? A : L}
            strokeWidth={i === 4 ? 2 : 1}
          />
        ))}
        {[[120, 95], [250, 80], [215, 160]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0 C -9 -10 -9 -22 0 -24 C 9 -22 9 -10 0 0 Z" fill={i === 1 ? A : E} stroke={i === 1 ? "none" : L} />
            <circle cy="-16" r="3" fill={i === 1 ? "var(--accent-fg)" : S} />
          </g>
        ))}
      </g>
    ),
    funnel: (
      <g>
        {[
          [300, "A", 0],
          [230, "B", 1],
          [160, "C", 2],
          [100, "", 3],
        ].map(([w, t, i]) => (
          <g key={i as number}>
            <rect x={200 - (w as number) / 2} y={44 + (i as number) * 42} width={w as number} height="30" rx="8" fill={i === 0 ? A : E} stroke={i === 0 ? "none" : L} />
            {t ? (
              <text x={200 - (w as number) / 2 + 16} y={64 + (i as number) * 42} fill={i === 0 ? "var(--accent-fg)" : S} fontSize="12" fontWeight="600" fontFamily="var(--font-mono)">
                {t}
              </text>
            ) : null}
          </g>
        ))}
        <text x="200" y="64" fill="var(--accent-fg)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">ICP 92 / 100</text>
      </g>
    ),
    flow: (
      <g>
        {[
          [40, "apply"],
          [150, "verify"],
          [260, "disburse"],
        ].map(([x, t], i) => (
          <g key={t as string}>
            <rect x={x as number} y="92" width="100" height="56" rx="12" fill={i === 1 ? A : E} stroke={i === 1 ? "none" : L} />
            <text x={(x as number) + 50} y="125" fill={i === 1 ? "var(--accent-fg)" : S} fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">{t}</text>
          </g>
        ))}
        <path d="M140 120 h10 M250 120 h10" stroke={A} strokeWidth="2" />
        <path d="M310 92 V60 H90 V92" fill="none" stroke={L} strokeDasharray="3 5" />
        <text x="200" y="52" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">grievance loop</text>
        <rect x="150" y="172" width="100" height="22" rx="11" fill="none" stroke={L} />
        <text x="200" y="187" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">offline-first</text>
      </g>
    ),
    pulse: (
      <g fill="none">
        <path d="M30 130 H110 L122 112 L134 146 L146 124 L160 130 H200 L212 60 L226 196 L240 102 L252 130 H370" stroke={L} strokeWidth="1.5" />
        <path d="M200 130 L212 60 L226 196 L240 102 L252 130" stroke={A} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="190" y="44" width="72" height="166" rx="10" stroke={A} strokeDasharray="4 4" opacity="0.7" />
        <text x="226" y="36" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">anomaly · 41ms</text>
      </g>
    ),
    layers: (
      <g>
        {[2, 1, 0].map((i) => (
          <path
            key={i}
            d={`M200 ${70 + i * 34} L310 ${110 + i * 34} L200 ${150 + i * 34} L90 ${110 + i * 34} Z`}
            fill={i === 0 ? A : E}
            stroke={i === 0 ? "none" : L}
            opacity={i === 0 ? 0.95 : 1}
          />
        ))}
        <text x="200" y="114" fill="var(--accent-fg)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">risk 0.18</text>
      </g>
    ),
    terminal: (
      <g>
        <rect x="60" y="40" width="280" height="160" rx="14" fill={E} stroke={L} />
        <line x1="60" x2="340" y1="66" y2="66" stroke={L} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={80 + i * 13} cy="53" r="3.5" fill={L} />
        ))}
        {[
          [84, 180],
          [84, 120],
          [100, 150],
          [100, 96],
          [84, 210],
        ].map(([x, w], i) => (
          <rect key={i} x={x} y={84 + i * 22} width={w} height="8" rx="4" fill={i === 2 ? A : "var(--line-strong)"} />
        ))}
        <rect x="82" y={84 + 2 * 22 - 7} width="236" height="22" rx="6" fill={A} opacity="0.1" />
      </g>
    ),
    network: (() => {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        return [200 + Math.cos(a) * 120, 120 + Math.sin(a) * 78] as const;
      });
      return (
        <g>
          {pts.map(([x, y], i) => (
            <line key={`c-${i}`} x1="200" y1="120" x2={x} y2={y} stroke={i % 3 === 0 ? A : L} strokeWidth={i % 3 === 0 ? 1.6 : 1} />
          ))}
          {pts.map(([x, y], i) => {
            const [nx, ny] = pts[(i + 2) % pts.length];
            return <line key={`r-${i}`} x1={x} y1={y} x2={nx} y2={ny} stroke={L} strokeDasharray="2 4" />;
          })}
          {pts.map(([x, y], i) => (
            <circle key={`n-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 8 : 6} fill={i % 3 === 0 ? A : E} stroke={i % 3 === 0 ? "none" : L} />
          ))}
          <circle cx="200" cy="120" r="16" fill={A} />
          <circle cx="200" cy="120" r="26" fill="none" stroke={A} opacity="0.35" />
        </g>
      );
    })(),
    doc: (
      <g>
        <path d="M130 36 H245 L280 71 V206 H130 Z" fill={E} stroke={L} />
        <path d="M245 36 V71 H280" fill="none" stroke={L} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="150" y={92 + i * 16} width={i === 2 ? 110 : [140, 120, 0, 130, 90, 115][i]} height="6" rx="3" fill={i === 2 ? A : "var(--line-strong)"} />
        ))}
        <circle cx="262" cy="182" r="22" fill={A} />
        <text x="262" y="186" fill="var(--accent-fg)" fontSize="10" fontWeight="600" fontFamily="var(--font-mono)" textAnchor="middle">§ 420</text>
      </g>
    ),
    tree: (
      <g fill="none">
        <path d="M60 150 H340" stroke={L} strokeWidth="2" />
        <path d="M120 150 C 150 150, 150 90, 180 90 H 250 C 280 90, 280 150, 300 150" stroke={A} strokeWidth="2" />
        {[60, 120, 200, 300, 340].map((x) => (
          <circle key={`m-${x}`} cx={x} cy="150" r="9" fill={x === 300 ? A : E} stroke={x === 300 ? "none" : L} strokeWidth="1.5" />
        ))}
        {[180, 215, 250].map((x) => (
          <circle key={`b-${x}`} cx={x} cy="90" r="8" fill={E} stroke={A} strokeWidth="1.5" />
        ))}
        <text x="300" y="182" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">merge</text>
        <text x="215" y="70" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">feature</text>
      </g>
    ),
    eye: (
      <g fill="none">
        <path d="M70 120 C 130 50, 270 50, 330 120 C 270 190, 130 190, 70 120 Z" stroke={L} strokeWidth="1.5" />
        <circle cx="200" cy="120" r="36" stroke={A} strokeWidth="2" />
        <circle cx="200" cy="120" r="14" fill={A} />
      </g>
    ),
    threads: (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <text x="52" y={70 + i * 36} fill={S} fontSize="10" fontFamily="var(--font-mono)">{`t${i}`}</text>
            <line x1="76" x2="350" y1={66 + i * 36} y2={66 + i * 36} stroke={L} strokeDasharray="2 5" />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={90 + ((i * 37 + j * 91) % 220)} y={58 + i * 36} width={34 + ((i + j) % 3) * 14} height="16" rx="5" fill={(i + j) % 4 === 0 ? A : E} stroke={(i + j) % 4 === 0 ? "none" : L} />
            ))}
          </g>
        ))}
        <line x1="214" x2="214" y1="44" y2="196" stroke={A} strokeWidth="2" strokeDasharray="5 4" />
        <text x="214" y="212" fill={S} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">sem_wait()</text>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 400 240" className={cn("h-full w-full", className)} role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--grid)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill={`url(#${grid})`} />
      <rect width="400" height="240" fill={`url(#${glow})`} />
      {motifs[kind]}
    </svg>
  );
}
