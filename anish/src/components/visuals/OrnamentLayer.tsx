import { motion, type MotionValue, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

export function OrnamentLayer({ parallaxScale }: { parallaxScale?: MotionValue<number> }) {
  const { scrollY } = useScroll();
  const fallbackScale = useMotionValue(1);
  const scale = parallaxScale ?? fallbackScale;
  const nearY = useMotionValue(0);
  const midY = useMotionValue(0);
  const farY = useMotionValue(0);

  const recalc = () => {
    const s = scale.get();
    const sy = scrollY.get();
    nearY.set(-28 * s * (sy / 1400));
    midY.set(-16 * s * (sy / 1400));
    farY.set(-8 * s * (sy / 1400));
  };

  useMotionValueEvent(scrollY, "change", recalc);
  useMotionValueEvent(scale, "change", recalc);

  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-55"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 25%, rgba(255,255,255,0.06), transparent 65%), radial-gradient(60% 48% at 48% 60%, rgba(0,0,0,0.16), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-x-[-10%] top-[-8%] h-[46vh] opacity-60"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 60%, rgba(34,211,238,0.16), transparent 35%, rgba(20,184,166,0.14) 58%, transparent 78%, rgba(255,255,255,0.08) 92%)",
          filter: "blur(26px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 96, ease: "linear" }}
      />

      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          top: "14%",
          left: "6%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.32), transparent 55%), radial-gradient(circle at 70% 70%, rgba(94, 234, 212, 0.18), transparent 65%)",
          y: nearY,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 64, ease: "linear" }}
      />

      <motion.div
        className="absolute h-[440px] w-[440px] rounded-full blur-3xl"
        style={{
          bottom: "4%",
          right: "12%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08), transparent 62%), radial-gradient(circle at 70% 70%, rgba(14, 165, 233, 0.2), transparent 66%)",
          y: midY,
        }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 72, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 30%, var(--section-color), transparent 62%), radial-gradient(55% 45% at 50% 65%, color-mix(in_oklab, var(--section-color) 60%, transparent))",
          filter: "blur(28px)",
          y: midY,
        }}
        animate={{ opacity: [0.55, 0.75, 0.55] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--border)]/40"
        style={{ top: "50%", left: "50%", background: "radial-gradient(circle, transparent 60%, rgba(255,255,255,0.05) 100%)", y: farY }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-[58%] h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-55"
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, rgba(34,211,238,0.14) 25%, rgba(255,255,255,0.12) 50%, rgba(20,184,166,0.12) 72%, transparent 100%)",
          maskImage: "radial-gradient(70% 52% at 50% 50%, black 55%, transparent 100%)",
          filter: "blur(8px)",
        }}
        animate={{ y: [0, -16, 0], x: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 top-[18%] h-56 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 12px), linear-gradient(115deg, rgba(34,211,238,0.24), rgba(20,184,166,0.14) 30%, transparent 55%)",
          maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          y: farY,
        }}
      />

      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.2), transparent), radial-gradient(2px 2px at 70% 60%, rgba(34,211,238,0.22), transparent), radial-gradient(2px 2px at 40% 80%, rgba(94,234,212,0.22), transparent)",
          backgroundSize: "420px 420px",
          animation: "starfield 24s linear infinite",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-1/2 h-2 w-[36%] -translate-x-1/2 rounded-full bg-[color:var(--accent)]/30 blur-xl"
        animate={{ scaleX: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 30% 80%, rgba(34,211,238,0.4), transparent), radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.35), transparent)",
          backgroundSize: "180px 180px",
          opacity: 0.65,
        }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
