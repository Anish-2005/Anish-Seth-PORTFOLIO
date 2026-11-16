import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const toolbelt = ["Git", "GitHub", "Docker", "JupyterLab", "Google Colab", "Postman", "Figma", "VS Code"];

function OrchestrationSketch() {
  const workers = ["research", "extract", "reconcile"];
  return (
    <svg viewBox="0 0 320 132" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="orch-g" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <rect x="110" y="6" width="100" height="30" rx="9" fill="url(#orch-g)" />
      <text x="160" y="25" textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill="var(--accent-fg)">
        supervisor
      </text>
      {workers.map((w, i) => {
        const x = 12 + i * 104;
        return (
          <g key={w}>
            <path d={`M160 36 C160 52, ${x + 46} 46, ${x + 46} 60`} fill="none" stroke="var(--line-strong)" className="edge-flow" />
            <rect x={x} y="60" width="92" height="28" rx="8" fill="var(--bg-elev-2)" stroke="var(--line-strong)" />
            <text x={x + 46} y="78" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--fg-muted)">
              {w}
            </text>
            <line x1={x + 46} x2={x + 46} y1="88" y2="104" stroke="var(--line-strong)" strokeDasharray="2 3" />
            <rect x={x + 22} y="104" width="48" height="20" rx="10" fill="none" stroke="var(--line-strong)" />
            <text x={x + 46} y="118" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--fg-subtle)">
              {["mcp", "llm", "api"][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Capabilities() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="skills-title"
          index="04"
          label="Capabilities"
          title={
            <>
              A full stack, <span className="serif-em">AI-first.</span>
            </>
          }
          lede="From the agent's reasoning loop to the API it calls and the interface a reviewer approves in — the whole path, end to end."
        />

        <ul className="grid gap-4 md:grid-flow-dense md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {skillGroups.map((g, i) => (
            <li
              key={g.id}
              data-reveal
              data-spotlight
              style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}
              className={cn("card flex flex-col p-6", g.span === "wide" && "md:col-span-2")}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl border",
                    i === 0 ? "border-transparent bg-accent text-accent-fg" : "border-line bg-bg-elev-2 text-accent-ink",
                  )}
                >
                  <Icon name={g.icon as IconName} size={18} />
                </span>
                <span className="font-mono text-[10.5px] text-subtle">{String(g.items.length).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-[1.08rem] font-semibold tracking-tight">{g.title}</h3>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{g.blurb}</p>

              {g.id === "agentic" ? (
                <div className="my-6 rounded-xl border border-line bg-bg/60 p-4">
                  <OrchestrationSketch />
                </div>
              ) : null}

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${g.title} skills`}>
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li data-reveal data-spotlight className="card flex flex-col p-6 md:col-span-2" style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg-elev-2 text-accent-ink">
                <Icon name="branch" size={18} />
              </span>
              <span className="font-mono text-[10.5px] text-subtle">{String(toolbelt.length).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-[1.08rem] font-semibold tracking-tight">Daily toolbelt</h3>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
              Plus 120+ DSA problems solved in Java on LeetCode, and a daily practice log in public.
            </p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Developer tools">
              {toolbelt.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
