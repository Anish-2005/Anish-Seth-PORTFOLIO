import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";

export function DarkBackground() {
  const { scrollYProgress } = useScroll();
  const bandY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.24, 0.42, 0.64]);
  const d3Y = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const threeRotate = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const threeScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const threeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.38]);
  const portalTiltX = useTransform(scrollYProgress, [0, 1], [-10, 12]);
  const portalTiltY = useTransform(scrollYProgress, [0, 1], [10, -12]);
  const portalScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.08]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.28, 0.36]);
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const mouseParallaxX = useTransform(cursorX, [0, 1], [-22, 22]);
  const mouseParallaxY = useTransform(cursorY, [0, 1], [-16, 16]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      cursorX.set(x);
      cursorY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f060b 0%, #150910 34%, #0f080f 62%, #0c050b 100%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 820px at 16% 14%, rgba(248,113,113,0.18), transparent 58%), radial-gradient(1180px 760px at 86% 12%, rgba(190,24,93,0.16), transparent 60%), radial-gradient(900px 640px at 48% 24%, rgba(88,28,67,0.22), transparent 64%)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-x-[-14%] top-[14%] h-72 rotate-[-7deg] opacity-60"
        style={{
          background:
            "linear-gradient(115deg, rgba(248,113,113,0.18) 0%, rgba(190,24,93,0.14) 30%, rgba(255,255,255,0.06) 58%, transparent 82%)",
          filter: "blur(26px)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 22% 32%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 66% 60%, rgba(248,113,113,0.26), transparent), radial-gradient(1px 1px at 44% 78%, rgba(190,24,93,0.22), transparent)",
          backgroundSize: "240px 240px",
          opacity: 0.3,
          y: dotsY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 18% 24%, rgba(248,113,113,0.3), transparent), radial-gradient(2px 2px at 46% 44%, rgba(190,24,93,0.26), transparent), radial-gradient(2px 2px at 70% 28%, rgba(244,114,182,0.24), transparent), radial-gradient(2px 2px at 64% 66%, rgba(236,72,153,0.24), transparent)",
          backgroundSize: "320px 320px",
          opacity: 0.3,
          mixBlendMode: "screen",
          y: d3Y,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(248,113,113,0.16) 1px, transparent 1px), linear-gradient(0deg, rgba(190,24,93,0.14) 1px, transparent 1px)",
          backgroundSize: "320px 320px, 320px 320px",
          opacity: 0.12,
          y: d3Y,
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: threeOpacity,
          rotate: threeRotate,
          scale: threeScale,
          x: mouseParallaxX,
          y: mouseParallaxY,
          background:
            "conic-gradient(from 35deg, rgba(248,113,113,0.26), rgba(190,24,93,0.14), rgba(255,255,255,0.07), rgba(248,113,113,0.2))",
          maskImage: "radial-gradient(88% 88% at 50% 50%, black 46%, transparent 64%)",
          filter: "blur(1px)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: portalOpacity,
          rotateX: portalTiltX,
          rotateY: portalTiltY,
          scale: portalScale,
          x: mouseParallaxX,
          y: mouseParallaxY,
          background:
            "conic-gradient(from -10deg, rgba(248,113,113,0.28), rgba(255,255,255,0.08), rgba(190,24,93,0.22), rgba(248,113,113,0.24))",
          maskImage: "radial-gradient(82% 82% at 50% 50%, transparent 32%, black 48%, black 72%, transparent 84%)",
          boxShadow: "0 22px 56px rgba(190,24,93,0.24)",
          filter: "blur(1.2px)",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 52, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: accentOpacity,
          backgroundImage:
            "radial-gradient(1220px 840px at 22% 72%, rgba(248,113,113,0.22), transparent 58%), radial-gradient(1000px 640px at 74% 48%, rgba(190,24,93,0.18), transparent 62%), linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 34%, transparent 70%)",
          mixBlendMode: "screen",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}