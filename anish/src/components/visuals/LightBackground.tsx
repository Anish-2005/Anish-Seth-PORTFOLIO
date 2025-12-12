import { motion, useScroll, useTransform } from "framer-motion";

export function LightBackground() {
  const { scrollYProgress } = useScroll();
  const bandY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#fff7f7] via-[#fff1ee] to-[#ffe9e5]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 840px at 16% 10%, rgba(239,68,68,0.16), transparent 62%), radial-gradient(1100px 760px at 80% 12%, rgba(244,114,182,0.12), transparent 64%)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-x-[-18%] top-[18%] h-64 rotate-[-4deg] opacity-55"
        style={{
          background:
            "linear-gradient(95deg, rgba(239,68,68,0.16) 0%, rgba(244,114,182,0.12) 35%, transparent 75%)",
          filter: "blur(18px)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 28%, rgba(153,27,27,0.16), transparent), radial-gradient(1px 1px at 68% 54%, rgba(239,68,68,0.22), transparent), radial-gradient(1px 1px at 44% 78%, rgba(244,114,182,0.2), transparent)",
          backgroundSize: "260px 260px",
          opacity: 0.35,
          y: dotsY,
        }}
      />
    </div>
  );
}