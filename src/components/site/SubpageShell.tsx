import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

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

export function SubpageShell({ eyebrow, title, description, chips = [], crumbs = [], meta, children }: SubpageShellProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid mask-fade-b absolute inset-0" />
          <div
            className="aurora aurora-a left-[-10%] top-[-40%] h-[560px] w-[560px]"
            style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
          />
        </div>
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="fade-in">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-subtle">
              {trail.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 ? <Icon name="arrow-right" size={11} className="opacity-60" /> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-fg">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-muted">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow fade-in mt-8" style={{ "--d": "60ms" } as React.CSSProperties}>
            {eyebrow}
          </p>
          <h1 className="heading fade-in mt-4 max-w-4xl !text-[clamp(2.3rem,5.4vw,4rem)]" style={{ "--d": "120ms" } as React.CSSProperties}>
            {title}
          </h1>
          {description ? (
            <p
              className="fade-in mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-muted text-pretty md:text-[1.12rem]"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              {description}
            </p>
          ) : null}
          {chips.length ? (
            <ul className="fade-in mt-7 flex flex-wrap gap-2" style={{ "--d": "240ms" } as React.CSSProperties}>
              {chips.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
          {meta ? (
            <div className="fade-in mt-8" style={{ "--d": "300ms" } as React.CSSProperties}>
              {meta}
            </div>
          ) : null}
        </div>
      </section>
      {children ? <div className="container-x pb-24 md:pb-32">{children}</div> : null}
    </>
  );
}
