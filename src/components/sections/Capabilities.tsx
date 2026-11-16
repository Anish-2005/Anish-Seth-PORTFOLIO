import { Section } from "@/components/ui/Section";
import { Swipe } from "@/components/ui/Swipe";
import { skillGroups } from "@/data/portfolio";

/** Skills as a spec sheet: one ruled row per layer of a production system. */
export function Capabilities() {
  const rows = skillGroups;
  return (
    <Section
      id="skills"
      motif="dots"
      detail="graph"
      index="04"
      label="Skills"
      title={
        <>
          What I work with.
        </>
      }
    >
      <Swipe as="dl" className="border-t border-line">
        {rows.map((g, i) => (
          <div
            key={g.id}
            data-reveal
            style={{ "--d": `${(i % 3) * 50}ms` } as React.CSSProperties}
            className="group relative grid gap-4 border-b border-line py-7 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-10 md:py-8"
          >
            <span
              aria-hidden
              className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
            />
            <dt>
              <p className="text-[1.05rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">{g.title}</p>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-subtle">{g.blurb}</p>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-[0.98rem] leading-relaxed">
                {g.items.map((s) => (
                  // The "/" separator is drawn in CSS (with empty alt text, so screen readers skip it).
                  <li key={s} className="text-fg/90 after:pl-2 after:text-line-strong after:content-['/'_/_''] last:after:content-none">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </Swipe>
    </Section>
  );
}
