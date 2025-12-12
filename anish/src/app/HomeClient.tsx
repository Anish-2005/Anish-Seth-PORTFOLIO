"use client";

import { useCallback, useState } from "react";

import type { Note, Project } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Visuals } from "@/components/sections/Visuals";
import { Notes } from "@/components/sections/Notes";
import { Contact } from "@/components/sections/Contact";

export function HomeClient({
  projects,
  notes,
}: {
  projects: Project[];
  notes: Note[];
}) {
  const [highlightedIds, setHighlightedIds] = useState<string[] | null>(null);

  const onHighlightProjects = useCallback((ids: string[] | null) => {
    setHighlightedIds(ids);
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--surface-0)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-[color:var(--surface-0)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--text-0)] focus:ring-2 focus:ring-[color:var(--accent)]"
      >
        Skip to content
      </a>

      <Header />
      <main id="content">
        <Hero />
        <About />
        <Projects
          projects={projects}
          highlightedIds={highlightedIds}
          onClearHighlight={() => setHighlightedIds(null)}
        />
        <Visuals onHighlightProjects={onHighlightProjects} />
        <Notes notes={notes} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
