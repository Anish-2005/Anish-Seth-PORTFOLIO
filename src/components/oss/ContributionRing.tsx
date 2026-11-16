"use client";

import { useRef, useState } from "react";

type Day = { date: string; count: number; level: number };

const SIZE = 400;
const C = SIZE / 2;
const R0 = 98; // inner radius (where spokes start)
const L = 84; // longest spoke
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const utc = (d: string) => new Date(`${d}T00:00:00Z`);
const fmt = (d: string) => utc(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/**
 * A year as a clock face: one spoke per day, starting at 12 o'clock and running clockwise to today.
 * Longer spokes mean busier days. Hover (or use the arrow keys) to read any day in the centre.
 */
export function ContributionRing({ days, total }: { days: Day[]; total: number }) {
  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const n = days.length;
  const max = Math.max(1, ...days.map((d) => d.count));
  const angle = (i: number) => ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2;
  const len = (c: number) => (c === 0 ? 3 : 7 + Math.pow(c / max, 0.6) * (L - 7));
  const tip = (i: number, r: number) => [C + Math.cos(angle(i)) * r, C + Math.sin(angle(i)) * r] as const;

  const months = days
    .map((d, i) => ({ d: utc(d.date), i }))
    .filter(({ d }) => d.getUTCDate() === 1)
    .map(({ d, i }) => ({ i, label: MONTHS[d.getUTCMonth()] }));

  const pick = (clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const x = ((clientX - box.left) / box.width) * SIZE - C;
    const y = ((clientY - box.top) / box.height) * SIZE - C;
    const r = Math.hypot(x, y);
    if (r < R0 - 22 || r > R0 + L + 26) return setActive(null);
    let a = Math.atan2(y, x) + Math.PI / 2;
    if (a < 0) a += Math.PI * 2;
    setActive(Math.min(n - 1, Math.floor((a / (Math.PI * 2)) * n)));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 7 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") setActive((v) => Math.min(n - 1, (v ?? n - 1) + (v === null ? 0 : step)));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") setActive((v) => Math.max(0, (v ?? n - 1) - (v === null ? 0 : step)));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(n - 1);
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  };

  const a = active !== null ? days[active] : null;

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full touch-none select-none overflow-visible outline-none focus-visible:[outline:1.5px_solid_var(--accent)] focus-visible:[outline-offset:6px]"
        role="group"
        aria-label="Contributions over the last 12 months, one spoke per day. Use the arrow keys to step through days."
        tabIndex={0}
        onPointerMove={(e) => pick(e.clientX, e.clientY)}
        onPointerDown={(e) => pick(e.clientX, e.clientY)}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
      >
        {/* Reference rings */}
        <circle cx={C} cy={C} r={R0 - 8} fill="none" stroke="var(--line)" />
        <circle cx={C} cy={C} r={R0 + L} fill="none" stroke="var(--line)" strokeDasharray="2 5" />

        {/* Month ticks + labels */}
        {months.map(({ i, label }) => {
          const [x1, y1] = tip(i, R0 - 12);
          const [x2, y2] = tip(i, R0 + L + 6);
          const [lx, ly] = tip(i, R0 + L + 20);
          const anchor = Math.abs(lx - C) < 12 ? "middle" : lx > C ? "start" : "end";
          return (
            <g key={`${label}-${i}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line)" />
              <text x={lx} y={ly + 3} textAnchor={anchor} fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--fg-subtle)">
                {label}
              </text>
            </g>
          );
        })}

        {/* One spoke per day */}
        {days.map((d, i) => {
          const [x1, y1] = tip(i, R0);
          const [x2, y2] = tip(i, R0 + len(d.count));
          return (
            <line
              key={d.date}
              className="ring-spoke"
              pathLength={1}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={d.count === 0 ? "var(--line-strong)" : "var(--accent)"}
              strokeOpacity={d.count === 0 ? 1 : 0.35 + 0.65 * Math.min(1, d.level / 4)}
              strokeWidth={1.25}
              strokeLinecap="round"
              style={{ "--i": i } as React.CSSProperties}
            />
          );
        })}

        {/* Today */}
        {(() => {
          const [x, y] = tip(n - 1, R0 + L + 6);
          return <circle cx={x} cy={y} r={2.6} fill="var(--fg)" />;
        })()}

        {/* Active day: highlighted spoke ending in a node, like the logo */}
        {active !== null
          ? (() => {
              const [x1, y1] = tip(active, R0 - 4);
              const [x2, y2] = tip(active, R0 + Math.max(len(days[active].count), 10) + 4);
              return (
                <g>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fg)" strokeWidth={2} strokeLinecap="round" />
                  <circle cx={x2} cy={y2} r={4.5} fill="var(--accent)" stroke="var(--bg)" strokeWidth={2} />
                </g>
              );
            })()
          : null}
      </svg>

      {/* Centre readout */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-live="polite">
        {a ? (
          <>
            <span className="text-[clamp(2rem,6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] tabular-nums [font-stretch:112%]">
              {a.count}
            </span>
            <span className="label mt-2">{a.count === 1 ? "contribution" : "contributions"}</span>
            <span className="mt-1 font-mono text-[0.7rem] text-subtle">{fmt(a.date)}</span>
          </>
        ) : (
          <>
            <span className="text-[clamp(2rem,6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] tabular-nums [font-stretch:112%]">
              {total.toLocaleString("en-US")}
            </span>
            <span className="label mt-2">contributions</span>
            <span className="mt-1 font-mono text-[0.7rem] text-subtle">last 12 months</span>
          </>
        )}
      </div>
    </div>
  );
}
