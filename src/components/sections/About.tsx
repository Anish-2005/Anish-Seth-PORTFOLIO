import { PortraitPlate } from "@/components/site/Portrait";
import { Section } from "@/components/ui/Section";
import { Swipe } from "@/components/ui/Swipe";
import { education, principles, profile } from "@/data/portfolio";

/** `portrait` shows the photo plate — off on the home page, where the hero already features it. */
export function About({ portrait = false }: { portrait?: boolean }) {
  return (
    <Section
      id="about"
      motif="dots"
      detail="graph"
      index="01"
      label="About"
      title={
        <>
          A bit about me.
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-9 md:gap-10">
        {portrait ? (
          <div className="self-start md:sticky md:top-28 md:col-span-4" data-reveal>
            <PortraitPlate />
          </div>
        ) : null}

        <div className="md:col-span-5">
          <div className="space-y-5 text-[1.04rem] leading-[1.75] text-muted">
            {profile.intro.map((p, i) => (
              <p
                key={i}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                className={i === 0 ? "text-[1.18rem] leading-[1.6] tracking-[-0.01em] text-fg" : undefined}
              >
                {p}
              </p>
            ))}
          </div>
          {portrait ? <Education className="mt-10" /> : null}
        </div>

        {portrait ? null : (
          <div className="md:col-span-4">
            <Education />
          </div>
        )}
      </div>

      {/* Principles: a ruled four-column strip */}
      <div className="mt-14 md:mt-20">
        <p className="label mb-5" data-reveal>
          How I work
        </p>
        <Swipe as="ol" className="grid border-t border-line sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              className={[
                "group relative border-b border-line py-7 sm:px-6",
                i % 2 === 1 ? "sm:border-l" : "sm:pl-0",
                i === 2 ? "xl:border-l xl:pl-6" : "",
                i === 0 ? "xl:pl-0" : "",
              ].join(" ")}
            >
              <h3 className="text-[1.06rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">{p.title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{p.body}</p>
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
            </li>
          ))}
        </Swipe>
      </div>
    </Section>
  );
}

function Education({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div data-reveal>
        <p className="label mb-3">Education</p>
        <ol className="border-t border-line">
          {education.map((e) => (
            <li key={e.degree} className="flex items-start justify-between gap-4 border-b border-line py-3.5">
              <span className="min-w-0">
                <span className="block text-[0.94rem]">{e.degree}</span>
                <span className="mt-0.5 block text-[0.84rem] text-subtle">{e.school}</span>
              </span>
              <span className="shrink-0 pt-0.5 font-mono text-[0.76rem] text-subtle">{e.period}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
