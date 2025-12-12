"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useMemo(() => siteConfig.nav, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = latest > previous;
    setScrolled(latest > 8);

    if (latest < 32) {
      setHidden(false);
      return;
    }

    setHidden(goingDown);
  });

  return (
    <motion.header
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--surface-0),transparent_40%)]",
        scrolled
          ? "border-b border-[color:var(--border)]"
          : "border-b border-transparent"
      )}
      initial={false}
      animate={hidden ? { y: -72 } : { y: 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0.9, 0.3, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[color:var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--surface-2)] text-xs">
            AS
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[color:var(--text-1)] hover:bg-[color:var(--surface-1)] hover:text-[color:var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.resume.href}
            className="hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-1)] px-3 py-2 text-sm font-medium text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)] sm:inline-flex"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-lg bg-[color:var(--accent)] px-3 py-2 text-sm font-medium text-[color:var(--accent-contrast)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
