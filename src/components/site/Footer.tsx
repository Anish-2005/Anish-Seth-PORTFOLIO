import Link from "next/link";

import { LocalTime } from "@/components/site/LocalTime";
import { LogoMark } from "@/components/site/Logo";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/portfolio";
import { siteConfig } from "@/lib/site.config";

const columns = [
  {
    title: "Sections",
    links: siteConfig.nav.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Pages",
    links: [
      { label: "Case studies", href: "/projects" },
      { label: "Notes", href: "/notes" },
      { label: "About", href: "/about" },
      { label: "Résumé (PDF)", href: profile.links.resume },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: profile.links.github },
      { label: "LinkedIn", href: profile.links.linkedin },
      { label: "X / Twitter", href: profile.links.x },
      { label: "Instagram", href: profile.links.instagram },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="font-semibold tracking-tight">{profile.name}</p>
              <p className="text-[0.8rem] text-subtle">{siteConfig.shortRole}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-muted">
            Agentic AI, LLM systems and full-stack products — engineered for production.
          </p>
          <p className="mt-5 flex items-center gap-2 font-mono text-[0.75rem] text-subtle">
            <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" />
            {profile.location} · <LocalTime />
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const ext = l.href.startsWith("http");
                  const cls = "inline-flex items-center gap-1 text-[0.88rem] text-muted transition-colors hover:text-fg";
                  return (
                    <li key={l.label}>
                      {ext || l.href.endsWith(".pdf") ? (
                        <a href={l.href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {l.label}
                          {ext ? <Icon name="arrow-up-right" size={12} className="text-subtle" /> : null}
                        </a>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-[0.8rem] text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. Designed &amp; engineered in Kolkata.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top <Icon name="arrow-up" size={13} />
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="container-x -mb-[0.2em] whitespace-nowrap text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
          Anish Seth
        </p>
      </div>
    </footer>
  );
}
