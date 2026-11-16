import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/portfolio";

const socials = [
  { label: "LinkedIn", handle: "in/anishseth", href: profile.links.linkedin },
  { label: "GitHub", handle: "@Anish-2005", href: profile.links.github },
  { label: "X", handle: "@AnishSeth170734", href: profile.links.x },
  { label: "LeetCode", handle: "Anish_Seth", href: profile.links.leetcode },
];

export function Contact() {
  return (
    <Section
      id="contact"
      motif="mark"
      index="07"
      label="Contact"
      titleClassName="!text-[clamp(2.6rem,6.4vw,5.4rem)] !leading-[0.96] !tracking-[-0.045em]"
      title={
        <>
          Got an idea?{" "}
          <span className="relative inline-block whitespace-nowrap">
            Let&apos;s talk.
            {/* Signature trace — the logo's stroke-and-node, drawn under the promise. */}
            <svg
              aria-hidden
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.28em] w-[96%] overflow-visible"
            >
              <path
                className="swash-path"
                pathLength={1}
                d="M4 18 C 60 27, 110 7, 170 14 S 262 25, 288 10"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span aria-hidden className="swash-node absolute -bottom-[0.07em] left-[calc(92%-0.07em)] size-[0.14em] rounded-full bg-accent" />
          </span>
        </>
      }
    >
      <div data-reveal>
        <CopyEmail email={profile.email} />
      </div>

      <div className="mt-16 grid gap-14 border-t border-line pt-10 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-12">
        <div data-reveal>
          <ContactForm />
        </div>

        <div data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          <p className="label mb-3">Elsewhere</p>
          <ul className="grid grid-cols-2 border-t border-line md:block">
            {socials.map((s) => (
              <li key={s.label} className="border-b border-line odd:pr-4 even:border-l even:pl-4 md:odd:pr-0 md:even:border-l-0 md:even:pl-0">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 py-3.5 transition-[padding] duration-500 ease-[var(--ease-out-expo)] hover:pl-1.5"
                >
                  <span>
                    <span className="block text-[0.95rem]">{s.label}</span>
                    <span className="block font-mono text-[0.72rem] text-subtle">{s.handle}</span>
                  </span>
                  <Icon
                    name="arrow-up-right"
                    size={15}
                    className="text-subtle transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
