"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full rounded-xl border border-line bg-bg px-4 pb-2.5 pt-6 text-[0.95rem] text-fg outline-none transition-[border-color,box-shadow] placeholder:text-transparent focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] aria-[invalid=true]:border-accent";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-[0.92rem] text-subtle transition-all duration-200 peer-focus:top-2 peer-focus:text-[0.7rem] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem]";

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
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--ok)_16%,transparent)] text-ok">
          <Icon name="check" size={26} strokeWidth={2.2} />
        </span>
        <p className="mt-5 text-xl font-semibold tracking-tight">Message sent</p>
        <p className="mt-2 max-w-xs text-[0.92rem] text-muted">Thanks for reaching out — I&apos;ll get back to you within a day or two.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[0.86rem] text-accent-ink underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4" aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="cf-name" name="name" autoComplete="name" placeholder="Name" maxLength={120} aria-invalid={invalid.name || undefined} className={field} />
          <label htmlFor="cf-name" className={label}>
            Name
          </label>
        </div>
        <div className="relative">
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            maxLength={200}
            aria-invalid={invalid.email || undefined}
            className={field}
          />
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
        </div>
      </div>
      <div className="relative">
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          placeholder="Message"
          maxLength={5000}
          aria-invalid={invalid.message || undefined}
          className={cn(field, "resize-none")}
        />
        <label htmlFor="cf-message" className={label}>
          What are you building?
        </label>
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
        <p className="text-[0.8rem] text-subtle">Goes straight to my inbox. No newsletters, ever.</p>
        <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-accent-fg/30 border-t-accent-fg" aria-hidden />
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
