import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience, leadership } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          index="02"
          label="Experience"
          title={
            <>
              Where the work <span className="serif-em">ships.</span>
            </>
          }
          lede="Production agentic systems at Digital Alpha, built on three years of shipping end-to-end products in public."
        />

        <ol className="relative md:before:absolute md:before:bottom-6 md:before:left-[219px] md:before:top-3 md:before:w-px md:before:bg-gradient-to-b md:before:from-line-strong md:before:via-line md:before:to-transparent">
          {experience.map((job, i) => (
            <li key={job.company + job.role} className="relative grid gap-4 pb-10 md:grid-cols-[200px_1fr] md:gap-10 md:pb-14">
              <div className="relative md:pt-7" data-reveal>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -right-[25px] top-[34px] hidden size-[11px] rounded-full border-2 border-bg md:block",
                    job.current ? "pulse-dot bg-accent text-accent" : "bg-line-strong",
                  )}
                />
                <p className="font-mono text-[0.78rem] text-fg">{job.period}</p>
                <p className="mt-1 text-[0.82rem] text-subtle">{job.type}</p>
              </div>

              <article
                data-reveal
                data-spotlight
                style={{ "--d": `${80 + i * 60}ms` } as React.CSSProperties}
                className="card p-6 sm:p-8"
              >
                <header className="flex flex-wrap items-start gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-xl border font-mono text-sm font-semibold",
                      job.current ? "border-transparent bg-accent text-accent-fg" : "border-line bg-bg-elev-2 text-muted",
                    )}
                  >
                    {job.current ? initials(job.company) : <Icon name="github" size={20} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1.2rem] font-semibold leading-snug tracking-tight sm:text-[1.3rem]">{job.role}</h3>
                    <p className="mt-0.5 text-[0.95rem] text-muted">
                      {job.company} <span className="text-subtle">· {job.summary}</span>
                    </p>
                  </div>
                  {job.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--ok)_35%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ok">
                      <span className="size-1.5 rounded-full bg-ok" />
                      Current
                    </span>
                  ) : null}
                </header>

                <ul className="mt-6 space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.96rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <span className="text-pretty">{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        {/* Leadership */}
        <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr] md:gap-10">
          <div data-reveal>
            <p className="font-mono text-[0.78rem] text-fg">Community</p>
            <p className="mt-1 text-[0.82rem] text-subtle">Leadership roles</p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" data-reveal>
            {leadership.map((l) => (
              <li key={l.role} className="flex items-start gap-3.5 bg-bg-elev px-5 py-4">
                <Icon name="users" size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-medium leading-snug">{l.role}</p>
                  <p className="mt-0.5 text-[0.84rem] text-subtle">
                    {l.org} · <span className="font-mono text-[0.76rem]">{l.period}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
