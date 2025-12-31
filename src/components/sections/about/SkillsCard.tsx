import { motion } from "framer-motion";
import { memo } from "react";

const SkillsCard = memo(function SkillsCard({ aboutData, palette, isMobile }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
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
        className="absolute right-0 top-0 h-40 w-40 rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${palette.glow}, transparent 70%)`
        }}
      />
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-bold" style={{ color: palette.text }}>
          Technical Arsenal
        </h3>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm opacity-70" style={{ color: palette.text }}>
          Technologies I work with daily
        </p>
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div>
            <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
              Frontend
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {aboutData.skills.frontend.map((skill: string) => (
                <span
                  key={skill}
                  className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                  style={{
                    background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                    border: `1px solid ${palette.cardBorder}`,
                    color: palette.text
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
              Backend
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {aboutData.skills.backend.map((skill: string) => (
                <span
                  key={skill}
                  className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                  style={{
                    background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                    border: `1px solid ${palette.cardBorder}`,
                    color: palette.text
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider opacity-60" style={{ color: palette.text }}>
              Tools & Platform
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {aboutData.skills.tools.map((skill: string) => (
                <span
                  key={skill}
                  className={`rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-sm font-medium ${isMobile ? "" : "backdrop-blur-xl"}`}
                  style={{
                    background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                    border: `1px solid ${palette.cardBorder}`,
                    color: palette.text
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SkillsCard;
