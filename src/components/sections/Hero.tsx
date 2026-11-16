import Image from "next/image";

import { Wordmark } from "@/components/hero/Wordmark";
import { SectionRule } from "@/components/site/Frame";
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
      <div aria-hidden className="under-header pointer-events-none absolute inset-0 -z-10">
        <div className="dots absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_92%)]" />
        <div className="dots-accent absolute inset-0 opacity-80" />
      </div>

      <div className="relative">
        <div className="container-x lg:pb-24">
          <div className="mt-8 md:mt-14">
            <Wordmark hostId="intro" />
          </div>

          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-14 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-7 lg:pr-10">
              <p
                className="fade-in text-[clamp(1.3rem,2.05vw,1.7rem)] leading-[1.3] tracking-[-0.02em] text-balance [font-stretch:104%]"
                style={{ "--d": "760ms" } as React.CSSProperties}
              >
                I build AI agents that do real work with real data.
                <span className="text-subtle">
                  {" "}
                  Right now that&apos;s at Digital Alpha, mostly in Python on AWS Bedrock, and I care a lot about what
                  happens when things go wrong.
                </span>
              </p>
              <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "860ms" } as React.CSSProperties}>
                <ButtonLink href="#work" size="lg">
                  See my work
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
        <div className="container-x pointer-events-none mt-12 flex h-[340px] justify-end sm:h-[420px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[430px] xl:h-[460px]">
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
              sizes="(min-width: 1280px) 326px, (min-width: 1024px) 305px, (min-width: 640px) 298px, 241px"
              className="h-full w-auto select-none object-contain object-bottom"
              draggable={false}
            />
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
