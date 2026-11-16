import { Section } from "@/components/ui/Section";
import { Swipe } from "@/components/ui/Swipe";
import { awards, certifications } from "@/data/portfolio";

export function Recognition() {
  return (
    <Section id="recognition" motif="grid" detail="waves" index="06" label="Recognition" title={<>A few wins along the way.</>}>
      <Swipe className="grid gap-px border-y border-line bg-line lg:grid-cols-2">
        <div className="bg-bg py-8 lg:pr-8">
          <div data-reveal>
            <p className="label mb-5">Hackathons &amp; awards</p>
            <ol className="border-t border-line">
              {awards.map((a) => {
                const national = a.result.startsWith("National");
                return (
                  <li
                    key={`${a.title}-${a.year}-${a.detail}`}
                    className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-line py-4 last:border-0"
                  >
                    <span className="pt-1 font-mono text-[0.76rem] tabular-nums text-subtle">{a.year}</span>
                    <div className="min-w-0">
                      <p className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                        <span className="text-[1.02rem] font-medium">{a.title}</span>
                        <span
                          className={`font-mono text-[0.68rem] uppercase tracking-[0.07em] ${national ? "text-accent-ink" : "text-subtle"}`}
                        >
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
        </div>

        <div className="bg-bg py-8 lg:pl-8">
          <div data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
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
      </Swipe>
    </Section>
  );
}
