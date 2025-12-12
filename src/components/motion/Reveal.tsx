"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : reduce
            ? { opacity: 1 }
            : { opacity: 0, y: 16 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.42,
              ease: [0.2, 0.9, 0.3, 1],
              delay,
            }
      }
    >
      {children}
    </motion.div>
  );
}
