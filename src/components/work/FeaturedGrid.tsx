import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "@/components/work/ProjectArt";
import type { Project } from "@/data/portfolio";

/** Featured case studies as a ruled 2×2 sheet — cells share hairlines instead of floating as cards. */
export function FeaturedGrid({ projects }: { projects: Project[] }) {
  return (
    <ol className="grid gap-px border-y border-line bg-line md:grid-cols-2">
      {projects.map((p, i) => (
        <li key={p.slug} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties} className={`bg-bg ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
          <article className="group relative flex h-full flex-col py-8 md:py-10">
            <p className="label">
              {p.kicker} · {p.year}
            </p>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-bg-elev">
              <ProjectArt
                kind={p.art}
                id={`f-${p.slug}`}
                className="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
              />
              {p.badge ? (
                <span className="absolute bottom-3 left-3 bg-fg px-2 py-1 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-bg">
                  {p.badge}
                </span>
              ) : null}
            </div>

            <h3 className="mt-7 text-[1.55rem] font-semibold leading-tight tracking-[-0.025em] [font-stretch:110%]">
              <Link
                href={`/projects/${p.slug}`}
                className="after:absolute after:inset-0 after:z-[1] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-[1.5px] focus-visible:after:outline-accent"
              >
                {p.title}
              </Link>
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">{p.summary}</p>
            <p className="mt-5 font-mono text-[0.72rem] text-subtle">{p.stack.slice(0, 4).join(" / ")}</p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <span className="inline-flex items-center gap-2 text-[0.88rem] font-medium">
                Case study
                <Icon name="arrow-right" size={15} className="text-accent-ink transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
              <span className="relative z-[2] flex items-center gap-4 text-[0.82rem] text-subtle">
                {p.links.github ? (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="link-u hover:text-fg" aria-label={`${p.title} source on GitHub`}>
                    Source
                  </a>
                ) : null}
                {p.links.live ? (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="link-u hover:text-fg" aria-label={`${p.title} live site`}>
                    Live ↗
                  </a>
                ) : null}
              </span>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
