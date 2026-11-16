import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The "Trace" mark: one continuous stroke draws the A and flows into the S,
 * ending in a signal node. Geometry matches /public/brand (64-unit grid).
 */
export const TRACE_PATH =
  "M10 52.5 L22.2 13.2 L33.2 47.2 C35 52.6 40.4 55.2 46.2 54.8 C52.6 54.4 56.2 50.2 54.6 45.6 C53 41.2 47.4 39.6 43 37.6 C37.8 35.2 36.2 30.2 38.8 25.8 C41.6 21.2 47.4 20.2 51.6 22.4";

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="5.69 1.31 55.44 57.88"
      className={cn("logo-mark h-7 w-auto shrink-0 overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        className="logo-trace"
        d={TRACE_PATH}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={6.6}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={12}
      />
      <circle className="logo-node" cx={55.6} cy={24.6} r={4.49} fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("logo group flex items-center gap-2.5", className)} aria-label="Anish Seth — home">
      <LogoMark />
      <span className="text-[0.95rem] font-semibold tracking-[-0.015em] [font-stretch:112%]">Anish Seth</span>
    </Link>
  );
}
