"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMemo, useRef } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

// Icon components as SVG
const ZapIcon = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const aboutData = {
  headline: "Building the Future of Digital Experiences",
  description: "Full-stack developer specializing in high-performance web applications with immersive UI/UX. Passionate about merging cutting-edge technology with exceptional design to create products that make an impact.",
  principles: [
    {
      icon: ZapIcon,
      title: "Performance First",
      description: "Optimized for speed with Core Web Vitals, lazy loading, and efficient rendering strategies"
    },
    {
      icon: SparklesIcon,
      title: "Design Excellence",
      description: "Pixel-perfect implementations with attention to typography, spacing, and visual hierarchy"
    },
    {
      icon: EyeIcon,
      title: "Accessibility",
      description: "WCAG AA compliant, keyboard-first navigation, and screen reader optimized"
    },
    {
      icon: CodeIcon,
      title: "Clean Architecture",
      description: "Maintainable, scalable codebases with modern patterns and best practices"
    }
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "React Native", "Flutter", "Three.js", "Framer Motion", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    tools: ["Git", "Docker", "Vercel", "AWS", "Figma", "VS Code"]
  },
  journey: [
    {
      year: "2024-Present",
      title: "AI & Full-Stack Innovation",
      description: "SIH 2024 & 2025 Finalist • Hack4Bengal 2025 Finalist • Building LawAI (AI-powered legal assistant) & intelligent ticketing systems • Exploring Blockchain development • Mastering React Native, Next.js, FastAPI & AI/ML integration"
    },
    {
      year: "2023-2024",
      title: "Advanced Web Development",
      description: "Created 25+ production projects • Specialized in React.js, Next.js, Three.js • Built immersive UI/UX experiences with modern frameworks • GitHub Featured Developer"
    },
    {
      year: "2022-2023",
      title: "Computer Science Foundation",
      description: "Started @ Techno Main Salt Lake • Mastered core programming (Python, JavaScript, TypeScript, C++) • Built strong fundamentals in algorithms & data structures"
    }
  ]
};

