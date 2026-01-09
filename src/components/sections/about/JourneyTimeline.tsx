import { motion } from "framer-motion";
import { memo } from "react";
import type { AboutData, AboutPalette } from "./types";
import type { ThemeName } from "@/lib/themes";

type JourneyTimelineProps = {
  aboutData: AboutData;
  palette: AboutPalette;
  isMobile: boolean;
  theme: ThemeName;
};

const JourneyTimeline = memo(function JourneyTimeline({ aboutData, palette, isMobile, theme }: JourneyTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${isMobile ? "" : "backdrop-blur-xl"}`}
      style={{
        background: palette.cardBg,
        border: `1px solid ${palette.cardBorder}`
      }}
    >
      {/* Accent gradient */}
      <div
        className="absolute left-0 top-0 h-40 w-40 rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
        }}
      />
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-bold" style={{ color: palette.text }}>
          My Journey
        </h3>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm opacity-70" style={{ color: palette.text }}>
          Evolution as a developer
        </p>
        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {aboutData.journey.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative pl-4 sm:pl-6"
            >
              {/* Timeline line */}
              <div
                className="absolute left-0 top-2 h-full w-px"
                style={{
                  background: `linear-gradient(to bottom, ${palette.cardBorder}, transparent)`
                }}
              />
              {/* Timeline dot */}
              <motion.div
                className="absolute left-[-4px] top-2 h-2 w-2 rounded-full"
                style={{
                  background: theme === "light" ? "#e74974" : "#fb7185",
                  boxShadow: `0 0 10px ${palette.glow}`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3,
                  ease: "easeInOut"
                }}
              />
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: palette.textSub }}>
                {item.year}
              </div>
              <h4 className="mt-0.5 sm:mt-1 text-sm sm:text-base font-bold" style={{ color: palette.text }}>
                {item.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed opacity-80" style={{ color: palette.text }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default JourneyTimeline;
