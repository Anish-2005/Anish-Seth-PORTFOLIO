import Image from "next/image";

import { Wordmark } from "@/components/hero/Wordmark";
import { SectionRule } from "@/components/site/Frame";
import { LocalTime } from "@/components/site/LocalTime";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PORTRAIT } from "@/components/site/Portrait";
import { heroStats, profile } from "@/data/portfolio";
import { formatCompact } from "@/lib/utils";

type HeroProps = { contributions: number; repos: number };

export function Hero({ contributions, repos }: HeroProps) {
  const stats = [
    { value: formatCompact(contributions), label: "GitHub contributions · 12 mo" },
    { value: String(repos), label: "Public repositories" },
    ...heroStats,
  ];

  return (
    <section id="intro" aria-label="Introduction" className="relative isolate overflow-hidden pt-24 md:pt-28">
      {/* Dot field — the accent layer follows the pointer (or the idle wave) via --hx / --hy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="dots absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_92%)]" />
        <div className="dots-accent absolute inset-0 opacity-80" />
      </div>

      <div className="relative">
        <div className="container-x lg:pb-24">
          {/* Masthead */}
          <dl
            className="fade-in grid grid-cols-2 gap-x-6 gap-y-5 border-b border-line pb-5 text-[0.88rem] lg:grid-cols-12 lg:gap-x-0"
            style={{ "--d": "40ms" } as React.CSSProperties}
          >
            <div className="lg:col-span-3 lg:pr-10">
              <dt className="label">Role</dt>
              <dd className="mt-1.5">{profile.role}</dd>
            </div>
            <div className="lg:col-span-3 lg:pl-10">
              <dt className="label">Focus</dt>
              <dd className="mt-1.5">Agentic AI &amp; LLM systems</dd>
            </div>
            <div className="lg:col-span-3 lg:pl-10">
              <dt className="label">Currently</dt>
              <dd className="mt-1.5 flex items-center gap-2">
                <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" aria-hidden />
                {profile.current.company}
              </dd>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <dt className="label">Kolkata, India</dt>
              <dd className="mt-1.5 font-mono text-[0.82rem] tabular-nums">
                <LocalTime />
              </dd>
            </div>
          </dl>

          <div className="mt-12 md:mt-16">
            <Wordmark hostId="intro" />
          </div>

          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-14 lg:grid-cols-12 lg:gap-0">
            <p className="label fade-in hidden lg:col-span-3 lg:block lg:pr-10" style={{ "--d": "700ms" } as React.CSSProperties}>
              AI/ML Engineer
              <br />
              <span className="text-subtle/80">Est. 2023 — Kolkata</span>
            </p>
            <div className="lg:col-span-5 lg:pl-10 lg:pr-6">
              <p
                className="fade-in text-[clamp(1.3rem,2.05vw,1.7rem)] leading-[1.3] tracking-[-0.02em] text-balance [font-stretch:104%]"
                style={{ "--d": "760ms" } as React.CSSProperties}
              >
                I build agentic AI systems that hold up in production
                <span className="text-subtle">
                  {" "}
                  — multi-agent orchestration, RAG &amp; GraphRAG and enterprise automation on AWS Bedrock, with the
                  guardrails real financial workflows demand.
                </span>
              </p>
              <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "860ms" } as React.CSSProperties}>
                <ButtonLink href="#work" size="lg">
                  Selected work
                  <Icon name="arrow-right" size={16} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                </ButtonLink>
                <ButtonLink href={profile.links.resume} size="lg" variant="secondary">
                  Résumé
                  <Icon name="arrow-up-right" size={15} />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {/*
          Portrait: in flow on small screens; on desktop it stands on the stats rule in the
          right-hand columns, its head rising in front of the wordmark like a magazine cover.
        */}
        <div className="container-x pointer-events-none mt-12 flex h-[340px] justify-end sm:h-[420px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[530px] xl:h-[560px]">
          <figure className="portrait-in relative h-full">
            <div
              aria-hidden
              className="absolute -inset-x-[18%] bottom-[18%] top-[-4%] -z-10"
              style={{ background: "radial-gradient(closest-side, var(--portrait-halo), transparent)" }}
            />
            <Image
              src={PORTRAIT.src}
              alt={PORTRAIT.alt}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              preload
              sizes="(min-width: 1280px) 397px, (min-width: 1024px) 376px, (min-width: 640px) 298px, 241px"
              className="h-full w-auto select-none object-contain object-bottom"
              draggable={false}
            />
            <figcaption className="label absolute bottom-3 left-0 hidden -translate-x-[calc(100%+0.75rem)] whitespace-nowrap text-right sm:block">
              Fig. 01
              <br />
              <span className="text-fg">Anish Seth</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Proof row — the portrait stands on this rule */}
      <div className="relative z-[2]">
        <SectionRule />
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "flex flex-col-reverse justify-end py-7 md:py-9",
                  i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : "pr-5",
                  i >= 2 ? "border-t border-line lg:border-t-0" : "",
                  i === 2 ? "lg:border-l lg:pl-10" : "",
                  i === 1 ? "lg:pl-10" : "",
                  i === 3 ? "lg:pl-10" : "",
                ].join(" ")}
              >
                <dt className="label mt-3">{s.label}</dt>
                <dd className="text-[clamp(2.3rem,4.4vw,3.6rem)] font-medium leading-none tracking-[-0.045em] tabular-nums [font-stretch:112%]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
