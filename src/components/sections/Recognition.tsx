import { Section } from "@/components/ui/Section";
import { awards, certifications } from "@/data/portfolio";

export function Recognition() {
  return (
    <Section
      id="recognition"
      index="06"
      label="Recognition"
      note="National hackathon finals, certifications and programs."
      title={
        <>
          Tested under pressure<span className="text-subtle"> — two national finals.</span>
        </>
      }
    >
      <div className="grid gap-px border-y border-line bg-line lg:grid-cols-2">
        <div className="bg-bg py-8 lg:pr-8" data-reveal>
          <p className="label mb-5">Hackathons &amp; awards</p>
          <ol className="border-t border-line">
            {awards.map((a) => {
              const national = a.result.startsWith("National");
              return (
                <li key={a.title + a.year} className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-line py-4 last:border-0">
                  <span className="pt-1 font-mono text-[0.76rem] tabular-nums text-subtle">{a.year}</span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[1.02rem] font-medium">{a.title}</span>
                      <span className={`font-mono text-[0.68rem] uppercase tracking-[0.07em] ${national ? "text-accent-ink" : "text-subtle"}`}>
                        {a.result}
                      </span>
                    </p>
                    <p className="mt-1 text-[0.86rem] text-subtle">{a.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="bg-bg py-8 lg:pl-8" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <p className="label mb-5">Certifications &amp; programs</p>
          <ul className="border-t border-line">
            {certifications.map((c) => (
              <li key={c.title} className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-line py-4 last:border-0">
                <span className="pt-1 font-mono text-[0.76rem] tabular-nums text-subtle">{c.year}</span>
                <div className="min-w-0">
                  <p className="text-[1.02rem] font-medium leading-snug">{c.title}</p>
                  <p className="mt-1 text-[0.86rem] text-subtle">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
