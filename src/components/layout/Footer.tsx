"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

import { useTheme } from "@/context/ThemeContext";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();

  const palette = useMemo(
    () =>
      theme === "light"
        ? {
            beam: "radial-gradient(140% 120% at 50% 90%, rgba(213,45,45,0.18), transparent 60%)",
            accentA: "rgba(213,45,45,0.32)",
            accentB: "rgba(226,38,114,0.24)",
            orbA: "rgba(213,45,45,0.2)",
            orbB: "rgba(226,38,114,0.16)",
          }
        : {
            beam: "radial-gradient(140% 120% at 50% 90%, rgba(239,68,68,0.2), transparent 60%)",
            accentA: "rgba(239,68,68,0.34)",
            accentB: "rgba(244,114,182,0.22)",
            orbA: "rgba(239,68,68,0.22)",
            orbB: "rgba(244,114,182,0.18)",
          },
    [theme]
  );

  const socialLinks = [
    { label: "GitHub", href: siteConfig.sameAs.github },
    { label: "LinkedIn", href: siteConfig.sameAs.linkedIn },
    { label: "Email", href: siteConfig.sameAs.email },
  ];

  return (
    <motion.footer
      className="relative border-t border-[color:var(--border)] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(0deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        {/* Disable heavy animations on mobile */}
        {!isMobile ? (
          <>
            <motion.div
              className="absolute inset-x-0 bottom-[-40%] h-[140%]"
              style={{
                backgroundImage: palette.beam,
                filter: "blur(50px)",
              }}
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 2, 0],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute left-1/3 bottom-0 h-28 w-28 rounded-full"
              style={{
                background: `radial-gradient(circle, ${palette.orbA}, transparent 70%)`,
                filter: "blur(35px)",
              }}
              animate={{
                x: [0, -30, 15, 0],
                y: [0, -15, 10, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute right-1/3 bottom-0 h-24 w-24 rounded-full"
              style={{
                background: `radial-gradient(circle, ${palette.orbB}, transparent 70%)`,
                filter: "blur(30px)",
              }}
              animate={{
                x: [0, 25, -15, 0],
                y: [0, 12, -8, 0],
                scale: [1, 0.85, 1.1, 1],
              }}
              transition={{
                duration: 11,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </>
        ) : (
          // Static gradient on mobile
          <div
            className="absolute inset-x-0 bottom-[-40%] h-[140%]"
            style={{
              backgroundImage: palette.beam,
              opacity: 0.6,
            }}
          />
        )}
      </motion.div>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6 px-4 py-8 sm:py-10 md:py-12 text-xs sm:text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-1.5 sm:gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="relative inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-[color:var(--text-1)]"
            whileHover={{ x: 2 }}
          >
            <motion.span
              aria-hidden
              className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded text-[10px] sm:text-xs font-semibold"
              style={{
                background: `linear-gradient(135deg, ${palette.accentA}, ${palette.accentB})`,
                color: theme === "light" ? "#1a0f12" : "#fdf2f8",
                boxShadow: `0 4px 16px ${palette.accentA}`,
              }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              AS
            </motion.span>
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </motion.p>
          <motion.p
            className="text-[10px] sm:text-xs text-[color:var(--text-2)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Crafted with care & motion
          </motion.p>
        </motion.div>

        <motion.nav
          className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {socialLinks.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="group relative text-[color:var(--text-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)] rounded"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2 + idx * 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                aria-hidden
                className="absolute -inset-x-2 -inset-y-1 rounded-md opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${palette.accentA}, transparent 70%)`,
                  filter: "blur(6px)",
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 transition-colors group-hover:text-[color:var(--text-0)]">
                {link.label}
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 rounded-full group-hover:w-full"
                style={{
                  background: `linear-gradient(90deg, ${palette.accentA}, transparent)`,
                }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </motion.a>
          ))}
        </motion.nav>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.accentA}, ${palette.accentB}, transparent)`,
          opacity: 0.4,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.footer>
  );
}
