"use client";

import { useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";

import type { Note, Project } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Visuals } from "@/components/sections/Visuals";
import { ThreeShowcase } from "@/components/sections/ThreeShowcase";
import { Notes } from "@/components/sections/Notes";
import { Contact } from "@/components/sections/Contact";

export function SinglePagePortfolio({
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

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 * i,
        duration: 0.52,
        ease: [0.2, 0.9, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const SectionWrap = ({ index, children }: { index: number; children: React.ReactNode }) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      custom={index}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative min-h-screen isolate">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-[color:var(--surface-0)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--text-0)] focus:ring-2 focus:ring-[color:var(--accent)]"
      >
        Skip to content
      </a>

      <Header />
      <main id="content">
        <SectionWrap index={0}>
          <Hero />
        </SectionWrap>
        <SectionWrap index={1}>
          <About />
        </SectionWrap>
        <SectionWrap index={2}>
          <Projects
            projects={projects}
            highlightedIds={highlightedIds}
            onClearHighlight={() => setHighlightedIds(null)}
          />
        </SectionWrap>
        <SectionWrap index={3}>
          <Visuals onHighlightProjects={onHighlightProjects} />
        </SectionWrap>
        <SectionWrap index={4}>
          <ThreeShowcase />
        </SectionWrap>
        <SectionWrap index={5}>
          <Notes notes={notes} />
        </SectionWrap>
        <SectionWrap index={6}>
          <Contact />
        </SectionWrap>
      </main>
      <Footer />
    </div>
  );
}