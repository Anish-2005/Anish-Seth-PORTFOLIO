import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  id?: string;
  className?: string;
};

/** Consistent section opener: mono index + label rule, display title, optional lede. */
export function SectionHeader({ index, label, title, lede, aside, id, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="mb-6 flex items-center gap-4" data-reveal>
        <span className="font-mono text-xs text-accent-ink">{index}</span>
        <span className="eyebrow">{label}</span>
        <span className="hairline flex-1" aria-hidden />
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 id={id} className="heading" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
            {title}
          </h2>
          {lede ? (
            <p
              className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted text-pretty"
              data-reveal
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              {lede}
            </p>
          ) : null}
        </div>
        {aside ? (
          <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}
