import { motion, useScroll, useTransform } from "framer-motion";

export function DarkBackground() {
  const { scrollYProgress } = useScroll();
  const bandY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#12060d] via-[#1a0c16] to-[#0d050c]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1300px 880px at 14% 12%, rgba(248,113,113,0.2), transparent 60%), radial-gradient(1200px 800px at 84% 14%, rgba(190,24,93,0.18), transparent 64%)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-x-[-20%] top-[12%] h-72 rotate-[-6deg] opacity-60"
        style={{
          background:
            "linear-gradient(105deg, rgba(248,113,113,0.2) 0%, rgba(190,24,93,0.16) 35%, transparent 75%)",
          filter: "blur(20px)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 22% 32%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 66% 60%, rgba(248,113,113,0.28), transparent), radial-gradient(1px 1px at 44% 78%, rgba(190,24,93,0.24), transparent)",
          backgroundSize: "260px 260px",
          opacity: 0.32,
          y: dotsY,
        }}
      />
    </div>
  );
}