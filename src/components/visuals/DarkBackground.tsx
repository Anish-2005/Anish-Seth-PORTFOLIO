import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function DarkBackground() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const bandY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -170]);
  const dotsY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 80]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.24, 0.42, 0.64]);
  const d3Y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [22, -22]);
  const threeRotate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -16]);
  const threeScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.05]);
  const threeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.38]);
  const portalTiltX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-10, 12]);
  const portalTiltY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [10, -12]);
  const portalScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0.98, 1.08]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.28, 0.36]);
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const mouseParallaxX = useTransform(cursorX, [0, 1], isMobile ? [0, 0] : [-22, 22]);
  const mouseParallaxY = useTransform(cursorY, [0, 1], isMobile ? [0, 0] : [-16, 16]);
  const depthLayer1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -90]);
  const depthLayer2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -130]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.16, 0.2, 0.24]);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      cursorX.set(x);
      cursorY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isMobile]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f060b 0%, #150910 34%, #0f080f 62%, #0c050b 100%)",
      }}
    >
      {isMobile ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 600px at 20% 20%, rgba(248,113,113,0.08), transparent 50%), radial-gradient(700px 500px at 80% 80%, rgba(190,24,93,0.06), transparent 50%)",
          }}
        />
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(1200px 820px at 16% 14%, rgba(248,113,113,0.18), transparent 58%), radial-gradient(1180px 760px at 86% 12%, rgba(190,24,93,0.16), transparent 60%), radial-gradient(900px 640px at 48% 24%, rgba(88,28,67,0.22), transparent 64%)",
              y: bandY,
            }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(650px 650px at 25% 25%, rgba(248,113,113,0.2), transparent 52%), radial-gradient(750px 750px at 75% 75%, rgba(190,24,93,0.18), transparent 58%)",
              y: depthLayer1,
              opacity: 0.7,
            }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(850px 850px at 50% 50%, rgba(244,114,182,0.15), transparent 65%)",
              y: depthLayer2,
              opacity: 0.6,
            }}
          />

          <motion.div
            className="absolute inset-x-0 md:inset-x-[-14%] top-[14%] h-72 rotate-[-7deg] opacity-60"
            style={{
              background:
                "linear-gradient(115deg, rgba(248,113,113,0.18) 0%, rgba(190,24,93,0.14) 30%, rgba(255,255,255,0.06) 58%, transparent 82%)",
              filter: "blur(26px)",
              y: bandY,
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle 2.4px at 50% 50%, rgba(248,113,113,0.26) 0%, transparent 100%)",
              backgroundSize: "54px 54px",
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
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(248,113,113,0.06) 0px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, rgba(190,24,93,0.05) 0px, transparent 2px, transparent 4px)",
              backgroundSize: "80px 80px",
              opacity: meshOpacity,
              mixBlendMode: "overlay",
            }}
          />

          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(248,113,113,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.4,
            }}
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              opacity: threeOpacity,
              rotate: threeRotate,
              scale: threeScale,
              x: mouseParallaxX,
              y: mouseParallaxY,
              background:
                "conic-gradient(from 35deg, rgba(248,113,113,0.3), rgba(190,24,93,0.18), rgba(255,255,255,0.09), rgba(248,113,113,0.24))",
              maskImage: "radial-gradient(88% 88% at 50% 50%, black 46%, transparent 64%)",
              filter: "blur(1px)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              opacity: 0.25,
              x: mouseParallaxX,
              y: mouseParallaxY,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(248,113,113,0.5) 5%, transparent 10%, transparent 90%, rgba(190,24,93,0.4) 95%, transparent 100%)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>

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
                "conic-gradient(from -10deg, rgba(248,113,113,0.32), rgba(255,255,255,0.1), rgba(190,24,93,0.26), rgba(248,113,113,0.28))",
              maskImage: "radial-gradient(82% 82% at 50% 50%, transparent 32%, black 48%, black 72%, transparent 84%)",
              boxShadow: "0 22px 56px rgba(190,24,93,0.28), inset 0 -12px 45px rgba(248,113,113,0.12)",
              filter: "blur(1.2px)",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 52, ease: "linear" }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              opacity: 0.18,
              x: mouseParallaxX,
              y: mouseParallaxY,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 65, ease: "linear", repeat: Infinity }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(248,113,113,0.6) 3%, transparent 6%, transparent 47%, rgba(190,24,93,0.5) 50%, transparent 53%, transparent 97%, rgba(244,114,182,0.4) 100%)",
                filter: "blur(14px)",
              }}
            />
          </motion.div>

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

          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle 1.8px at 50% 50%, rgba(248,113,113,0.32) 0%, transparent 100%)",
              backgroundSize: "68px 68px",
              y: dotsY,
              mixBlendMode: "screen",
            }}
          />
        </>
      )}
    </div>
  );
}