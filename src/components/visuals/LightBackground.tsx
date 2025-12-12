import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function LightBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const bandY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -140]);
  const dotsY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 60]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.18, 0.4, 0.58]);
  const portalTiltX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [12, -10]);
  const portalTiltY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-8, 10]);
  const portalScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [0.98, 1.06]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.28, 0.36]);
  const d3Y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [18, -18]);
  const threeRotate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 14]);
  const threeScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.04]);
  const threeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.26, 0.34]);
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const mouseParallaxX = useTransform(cursorX, [0, 1], isMobile ? [0, 0] : [-18, 18]);
  const mouseParallaxY = useTransform(cursorY, [0, 1], isMobile ? [0, 0] : [-14, 14]);
  const depthLayer1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -80]);
  const depthLayer2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -120]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.08, 0.14, 0.18, 0.22]);

  useEffect(() => {
    if (isMobile) return; // Disable mouse tracking on mobile
    
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
        background: "linear-gradient(135deg, #fae5e2 0%, #f6d0cb 34%, #f1bcb4 68%, #ecafa6 100%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1100px 820px at 18% 12%, rgba(213,45,45,0.24), transparent 58%), radial-gradient(1200px 780px at 82% 14%, rgba(226,38,114,0.18), transparent 60%), radial-gradient(900px 640px at 50% 26%, rgba(235,120,120,0.18), transparent 62%)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(600px 600px at 30% 20%, rgba(213,45,45,0.16), transparent 50%), radial-gradient(700px 700px at 70% 80%, rgba(226,38,114,0.14), transparent 55%)",
          y: depthLayer1,
          opacity: 0.6,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(800px 800px at 50% 50%, rgba(230,84,152,0.12), transparent 60%)",
          y: depthLayer2,
          opacity: 0.5,
        }}
      />

      <motion.div
        className="absolute inset-x-[-12%] top-[18%] h-64 rotate-[-6deg] opacity-55"
        style={{
          background:
            "linear-gradient(110deg, rgba(213,45,45,0.26) 0%, rgba(226,38,114,0.2) 32%, rgba(255,255,255,0.1) 58%, transparent 82%)",
          filter: "blur(24px)",
          y: bandY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 28%, rgba(153,27,27,0.2), transparent), radial-gradient(1px 1px at 68% 54%, rgba(213,45,45,0.22), transparent), radial-gradient(1px 1px at 44% 78%, rgba(226,38,114,0.22), transparent)",
          backgroundSize: "240px 240px",
          opacity: 0.32,
          y: dotsY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 18% 22%, rgba(213,45,45,0.34), transparent), radial-gradient(2px 2px at 44% 42%, rgba(226,38,114,0.3), transparent), radial-gradient(2px 2px at 68% 26%, rgba(210,16,64,0.28), transparent), radial-gradient(2px 2px at 62% 64%, rgba(230,84,152,0.3), transparent)",
          backgroundSize: "320px 320px",
          opacity: 0.36,
          mixBlendMode: "screen",
          y: d3Y,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(213,45,45,0.22) 1px, transparent 1px), linear-gradient(0deg, rgba(226,38,114,0.18) 1px, transparent 1px)",
          backgroundSize: "320px 320px, 320px 320px",
          opacity: 0.16,
          y: d3Y,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(213,45,45,0.04) 0px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, rgba(226,38,114,0.04) 0px, transparent 2px, transparent 4px)",
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
            "radial-gradient(circle, rgba(213,45,45,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: threeOpacity,
          rotate: threeRotate,
          scale: threeScale,
          x: mouseParallaxX,
          y: mouseParallaxY,
          background:
            "conic-gradient(from 45deg, rgba(213,45,45,0.32), rgba(230,84,152,0.2), rgba(255,255,255,0.1), rgba(213,45,45,0.24))",
          maskImage: "radial-gradient(90% 90% at 50% 50%, black 45%, transparent 62%)",
          filter: "blur(1px)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: 0.2,
          x: mouseParallaxX,
          y: mouseParallaxY,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(213,45,45,0.4) 5%, transparent 10%, transparent 90%, rgba(226,38,114,0.3) 95%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: portalOpacity,
          rotateX: portalTiltX,
          rotateY: portalTiltY,
          scale: portalScale,
          x: mouseParallaxX,
          y: mouseParallaxY,
          background:
            "conic-gradient(from 20deg, rgba(213,45,45,0.36), rgba(255,255,255,0.12), rgba(230,84,152,0.28), rgba(213,45,45,0.28))",
          maskImage: "radial-gradient(80% 80% at 50% 50%, transparent 30%, black 46%, black 70%, transparent 82%)",
          boxShadow: "0 20px 56px rgba(213,45,45,0.28), inset 0 -10px 40px rgba(213,45,45,0.1)",
          filter: "blur(1.2px)",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: 0.15,
          x: mouseParallaxX,
          y: mouseParallaxY,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(213,45,45,0.5) 3%, transparent 6%, transparent 47%, rgba(226,38,114,0.4) 50%, transparent 53%, transparent 97%, rgba(230,84,152,0.3) 100%)",
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: accentOpacity,
          backgroundImage:
            "radial-gradient(1220px 840px at 20% 72%, rgba(213,45,45,0.24), transparent 60%), radial-gradient(1000px 640px at 76% 50%, rgba(226,38,114,0.22), transparent 62%), linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.07) 34%, transparent 68%)",
          mixBlendMode: "screen",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}