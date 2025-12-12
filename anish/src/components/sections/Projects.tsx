"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Projects({
  projects,
  highlightedIds,
  onClearHighlight,
}: {
  projects: Project[];
  highlightedIds: string[] | null;
  onClearHighlight: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(
    () => projects.find((p) => p.id === openId) ?? null,
    [openId, projects]
  );

  return (
    <section id="work" className="border-t border-[color:var(--border)]">
      <Container className="py-16">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="WORK"
            title="Selected projects"
            description="A focused set of projects with strong craft and clarity. (v0 uses placeholder content — swap with your LinkedIn/portfolio case studies.)"
          />
          {highlightedIds?.length ? (
            <button
              onClick={onClearHighlight}
              className="hidden text-sm text-[color:var(--text-2)] hover:text-[color:var(--text-0)] md:inline"
            >
              Clear highlight
            </button>
          ) : null}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => {
            const dim = highlightedIds?.length
              ? !highlightedIds.includes(p.id)
              : false;
            const glow = highlightedIds?.includes(p.id);

            return (
              <Reveal key={p.id} delay={idx * 0.04}>
                <button
                  onClick={() => setOpenId(p.id)}
                  className={cn(
                    "group h-full w-full rounded-2xl border bg-[color:var(--surface-1)] p-5 text-left transition",
                    "border-[color:var(--border)] hover:bg-[color:var(--surface-2)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]",
                    dim && "opacity-55",
                    glow && "border-[color:var(--accent)]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">
                        {p.period}
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-6 text-[color:var(--text-0)]">
                        {p.title}
                      </h3>
                    </div>
                    <span className="mt-1 rounded-lg bg-[color:var(--surface-2)] px-2 py-1 text-xs text-[color:var(--text-2)] group-hover:text-[color:var(--text-1)]">
                      View
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[color:var(--text-1)]">
                    {p.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-0)] px-2 py-1 text-xs text-[color:var(--text-2)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Dialog
          open={Boolean(active)}
          onClose={() => setOpenId(null)}
          className="relative z-[60]"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
              <DialogPanel className="w-full max-w-2xl rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-0)] p-6 shadow-lg">
                {active ? (
                  <>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">
                          {active.period}
                        </p>
                        <DialogTitle className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--text-0)]">
                          {active.title}
                        </DialogTitle>
                      </div>
                      <button
                        onClick={() => setOpenId(null)}
                        className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-1)] px-3 py-2 text-sm text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                      >
                        Close
                      </button>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[color:var(--text-1)]">
                      {active.tagline}
                    </p>

                    {active.links.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {active.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-[color:var(--surface-1)] px-3 py-2 text-sm text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    ) : null}

                    {active.highlights.length ? (
                      <ul className="mt-6 space-y-2 text-sm text-[color:var(--text-1)]">
                        {active.highlights.map((h) => (
                          <li key={h}>• {h}</li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-4">
                      <div className="prose prose-invert max-w-none text-sm leading-6">
                        <ReactMarkdown>
                          {active.body}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </>
                ) : null}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Container>
    </section>
  );
}
