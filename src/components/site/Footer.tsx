import Link from "next/link";

import { SectionRule } from "@/components/site/Frame";
import { Lockup } from "@/components/site/Logo";
import { profile } from "@/data/portfolio";

const links = [
  { label: "Projects", href: "/projects" },
  // Not just "About": the nav's "About" goes to the home section, this one to the full page.
  { label: "About me", href: "/about" },
  { label: "Résumé", href: profile.links.resume },
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "X", href: profile.links.x },
];

/** One quiet row: identity, a few links, copyright. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[1]">
      <SectionRule />
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <Lockup />

        <nav aria-label="Footer">
          <ul className="grid grid-cols-3 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-y-2">
            {links.map((l) => {
              const ext = l.href.startsWith("http");
              const cls = "link-u text-[0.88rem] text-muted transition-colors hover:text-fg";
              return (
                <li key={l.label}>
                  {ext || l.href.endsWith(".pdf") ? (
                    <a href={l.href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {l.label}
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
        </nav>

        <p className="label">© {year} {profile.name}</p>
      </div>
    </footer>
  );
}
