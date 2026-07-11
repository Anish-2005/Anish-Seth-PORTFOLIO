"use client";

import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { siteConfig } from "@/lib/site.config";

const faqItems = [
  {
    question: "Who is Anish Seth?",
    answer:
      "Anish Seth is a full-stack developer focused on Next.js, React, TypeScript, AI systems, and high-performance portfolio experiences.",
  },
  {
    question: "What is Anish Seth known for?",
    answer:
      "He builds production-minded web apps, hackathon projects, and polished UI systems with a strong emphasis on performance and design quality.",
  },
  {
    question: "What is Anish Seth's main portfolio website?",
    answer:
      "The main portfolio site is anishseth.xyz, with anishseth.vercel.app redirecting there as a secondary deployment domain.",
  },
  {
    question: "What is Anish Seth's Instagram?",
    answer:
      "Anish Seth's Instagram handle is @_anish.seth_.",
  },
  {
    question: "What is Anish Seth's X handle?",
    answer:
      "Anish Seth's X handle is @AnishSeth170734.",
  },
  {
    question: "How can someone contact Anish Seth?",
    answer:
      "The best way to reach him is through the contact form on the website or by email at anishseth0510@gmail.com.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();

  const palette = useMemo(() => {
    if (theme === "light") {
      return {
        border: "rgba(211, 51, 51, 0.14)",
        accent: "rgba(211, 51, 51, 0.18)",
        accentStrong: "rgba(211, 51, 51, 0.28)",
        glow: "rgba(211, 51, 51, 0.22)",
        surface: "rgba(255, 250, 248, 0.82)",
        surfaceSoft: "rgba(255, 255, 255, 0.58)",
        card: "rgba(255, 255, 255, 0.72)",
        cardStrong: "rgba(255, 255, 255, 0.9)",
        text: "#2c1810",
        textSub: "#6b4a3a",
        highlight: "#d73333",
      };
    }

    return {
      border: "rgba(248, 113, 113, 0.14)",
      accent: "rgba(248, 113, 113, 0.16)",
      accentStrong: "rgba(248, 113, 113, 0.26)",
      glow: "rgba(248, 113, 113, 0.18)",
      surface: "rgba(22, 10, 15, 0.74)",
      surfaceSoft: "rgba(18, 8, 12, 0.58)",
      card: "rgba(24, 10, 16, 0.72)",
      cardStrong: "rgba(32, 14, 22, 0.82)",
      text: "#fef2f2",
      textSub: "#fca5a5",
      highlight: "#fb7185",
    };
  }, [theme]);

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    []
  );

  return (
    <section id="faq" className="relative overflow-hidden border-t border-[color:var(--border)]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            theme === "light"
              ? "radial-gradient(900px 520px at 20% 20%, rgba(211,51,51,0.12), transparent 62%), radial-gradient(700px 440px at 82% 28%, rgba(233, 87, 129, 0.1), transparent 58%)"
              : "radial-gradient(900px 520px at 20% 20%, rgba(251,113,133,0.14), transparent 62%), radial-gradient(700px 440px at 82% 28%, rgba(244,114,182,0.12), transparent 58%)",
        }}
      />

      <Container className="py-16 sm:py-20 md:py-24">
        <div className="mb-10 sm:mb-14 flex items-center gap-2 sm:gap-4">
          <motion.div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, transparent, ${palette.border}, transparent)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]" style={{ color: palette.highlight }}>
            FAQ
          </span>
          <motion.div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to left, transparent, ${palette.border}, transparent)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.9rem] border p-6 sm:p-8"
            style={{
              borderColor: palette.border,
              background: `linear-gradient(180deg, ${palette.surface}, ${palette.surfaceSoft})`,
              boxShadow: `0 24px 70px ${theme === "light" ? "rgba(211,51,51,0.08)" : "rgba(0,0,0,0.25)"}`,
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: palette.glow }}
            />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${palette.accentStrong}, transparent)` }}
            />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-2)]">
              Portfolio clarity
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: palette.text }}>
              Common questions about Anish Seth
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 sm:text-base" style={{ color: palette.textSub }}>
              This block is built to feel like the rest of the site: restrained, high-contrast, and product-grade. It also gives search engines explicit answers for the name, handles, and portfolio domain.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Main domain", value: "anishseth.xyz" },
                { label: "Instagram", value: "@_anish.seth_" },
                { label: "X", value: "@AnishSeth170734" },
                { label: "Focus", value: "Next.js, React, AI" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border px-4 py-3 backdrop-blur-xl"
                  style={{
                    borderColor: palette.border,
                    background: theme === "light" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.highlight }}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: palette.text }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs leading-6" style={{ color: palette.textSub }}>
              Official site: <span className="font-semibold" style={{ color: palette.text }}>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
            </p>
          </motion.div>

          <div className="grid gap-3 sm:gap-4">
            {faqItems.map((item, index) => {
              const open = openIndex === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-[1.5rem] border backdrop-blur-xl"
                  style={{
                    borderColor: palette.border,
                    background: open
                      ? `linear-gradient(180deg, ${palette.cardStrong}, ${palette.card})`
                      : `linear-gradient(180deg, ${palette.card}, ${theme === "light" ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.03)"})`,
                    boxShadow: open ? `0 18px 50px ${theme === "light" ? "rgba(211,51,51,0.08)" : "rgba(0,0,0,0.18)"}` : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-sm font-semibold leading-6 sm:text-base" style={{ color: palette.text }}>
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: palette.border, background: theme === "light" ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.04)", color: palette.textSub }}
                    >
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-base leading-none"
                      >
                        ▾
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5 sm:px-6">
                          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${palette.border}, transparent)` }} />
                          <p className="mt-4 max-w-3xl text-sm leading-7 sm:text-base" style={{ color: palette.textSub }}>
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Container>
    </section>
  );
}