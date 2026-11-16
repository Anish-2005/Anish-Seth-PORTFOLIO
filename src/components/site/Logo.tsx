import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The "Trace" mark: one continuous stroke draws the A and flows into the S,
 * ending in a signal node. Geometry matches /public/brand (64-unit grid).
 */
export const TRACE_PATH =
  "M10 52.5 L22.2 13.2 L33.2 47.2 C35 52.6 40.4 55.2 46.2 54.8 C52.6 54.4 56.2 50.2 54.6 45.6 C53 41.2 47.4 39.6 43 37.6 C37.8 35.2 36.2 30.2 38.8 25.8 C41.6 21.2 47.4 20.2 51.6 22.4";

/** `weight` is the stroke on the 64-unit grid: 6.6 for display sizes, heavier for small UI. */
export function LogoMark({ className, title, weight = 7.4 }: { className?: string; title?: string; weight?: number }) {
  return (
    <svg
      viewBox="5.69 1.31 55.44 57.88"
      className={cn("logo-mark h-6 w-auto shrink-0 overflow-visible", className)}
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
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={12}
      />
      <circle className="logo-node" cx={55.6} cy={24.6} r={+(weight * 0.68).toFixed(2)} fill="var(--accent)" />
    </svg>
  );
}

/** Mark · hairline · name in tracked mono capitals — the brand lockup used across the UI. */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span aria-hidden className="lockup-rule h-[18px] w-px bg-current opacity-25" />
      <span className="lockup-name font-mono text-[0.72rem] font-medium uppercase leading-none tracking-[0.14em]">Anish Seth</span>
    </span>
  );
}

/** `prefetch={false}` on the home page itself, where prefetching "/" would just download the page you're on. */
export function Logo({ className, prefetch }: { className?: string; prefetch?: boolean }) {
  return (
    <Link href="/" prefetch={prefetch} className={cn("logo group", className)} aria-label="Anish Seth, home">
      <Lockup />
    </Link>
  );
}
