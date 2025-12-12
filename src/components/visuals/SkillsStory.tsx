"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { SkillsMode } from "@/components/visuals/skills.types";
import { SkillsRadial } from "@/components/visuals/SkillsRadial";
import { cn } from "@/lib/utils";

const steps: Array<{
  id: string;
  title: string;
  body: string;
  mode: SkillsMode;
}> = [
  {
    id: "distribution",
    title: "Distribution",
    body: "A quick overview of how my skills cluster. Hover to preview; use the keyboard to explore.",
    mode: "distribution",
  },
  {
    id: "mapping",
    title: "Mapping",
    body: "Each node maps to projects. Selecting a skill highlights related work above.",
    mode: "mapping",
  },
  {
    id: "impact",
    title: "Impact",
    body: "A placeholder for measurable outcomes (v1: users, latency, reliability).",
    mode: "impact",
  },
];

export function SkillsStory({
  onHighlightProjects,
}: {
  onHighlightProjects: (ids: string[] | null) => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const mode = useMemo(() => steps[activeStep]?.mode ?? "distribution", [activeStep]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.idx ?? "0");
        setActiveStep(idx);
      },
      { threshold: [0.55, 0.65, 0.75], rootMargin: "-20% 0px -20% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-7">
        <div
          className="sticky top-24"
          aria-label="Skills visualization"
        >
          <SkillsRadial mode={mode} onHighlightProjects={onHighlightProjects} />
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="space-y-4">
          {steps.map((s, idx) => {
            const active = idx === activeStep;
            return (
              <div
                key={s.id}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                data-idx={idx}
                className={cn(
                  "rounded-2xl border p-5",
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--surface-2)]"
                    : "border-[color:var(--border)] bg-[color:var(--surface-1)]"
                )}
              >
                <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">
                  Step {idx + 1}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[color:var(--text-0)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-1)]">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveStep(idx);
                stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm",
                idx === activeStep
                  ? "border-[color:var(--accent)] bg-[color:var(--surface-2)] text-[color:var(--text-0)]"
                  : "border-[color:var(--border)] bg-[color:var(--surface-1)] text-[color:var(--text-1)] hover:bg-[color:var(--surface-2)]"
              )}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
