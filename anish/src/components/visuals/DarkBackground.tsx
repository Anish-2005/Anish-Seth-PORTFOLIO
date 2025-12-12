import { motion } from "framer-motion";

export function DarkBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1400px 900px at 16% 14%, rgba(34, 211, 238, 0.14), transparent 58%), radial-gradient(1200px 820px at 86% 10%, rgba(94, 234, 212, 0.12), transparent 65%), linear-gradient(180deg, rgba(10, 15, 27, 0.98), rgba(10, 15, 27, 0.96))",
        }}
      />

      <motion.div
        className="absolute inset-x-[-12%] top-[-6%] h-72 opacity-65"
        style={{
          background:
            "linear-gradient(120deg, rgba(34,211,238,0.2), rgba(14,165,233,0.16), transparent), radial-gradient(60% 40% at 60% 40%, rgba(34,211,238,0.16), transparent)",
          filter: "blur(26px)",
          maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
        animate={{ x: [0, -18, 12, 0] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 22% 32%, rgba(255,255,255,0.18), transparent), radial-gradient(2px 2px at 66% 64%, rgba(34,211,238,0.2), transparent), radial-gradient(2px 2px at 44% 78%, rgba(94,234,212,0.18), transparent)",
          backgroundSize: "360px 360px",
          opacity: 0.35,
        }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 32, ease: "easeInOut" }}
      />
    </div>
  );
}