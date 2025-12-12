"use client";

import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMemo, useRef } from "react";

// Icon components
const TrophyIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const RocketIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CertificateIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Achievement and certification data
const achievementsData = {
  hackathons: [
    {
      id: "sih2025",
      title: "Smart India Hackathon 2025",
      status: "Finalist",
      project: "Nyantra - DBT Social Assistance Platform",
      date: "2025",
      description: "Advanced to national finals with ML-powered welfare management system",
      IconComponent: TrophyIcon
    },
    {
      id: "sih2024",
      title: "Smart India Hackathon 2024",
      status: "Finalist",
      project: "LawAI Mobile - AI Legal Assistant",
      date: "2024",
      description: "Built AI-powered legal assistance app democratizing access to legal knowledge",
      IconComponent: TrophyIcon
    },
    {
      id: "hack4bengal",
      title: "Hack4Bengal 2025",
      status: "Finalist",
      project: "Innovation Challenge",
      date: "2025",
      description: "Competed among top teams in Bengal's premier hackathon",
      IconComponent: RocketIcon
    }
  ],
  certifications: [
    {
      id: "oracle-ai",
      title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      skills: ["OCI", "AI Foundations", "Cloud Infrastructure", "Machine Learning"],
      verified: true
    },
    {
      id: "eduskills-fullstack",
      title: "Web Developer Full Stack Virtual Internship",
      issuer: "EduSkills Foundation",
      date: "Jun 2025",
      skills: ["HTML", "CSS", "JavaScript", "MySQL", "MongoDB", "Git", "Web Hosting"],
      verified: true
    },
    {
      id: "google-aiml",
      title: "Google AI/ML Virtual Internship",
      issuer: "Google for Developers",
      date: "Mar 2025",
      skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
      verified: true
    },
    {
      id: "aws-cloud-architecting",
      title: "AWS Academy Cloud Architecting",
      issuer: "Amazon Web Services",
      date: "Jan 2025",
      skills: ["AWS", "Cloud Architecture", "Solution Design", "Best Practices"],
      verified: true
    },
    {
      id: "aicte-aws-cloud",
      title: "AICTE Virtual Internship on AWS Cloud",
      issuer: "AICTE & EduSkills Foundation",
      date: "2024",
      skills: ["AWS Cloud", "Cloud Services", "Virtual Internship", "Cloud Computing"],
      verified: true
    }
  ],
  recognition: [
    {
      id: "sih-finalist",
      title: "Smart India Hackathon Finalist (2024 & 2025)",
      description: "Consecutive finalist in India's largest hackathon, competing against 100,000+ teams nationally with innovative solutions for real-world problems",
      date: "2024-2025",
      metric: "Top 1% nationally"
    },
    {
      id: "hackathon-organizer",
      title: "EDUC-A-THON Organizer",
      description: "Founded and organized EDUC-A-THON, bringing together developers, designers, and innovators to solve educational challenges through technology",
      date: "2025",
      metric: "Event Leadership"
    }
  ]
};

