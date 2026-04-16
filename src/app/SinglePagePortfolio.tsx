"use client";

import { useEffect, useMemo, useRef, useState, Suspense, lazy } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, type Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { useTheme } from "@/context/ThemeContext";

const About = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const Achievements = lazy(() => import("@/components/sections/Achievements").then(m => ({ default: m.Achievements })));
const GitHubStreak = lazy(() => import("@/components/sections/GitHubStreak").then(m => ({ default: m.GitHubStreak })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));
const OrnamentLayer = lazy(() => import("@/components/visuals/OrnamentLayer").then(m => ({ default: m.OrnamentLayer })));
const LightBackground = lazy(() => import("@/components/visuals/LightBackground").then(m => ({ default: m.LightBackground })));
const DarkBackground = lazy(() => import("@/components/visuals/DarkBackground").then(m => ({ default: m.DarkBackground })));

type LazySectionProps = {
  id: string;
  tone: string;
  index: number;
  minHeightClass: string;
  children: React.ReactNode;
  onTone: (nextTone: string) => void;
};

function LazySection({ id, tone, index, minHeightClass, children, onTone }: LazySectionProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const isNearViewport = useInView(hostRef, {
    margin: "260px 0px",
    once: true,
  });

  return (
    <section id={id} ref={hostRef} className={minHeightClass}>
      {isNearViewport ? (
        <SectionWrap index={index}>
          <motion.div onViewportEnter={() => onTone(tone)}>{children}</motion.div>
        </SectionWrap>
      ) : null}
    </section>
  );
}

// Section wrapper component for stagger animations
const SectionWrap = ({ index, children }: { index: number; children: React.ReactNode }) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 * i,
        duration: 0.52,
        ease: [0.2, 0.9, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

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

export function SinglePagePortfolio() {
  const [mounted, setMounted] = useState(false);
  const [allowVisuals, setAllowVisuals] = useState(false);
  const [tone, setTone] = useState<string>("top");
  const toneColor = useMotionValue<string>("rgba(34, 211, 238, 0.22)");
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback(() => setAllowVisuals(true), { timeout: 1200 })
        : null;
    const fallback = window.setTimeout(() => setAllowVisuals(true), 800);

    return () => {
      if (idle !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
      window.clearTimeout(fallback);
    };
  }, []);

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

  return (
    <div className="relative min-h-screen isolate">
      {mounted && allowVisuals && (
        <Suspense fallback={null}>
          {theme === "light" ? <LightBackground /> : <DarkBackground />}
        </Suspense>
      )}
      {allowVisuals ? (
        <Suspense fallback={null}>
          <OrnamentLayer />
        </Suspense>
      ) : null}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 md:inset-x-[-10%] top-[32%] h-64 -z-[5]"
        initial={{ opacity: 0, x: -60, skewX: -3 }}
        animate={{ opacity: 0.18, x: 0, skewX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(110deg, color-mix(in_oklab, var(--section-color) 90%, transparent) 0%, color-mix(in_oklab, var(--section-color) 65%, transparent) 30%, transparent 72%), radial-gradient(90% 180% at 60% 40%, color-mix(in_oklab, var(--section-color) 60%, transparent), transparent)",
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
        <Suspense fallback={null}>
          <LazySection
            id="about"
            tone="about"
            index={1}
            minHeightClass="min-h-[55vh]"
            onTone={setTone}
          >
            <About />
          </LazySection>
        </Suspense>
        <Suspense fallback={null}>
          <LazySection
            id="projects"
            tone="work"
            index={2}
            minHeightClass="min-h-[60vh]"
            onTone={setTone}
          >
            <Projects />
          </LazySection>
        </Suspense>
        <Suspense fallback={null}>
          <LazySection
            id="achievements"
            tone="achievements"
            index={3}
            minHeightClass="min-h-[45vh]"
            onTone={setTone}
          >
            <Achievements />
          </LazySection>
        </Suspense>
        <Suspense fallback={null}>
          <LazySection
            id="github-streak"
            tone="showcase"
            index={4}
            minHeightClass="min-h-[38vh]"
            onTone={setTone}
          >
            <GitHubStreak />
          </LazySection>
        </Suspense>
        <Suspense fallback={null}>
          <LazySection
            id="contact"
            tone="contact"
            index={5}
            minHeightClass="min-h-[52vh]"
            onTone={setTone}
          >
            <Contact />
          </LazySection>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}