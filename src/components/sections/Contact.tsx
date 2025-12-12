"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/ui/Container";

export function Contact() {
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const palette = useMemo(() => {
    if (!mounted) {
      // Use dark palette on server
      return {
        accent: "rgba(239, 68, 68, 0.15)",
        accentStrong: "rgba(239, 68, 68, 0.25)",
        glow: "rgba(239, 68, 68, 0.35)",
        cardBg: "rgba(255, 255, 255, 0.05)",
        cardBorder: "rgba(255, 255, 255, 0.1)",
        glassBg: "rgba(255, 255, 255, 0.1)",
        text: "#ffffff",
        textSub: "#9ca3af",
        highlight: "#fb7185"
      };
    }
    if (theme === "light") {
      return {
        accent: "rgba(211, 51, 51, 0.12)",
        accentStrong: "rgba(211, 51, 51, 0.25)",
        glow: "rgba(211, 51, 51, 0.4)",
        cardBg: "rgba(255, 255, 255, 0.85)",
        cardBorder: "rgba(211, 51, 51, 0.15)",
        glassBg: "rgba(255, 255, 255, 0.9)",
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

  const fallbackMailto = useMemo(() => {
    const to = siteConfig.sameAs.email.replace(/^mailto:/, "");
    return `mailto:${to}?subject=${encodeURIComponent(
      "Portfolio contact"
    )}&body=${encodeURIComponent("Hi Anish,%0D%0A%0D%0A")}`;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative overflow-hidden border-t py-16 sm:py-20 md:py-24 lg:py-32"
      style={{ borderColor: palette.cardBorder }}
    >
      {/* Background effects */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          opacity,
          background: `
            radial-gradient(1000px 800px at 50% 40%, ${palette.accent}, transparent 70%),
            radial-gradient(800px 600px at 80% 60%, ${palette.accentStrong}, transparent 65%)
          `
        }}
      />

      {/* Grid pattern */}
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
          {/* Section Header */}
          <div className="relative">
            {/* Floating orb accent - disabled on mobile */}
            {!isMobile && (
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
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Eyebrow */}
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
                  Get In Touch
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

              {/* Title */}
              <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span style={{ color: palette.text }}>Let&apos;s Build Something </span>
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${palette.highlight}, ${palette.textSub})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Amazing
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 rounded-full"
                    style={{ background: palette.highlight }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                <span style={{ color: palette.text }}> Together</span>
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
                Have a project in mind or looking to collaborate? I&apos;m always open to discussing{" "}
                <span className="font-semibold" style={{ color: palette.text }}>new opportunities</span>
                {" "}and innovative ideas. Let&apos;s connect!
              </motion.p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-10 sm:mt-12 md:mt-16 max-w-2xl"
          >
            <form
              onSubmit={onSubmit}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 ${isMobile ? "" : "backdrop-blur-xl"}`}
              style={{
                background: palette.glassBg,
                border: `1px solid ${palette.cardBorder}`,
                boxShadow: `0 0 50px ${palette.glow}`
              }}
            >
              {/* Animated scan line */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${palette.glow}, transparent)`
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <label className="grid gap-2 sm:gap-3 text-xs sm:text-sm font-semibold" style={{ color: palette.text }}>
                  Name
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-11 sm:h-12 rounded-lg sm:rounded-xl px-3 sm:px-4 text-sm sm:text-base outline-none transition-all"
                    style={{
                      background: palette.cardBg,
                      border: `1px solid ${palette.cardBorder}`,
                      color: palette.text
                    }}
                    onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${palette.highlight}`}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </label>
                <label className="grid gap-2 sm:gap-3 text-xs sm:text-sm font-semibold" style={{ color: palette.text }}>
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="h-11 sm:h-12 rounded-lg sm:rounded-xl px-3 sm:px-4 text-sm sm:text-base outline-none transition-all"
                    style={{
                      background: palette.cardBg,
                      border: `1px solid ${palette.cardBorder}`,
                      color: palette.text
                    }}
                    onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${palette.highlight}`}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </label>
              </div>

              <label className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 text-xs sm:text-sm font-semibold" style={{ color: palette.text }}>
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all resize-none"
                  style={{
                    background: palette.cardBg,
                    border: `1px solid ${palette.cardBorder}`,
                    color: palette.text
                  }}
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${palette.highlight}`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </label>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${palette.highlight}, ${palette.accentStrong})`
                  }}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02, boxShadow: `0 0 30px ${palette.glow}` }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>

                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold"
                    style={{ color: palette.highlight }}
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Message sent successfully!
                  </motion.p>
                )}

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: palette.highlight }}
                  >
                    Error sending message. Please try{" "}
                    <a href={fallbackMailto} className="underline">
                      email instead
                    </a>
                    .
                  </motion.p>
                )}
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6" style={{ borderTop: `1px solid ${palette.cardBorder}` }}>
                <p className="text-center text-xs sm:text-sm" style={{ color: palette.textSub }}>
                  Prefer email?{" "}
                  <a
                    className="font-semibold underline transition-colors"
                    style={{ color: palette.highlight }}
                    href={fallbackMailto}
                  >
                    anishseth0510@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