export function Achievements() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const palette = useMemo(() => {
    if (theme === "light") {
      return {
        accent: "rgba(211, 51, 51, 0.12)",
        accentStrong: "rgba(211, 51, 51, 0.25)",
        glow: "rgba(211, 51, 51, 0.4)",
        cardBg: "rgba(250, 229, 226, 0.6)",
        cardBorder: "rgba(211, 51, 51, 0.18)",
        glassBg: "rgba(255, 255, 255, 0.7)",
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

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative overflow-hidden border-t py-24 md:py-32"
      style={{ borderColor: palette.cardBorder }}
    >
      {/* Background effects */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          opacity,
          background: `
            radial-gradient(1000px 800px at 30% 40%, ${palette.accent}, transparent 70%),
            radial-gradient(900px 700px at 70% 60%, ${palette.accentStrong}, transparent 65%)
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
            <motion.div
              className="pointer-events-none absolute -left-20 -top-10 h-40 w-40 rounded-full blur-3xl"
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
              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-4">
                <motion.div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to right, transparent, ${palette.cardBorder}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: palette.highlight }}
                >
                  Achievements
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
              <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                <span style={{ color: palette.text }}>Recognized for </span>
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${palette.highlight}, ${palette.textSub})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Excellence
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full"
                    style={{ background: palette.highlight }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                <span style={{ color: palette.text }}> &amp; Innovation</span>
              </h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed md:text-lg"
                style={{ color: palette.textSub }}
              >
                National-level hackathon finalist, certified in cutting-edge technologies, and recognized for{" "}
                <span className="font-semibold" style={{ color: palette.text }}>open-source contributions</span>
                {" "}and academic excellence.
              </motion.p>
            </motion.div>
          </div>

          {/* Hackathon Achievements */}
          <div className="mt-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3 text-2xl font-bold"
              style={{ color: palette.text }}
            >
              <TrophyIcon className="h-7 w-7" style={{ color: palette.highlight }} />
              Hackathon Achievements
            </motion.h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {achievementsData.hackathons.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl"
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
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "linear"
                    }}
                  />

                  <div className="mb-4">
                    <achievement.IconComponent className="h-10 w-10" style={{ color: palette.highlight }} />
                  </div>
                  
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-lg font-bold" style={{ color: palette.text }}>
                      {achievement.title}
                    </h4>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                      style={{
                        background: palette.accentStrong,
                        color: palette.text
                      }}
                    >
                      {achievement.status}
                    </span>
                  </div>

                  <p className="mb-2 text-sm font-semibold" style={{ color: palette.highlight }}>
                    {achievement.project}
                  </p>

                  <p className="mb-3 text-sm leading-relaxed opacity-80" style={{ color: palette.text }}>
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between text-xs opacity-60" style={{ color: palette.text }}>
                    <span>{achievement.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3 text-2xl font-bold"
              style={{ color: palette.text }}
            >
              <CertificateIcon className="h-7 w-7" style={{ color: palette.highlight }} />
              Certifications
            </motion.h3>

            <div className="grid gap-6 md:grid-cols-2">
              {achievementsData.certifications.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl"
                  style={{
                    background: palette.glassBg,
                    border: `1px solid ${palette.cardBorder}`
                  }}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: `0 0 25px ${palette.glow}`
                  }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold" style={{ color: palette.text }}>
                        {cert.title}
                      </h4>
                      <p className="mt-1 text-sm font-semibold" style={{ color: palette.textSub }}>
                        {cert.issuer}
                      </p>
                    </div>
                    {cert.verified && (
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: palette.highlight }}>
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg px-3 py-1 text-xs font-medium"
                        style={{
                          background: palette.cardBg,
                          border: `1px solid ${palette.cardBorder}`,
                          color: palette.text
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs opacity-60" style={{ color: palette.text }}>
                    Issued: {cert.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div className="mt-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3 text-2xl font-bold"
              style={{ color: palette.text }}
            >
              <StarIcon className="h-7 w-7" style={{ color: palette.highlight }} />
              Recognition
            </motion.h3>

            <div className="grid gap-6 md:grid-cols-2">
              {achievementsData.recognition.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl"
                  style={{
                    background: palette.cardBg,
                    border: `1px solid ${palette.cardBorder}`
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 30px ${palette.glow}`
                  }}
                >
                  <div className="absolute right-4 top-4 opacity-10">
                    <StarIcon className="h-20 w-20" style={{ color: palette.text }} />
                  </div>
                  
                  <h4 className="relative z-10 text-2xl font-bold" style={{ color: palette.text }}>
                    {item.title}
                  </h4>
                  <p className="relative z-10 mt-3 text-sm leading-relaxed opacity-90" style={{ color: palette.text }}>
                    {item.description}
                  </p>

                  <div className="relative z-10 mt-6 flex items-center justify-between">
                    <span
                      className="rounded-full px-4 py-2 text-sm font-bold"
                      style={{
                        background: palette.accentStrong,
                        color: palette.text
                      }}
                    >
                      {item.metric}
                    </span>
                    <span className="text-xs opacity-60" style={{ color: palette.text }}>
                      {item.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
