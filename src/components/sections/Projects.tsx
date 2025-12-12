"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/types";

// Showcase projects with impactful visuals
const showcaseProjects = [
  {
    id: "lawai",
    title: "LawAI Mobile",
    subtitle: "AI-Powered Legal Assistant",
    description: "Smart India Hackathon 2024 Finalist - Democratizing legal knowledge through AI. Features intelligent FIR builder, comprehensive legal database, AI lawyer consultation, and document management.",
    impact: "Making legal assistance accessible to 1.4 billion Indians",
    tech: ["React Native", "Expo", "AI/ML", "Legal Tech"],
    metrics: { users: "1000+", stars: "7", status: "SIH 2024 Finalist" },
    link: "https://github.com/Anish-2005/LawAI-Mobile",
    image: "/placeholder-lawai.svg",
    featured: true
  },
  {
    id: "nyantra",
    title: "Nyantra",
    subtitle: "DBT Social Assistance Platform",
    description: "Comprehensive welfare management system for SC/ST benefits. Features applicant dashboards, ML-powered analytics, automated disbursements, and grievance handling for efficient resource allocation.",
    impact: "Streamlining social assistance for millions",
    tech: ["Next.js", "TypeScript", "ML", "Analytics"],
    metrics: { status: "In Development", category: "Social Impact" },
    link: "https://github.com/Anish-2005/Nyantra",
    image: "/placeholder-nyantra.svg",
    featured: true
  },
  {
    id: "ticketing",
    title: "Smart Ticketing System",
    subtitle: "AI Chatbot for Museums",
    description: "Smart India Hackathon 2024 - Revolutionary ticketing platform with Google Dialogflow chatbot, real-time seat management, PWA capabilities, secure payments, and advanced analytics.",
    impact: "Enhancing visitor experience through AI",
    tech: ["React", "FastAPI", "MongoDB", "Dialogflow"],
    metrics: { status: "SIH 2024", stars: "1" },
    link: "https://github.com/Anish-2005/Online-Chatbot-Based-Ticketing-System",
    image: "/placeholder-ticket.svg",
    featured: true
  },
  {
    id: "agrilink",
    title: "AgriLink",
    subtitle: "Blockchain Waste-to-Wealth",
    description: "Transforming agricultural waste into valuable resources through Aptos blockchain. Connects farmers with industries, creating sustainable circular economy with transparent marketplace.",
    impact: "Building sustainable agriculture ecosystem",
    tech: ["Next.js", "Web3", "Aptos", "Blockchain"],
    metrics: { status: "Launched", category: "Blockchain" },
    link: "https://github.com/Anish-2005/AgriLink",
    image: "/placeholder-agri.svg",
    featured: false
  },
  {
    id: "careersync",
    title: "CareerSync",
    subtitle: "AI Career Intelligence",
    description: "Next-gen career platform with AI-powered job matching, intelligent resume builder, real-time analytics, skill gap analysis, and personalized career roadmaps for professional growth.",
    impact: "Empowering career decisions with AI",
    tech: ["Next.js", "React", "MongoDB", "Firebase"],
    metrics: { status: "Production", category: "AI" },
    link: "https://github.com/Anish-2005/CareerSync",
    image: "/placeholder-career.svg",
    featured: false
  },
  {
    id: "medradar",
    title: "MedRadar",
    subtitle: "Hospital Resource Optimizer",
    description: "Healthcare resource management for Tier 2/3 hospitals. Real-time monitoring, predictive analytics, automated procurement, and comprehensive dashboards for efficient operations.",
    impact: "Optimizing healthcare in underserved areas",
    tech: ["Next.js", "Tailwind", "Analytics", "CivicAuth"],
    metrics: { status: "Production", category: "Healthcare" },
    link: "https://github.com/Anish-2005/MedRadar",
    image: "/placeholder-med.svg",
    featured: false
  }
];

