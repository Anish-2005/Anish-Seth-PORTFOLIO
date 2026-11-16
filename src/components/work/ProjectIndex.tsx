"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "@/components/work/ProjectArt";
import { categoryLabels, type ProjectCategory } from "@/data/categories";
import type { ProjectRow } from "@/data/portfolio";
import { useLite } from "@/lib/lite";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

/** Rows shown on phones before "Show all" (everything shows from tablet width up). */
const MOBILE_ROWS = 5;

/**
 * An editorial index of builds. Rows dim their siblings on hover, and on desktop a small
 * preview of the project's artwork trails the cursor with eased motion.
 */
export function ProjectIndex({ projects }: { projects: ProjectRow[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  // Artwork kept in the cursor preview: the current one and the previous one (for the crossfade).
  const [shown, setShown] = useState<string[]>([]);
  const hover = (slug: string) => {
    setHovered(slug);
    setShown((prev) => (prev.includes(slug) ? prev : [...prev, slug].slice(-2)));
  };
  const [showAll, setShowAll] = useState(false);
  const lite = useLite();
  const previewRef = useRef<HTMLDivElement>(null);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...(Object.keys(categoryLabels) as ProjectCategory[]).map((c) => ({
      id: c,
      label: categoryLabels[c],
      count: projects.filter((p) => p.categories.includes(c)).length,
    })),
  ];
  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    if (!mq.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let primed = false;

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x + 28}px, ${y - 100}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!primed) {
        x = tx;
        y = ty;
        primed = true;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      <div
        className="-mx-[var(--pad)] mb-6 flex gap-x-4 overflow-x-auto whitespace-nowrap px-[var(--pad)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-x-6 sm:gap-y-2 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter builds"
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn("relative py-1 text-[0.9rem] transition-colors", active ? "text-fg" : "text-subtle hover:text-fg")}
            >
              {f.label}
              <sup className="ml-1 font-mono text-[0.62rem] text-subtle">{f.count}</sup>
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px bg-accent transition-[width] duration-500 ease-[var(--ease-out-expo)]",
                  active ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <ol className="group/list border-t border-line" onMouseLeave={() => setHovered(null)}>
        {visible.map((p, i) => {
          return (
            <li key={p.slug} className={cn("border-b border-line", !showAll && i >= MOBILE_ROWS && "max-md:hidden")}>
              <Link
                href={`/projects/${p.slug}`}
                prefetch={lite ? false : undefined}
                onMouseEnter={() => hover(p.slug)}
                onFocus={() => hover(p.slug)}
                onBlur={() => setHovered(null)}
                className="group/row grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 py-5 transition-[color,padding] duration-500 ease-[var(--ease-out-expo)] group-hover/list:text-subtle hover:!text-fg md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_3.5rem_1.25rem] md:py-6 md:hover:pl-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[1.12rem] font-medium tracking-[-0.015em] [font-stretch:106%] md:text-[1.28rem]">
                    {p.title}
                    {p.badge ? (
                      <span className="ml-2 align-middle font-mono text-[0.62rem] uppercase tracking-[0.06em] text-accent-ink">★ SIH</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.84rem] text-subtle md:hidden">{p.kicker}</span>
                </span>
                <span className="hidden truncate text-[0.86rem] md:block">{p.kicker}</span>
                <span className="font-mono text-[0.75rem] tabular-nums md:text-right">{p.year}</span>
                <Icon
                  name="arrow-up-right"
                  size={15}
                  className="hidden translate-y-0.5 opacity-0 transition-all duration-500 group-hover/row:opacity-100 group-hover/row:text-accent-ink md:block"
                />
              </Link>
            </li>
          );
        })}
      </ol>
      {!showAll && visible.length > MOBILE_ROWS ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="link-u mt-6 inline-flex items-center gap-2 text-[0.92rem] font-medium md:hidden"
        >
          Show all {visible.length}
          <Icon name="arrow-down" size={15} className="text-accent-ink" />
        </button>
      ) : null}

      {/* Cursor-trailing preview (desktop, fine pointer only) */}
      <div ref={previewRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block">
        <div
          className={cn(
            "relative aspect-[16/10] w-[300px] overflow-hidden bg-bg-elev shadow-[var(--shadow-pop)] transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)]",
            hovered ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          {projects
            .filter((p) => shown.includes(p.slug))
            .map((p) => (
              <div
                key={p.slug}
                className={cn("absolute inset-0 transition-opacity duration-300", hovered === p.slug ? "opacity-100" : "opacity-0")}
              >
                <ProjectArt kind={p.art} id={`pv-${p.slug}`} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
