import { TRACE_PATH } from "@/components/site/Logo";

export type Motif = "dots" | "grid" | "rings" | "mark";

/**
 * Static, faint background drawings that give each section texture without adding content.
 * Everything is line-colour (or dot-colour), masked to fade out, and sits behind the content.
 */
export function SectionDecor({ motif }: { motif: Motif }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {motif === "dots" ? (
        <div className="dots absolute right-0 top-0 h-[78%] w-[58%] [mask-image:radial-gradient(ellipse_at_78%_22%,#000_0%,transparent_62%)]" />
      ) : null}

      {motif === "grid" ? (
        <div className="decor-grid absolute bottom-0 right-0 h-[80%] w-[62%] [mask-image:radial-gradient(ellipse_at_80%_80%,#000_0%,transparent_64%)]" />
      ) : null}

      {motif === "rings" ? (
        <svg
          viewBox="0 0 600 600"
          className="absolute right-[-180px] top-1/2 h-[min(640px,110%)] w-auto -translate-y-1/2 [mask-image:radial-gradient(circle_at_center,#000_35%,transparent_72%)]"
        >
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {[70, 130, 190, 250].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} />
            ))}
            <path d="M300 20 V580 M20 300 H580" strokeDasharray="3 7" />
            {Array.from({ length: 72 }, (_, i) => {
              const a = (i / 72) * Math.PI * 2;
              const r1 = 250;
              const r2 = i % 6 === 0 ? 266 : 258;
              return (
                <line
                  key={i}
                  x1={300 + Math.cos(a) * r1}
                  y1={300 + Math.sin(a) * r1}
                  x2={300 + Math.cos(a) * r2}
                  y2={300 + Math.sin(a) * r2}
                />
              );
            })}
          </g>
          <circle cx={300 + Math.cos(-0.7) * 190} cy={300 + Math.sin(-0.7) * 190} r="4" fill="var(--accent)" />
        </svg>
      ) : null}

      {motif === "mark" ? (
        <svg viewBox="5.69 1.31 55.44 57.88" className="absolute bottom-[6%] right-[-40px] h-[min(560px,80%)] w-auto opacity-90">
          <path
            d={TRACE_PATH}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit={12}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={55.6} cy={24.6} r={4.49} fill="none" stroke="var(--accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}
    </div>
  );
}
