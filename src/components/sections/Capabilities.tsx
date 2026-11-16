import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/portfolio";

const toolbelt = {
  title: "Daily toolbelt",
  blurb: "Plus 120+ DSA problems solved in Java on LeetCode.",
  items: ["Git", "GitHub", "Docker", "JupyterLab", "Google Colab", "Postman", "Figma", "VS Code"],
};

/** Skills as a spec sheet: one ruled row per layer of a production system. */
export function Capabilities() {
  const rows = [...skillGroups, { id: "tools", ...toolbelt }];
  return (
    <Section
      id="skills"
      index="04"
      label="Capabilities"
      note="Grouped by where each tool sits in a production system."
      title={
        <>
          A full stack, AI-first<span className="text-subtle"> — from reasoning loop to review screen.</span>
        </>
      }
    >
      <dl className="border-t border-line">
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
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-[0.7rem] text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.05rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">{g.title}</span>
              </p>
              <p className="mt-2 pl-7 text-[0.86rem] leading-relaxed text-subtle">{g.blurb}</p>
            </dt>
            <dd className="pl-7 md:pl-0">
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-[0.98rem] leading-relaxed">
                {g.items.map((s, j) => (
                  <li key={s} className="text-fg/90">
                    {s}
                    {j < g.items.length - 1 ? <span aria-hidden className="pl-2 text-line-strong">/</span> : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
