import { motion } from "framer-motion";
import { memo } from "react";

const PrinciplesGrid = memo(function PrinciplesGrid({ principles, palette, isMobile }: any) {
  return (
    <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((principle: any, idx: number) => {
        const IconComponent = principle.icon;
        return (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 ${isMobile ? "" : "backdrop-blur-xl"}`}
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
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: "linear"
              }}
            />
            {/* Hover gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${palette.accent}, transparent 70%)`
              }}
            />
            {/* Corner accents */}
            <div className="absolute right-0 top-0 h-16 w-16 opacity-30"
              style={{
                background: `radial-gradient(circle at top right, ${palette.glow}, transparent 70%)`
              }}
            />
            <div className="relative">
              {/* Icon with glow */}
              <motion.div
                className="inline-flex rounded-lg sm:rounded-xl p-2 sm:p-3"
                style={{
                  background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentStrong})`,
                  border: `1px solid ${palette.cardBorder}`,
                  color: palette.text
                }}
                whileHover={{
                  boxShadow: `0 0 20px ${palette.glow}`
                }}
              >
                <IconComponent />
              </motion.div>
              <h3 className="mt-3 sm:mt-5 text-base sm:text-lg font-bold" style={{ color: palette.text }}>
                {principle.title}
              </h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed opacity-80" style={{ color: palette.text }}>
                {principle.description}
              </p>
              {/* Decorative line */}
              <motion.div
                className="mt-4 h-px w-0 group-hover:w-full"
                style={{
                  background: `linear-gradient(90deg, ${palette.glow}, transparent)`
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

export default PrinciplesGrid;
