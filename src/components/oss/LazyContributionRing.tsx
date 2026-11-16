"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const ContributionRing = dynamic(() => import("@/components/oss/ContributionRing").then((m) => m.ContributionRing), {
  ssr: false,
});

type Level = 0 | 1 | 2 | 3 | 4;
type Props = { start: string; counts: number[]; levels: string; total: number };

/**
 * The year ring is 365 SVG spokes well below the fold. Instead of putting all of them in the HTML
 * (and every day as an object in the page data), this draws the ring in the browser just before it
 * scrolls into view, from a compact list of daily counts. The total is server-rendered, so the number
 * is there straight away and the box never changes size.
 */
export function LazyContributionRing({ start, counts, levels, total }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const days = useMemo(() => {
    const t0 = Date.parse(`${start}T00:00:00Z`);
    return counts.map((count, i) => ({
      date: new Date(t0 + i * 86_400_000).toISOString().slice(0, 10),
      count,
      level: Number(levels[i] ?? 0) as Level,
    }));
  }, [start, counts, levels]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[460px]">
      {near ? (
        <ContributionRing days={days} total={total} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[clamp(2rem,6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] tabular-nums [font-stretch:112%]">
            {total.toLocaleString("en-US")}
          </span>
          <span className="label mt-2">contributions</span>
          <span className="mt-1 font-mono text-[0.7rem] text-subtle">last 12 months</span>
        </div>
      )}
    </div>
  );
}
