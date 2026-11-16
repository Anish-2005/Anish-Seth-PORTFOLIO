import { Section } from "@/components/ui/Section";
import { experience, leadership } from "@/data/portfolio";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title={
        <>
          Where the work ships.
        </>
      }
    >
      <ol className="border-t border-line">
        {experience.map((job, i) => (
          <li
            key={job.company + job.role}
            data-reveal
            style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            className="group relative grid gap-5 border-b border-line py-10 md:grid-cols-[11rem_1fr] md:gap-10 md:py-12"
          >
            <span
              aria-hidden
              className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
            />
            <div>
              <p className="font-mono text-[0.78rem] tabular-nums">{job.period}</p>
              <p className="label mt-1.5">{job.type}</p>
              {job.current ? (
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ok">
                  <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" aria-hidden />
                  Current
                </p>
              ) : null}
            </div>

            <div className="min-w-0">
              <h3 className="text-[1.45rem] font-semibold leading-tight tracking-[-0.025em] [font-stretch:110%] md:text-[1.7rem]">
                {job.role}
              </h3>
              <p className="mt-1.5 text-[0.98rem]">
                {job.company}
                <span className="text-subtle"> — {job.summary}</span>
              </p>

              <ul className="mt-6 space-y-3">
                {job.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[1.4rem_1fr] text-[0.96rem] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.78em] h-px w-3 bg-line-strong transition-colors group-hover:bg-accent" />
                    <span className="text-pretty">{b}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-mono text-[0.75rem] leading-relaxed text-subtle">
                {job.stack.map((s, j) => (
                  <span key={s}>
                    {/* Real spaces around the slash so the line can wrap on phones. */}
                    {j > 0 ? <span className="text-line-strong">{" / "}</span> : null}
                    <span className="whitespace-nowrap">{s}</span>
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16" data-reveal>
        <p className="label mb-4">Community &amp; leadership</p>
        <ul className="grid border-t border-line sm:grid-cols-2">
          {leadership.map((l, i) => (
            <li key={l.role} className={`border-b border-line py-5 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
              <p className="text-[0.98rem] font-medium">{l.role}</p>
              <p className="mt-1 flex flex-wrap justify-between gap-x-4 text-[0.84rem] text-subtle">
                <span>{l.org}</span>
                <span className="font-mono text-[0.74rem]">{l.period}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
