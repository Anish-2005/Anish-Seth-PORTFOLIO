import { motion } from "framer-motion";

export function LightBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1400px 880px at 18% 10%, rgba(20, 184, 166, 0.12), transparent 62%), radial-gradient(1200px 820px at 82% 8%, rgba(59, 130, 246, 0.08), transparent 66%), linear-gradient(180deg, #f9fcff, #edf3f9)",
        }}
      />

      <motion.div
        className="absolute inset-x-[-12%] top-[-6%] h-72 opacity-55"
        style={{
          background:
            "linear-gradient(120deg, rgba(20,184,166,0.16), rgba(59,130,246,0.14), transparent), radial-gradient(60% 40% at 60% 40%, rgba(20,184,166,0.12), transparent)",
          filter: "blur(26px)",
          maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
        animate={{ x: [0, 18, -12, 0] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 22% 32%, rgba(12,18,32,0.22), transparent), radial-gradient(2px 2px at 66% 64%, rgba(59,130,246,0.22), transparent), radial-gradient(2px 2px at 44% 78%, rgba(20,184,166,0.2), transparent)",
          backgroundSize: "360px 360px",
          opacity: 0.4,
        }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 32, ease: "easeInOut" }}
      />
    </div>
  );
}