import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { SectionRule } from "@/components/site/Frame";
import { breadcrumbs } from "@/lib/seo";

type Crumb = { label: string; href?: string };

type SubpageShellProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  chips?: string[];
  crumbs?: Crumb[];
  meta?: ReactNode;
  children?: ReactNode;
};

/** Subpage masthead on the same 3/9 grid as the home sections. */
export function SubpageShell({ eyebrow, title, description, chips = [], crumbs = [], meta, children }: SubpageShellProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbs(trail.map((c) => ({ name: c.label, path: c.href })))} />
      <section className="relative isolate overflow-hidden pt-28 md:pt-32">
        <div aria-hidden className="under-header pointer-events-none absolute inset-0 -z-10">
          <div className="dots absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        </div>
        <div className="container-x grid pb-14 md:pb-20 lg:grid-cols-12">
          <div className="mb-8 lg:col-span-3 lg:mb-0 lg:pr-10">
            <nav aria-label="Breadcrumb" className="fade-in">
              <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1">
                {trail.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {i > 0 ? <span aria-hidden>/</span> : null}
                    {c.href ? (
                      <Link href={c.href} className="link-u hover:text-fg">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-fg">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="min-w-0 lg:col-span-9 lg:pl-10">
            <p className="label fade-in text-accent-ink" style={{ "--d": "60ms" } as React.CSSProperties}>
              {eyebrow}
            </p>
            <h1
              className="fade-in mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance [font-stretch:112%]"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            {description ? (
              <p className="lede fade-in mt-6 max-w-2xl" style={{ "--d": "180ms" } as React.CSSProperties}>
                {description}
              </p>
            ) : null}
            {chips.length ? (
              <p className="fade-in mt-7 font-mono text-[0.75rem] text-subtle" style={{ "--d": "240ms" } as React.CSSProperties}>
                {chips.join("  /  ")}
              </p>
            ) : null}
            {meta ? (
              <div className="fade-in mt-9" style={{ "--d": "300ms" } as React.CSSProperties}>
                {meta}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {children ? (
        <>
          <SectionRule />
          <div className="container-x pb-20 pt-10 md:pb-32 md:pt-20">{children}</div>
        </>
      ) : null}
    </>
  );
}
