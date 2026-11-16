"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("@/components/contact/ContactForm").then((m) => m.ContactForm), { ssr: false });

/**
 * The contact form sits at the very bottom of the page and only works with JavaScript anyway, so its
 * code loads when you scroll within ~800px of it. Until then an empty box of about the same height
 * holds its place (any difference resolves off-screen, so nothing visibly jumps).
 */
export function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={near ? undefined : "min-h-[540px]"}>
      {near ? <ContactForm /> : null}
    </div>
  );
}
