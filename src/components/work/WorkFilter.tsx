"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; count: number };

/**
 * Tiny client island: owns only the filter state. Cards are server-rendered children;
 * visibility is handled in CSS via `data-filter` / `data-cats`.
 */
export function WorkFilter({ tabs, children }: { tabs: Tab[]; children: ReactNode }) {
  const [filter, setFilter] = useState("all");
  const [tick, setTick] = useState<"a" | "b">("a");

  return (
    <div>
      <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter projects">
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(t.id);
                setTick((v) => (v === "a" ? "b" : "a"));
              }}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.84rem] transition-all duration-300",
                active
                  ? "border-transparent bg-fg text-bg"
                  : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {t.label}
              <span className={cn("font-mono text-[10px]", active ? "text-bg/60" : "text-subtle")}>{t.count}</span>
            </button>
          );
        })}
      </div>
      <div data-filter={filter} data-tick={tick} className="work-grid" aria-live="polite">
        {children}
      </div>
    </div>
  );
}
