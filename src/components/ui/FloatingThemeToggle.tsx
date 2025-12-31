"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function FloatingThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="hidden lg:flex fixed left-4 bottom-4 z-50 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        width: 40,
        height: 40,
        background: theme === "light"
          ? "rgba(255,255,255,0.92)"
          : "rgba(16,25,42,0.92)",
        borderColor: theme === "light" ? "#e5e7eb" : "#334155",
        color: theme === "light" ? "#22223b" : "#f8fafc",
        boxShadow: theme === "light"
          ? "0 2px 8px 0 rgba(34, 211, 238, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.06)"
          : "0 2px 8px 0 rgba(34, 211, 238, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.18)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.08, boxShadow: theme === "light"
        ? "0 4px 16px 0 rgba(34, 211, 238, 0.18), 0 2px 8px 0 rgba(0,0,0,0.10)"
        : "0 4px 16px 0 rgba(34, 211, 238, 0.28), 0 2px 8px 0 rgba(0,0,0,0.22)" }}
      initial={false}
    >
      {theme === "light" ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="#fef9c3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fbbf24" />
        </svg>
      )}
    </motion.button>
  );
}
