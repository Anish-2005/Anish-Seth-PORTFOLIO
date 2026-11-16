import Image from "next/image";

import { LocalTime } from "@/components/site/LocalTime";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education, principles, profile } from "@/data/portfolio";

const facts: { label: string; value: string; icon: IconName }[] = [
  { label: "Currently", value: `${profile.current.title}, ${profile.current.company}`, icon: "branch" },
  { label: "Focus", value: "Agentic AI · LLM systems · Automation", icon: "spark" },
  { label: "Education", value: education[0].degree.replace("B.Tech, ", "B.Tech — "), icon: "cap" },
  { label: "Based in", value: profile.location, icon: "pin" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-x">
        <SectionHeader
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Engineering AI that <span className="serif-em">earns trust.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait */}
          <figure className="lg:col-span-5" data-reveal>
            <div className="group card relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.6rem] p-0 lg:max-w-none">
              <Image
                src="/profile.jpg"
                alt="Anish Seth, AI/ML engineer, photographed outdoors in Kolkata"
                fill
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 448px, 100vw"
                className="object-cover object-[50%_30%] transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] [filter:saturate(0.85)_contrast(1.03)] group-hover:scale-[1.02] group-hover:[filter:saturate(1)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,color-mix(in_oklab,var(--bg)_88%,transparent))]"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line-strong bg-[var(--bg-glass)] px-4 py-3 backdrop-blur-md">
                <span className="flex items-center gap-2 text-[0.82rem] font-medium">
                  <Icon name="pin" size={15} className="text-accent-ink" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.72rem] text-muted">
                  <Icon name="clock" size={13} />
                  <LocalTime />
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Story */}
          <div className="flex flex-col lg:col-span-7">
            <div className="space-y-5 text-[1.08rem] leading-[1.75] text-muted text-pretty md:text-[1.15rem]">
              {profile.intro.map((p, i) => (
                <p key={i} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className={i === 0 ? "text-fg" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" data-reveal>
              {facts.map((f) => (
                <div key={f.label} className="flex gap-3.5 bg-bg-elev px-5 py-4">
                  <Icon name={f.icon} size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                  <div className="min-w-0">
                    <dt className="eyebrow !text-[0.65rem]">{f.label}</dt>
                    <dd className="mt-1 text-[0.92rem] leading-snug text-fg">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-10" data-reveal>
              <p className="eyebrow mb-4">Education</p>
              <ol className="space-y-3">
                {education.map((e) => (
                  <li key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-line pb-3 last:border-0">
                    <span className="text-[0.95rem] text-fg">
                      {e.degree} <span className="text-subtle">· {e.school}</span>
                    </span>
                    <span className="font-mono text-xs text-subtle">{e.period}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-20">
          <div className="mb-8 flex items-center gap-4" data-reveal>
            <h3 className="text-xl font-semibold tracking-tight">How I build</h3>
            <span className="hairline flex-1" aria-hidden />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                data-spotlight
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                className="card p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg-elev-2 text-accent-ink">
                  <Icon name={p.icon as IconName} size={18} />
                </span>
                <h4 className="mt-5 text-[1.02rem] font-semibold tracking-tight">{p.title}</h4>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