export function About() {
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const palette = useMemo(() => {
    if (theme === "light") {
      return {
        accent: "rgba(211, 51, 51, 0.15)",
        accentStrong: "rgba(211, 51, 51, 0.3)",
        glow: "rgba(211, 51, 51, 0.35)",
        cardBg: "rgba(255, 255, 255, 0.85)",
        cardBorder: "rgba(211, 51, 51, 0.15)",
        text: "#2c1810",
        textSub: "#6b4a3a"
      };
    }
    return {
      accent: "rgba(248, 113, 113, 0.12)",
      accentStrong: "rgba(248, 113, 113, 0.25)",
      glow: "rgba(248, 113, 113, 0.3)",
      cardBg: "rgba(15, 6, 11, 0.6)",
      cardBorder: "rgba(248, 113, 113, 0.15)",
      text: "#fef2f2",
      textSub: "#fca5a5"
    };
  }, [theme]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative overflow-hidden border-t py-16 sm:py-20 md:py-24 lg:py-32"
      style={{
        borderColor: palette.cardBorder
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          opacity,
          background: `radial-gradient(900px 700px at 30% 50%, ${palette.accent}, transparent 70%), radial-gradient(700px 500px at 70% 30%, ${palette.accentStrong}, transparent 80%)`
        }}
      />

      {/* Tech grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${palette.cardBorder} 0, ${palette.cardBorder} 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, ${palette.cardBorder} 0, ${palette.cardBorder} 1px, transparent 1px, transparent 40px)
          `
        }}
      />

      {/* Floating accent orbs - disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[10%] top-[20%] -z-10 h-[250px] w-[250px] rounded-full blur-[130px]"
            style={{
              background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[5%] bottom-[25%] -z-10 h-[200px] w-[200px] rounded-full blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}

      <Container>
        <motion.div style={{ scale, opacity }}>
          {/* Enhanced Section Header */}
          <div className="relative">
            {/* Floating orb accent */}
            <motion.div
              className="pointer-events-none absolute -right-20 -top-10 h-40 w-40 rounded-full blur-3xl"
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
                  style={{ color: palette.glow }}
                >
                  About Me
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
                <span style={{ color: palette.text }}>Building the Future of </span>
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme === "light" ? "#d73333" : "#fb7185"}, ${palette.textSub})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Digital Experiences
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 rounded-full"
                    style={{ background: theme === "light" ? "#d73333" : "#fb7185" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
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
                Full-stack developer specializing in{" "}
                <span className="font-semibold" style={{ color: palette.text }}>high-performance web applications</span>
                {" "}with immersive UI/UX. Passionate about merging cutting-edge technology with exceptional design to create products that make an impact.
              </motion.p>

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mx-auto mt-6 sm:mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-4"
              >
                {["React & Next.js Expert", "AI/ML Integration", "Mobile Development", "Blockchain Explorer"].map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                    className={`rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold ${isMobile ? "" : "backdrop-blur-xl"}`}
                    style={{
                      background: palette.cardBg,
                      border: `1px solid ${palette.cardBorder}`,
                      color: palette.text
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 20px ${palette.glow}`
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Principles Grid */}
          <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.principles.map((principle, idx) => {
              const IconComponent = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 ${isMobile ? "" : "backdrop-blur-xl"}`}
                  style={{
                    background: palette.cardBg,
                    border: `1px solid ${palette.cardBorder}`
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 30px ${palette.glow}`
                  }}
                >
                  {/* Animated scan line */}
                  <motion.div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${palette.glow}, transparent)`
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "linear"
                    }}
                  />

                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${palette.accent}, transparent 70%)`
                    }}
                  />

                  {/* Corner accents */}
                  <div className="absolute right-0 top-0 h-16 w-16 opacity-30"
                    style={{
                      background: `radial-gradient(circle at top right, ${palette.glow}, transparent 70%)`
                    }}
                  />

                  <div className="relative">
                    {/* Icon with glow */}
                    <motion.div 
                      className="inline-flex rounded-lg sm:rounded-xl p-2 sm:p-3"
                      style={{
                        background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                        border: `1px solid ${palette.cardBorder}`,
                        color: palette.text
                      }}
                      whileHover={{
                        boxShadow: `0 0 20px ${palette.glow}`
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                    
                    <h3 className="mt-3 sm:mt-5 text-base sm:text-lg font-bold" style={{ color: palette.text }}>
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed opacity-80" style={{ color: palette.text }}>
                      {principle.description}
                    </p>

                    {/* Decorative line */}
                    <motion.div
                      className="mt-4 h-px w-0 group-hover:w-full"
                      style={{
                        background: `linear-gradient(90deg, ${palette.glow}, transparent)`
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills & Journey Section */}
          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${isMobile ? "" : "backdrop-blur-xl"}`}
              style={{
                background: palette.cardBg,
                border: `1px solid ${palette.cardBorder}`
              }}
            >
              {/* Accent gradient */}
              <div
                className="absolute right-0 top-0 h-40 w-40 rounded-full blur-[100px]"
                style={{
                  background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
                }}
              />

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: palette.text }}>
                  Technical Arsenal
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm opacity-70" style={{ color: palette.text }}>
                  Technologies I work with daily
                </p>

                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {aboutData.skills.frontend.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                          style={{
                            background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                            border: `1px solid ${palette.cardBorder}`,
                            color: palette.text
                          }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 15px ${palette.glow}`
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {aboutData.skills.backend.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                          style={{
                            background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                            border: `1px solid ${palette.cardBorder}`,
                            color: palette.text
                          }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 15px ${palette.glow}`
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
                      Tools & Platform
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {aboutData.skills.tools.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                          style={{
                            background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                            border: `1px solid ${palette.cardBorder}`,
                            color: palette.text
                          }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 15px ${palette.glow}`
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey Timeline Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${isMobile ? "" : "backdrop-blur-xl"}`}
              style={{
                background: palette.cardBg,
                border: `1px solid ${palette.cardBorder}`
              }}
            >
              {/* Accent gradient */}
              <div
                className="absolute left-0 top-0 h-40 w-40 rounded-full blur-[100px]"
                style={{
                  background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
                }}
              />

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: palette.text }}>
                  My Journey
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm opacity-70" style={{ color: palette.text }}>
                  Evolution as a developer
                </p>

                <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                  {aboutData.journey.map((item, idx) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: idx * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="relative pl-4 sm:pl-6"
                    >
                      {/* Timeline line */}
                      <div
                        className="absolute left-0 top-2 h-full w-px"
                        style={{
                          background: `linear-gradient(to bottom, ${palette.cardBorder}, transparent)`
                        }}
                      />
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-[-4px] top-2 h-2 w-2 rounded-full"
                        style={{
                          background: theme === "light" ? "#e74974" : "#fb7185",
                          boxShadow: `0 0 10px ${palette.glow}`
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                          ease: "easeInOut"
                        }}
                      />

                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: palette.textSub }}>
                        {item.year}
                      </div>
                      <h4 className="mt-0.5 sm:mt-1 text-sm sm:text-base font-bold" style={{ color: palette.text }}>
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed opacity-80" style={{ color: palette.text }}>
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-16 text-center"
          >
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 py-2 sm:px-6 sm:py-3 ${isMobile ? "" : "backdrop-blur-xl"}`}
              style={{
                background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                border: `1px solid ${palette.cardBorder}`
              }}
            >
              <span className="text-xs sm:text-sm font-medium" style={{ color: palette.text }}>
                Always learning, always building, always improving
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
