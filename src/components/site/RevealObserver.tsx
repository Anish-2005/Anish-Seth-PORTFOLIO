"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const reveal = (n: Element) => n.setAttribute("data-revealed", ""); // an attribute, so React re-renders never clear it

/**
 * IntersectionObservers for every `[data-reveal]` element on the page.
 * Sections stay server components; they only opt in with a data attribute.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed]), .rule:not([data-revealed])"),
    );
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(reveal);
      return;
    }

    // Section titles start fully clipped (for the wipe-in), and a fully clipped element never
    // counts as visible. So each title is revealed through its parent, as soon as the top of
    // that parent comes into view (any threshold above 0 can be unreachable for a tall parent).
    const titles = new Map<Element, HTMLElement[]>();
    const others: HTMLElement[] = [];
    for (const n of nodes) {
      if (n.classList.contains("title") && n.parentElement) titles.set(n.parentElement, [...(titles.get(n.parentElement) ?? []), n]);
      else others.push(n);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const titleIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          titles.get(entry.target)?.forEach(reveal);
          titleIo.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    others.forEach((n) => io.observe(n));
    titles.forEach((_, parent) => titleIo.observe(parent));
    return () => {
      io.disconnect();
      titleIo.disconnect();
    };
  }, [pathname]);

  return null;
}
