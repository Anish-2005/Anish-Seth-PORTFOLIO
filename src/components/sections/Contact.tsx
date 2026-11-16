import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Icon, type IconName } from "@/components/ui/Icon";
import { profile } from "@/data/portfolio";

const socials: { label: string; handle: string; href: string; icon: IconName }[] = [
  { label: "LinkedIn", handle: "in/anishseth", href: profile.links.linkedin, icon: "linkedin" },
  { label: "GitHub", handle: "@Anish-2005", href: profile.links.github, icon: "github" },
  { label: "X", handle: "@AnishSeth170734", href: profile.links.x, icon: "x" },
  { label: "LeetCode", handle: "Anish_Seth", href: profile.links.leetcode, icon: "leetcode" },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-[-30%] left-1/2 h-[620px] w-[980px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
        />
      </div>
      <div className="container-x">
        <div className="mb-6 flex items-center gap-4" data-reveal>
          <span className="font-mono text-xs text-accent-ink">07</span>
          <span className="eyebrow">Contact</span>
          <span className="hairline flex-1" aria-hidden />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="display !text-[clamp(2.6rem,6vw,4.4rem)]" data-reveal>
              Let&apos;s build something <span className="serif-em">reliable.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.06rem] leading-relaxed text-muted text-pretty" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              Open to conversations about AI/ML engineering roles, agentic systems and ambitious products. I usually reply within a day.
            </p>

            <div className="mt-9" data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
              <CopyEmail email={profile.email} />
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2" data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 transition-colors hover:border-line-strong hover:bg-bg-elev"
                  >
                    <Icon name={s.icon} size={16} className="shrink-0 text-muted group-hover:text-fg" />
                    <span className="min-w-0">
                      <span className="block text-[0.84rem] font-medium">{s.label}</span>
                      <span className="block truncate text-[0.74rem] text-subtle">{s.handle}</span>
                    </span>
                    <Icon name="arrow-up-right" size={13} className="ml-auto shrink-0 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="card relative p-6 shadow-[var(--shadow-pop)] sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-[1.05rem] font-semibold tracking-tight">Send a message</p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-subtle">
                  <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" />
                  Usually replies in &lt; 24h
                </span>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
