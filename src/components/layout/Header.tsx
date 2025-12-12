"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
  { label: "Info", href: "#info" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const palette = useMemo(
    () =>
      theme === "light"
        ? {
            bg: "rgba(255, 255, 255, 0.75)",
            border: "rgba(211, 51, 51, 0.12)",
            glass: "rgba(255, 255, 255, 0.85)",
            accent: "#d73333",
            accentSoft: "rgba(211, 51, 51, 0.1)",
            accentGlow: "rgba(211, 51, 51, 0.25)",
            text: "#2c1810",
            textSub: "#6b4a3a",
            shadow: "0 4px 20px rgba(211, 51, 51, 0.08)",
            shadowHover: "0 8px 30px rgba(211, 51, 51, 0.15)",
          }
        : {
            bg: "rgba(15, 6, 11, 0.75)",
            border: "rgba(248, 113, 113, 0.15)",
            glass: "rgba(15, 6, 11, 0.85)",
            accent: "#fb7185",
            accentSoft: "rgba(248, 113, 113, 0.12)",
            accentGlow: "rgba(248, 113, 113, 0.3)",
            text: "#fef2f2",
            textSub: "#fca5a5",
            shadow: "0 4px 20px rgba(248, 113, 113, 0.1)",
            shadowHover: "0 8px 30px rgba(248, 113, 113, 0.2)",
          },
    [theme]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);

    // Always keep header visible
    setHidden(false);
  });

  return (
    <motion.header
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={hidden ? { y: -100 } : { y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        animate={{
          background: scrolled ? palette.bg : "transparent",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        animate={{
          opacity: scrolled ? 1 : 0,
          background: scrolled ? palette.border : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: scrolled ? palette.shadow : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating orb effects - only when scrolled */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-20 w-20 rounded-full blur-2xl"
        style={{ background: palette.accentGlow }}
        animate={{
          opacity: scrolled ? 0.6 : 0,
          x: scrolled ? [0, 30, -15, 0] : 0,
          y: scrolled ? [0, -10, 5, 0] : 0,
          scale: scrolled ? [1, 1.1, 0.95, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          x: { duration: 8, ease: "easeInOut", repeat: Infinity },
          y: { duration: 8, ease: "easeInOut", repeat: Infinity },
          scale: { duration: 8, ease: "easeInOut", repeat: Infinity },
        }}
      />

      <motion.div 
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        animate={{
          height: scrolled ? "3.5rem" : "4rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo */}
        <Link
          href="#info"
          className="group relative inline-flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            outlineColor: palette.accent
          }}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            const target = document.querySelector("#info");
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", window.location.pathname);
            }
          }}
        >
          <motion.div
            className="relative flex items-center justify-center overflow-hidden rounded-lg text-xs sm:text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentGlow})`,
              color: "white",
            }}
            animate={{
              height: scrolled ? "1.75rem" : "2.25rem",
              width: scrolled ? "1.75rem" : "2.25rem",
              boxShadow: scrolled ? "0 2px 10px rgba(211, 51, 51, 0.15)" : palette.shadow,
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 5,
              boxShadow: palette.shadowHover
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            AS
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)",
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.span 
            className="relative text-sm sm:text-base font-bold tracking-tight"
            style={{ color: palette.text }}
            animate={{
              fontSize: scrolled ? "0.875rem" : "1rem",
              opacity: scrolled ? 0.9 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="hidden sm:inline">Anish Seth</span>
            <span className="sm:hidden">AS</span>
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 h-0.5 rounded-full"
              style={{ background: palette.accent }}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden lg:flex items-center"
          animate={{
            gap: scrolled ? "0.125rem" : "0.25rem",
          }}
          transition={{ duration: 0.2 }}
        >
          {NAV_ITEMS.map((item) => {
            return (
              <motion.a
                key={item.href}
                href={item.href}
                className="group relative rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ 
                  color: palette.textSub,
                  outlineColor: palette.accent,
                }}
                animate={{
                  paddingLeft: scrolled ? "0.75rem" : "1rem",
                  paddingRight: scrolled ? "0.75rem" : "1rem",
                  paddingTop: scrolled ? "0.375rem" : "0.5rem",
                  paddingBottom: scrolled ? "0.375rem" : "0.5rem",
                  fontSize: scrolled ? "0.8125rem" : "0.875rem",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }}
              >
                {/* Hover background */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                  style={{
                    background: palette.accentSoft,
                    border: `1px solid ${palette.border}`,
                  }}
                  transition={{ duration: 0.2 }}
                />

                <span className="relative z-10 transition-colors group-hover:text-[color:inherit]" style={{ color: "inherit" }}>
                  {item.label}
                </span>

                {/* Bottom accent line on hover */}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full group-hover:w-[60%]"
                  style={{
                    background: palette.accent,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}
        </motion.nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle */}
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="relative inline-flex items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: palette.glass,
              border: `1px solid ${palette.border}`,
              color: palette.text,
              outlineColor: palette.accent,
            }}
            animate={{
              height: scrolled ? "1.75rem" : "2.25rem",
              width: scrolled ? "1.75rem" : "2.25rem",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                scale: scrolled ? 0.75 : 0.85,
              }}
              transition={{ duration: 0.2 }}
            >
              {theme === "light" ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.div>
          </motion.button>

          {/* Contact Button - Desktop & Tablet */}
          <motion.a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentGlow})`,
              outlineColor: palette.accent,
            }}
            animate={{
              paddingLeft: scrolled ? "0.625rem" : "0.875rem",
              paddingRight: scrolled ? "0.625rem" : "0.875rem",
              paddingTop: scrolled ? "0.375rem" : "0.5rem",
              paddingBottom: scrolled ? "0.375rem" : "0.5rem",
              fontSize: scrolled ? "0.75rem" : "0.875rem",
              boxShadow: scrolled ? "0 2px 15px rgba(211, 51, 51, 0.2)" : palette.shadow,
            }}
            whileHover={{ 
              scale: 1.02,
              y: -1,
              boxShadow: palette.shadowHover
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#contact");
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-lg"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2), transparent 60%)",
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Contact</span>
            <motion.svg 
              className="relative z-10 h-3 w-3 sm:h-4 sm:w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
              animate={{
                scale: scrolled ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden relative inline-flex items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: palette.glass,
              border: `1px solid ${palette.border}`,
              color: palette.text,
              outlineColor: palette.accent,
            }}
            animate={{
              height: scrolled ? "1.75rem" : "2.25rem",
              width: scrolled ? "1.75rem" : "2.25rem",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: mobileMenuOpen ? 90 : 0,
                scale: scrolled ? 0.75 : 0.85,
              }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <motion.div
          className="px-4 pb-4 pt-2"
          style={{
            background: palette.glass,
            borderTop: `1px solid ${palette.border}`,
          }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    const target = document.querySelector(item.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.history.replaceState(null, "", window.location.pathname);
                    }
                  }, 100);
                }}
                className="group relative rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-left w-full cursor-pointer"
                style={{ 
                  color: palette.textSub,
                  outlineColor: palette.accent,
                  border: `1px solid ${palette.border}`,
                  background: "transparent",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: mobileMenuOpen ? 1 : 0,
                  x: mobileMenuOpen ? 0 : -20,
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: mobileMenuOpen ? index * 0.05 : 0,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-100"
                  style={{
                    background: palette.accentSoft,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
            
            {/* Mobile Contact Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const target = document.querySelector("#contact");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }, 100);
              }}
              className="sm:hidden relative mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer w-full"
              style={{
                background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentGlow})`,
                outlineColor: palette.accent,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0,
                y: mobileMenuOpen ? 0 : 10,
              }}
              transition={{ 
                duration: 0.3, 
                delay: mobileMenuOpen ? NAV_ITEMS.length * 0.05 : 0,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get in Touch</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </nav>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
