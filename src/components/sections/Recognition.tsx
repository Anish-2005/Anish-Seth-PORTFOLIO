import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { awards, certifications } from "@/data/portfolio";

export function Recognition() {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="recognition-title"
          index="06"
          label="Recognition"
          title={
            <>
              Tested under <span className="serif-em">pressure.</span>
            </>
          }
          lede="National hackathon finals, industry certifications and community leadership."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="card overflow-hidden p-0 lg:col-span-7" data-reveal>
            <div className="flex items-center gap-3 border-b border-line px-6 py-5 sm:px-8">
              <Icon name="trophy" size={18} className="text-accent-ink" />
              <h3 className="text-[1.02rem] font-semibold tracking-tight">Hackathons &amp; awards</h3>
            </div>
            <ol>
              {awards.map((a) => {
                const national = a.result.startsWith("National");
                return (
                  <li
                    key={a.title + a.year}
                    className="group grid grid-cols-[52px_1fr] items-start gap-4 border-b border-line px-6 py-5 transition-colors last:border-0 hover:bg-bg-elev-2/60 sm:grid-cols-[64px_1fr_auto] sm:px-8"
                  >
                    <span className="pt-0.5 font-mono text-[0.8rem] text-subtle">{a.year}</span>
                    <div className="min-w-0">
                      <p className="text-[1.02rem] font-medium leading-snug">{a.title}</p>
                      <p className="mt-0.5 text-[0.88rem] text-muted">{a.detail}</p>
                      <span
                        className={`mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium sm:hidden ${national ? "bg-accent text-accent-fg" : "border border-line text-muted"}`}
                      >
                        {a.result}
                      </span>
                    </div>
                    <span
                      className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium sm:inline-flex ${national ? "bg-accent text-accent-fg" : "border border-line text-muted"}`}
                    >
                      {national ? <Icon name="award" size={13} /> : null}
                      {a.result}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="card overflow-hidden p-0 lg:col-span-5" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <div className="flex items-center gap-3 border-b border-line px-6 py-5 sm:px-8">
              <Icon name="award" size={18} className="text-accent-ink" />
              <h3 className="text-[1.02rem] font-semibold tracking-tight">Certifications &amp; programs</h3>
            </div>
            <ul>
              {certifications.map((c) => (
                <li key={c.title} className="flex items-start justify-between gap-4 border-b border-line px-6 py-4 last:border-0 sm:px-8">
                  <div className="min-w-0">
                    <p className="text-[0.95rem] font-medium leading-snug">{c.title}</p>
                    <p className="mt-0.5 text-[0.84rem] text-subtle">{c.issuer}</p>
                  </div>
                  <span className="shrink-0 pt-0.5 font-mono text-[0.76rem] text-subtle">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
