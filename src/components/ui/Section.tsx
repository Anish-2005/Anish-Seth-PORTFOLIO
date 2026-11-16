import type { ReactNode } from "react";

import { SectionDecor, type Motif } from "@/components/site/Decor";
import { SectionRule } from "@/components/site/Frame";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Faint static background drawing for the section. */
  motif?: Motif;
};

/**
 * Editorial section scaffold: a self-drawing rule, a sticky label column (3/12)
 * and a content column (9/12) aligned to the page's visible guides.
 */
export function Section({ id, index, label, title, intro, note, children, className, titleClassName, motif }: SectionProps) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined} aria-label={title ? undefined : label} className={cn("relative isolate", className)}>
      {motif ? <SectionDecor motif={motif} /> : null}
      <SectionRule />
      <div className="container-x relative grid py-20 md:py-28 lg:grid-cols-12">
        <aside className="mb-10 lg:col-span-3 lg:mb-0 lg:pr-10">
          <div className="lg:sticky lg:top-28" data-reveal>
            <p className="label flex items-baseline gap-3">
              <span className="text-accent-ink">{index}</span>
              <span className="text-fg">{label}</span>
            </p>
            {note ? <div className="mt-5 hidden max-w-[15rem] text-[0.86rem] leading-relaxed text-subtle lg:block">{note}</div> : null}
            {/* Oversized outlined index — fills the label column and stays beside the content. */}
            <span aria-hidden className="decor-numeral mt-10 hidden lg:block">
              {index}
            </span>
          </div>
        </aside>
        <div className="min-w-0 lg:col-span-9 lg:pl-10">
          {title ? (
            <h2 id={`${id}-title`} className={cn("title max-w-4xl", titleClassName)} data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
              {title}
            </h2>
          ) : null}
          {intro ? (
            <p className="lede mt-6 max-w-2xl" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              {intro}
            </p>
          ) : null}
          <div className={title || intro ? "mt-14 md:mt-16" : undefined}>{children}</div>
        </div>
      </div>
    </section>
  );
}
