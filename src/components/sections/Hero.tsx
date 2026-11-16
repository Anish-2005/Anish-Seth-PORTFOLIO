import Image from "next/image";

import { AgentConsole } from "@/components/hero/AgentConsole";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroStats, profile } from "@/data/portfolio";
import { formatCompact } from "@/lib/utils";

const HEADLINE = ["I", "build", "agentic", "AI", "systems", "that", "hold", "up"];

type HeroProps = { contributions: number; repos: number };

export function Hero({ contributions, repos }: HeroProps) {
  const stats = [
    { value: formatCompact(contributions), label: "GitHub contributions, last 12 months" },
    { value: String(repos), label: "Public repositories" },
    ...heroStats,
  ];

  return (
    <section id="intro" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0" />
        <div
          className="aurora aurora-a left-[-18%] top-[-30%] h-[680px] w-[680px] md:left-[-8%]"
          style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
        />
        <div
          className="aurora aurora-b right-[-25%] top-[-5%] h-[600px] w-[600px] md:right-[-10%]"
          style={{ background: "radial-gradient(closest-side, var(--aurora-2), transparent)" }}
        />
        <div
          className="aurora left-[30%] top-[45%] h-[420px] w-[520px]"
          style={{ background: "radial-gradient(closest-side, var(--aurora-3), transparent)" }}
        />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
        <div>
          {/* Identity */}
          <div className="fade-in flex items-center gap-3" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Image
              src="/profile.jpg"
              alt="Portrait of Anish Seth"
              width={44}
              height={44}
              sizes="44px"
              priority
              className="size-11 rounded-full object-cover object-[50%_30%] ring-1 ring-line-strong"
            />
            <div className="leading-tight">
              <p className="text-[0.92rem] font-semibold tracking-tight">{profile.name}</p>
              <p className="text-[0.8rem] text-subtle">
                {profile.role} · {profile.location}
              </p>
            </div>
          </div>

          {/* Current role */}
          <a
            href="#experience"
            className="fade-in group mt-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-bg-elev/70 py-1 pl-1 pr-3.5 text-[0.8rem] backdrop-blur transition-colors hover:border-line-strong"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--ok)_14%,transparent)] px-2.5 py-1 font-medium text-ok">
              <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" />
              Now
            </span>
            <span className="truncate text-muted">
              {profile.current.title} at <span className="font-medium text-fg">{profile.current.company}</span>
            </span>
            <Icon name="arrow-right" size={14} className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1
            id="hero-title"
            className="rise mt-6 text-[clamp(2.55rem,6.4vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.045em] text-balance"
          >
            {HEADLINE.map((w, i) => (
              <span key={w + i} style={{ "--i": i } as React.CSSProperties}>
                {w}
                {" "}
              </span>
            ))}
            <span className="serif-em pr-1 text-[1.06em]" style={{ "--i": HEADLINE.length } as React.CSSProperties}>
              in production.
            </span>
          </h1>

          <p
            className="fade-in mt-6 max-w-xl text-[1.06rem] leading-relaxed text-muted text-pretty md:text-[1.12rem]"
            style={{ "--d": "520ms" } as React.CSSProperties}
          >
            AI/ML engineer specialising in <span className="text-fg">multi-agent orchestration</span>,{" "}
            <span className="text-fg">RAG &amp; GraphRAG</span> and <span className="text-fg">enterprise automation</span> on AWS
            Bedrock — with the guardrails, observability and cost discipline that real financial workflows demand.
          </p>

          <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "640ms" } as React.CSSProperties}>
            <ButtonLink href="#work" size="lg">
              See selected work
              <Icon name="arrow-right" size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={profile.links.resume} size="lg" variant="secondary">
              Download résumé
              <Icon name="download" size={16} className="transition-transform group-hover/btn:translate-y-px" />
            </ButtonLink>
            <div className="ml-1 hidden items-center gap-1 sm:flex">
              {[
                { href: profile.links.github, icon: "github" as const, label: "GitHub profile" },
                { href: profile.links.linkedin, icon: "linkedin" as const, label: "LinkedIn profile" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in relative" style={{ "--d": "380ms" } as React.CSSProperties}>
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
            style={{ background: "radial-gradient(60% 60% at 60% 40%, var(--aurora-1), transparent 70%)" }}
          />
          <AgentConsole />
        </div>
      </div>

      {/* Proof row */}
      <div className="container-x mt-16 md:mt-20">
        <dl className="fade-in grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line [gap:1px] md:grid-cols-4" style={{ "--d": "760ms" } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-bg px-5 py-5 md:px-6 md:py-6">
              <dt className="mt-2 text-[0.8rem] leading-snug text-subtle">{s.label}</dt>
              <dd className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] tabular-nums md:text-[2.3rem]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
