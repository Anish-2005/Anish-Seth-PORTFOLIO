"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

// Underlined fields: an accent rule draws across on focus.
const field =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-2.5 text-[1rem] text-fg outline-none transition-[border-color] duration-300 placeholder:text-subtle/70 focus:border-accent aria-[invalid=true]:border-accent";
const labelCls = "label block";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const nextInvalid = {
      name: !data.name?.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? ""),
      message: (data.message ?? "").trim().length < 10,
    };
    setInvalid(nextInvalid);
    if (Object.values(nextInvalid).some(Boolean)) {
      setError("Please add your name, a valid email and a short message (10+ characters).");
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(`${err instanceof Error ? err.message : "Something went wrong"}. You can also email me directly.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center border-t border-line pt-10" role="status">
        <span className="grid size-12 place-items-center border border-line-strong text-ok">
          <Icon name="check" size={26} strokeWidth={2.2} />
        </span>
        <p className="mt-6 text-[1.4rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">Message sent</p>
        <p className="mt-2 max-w-xs text-[0.92rem] text-muted">Thanks for reaching out — I&apos;ll get back to you within a day or two.</p>
        <button type="button" onClick={() => setStatus("idle")} className="link-u mt-6 text-[0.88rem] text-fg">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-8" aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <input id="cf-name" name="name" autoComplete="name" placeholder="Your name" maxLength={120} aria-invalid={invalid.name || undefined} className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={200}
            aria-invalid={invalid.email || undefined}
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="What are you building?"
          maxLength={5000}
          aria-invalid={invalid.message || undefined}
          className={cn(field, "resize-none")}
        />
      </div>
      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p id="form-error" role="alert" className="text-[0.86rem] text-accent-ink">
          {error}
        </p>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <p className="label">Goes straight to my inbox</p>
        <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Icon name="send" size={15} className="transition-transform group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
