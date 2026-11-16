"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";

/** The email address as the section's hero link, with a quiet copy action beside it. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.35rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.035em] [font-stretch:108%]"
      >
        <span className="link-u min-w-0 truncate pb-1">{email}</span>
        <Icon
          name="arrow-up-right"
          size={28}
          strokeWidth={1.5}
          className="shrink-0 text-accent-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(email).then(
            () => setCopied(true),
            () => setCopied(false),
          );
        }}
        className="mb-1 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-subtle transition-colors hover:text-fg"
      >
        <Icon name={copied ? "check" : "copy"} size={13} className={copied ? "text-ok" : undefined} />
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
