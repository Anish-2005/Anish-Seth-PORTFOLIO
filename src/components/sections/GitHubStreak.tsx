"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTheme } from "@/context/ThemeContext";

export function GitHubStreak() {
  const { theme } = useTheme();

  const streakTheme = theme === "light" ? "default" : "tokyonight";
  const streakImageUrl = `https://streak-stats.demolab.com?user=Anish-2005&theme=${streakTheme}&hide_border=true&border_radius=16&background=transparent&ring=fb7185&fire=fb7185&currStreakLabel=fca5a5&dates=94a3b8&sideNums=f8fafc&currStreakNum=f8fafc`;

  return (
    <section id="streak" className="relative border-t border-[color:var(--border)] py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--accent)]">
              GitHub Momentum
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--text-0)] sm:text-4xl md:text-5xl">
              Commit Streak
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--text-1)] sm:text-base">
              A live snapshot of my consistency and shipping rhythm from GitHub activity.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-3 shadow-[var(--glow)] sm:mt-10 sm:rounded-3xl sm:p-5"
          >
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src={streakImageUrl}
                alt="GitHub commit streak for Anish Seth"
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5">
              <p className="text-xs text-[color:var(--text-2)] sm:text-sm">
                Live data powered by GitHub streak stats
              </p>
              <a
                href="https://github.com/Anish-2005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2 text-xs font-semibold text-[color:var(--text-0)] transition hover:opacity-90 sm:text-sm"
              >
                View GitHub Profile
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
