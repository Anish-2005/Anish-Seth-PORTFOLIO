"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, type Variants } from "framer-motion";

import type { Note, Project } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Visuals } from "@/components/sections/Visuals";
import { ThreeShowcase } from "@/components/sections/ThreeShowcase";
import { Notes } from "@/components/sections/Notes";
import { Contact } from "@/components/sections/Contact";
import { OrnamentLayer } from "@/components/visuals/OrnamentLayer";
import { LightBackground } from "@/components/visuals/LightBackground";
import { DarkBackground } from "@/components/visuals/DarkBackground";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();

  const sectionColors = useMemo(() => {
    const dark = {
      top: "rgba(34, 211, 238, 0.22)",
      about: "rgba(94, 234, 212, 0.2)",
      work: "rgba(59, 130, 246, 0.22)",
      achievements: "rgba(251, 113, 133, 0.2)",
      visuals: "rgba(14, 165, 233, 0.24)",
      showcase: "rgba(56, 189, 248, 0.22)",
      notes: "rgba(244, 114, 182, 0.18)",
      contact: "rgba(190, 242, 100, 0.18)",
    } as const;
    const light = {
      top: "rgba(20, 184, 166, 0.16)",
      about: "rgba(59, 130, 246, 0.14)",
      work: "rgba(30, 64, 175, 0.14)",
      achievements: "rgba(211, 51, 51, 0.16)",
      visuals: "rgba(14, 165, 233, 0.16)",
      showcase: "rgba(6, 182, 212, 0.16)",
      notes: "rgba(236, 72, 153, 0.16)",
      contact: "rgba(101, 163, 13, 0.14)",
    } as const;
    return theme === "light" ? light : dark;
  }, [theme]);

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

  const SectionWrap = ({ index, children }: { index: number; children: React.ReactNode }) => {
    return (
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
  };

  return (
    <div className="relative min-h-screen isolate">
      {theme === "light" ? <LightBackground /> : <DarkBackground />}
      <OrnamentLayer />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-[-10%] top-[32%] h-64 -z-[5]"
        initial={{ opacity: 0, x: -60, skewX: -3 }}
        animate={{ opacity: 0.18, x: 0, skewX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(110deg, color-mix(in_oklab, var(--section-color) 90%, transparent) 0%, color-mix(in_oklab, var(--section-color) 65%, transparent) 30%, transparent 72%), radial-gradient(90% 180% at 60% 40%, color-mix(in_oklab, var(--section-color) 60%, transparent), transparent)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
          filter: "blur(10px)",
        }}
      />
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
          <motion.div onViewportEnter={() => setTone("achievements")}> 
            <Achievements />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={4}>
          <motion.div onViewportEnter={() => setTone("visuals")}>
            <Visuals onHighlightProjects={onHighlightProjects} />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={5}>
          <motion.div onViewportEnter={() => setTone("showcase")}> 
            <ThreeShowcase />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={6}>
          <motion.div onViewportEnter={() => setTone("notes")}> 
            <Notes notes={notes} />
          </motion.div>
        </SectionWrap>
        <SectionWrap index={7}>
          <motion.div onViewportEnter={() => setTone("contact")}> 
            <Contact />
          </motion.div>
        </SectionWrap>
      </main>
      <Footer />
    </div>
  );
}