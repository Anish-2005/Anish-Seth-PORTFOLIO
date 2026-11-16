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
      index="07"
      label="Contact"
      titleClassName="!text-[clamp(2.6rem,6.4vw,5.4rem)] !leading-[0.96] !tracking-[-0.045em]"
      title={
        <>
          Let&apos;s build something <span className="text-accent">reliable.</span>
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
          <ul className="border-t border-line">
            {socials.map((s) => (
              <li key={s.label} className="border-b border-line">
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
