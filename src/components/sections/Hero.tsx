"use client";

import { siteConfig } from "@/lib/site.config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";
import Image from "next/image";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const professionalData = {
  name: "Anish Seth",
  title: "Full-Stack Developer & Creative Technologist",
  tagline: "Architecting Digital Experiences at the Intersection of Design & Engineering",
  description: "Specialized in crafting high-performance web applications with a focus on immersive UI/UX, motion design, and modern development workflows. Experienced in React, Next.js, Three.js, and AI-driven solutions.",
  expertise: ["Full-Stack Development", "3D Web Experiences", "Motion Design", "AI Integration"],
  stats: [
    { label: "Experience", value: "3+ Years" },
    { label: "Projects", value: "25+" },
    { label: "Technologies", value: "15+" },
  ]
};

export function Hero() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80]);
  const scaleProgress = useTransform(scrollY, [0, 400], [1, reduce ? 1 : 0.92]);
  const opacityProgress = useTransform(scrollY, [0, 300], [1, 0.7]);

  const palette = useMemo(() => {
    const isLight = theme === "light";

    // MOBILE LIGHT MODE – clean, neutral pink
    if (isLight && isMobile) {
      return {
        accent: "rgba(244, 114, 182, 0.12)",       // rose-400, cleaner
        accentStrong: "rgba(244, 114, 182, 0.22)",
        beam: "rgba(236, 72, 153, 0.08)",          // pink-500
        glow: "rgba(236, 72, 153, 0.28)",
        text: "#111827",                           // neutral slate
        textSub: "#6b7280"
      };
    }

    // DESKTOP LIGHT MODE – richer cinematic
    if (isLight) {
      return {
        accent: "rgba(225, 29, 72, 0.14)",         // rose-600
        accentStrong: "rgba(225, 29, 72, 0.26)",
        beam: "rgba(236, 72, 153, 0.10)",
        glow: "rgba(225, 29, 72, 0.35)",
        text: "#1f2937",
        textSub: "#6b7280"
      };
    }

    // DARK MODE (unchanged – already fine)
    return {
      accent: "rgba(248, 113, 113, 0.16)",
      accentStrong: "rgba(248, 113, 113, 0.28)",
      beam: "rgba(251, 113, 133, 0.1)",
      glow: "rgba(248, 113, 113, 0.35)",
      text: "#fef2f2",
      textSub: "#fca5a5"
    };
  }, [theme, isMobile]);

  return (
    <section id="info" className="relative overflow-hidden pt-20 sm:pt-24 md:pt-32">
      {/* Cinematic backdrop with animated scanlines */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{ 
          y: parallax,
          background: `radial-gradient(1100px 700px at 70% 20%, ${palette.accent}, transparent 60%), radial-gradient(850px 600px at 25% 10%, ${palette.beam}, transparent 65%)`
        }}
      />
      
      {/* Holographic light beam - disabled on mobile */}
      {!isMobile && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 md:inset-x-[-35%] top-[-15%] -z-20 h-[480px] rotate-[-1.5deg] blur-[90px]"
          style={{
            background: `linear-gradient(125deg, ${palette.accentStrong}, ${palette.beam}, transparent 55%)`,
            opacity: opacityProgress
          }}
          animate={{
            rotate: [-1.5, -2.2, -1.5],
            scaleX: [1, 1.08, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Animated data grid overlay */}
      {!(isMobile && theme === "light") && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.25]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, ${palette.accent} 0, ${palette.accent} 1px, transparent 1px, transparent 14px),
              repeating-linear-gradient(0deg, ${palette.accent} 0, ${palette.accent} 1px, transparent 1px, transparent 14px)
            `
          }}
        />
      )}

      {/* Floating accent particles - disabled on mobile */}
      {!isMobile && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[12%] top-[18%] -z-10 h-[180px] w-[180px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.12, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <Container className="grid items-center gap-8 pb-12 sm:gap-12 sm:pb-16 md:grid-cols-12 md:gap-16 md:pb-24">
        <motion.div 
          className="md:col-span-7"
          style={{ scale: scaleProgress }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 ${isMobile ? "" : "backdrop-blur-xl"}`}
            style={{
              background: `linear-gradient(135deg, ${palette.accent}, ${palette.beam})`,
              border: `1px solid ${palette.accentStrong}`
            }}
          >
            <motion.div
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
              style={{ backgroundColor: palette.textSub }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-[10px] sm:text-xs font-medium tracking-wide" style={{ color: palette.text }}>
              Available for Opportunities
            </span>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: palette.text,
              lineHeight: 1.1
            }}
          >
            {professionalData.name.split(" ")[0]}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: theme === "light" 
                  ? "linear-gradient(135deg, #d73333, #e74974, #d73333)"
                  : "linear-gradient(135deg, #f87171, #fb7185, #f87171)",
                backgroundSize: "200% 100%",
                animation: "shimmer 6s ease-in-out infinite"
              }}
            >
              {professionalData.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Professional title */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 sm:mt-4 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl"
            style={{ color: palette.textSub }}
          >
            {professionalData.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm font-medium tracking-wide opacity-70"
            style={{ color: palette.text }}
          >
            {professionalData.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 sm:mt-5 max-w-2xl text-sm leading-6 opacity-80 sm:text-base sm:leading-7 md:text-lg"
            style={{ color: palette.text }}
          >
            {professionalData.description}
          </motion.p>

          {/* Expertise tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2"
          >
            {professionalData.expertise.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.08 }}
                className={`rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                style={{
                  background: `linear-gradient(135deg, ${palette.accent}, ${palette.beam})`,
                  border: `1px solid ${palette.accentStrong}`,
                  color: palette.text
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px ${palette.glow}`
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <ButtonLink href="#contact" variant="primary">
              Let&apos;s Connect
            </ButtonLink>
            <ButtonLink href={siteConfig.resume.href} variant="secondary">
              View Resume
            </ButtonLink>
            <ButtonLink href="#projects" variant="ghost">
              Explore Work
            </ButtonLink>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {professionalData.stats.map((stat) => (
              <motion.div
                key={stat.label}
                className={`rounded-lg sm:rounded-xl p-3 sm:p-4 ${isMobile ? "" : "backdrop-blur-xl"}`}
                style={{
                  background: `linear-gradient(135deg, ${palette.accent}, ${palette.beam})`,
                  border: `1px solid ${palette.accentStrong}`
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 25px ${palette.glow}`
                }}
              >
                <div className="text-lg sm:text-2xl font-bold" style={{ color: palette.text }}>
                  {stat.value}
                </div>
                <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-medium opacity-70" style={{ color: palette.text }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="md:col-span-5 order-first md:order-last"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex justify-center mb-6 md:mb-0">
            {/* Holographic glow backdrop */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${palette.glow}, transparent 65%)`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.65, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Profile photo container */}
            <div className="relative">
              {/* Animated rotating ring */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-full"
                style={{
                  background: theme === "light"
                    ? "conic-gradient(from 0deg, #d73333, #e74974, #d73333, #e74974, #d73333)"
                    : "conic-gradient(from 0deg, #f87171, #fb7185, #f87171, #fb7185, #f87171)",
                  opacity: 0.4
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Static outer glow ring */}
              <div
                className="absolute -inset-3 rounded-full blur-xl"
                style={{
                  background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
                }}
              />

              {/* Photo frame */}
              <motion.div
                className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-2 backdrop-blur-xl sm:h-[300px] sm:w-[300px] sm:border-4 md:h-[320px] md:w-[320px] lg:h-[380px] lg:w-[380px]"
                style={{
                  borderColor: palette.accentStrong,
                  background: `linear-gradient(135deg, ${palette.accent}, ${palette.beam})`
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 40px ${palette.glow}`
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/profile.jpg"
                    alt="Anish Seth"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 320px, 380px"
                  />
                </div>

                {/* Overlay gradient */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${palette.glow}, transparent 60%)`
                  }}
                />
              </motion.div>

              {/* Floating accent dots */}
              <motion.div
                aria-hidden
                className="absolute -right-1 sm:-right-2 top-8 sm:top-12 h-2 w-2 sm:h-3 sm:w-3 rounded-full"
                style={{
                  background: theme === "light" ? "#e74974" : "#fb7185",
                  boxShadow: `0 0 15px ${palette.glow}`
                }}
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                aria-hidden
                className="absolute -left-2 sm:-left-3 bottom-12 sm:bottom-16 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
                style={{
                  background: theme === "light" ? "#d73333" : "#f87171",
                  boxShadow: `0 0 12px ${palette.glow}`
                }}
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
