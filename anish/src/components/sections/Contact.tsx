"use client";

import { useMemo, useState } from "react";

import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const fallbackMailto = useMemo(() => {
    const to = siteConfig.sameAs.email.replace(/^mailto:/, "");
    return `mailto:${to}?subject=${encodeURIComponent(
      "Portfolio contact"
    )}&body=${encodeURIComponent("Hi Anish,%0D%0A%0D%0A")}`;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-[color:var(--border)]">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="CONTACT"
              title="Let’s build something clean"
              description="If you’re hiring or collaborating, send a short note. v0 includes a stub endpoint and a mailto fallback."
            />

            <div className="mt-6 text-sm text-[color:var(--text-1)]">
              <p>
                Prefer email?{" "}
                <a
                  className="text-[color:var(--text-0)] underline decoration-[color:var(--border)] underline-offset-4 hover:decoration-[color:var(--accent)]"
                  href={fallbackMailto}
                >
                  Open mail client
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[color:var(--text-1)]">
                  Name
                  <input
                    name="name"
                    required
                    className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)] px-3 text-[color:var(--text-0)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[color:var(--text-1)]">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)] px-3 text-[color:var(--text-0)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                  />
                </label>
              </div>

              <label className="mt-4 grid gap-2 text-sm text-[color:var(--text-1)]">
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)] px-3 py-2 text-[color:var(--text-0)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </Button>
                <p className="text-sm text-[color:var(--text-2)]">
                  {status === "sent"
                    ? "Sent (stub)."
                    : status === "error"
                      ? "Couldn’t send — use email fallback."
                      : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
