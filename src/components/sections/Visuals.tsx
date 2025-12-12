"use client";

import { useCallback, useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsStory } from "@/components/visuals/SkillsStory";

export function Visuals({
  onHighlightProjects,
}: {
  onHighlightProjects: (ids: string[] | null) => void;
}) {
  const [activeIds, setActiveIds] = useState<string[] | null>(null);

  const setHighlight = useCallback(
    (ids: string[] | null) => {
      setActiveIds(ids);
      onHighlightProjects(ids);
    },
    [onHighlightProjects]
  );

  const hint = useMemo(() => {
    if (!activeIds?.length) return "";
    return `Highlighting ${activeIds.length} project(s) in Work.`;
  }, [activeIds]);

  return (
    <section id="visuals" className="border-t border-[color:var(--border)]">
      <Container className="py-16">
        <SectionHeading
          eyebrow="VISUALS"
          title="Skills → projects, as a story"
          description="A small scrollytelling sequence: hover or focus nodes to see the related projects. Keyboard controls included."
        />

        <div className="mt-10">
          <SkillsStory onHighlightProjects={setHighlight} />
          {hint ? (
            <p className="mt-3 text-sm text-[color:var(--text-2)]">{hint}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
