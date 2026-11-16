import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "@/components/work/ProjectArt";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function ExternalLinks({ project, size = 16 }: { project: Project; size?: number }) {
  const { github, live } = project.links;
  if (!github && !live) return null;
  return (
    <div className="relative z-10 flex items-center gap-1">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className="grid size-9 place-items-center rounded-full text-subtle transition-colors hover:bg-bg-elev-2 hover:text-fg"
        >
          <Icon name="github" size={size} />
        </a>
      ) : null}
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className="grid size-9 place-items-center rounded-full text-subtle transition-colors hover:bg-bg-elev-2 hover:text-fg"
        >
          <Icon name="arrow-up-right" size={size} />
        </a>
      ) : null}
    </div>
  );
}

export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-spotlight
      data-reveal
      style={{ "--d": `${(index % 2) * 90}ms` } as React.CSSProperties}
      className="card group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[5/3] overflow-hidden border-b border-line bg-bg">
        <ProjectArt
          kind={project.art}
          id={`f-${project.slug}`}
          className="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="chip !bg-[var(--bg-glass)] backdrop-blur">{project.kicker}</span>
          <span className="font-mono text-[11px] text-subtle">{project.year}</span>
        </div>
        {project.badge ? (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-fg">
            <Icon name="trophy" size={12} />
            {project.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-[1.35rem] font-semibold tracking-tight sm:text-[1.5rem]">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-[1] after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted text-pretty">{project.summary}</p>

        <ul className="mt-5 space-y-2">
          {project.outcomes.slice(0, 2).map((o) => (
            <li key={o} className="flex gap-2.5 text-[0.88rem] text-muted">
              <Icon name="check" size={15} className="mt-[3px] shrink-0 text-accent-ink" />
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-7">
          <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-fg">
            Read case study
            <Icon name="arrow-right" size={15} className="text-accent-ink transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <ExternalLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-spotlight data-cats={project.categories.join(" ")} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/8] overflow-hidden border-b border-line bg-bg">
        <ProjectArt
          kind={project.art}
          id={`c-${project.slug}`}
          className="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        {project.badge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-medium text-accent-fg">
            <Icon name="trophy" size={11} />
            {project.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow !text-[0.64rem]">{project.kicker}</p>
        <h3 className="mt-2 text-[1.12rem] font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-[1] after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-muted">{project.summary}</p>
        <div className={cn("mt-auto flex items-end justify-between gap-3 pt-5")}>
          <p className="truncate font-mono text-[11px] text-subtle">{project.stack.slice(0, 3).join(" · ")}</p>
          <ExternalLinks project={project} size={15} />
        </div>
      </div>
    </article>
  );
}
