"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, type Variants } from "framer-motion";

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
import { OrnamentLayer } from "@/components/visuals/OrnamentLayer";

export function SinglePagePortfolio({
  projects,
  notes,
}: {
  projects: Project[];
  notes: Note[];
}) {
  const [highlightedIds, setHighlightedIds] = useState<string[] | null>(null);
  const [tone, setTone] = useState<string>("top");
  const toneColor = useMotionValue<string>("rgba(34, 211, 238, 0.22)");
  const toneParallax = useMotionValue<number>(1);

  const sectionColors = useMemo(
    () => ({
      top: "rgba(34, 211, 238, 0.22)",
      about: "rgba(94, 234, 212, 0.2)",
      work: "rgba(59, 130, 246, 0.22)",
      visuals: "rgba(14, 165, 233, 0.24)",
      showcase: "rgba(56, 189, 248, 0.22)",
      notes: "rgba(244, 114, 182, 0.18)",
      contact: "rgba(190, 242, 100, 0.18)",
    }),
    []
  );

  const onHighlightProjects = useCallback((ids: string[] | null) => {
    setHighlightedIds(ids);
  }, []);

  useEffect(() => {
    const target = sectionColors[tone as keyof typeof sectionColors] ?? sectionColors.top;
    const controls = animate(toneColor, target, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [sectionColors, tone, toneColor]);

  useMotionValueEvent(toneColor, "change", (latest) => {
    document.documentElement.style.setProperty("--section-color", latest);
  });

  useEffect(() => {
    const map: Record<string, number> = {
      top: 1,
      about: 0.92,
      work: 1.15,
      visuals: 1.05,
      showcase: 1.1,
      notes: 0.95,
      contact: 1,
    };
    const target = map[tone] ?? 1;
    const controls = animate(toneParallax, target, {
      duration: 0.9,
      ease: [0.25, 1, 0.35, 1],
    });
    return controls.stop;
  }, [tone, toneParallax]);

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
      <OrnamentLayer parallaxScale={toneParallax} />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-[color:var(--surface-0)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--text-0)] focus:ring-2 focus:ring-[color:var(--accent)]"
      >
        Skip to content
      </a>

      <Header />
      <main id="content">
        <SectionWrap index={0}>
          <motion.div onViewportEnter={() => setTone("top")}> 
            <Hero />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={1}>
          <motion.div onViewportEnter={() => setTone("about")}> 
            <About />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={2}>
          <motion.div onViewportEnter={() => setTone("work")}> 
            <Projects
              projects={projects}
              highlightedIds={highlightedIds}
              onClearHighlight={() => setHighlightedIds(null)}
            />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={3}>
          <motion.div onViewportEnter={() => setTone("visuals")}>
            <Visuals onHighlightProjects={onHighlightProjects} />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={4}>
          <motion.div onViewportEnter={() => setTone("showcase")}> 
            <ThreeShowcase />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={5}>
          <motion.div onViewportEnter={() => setTone("notes")}> 
            <Notes notes={notes} />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={6}>
          <motion.div onViewportEnter={() => setTone("contact")}> 
            <Contact />
          </motion.div>
        </SectionWrap>
      </main>
      <Footer />
    </div>
  );
}