export function Projects(_props: {
  projects: Project[];
  highlightedIds: string[] | null;
  onClearHighlight: () => void;
}) {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(showcaseProjects[0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const palette = useMemo(() => {
    if (theme === "light") {
      return {
        accent: "rgba(211, 51, 51, 0.12)",
        accentStrong: "rgba(211, 51, 51, 0.25)",
        glow: "rgba(211, 51, 51, 0.4)",
        cardBg: "rgba(250, 229, 226, 0.6)",
        cardBorder: "rgba(211, 51, 51, 0.18)",
        glassBg: "rgba(255, 255, 255, 0.7)",
        text: "#2c1810",
        textSub: "#6b4a3a",
        highlight: "#d73333"
      };
    }
    return {
      accent: "rgba(248, 113, 113, 0.1)",
      accentStrong: "rgba(248, 113, 113, 0.22)",
      glow: "rgba(248, 113, 113, 0.35)",
      cardBg: "rgba(15, 6, 11, 0.7)",
      cardBorder: "rgba(248, 113, 113, 0.12)",
      glassBg: "rgba(15, 6, 11, 0.8)",
      text: "#fef2f2",
      textSub: "#fca5a5",
      highlight: "#fb7185"
    };
  }, [theme]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden border-t py-16 sm:py-20 md:py-24 lg:py-32"
      style={{ borderColor: palette.cardBorder }}
    >
      {/* Cinematic background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          opacity,
          background: `
            radial-gradient(1200px 900px at 50% 20%, ${palette.accent}, transparent 70%),
            radial-gradient(800px 600px at 80% 60%, ${palette.accentStrong}, transparent 65%)
          `
        }}
      />

      {/* Animated mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${palette.cardBorder} 0, ${palette.cardBorder} 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, ${palette.cardBorder} 0, ${palette.cardBorder} 1px, transparent 1px, transparent 60px)
          `
        }}
      />

      <Container>
        <motion.div style={{ opacity, y }}>
          {/* Enhanced Section Header */}
          <div className="relative">
            {/* Floating orb accent */}
            <motion.div
              className="pointer-events-none absolute -left-20 -top-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: palette.glow }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Eyebrow with animated underline */}
              <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-4">
                <motion.div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to right, transparent, ${palette.cardBorder}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]"
                  style={{ color: palette.highlight }}
                >
                  Portfolio
                </span>
                <motion.div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to left, transparent, ${palette.cardBorder}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>

              {/* Main Title */}
              <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span style={{ color: palette.text }}>Building the </span>
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${palette.highlight}, ${palette.textSub})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Future
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 rounded-full"
                    style={{ background: palette.highlight }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                <span style={{ color: palette.text }}>,<br />One Innovation at a Time</span>
              </h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mx-auto mt-4 sm:mt-6 max-w-3xl text-center text-sm leading-relaxed sm:text-base md:text-lg"
                style={{ color: palette.textSub }}
              >
                Award-winning projects spanning{" "}
                <span className="font-semibold" style={{ color: palette.text }}>AI, blockchain, and social impact</span>
                {" "}— transforming ideas into scalable solutions that solve real-world problems and empower millions.
              </motion.p>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mx-auto mt-6 sm:mt-10 flex max-w-2xl items-center justify-center gap-4 sm:gap-8 md:gap-12 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl"
                style={{
                  background: palette.cardBg,
                  border: `1px solid ${palette.cardBorder}`
                }}
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: palette.highlight }}>50+</div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs uppercase tracking-wider opacity-70" style={{ color: palette.text }}>Projects</div>
                </div>
                <div className="h-8 sm:h-10 w-px" style={{ background: palette.cardBorder }} />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: palette.highlight }}>3</div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs uppercase tracking-wider opacity-70" style={{ color: palette.text }}>Hackathon Wins</div>
                </div>
                <div className="h-8 sm:h-10 w-px" style={{ background: palette.cardBorder }} />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: palette.highlight }}>10+</div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs uppercase tracking-wider opacity-70" style={{ color: palette.text }}>Technologies</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Main Showcase - Split View */}
          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Left: Active Project Display */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl"
              style={{
                background: palette.glassBg,
                border: `1px solid ${palette.cardBorder}`,
                boxShadow: `0 0 50px ${palette.glow}`
              }}
            >
              {/* Project Content */}
              <div className="p-6 sm:p-8 md:p-10">
                {/* Badge */}
                {activeProject.featured && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: `linear-gradient(135deg, ${palette.accentStrong}, ${palette.accent})`,
                      border: `1px solid ${palette.cardBorder}`,
                      color: palette.text
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: palette.highlight }} />
                      <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ backgroundColor: palette.highlight }} />
                    </span>
                    Featured
                  </motion.div>
                )}

                {/* Title */}
                <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight" style={{ color: palette.text }}>
                  {activeProject.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-semibold" style={{ color: palette.textSub }}>
                  {activeProject.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed opacity-90" style={{ color: palette.text }}>
                  {activeProject.description}
                </p>

                {/* Impact Statement */}
                <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl p-4 sm:p-5" style={{ background: palette.accent }}>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="mt-0.5 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: palette.highlight }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>Impact</p>
                      <p className="mt-1 text-sm sm:text-base font-semibold" style={{ color: palette.text }}>
                        {activeProject.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-6 sm:mt-8">
                  <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                    {activeProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md sm:rounded-lg px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium"
                        style={{
                          background: palette.cardBg,
                          border: `1px solid ${palette.cardBorder}`,
                          color: palette.text
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  {activeProject.metrics.stars && (
                    <div className="rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}` }}>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: palette.highlight }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-2xl sm:text-3xl font-bold" style={{ color: palette.text }}>{activeProject.metrics.stars}</span>
                      </div>
                      <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>GitHub Stars</p>
                    </div>
                  )}
                  <div className="rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ background: palette.accentStrong, border: `1px solid ${palette.cardBorder}` }}>
                    <p className="text-sm sm:text-base font-bold" style={{ color: palette.text }}>{activeProject.metrics.status}</p>
                    <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>Status</p>
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 sm:mt-8 flex items-center justify-center gap-2 rounded-lg sm:rounded-xl px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${palette.highlight}, ${palette.accentStrong})`,
                    color: "#ffffff"
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${palette.glow}` }}
                  whileTap={{ scale: 0.98 }}
                >
                  View on GitHub
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Project Selector */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              {showcaseProjects.map((project, idx) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveProject(project)}
                  className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left backdrop-blur-xl transition-all"
                  style={{
                    background: activeProject.id === project.id ? palette.glassBg : palette.cardBg,
                    border: `1px solid ${activeProject.id === project.id ? palette.highlight : palette.cardBorder}`,
                    boxShadow: activeProject.id === project.id ? `0 0 30px ${palette.glow}` : 'none'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {activeProject.id === project.id && (
                    <motion.div
                      layoutId="activeProject"
                      className="absolute left-0 top-0 h-full w-1 sm:w-1.5"
                      style={{ background: palette.highlight }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative pl-3 sm:pl-4">
                    <h4 className="text-base sm:text-lg font-bold leading-tight" style={{ color: palette.text }}>
                      {project.title}
                    </h4>
                    <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-medium opacity-75" style={{ color: palette.text }}>
                      {project.subtitle}
                    </p>
                    
                    {/* Tech preview */}
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium"
                          style={{
                            background: palette.accent,
                            color: palette.text
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium opacity-60" style={{ color: palette.text }}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* View All CTA */}
              <motion.a
                href="https://github.com/Anish-2005?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group flex items-center justify-between rounded-xl sm:rounded-2xl p-4 sm:p-5 backdrop-blur-xl"
                style={{
                  background: palette.cardBg,
                  border: `1px solid ${palette.cardBorder}`
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${palette.glow}` }}
              >
                <div>
                  <p className="text-sm sm:text-base font-bold" style={{ color: palette.text }}>Explore More</p>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm opacity-70" style={{ color: palette.text }}>50+ projects on GitHub</p>
                </div>
                <svg className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: palette.text }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
