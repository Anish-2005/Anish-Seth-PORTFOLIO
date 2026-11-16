import Link from "next/link";

import { SectionRule } from "@/components/site/Frame";
import { LocalTime } from "@/components/site/LocalTime";
import { LogoMark } from "@/components/site/Logo";
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

function StaticWordmark() {
  const words = ["Anish", "Seth"];
  return (
    <p
      aria-hidden
      className="wordmark wordmark-static select-none bg-gradient-to-b from-[var(--line-strong)] to-transparent bg-clip-text pb-[0.04em] text-transparent"
    >
      {words.map((word, w) => (
        <span key={word} className="wordmark-word">
          {word.split("").map((ch, c) => (
            <span key={c} data-ch>
              {ch}
            </span>
          ))}
          {w === 0 ? <span data-space /> : null}
        </span>
      ))}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[1]">
      <SectionRule />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-3 lg:pr-10">
          <div className="flex items-center gap-3">
            <LogoMark />
            <p className="font-semibold tracking-[-0.01em] [font-stretch:108%]">{profile.name}</p>
          </div>
          <p className="mt-5 max-w-[16rem] text-[0.9rem] leading-relaxed text-muted">
            Agentic AI, LLM systems and full-stack products — engineered for production.
          </p>
          <p className="label mt-6 flex items-center gap-2">
            <span className="pulse-dot size-1.5 rounded-full bg-ok text-ok" aria-hidden />
            Kolkata · <LocalTime />
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:pl-10">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const ext = l.href.startsWith("http");
                  const cls = "link-u text-[0.9rem] text-muted transition-colors hover:text-fg";
                  return (
                    <li key={l.label}>
                      {ext || l.href.endsWith(".pdf") ? (
                        <a href={l.href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {l.label}
                          {ext ? " ↗" : ""}
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

      <div className="container-x overflow-hidden">
        <StaticWordmark />
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-3 border-t border-line py-6 sm:flex-row sm:items-center">
        <p className="label">
          © {year} {profile.name} — Designed &amp; engineered in Kolkata
        </p>
        <a href="#top" className="label link-u hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
