"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <div className="group flex w-full max-w-full items-stretch overflow-hidden rounded-2xl border border-line-strong bg-bg-elev transition-colors hover:border-[color-mix(in_oklab,var(--accent)_40%,var(--line-strong))]">
      <a
        href={`mailto:${email}`}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-4 sm:px-5"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-fg">
          <Icon name="mail" size={18} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.72rem] text-subtle">Email me directly</span>
          <span className="block truncate text-[1rem] font-medium tracking-tight sm:text-[1.08rem]">{email}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(email).then(() => setCopied(true), () => setCopied(false));
        }}
        className="flex shrink-0 items-center gap-2 border-l border-line px-4 text-[0.82rem] text-muted transition-colors hover:bg-bg-elev-2 hover:text-fg sm:px-5"
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        <Icon name={copied ? "check" : "copy"} size={16} className={copied ? "text-ok" : undefined} />
        <span className="hidden sm:inline" aria-live="polite">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </div>
  );
}
