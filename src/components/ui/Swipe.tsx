"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SwipeProps = {
  as?: "div" | "ol" | "ul" | "dl";
  className?: string;
  children: ReactNode;
};

/**
 * Phones only: lays the children out as a swipeable row (each item leaves the next one peeking in)
 * with a slim progress bar underneath. From tablet width up it renders the element with its normal
 * classes and nothing else changes. The layout lives in the `.m-swipe` rules in globals.css.
 */
export function Swipe({ as = "div", className, children }: SwipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = el.scrollWidth - el.clientWidth;
        setActive(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <>
      <Tag ref={ref} className={cn("m-swipe", className)}>
        {children}
      </Tag>
      {count > 1 ? (
        <div aria-hidden className="m-swipe-bar">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} data-on={i === active ? "" : undefined} />
          ))}
        </div>
      ) : null}
    </>
  );
}
