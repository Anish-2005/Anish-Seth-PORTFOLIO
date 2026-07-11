"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { useTheme } from "@/context/ThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { DarkBackground } from "@/components/visuals/DarkBackground";
import { LightBackground } from "@/components/visuals/LightBackground";
import { OrnamentLayer } from "@/components/visuals/OrnamentLayer";

type SubpageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
  children: React.ReactNode;
};

export function SubpageShell({ eyebrow, title, description, chips = [], children }: SubpageShellProps) {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const { isMobile } = useMobileOptimization();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const palette = useMemo(() => {
    if (theme === "light") {
      return {
        border: "rgba(211, 51, 51, 0.16)",
        accent: "rgba(211, 51, 51, 0.18)",
        accentStrong: "rgba(211, 51, 51, 0.28)",
        glow: "rgba(211, 51, 51, 0.12)",
        shell: "rgba(255, 244, 242, 0.72)",
        shellStrong: "rgba(255, 255, 255, 0.5)",
        panel: "rgba(255, 248, 246, 0.7)",
        text: "#2c1810",
        textSub: "#6b4a3a",
        highlight: "#d73333",
      };
    }

    return {
      border: "rgba(248, 113, 113, 0.16)",
      accent: "rgba(248, 113, 113, 0.16)",
      accentStrong: "rgba(248, 113, 113, 0.26)",
      glow: "rgba(248, 113, 113, 0.14)",
      shell: "rgba(18, 8, 13, 0.72)",
      shellStrong: "rgba(30, 12, 19, 0.8)",
      panel: "rgba(24, 10, 16, 0.72)",
      text: "#fef2f2",
      textSub: "#fca5a5",
      highlight: "#fb7185",
    };
  }, [theme]);

  return (
    <main className="relative min-h-screen overflow-hidden isolate">
      {mounted && !reduce ? (theme === "light" ? <LightBackground /> : <DarkBackground />) : null}
      {mounted && !isMobile ? <OrnamentLayer /> : null}

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-[18%] h-72 -z-10"
        style={{
          background: theme === "light"
            ? "linear-gradient(110deg, rgba(211,51,51,0.08), rgba(231,73,116,0.08), transparent 72%), radial-gradient(900px 420px at 42% 50%, rgba(211,51,51,0.14), transparent 72%)"
            : "linear-gradient(110deg, rgba(248,113,113,0.08), rgba(244,114,182,0.08), transparent 72%), radial-gradient(900px 420px at 42% 50%, rgba(248,113,113,0.16), transparent 72%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-[0.12]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${palette.border} 0, ${palette.border} 1px, transparent 1px, transparent 58px), repeating-linear-gradient(90deg, ${palette.border} 0, ${palette.border} 1px, transparent 1px, transparent 58px)`,
        }}
      />

      <Container className="relative py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border backdrop-blur-2xl"
          style={{
            borderColor: palette.border,
            background: `linear-gradient(180deg, ${palette.shell}, ${palette.shellStrong})`,
            boxShadow: theme === "light" ? "0 26px 80px rgba(211,51,51,0.08)" : "0 26px 80px rgba(0,0,0,0.28)",
          }}
        >
          <div className="relative px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-14 h-44 w-44 rounded-full blur-3xl"
              style={{ background: palette.glow }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${palette.accentStrong}, transparent)` }}
            />

            <div className="max-w-4xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] sm:text-xs" style={{ color: palette.highlight }}>
                {eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" style={{ color: palette.text }}>
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8" style={{ color: palette.textSub }}>
                {description}
              </p>

              {chips.length ? (
                <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide sm:text-xs"
                      style={{
                        borderColor: palette.border,
                        background: theme === "light" ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.05)",
                        color: palette.text,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t" style={{ borderColor: palette.border }}>
            <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-10" style={{ background: palette.panel }}>
              {children}
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}