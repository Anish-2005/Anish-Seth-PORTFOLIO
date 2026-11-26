"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { siteConfig } from "@/lib/site.config";
import { profile } from "@/data/profile";
import { useLite } from "@/lib/lite";
import { cn } from "@/lib/utils";

export const OPEN_COMMAND_EVENT = "open-command-palette";

const isHeaderless = (pathname: string) => pathname === "/photography" || pathname.startsWith("/photography/");

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lite = useLite();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking (home only).
  useEffect(() => {
    if (!isHome) return;
    const ids = siteConfig.nav.map((n) => n.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const button = menuButtonRef.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  useEffect(() => {
    // Close the sheet whenever the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // The gallery stands on its own, without the header. Breadcrumbs and the footer lead back.
  if (isHeaderless(pathname)) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-[var(--bg-glass)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6">
          <Logo prefetch={isHome || lite ? false : undefined} />

          <ul className="hidden items-center gap-7 md:flex">
            {siteConfig.nav.map((item, i) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id} className="nav-in" style={{ "--d": `${260 + i * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    prefetch={lite || (isHome && item.href.startsWith("/#")) ? false : undefined}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group/nav relative flex items-baseline gap-1.5 text-[0.86rem] transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-accent transition-[width] duration-500 ease-[var(--ease-out-expo)]",
                        isActive ? "w-full" : "w-0 group-hover/nav:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-in flex items-center gap-1" style={{ "--d": "640ms" } as React.CSSProperties}>
            <ThemeToggle />
            <a
              href={profile.links.resume}
              className="group hidden h-8 items-center gap-1.5 pl-2 text-[0.86rem] text-fg sm:inline-flex"
            >
              <span className="link-u">Résumé</span>
              <Icon name="arrow-up-right" size={13} className="text-accent-ink transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid size-9 place-items-center text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-bg pt-20 transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  "border-b border-line transition-all duration-700 ease-[var(--ease-out-expo)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  prefetch={lite || (isHome && item.href.startsWith("/#")) ? false : undefined}
                  onClick={() => setOpen(false)}
                  className="group/m flex items-center justify-between py-5 text-[2rem] font-semibold tracking-[-0.03em] [font-stretch:112%]"
                >
                  {item.label}
                  <span aria-hidden className="size-1.5 rounded-full bg-accent opacity-0 transition-opacity group-hover/m:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-4 pb-10 pt-8">
            <ButtonLink href={profile.links.resume} size="lg" className="w-full">
              Download résumé <Icon name="download" size={16} />
            </ButtonLink>
            <div className="flex items-center justify-center gap-2">
              {[
                { href: profile.links.github, icon: "github" as const, label: "GitHub" },
                { href: profile.links.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
                { href: profile.links.x, icon: "x" as const, label: "X" },
                { href: `mailto:${profile.email}`, icon: "mail" as const, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid size-11 place-items-center border border-line text-muted hover:text-fg"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
