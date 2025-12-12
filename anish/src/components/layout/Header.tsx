"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useTheme } from "@/context/ThemeContext";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  const items = useMemo(() => siteConfig.nav, []);

  const palette = useMemo(
    () =>
      theme === "light"
        ? {
            beam: "radial-gradient(120% 140% at 50% 10%, rgba(213,45,45,0.28), transparent 50%)",
            glass: "color-mix(in_oklab, rgba(255,255,255,0.68), rgba(233,233,241,0.4))",
            accentA: "rgba(213,45,45,0.32)",
            accentB: "rgba(226,38,114,0.24)",
            textInvert: "#1a0f12",
          }
        : {
            beam: "radial-gradient(120% 140% at 52% 12%, rgba(239,68,68,0.28), transparent 52%)",
            glass: "color-mix(in_oklab, rgba(10,10,16,0.7), rgba(22,22,30,0.6))",
            accentA: "rgba(239,68,68,0.34)",
            accentB: "rgba(244,114,182,0.22)",
            textInvert: "#fdf2f8",
          },
    [theme]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = latest > previous;
    setScrolled(latest > 8);

    if (latest < 32) {
      setHidden(false);
      return;
    }

    setHidden(goingDown);
  });

  return (
    <motion.header
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--surface-0),transparent_40%)]",
        scrolled ? "border-b border-[color:var(--border)]" : "border-b border-transparent"
      )}
      initial={false}
      animate={hidden ? { y: -72 } : { y: 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0.9, 0.3, 1] }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
        animate={{ opacity: scrolled ? 0.8 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-x-0 top-[-40%] h-[180%]"
          style={{ 
            backgroundImage: palette.beam,
            filter: "blur(40px)",
          }}
          animate={{
            scale: scrolled ? 1.02 : 1.08,
            rotate: scrolled ? -1.5 : 2,
            opacity: scrolled ? 0.7 : 0.95,
          }}
          transition={{ 
            duration: 18, 
            ease: "linear", 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-1/4 top-0 h-32 w-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${palette.accentA}, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute right-1/4 top-0 h-24 w-24 rounded-full"
          style={{
            background: `radial-gradient(circle, ${palette.accentB}, transparent 70%)`,
            filter: "blur(25px)",
          }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 15, -10, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
        />
      </motion.div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="group relative inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[color:var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
        >
          <motion.span
            className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg text-xs font-semibold"
            style={{
              background: palette.glass,
              border: "1px solid color-mix(in_oklab, var(--border), transparent)",
              color: palette.textInvert,
              boxShadow: scrolled
                ? `0 8px 30px ${palette.accentA}`
                : `0 10px 40px ${palette.accentB}`,
            }}
            animate={{ 
              rotate: scrolled ? -3 : 3, 
              scale: scrolled ? 0.98 : 1.02,
            }}
            whileHover={{ scale: 1.08, rotate: 8 }}
            whileTap={{ scale: 0.94, rotate: -4 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${palette.accentA}, transparent 70%)`,
              }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">AS</span>
          </motion.span>
          <span className="relative">
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.name}
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full origin-left"
              style={{
                background: `linear-gradient(90deg, ${palette.accentA}, ${palette.accentB}, transparent)`,
              }}
              animate={{ scaleX: scrolled ? 0.4 : 0.9, opacity: scrolled ? 0.6 : 1 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="group relative rounded-lg px-3 py-2 text-sm text-[color:var(--text-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 0 }}
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${palette.accentA}, ${palette.accentB} 80%)`,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg border border-transparent group-hover:border-[color:var(--border)]"
                style={{
                  background: `linear-gradient(120deg, ${palette.accentA}, transparent 65%)`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              />
              <span className="relative z-10 transition-colors group-hover:text-[color:var(--text-0)]">
                {item.label}
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full group-hover:w-[80%]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${palette.accentA}, transparent)`,
                }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggle}
            aria-pressed={theme === "dark"}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-1)] text-[color:var(--text-0)] shadow-[color:var(--glow)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.06, rotate: theme === "light" ? 4 : -4 }}
            whileTap={{ scale: 0.94, rotate: theme === "light" ? -8 : 8 }}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `conic-gradient(from 45deg, ${palette.accentA}, transparent, ${palette.accentB}, transparent)`,
                opacity: 0,
              }}
              whileHover={{ opacity: 0.3, rotate: 180 }}
              transition={{ duration: 0.8, ease: "linear" }}
            />
            <motion.span
              aria-hidden
              className="text-xs font-semibold uppercase tracking-wide"
              key={theme}
              initial={{ opacity: 0, y: 8, rotate: -12 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -8, rotate: 12 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {theme === "dark" ? "Dark" : "Light"}
            </motion.span>
          </motion.button>
          <motion.a
            href={siteConfig.resume.href}
            className="group relative hidden overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-1)] px-3 py-2 text-sm font-medium text-[color:var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)] sm:inline-flex"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${palette.accentA}, transparent 70%)`,
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Resume</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="group relative inline-flex overflow-hidden rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
            style={{
              background: `linear-gradient(135deg, ${palette.accentA}, ${palette.accentB})`,
              boxShadow: `0 12px 32px ${palette.accentA}`,
            }}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, y: -2, boxShadow: `0 16px 48px ${palette.accentA}` }}
            whileTap={{ scale: 0.96, y: 0 }}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2), transparent 70%)`,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 blur-xl group-hover:opacity-60"
              style={{
                background: `linear-gradient(135deg, ${palette.accentA}, ${palette.accentB})`,
              }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">Contact</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
