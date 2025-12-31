import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";

function OrnamentLayerInner() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-5 overflow-hidden hidden md:block">
      <motion.div
        className="absolute inset-x-0 md:inset-x-[-20%] top-[18%] h-40 opacity-30"
        style={{
          background: "radial-gradient(80% 60% at 50% 40%, color-mix(in_oklab, var(--section-color) 55%, transparent), transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div className="absolute inset-0">
        <div
          className="absolute left-[6%] top-[12%] h-16 w-16 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(239,68,68,0.55) 60%, rgba(244,114,182,0.26))",
            boxShadow: "0 12px 26px rgba(239,68,68,0.2)",
          }}
        />
        <div
          className="absolute right-[10%] top-[18%] h-14 w-14"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(145deg, rgba(236,72,153,0.68), rgba(248,113,113,0.55))",
            filter: "drop-shadow(0 10px 22px rgba(236,72,153,0.26))",
          }}
        />
        <div
          className="absolute left-[28%] top-[24%] h-14 w-28 rounded-xl border border-white/25 bg-white/10 backdrop-blur-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(239,68,68,0.35) 0 60%, transparent 60%), linear-gradient(0deg, rgba(255,255,255,0.32) 2px, transparent 2px)",
            backgroundSize: "100% 2px, 100% 10px",
            backgroundRepeat: "no-repeat, repeat-y",
            backgroundPosition: "0 10px, 0 6px",
            boxShadow: "0 12px 24px rgba(239,68,68,0.16)",
          }}
        >
          <div className="absolute right-3 top-2 text-xs font-semibold tracking-wide text-white/90">&lt;/&gt;</div>
        </div>

        <div
          className="absolute right-[14%] bottom-[18%] h-12 w-24 rounded-2xl"
          style={{
            background: "linear-gradient(125deg, rgba(236,72,153,0.62), rgba(190,24,93,0.4))",
            boxShadow: "0 14px 28px rgba(190,24,93,0.22)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(255,255,255,0.32) 2px, transparent 2px)",
              backgroundSize: "100% 11px",
              opacity: 0.7,
            }}
          />
          <div className="absolute left-3 bottom-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
            code
          </div>
        </div>

        <div
          className="absolute left-[12%] bottom-[14%] h-12 w-12"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(170deg, rgba(248,113,113,0.7), rgba(255,255,255,0.24))",
            filter: "drop-shadow(0 10px 22px rgba(248,113,113,0.22))",
          }}
        />

        <div
          className="absolute left-[40%] bottom-[10%] h-12 w-12 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5), rgba(236,72,153,0.52) 60%, rgba(190,24,93,0.22))",
            boxShadow: "0 12px 26px rgba(236,72,153,0.2)",
          }}
        />

        <div
          className="absolute left-[8%] top-[32%] min-w-[88px] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(120deg, rgba(15,23,42,0.75), rgba(239,68,68,0.6))",
            backdropFilter: "blur(4px)",
          }}
        >
          Next.js
        </div>

        <div
          className="absolute right-[12%] top-[34%] min-w-[86px] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(120deg, rgba(17,24,39,0.8), rgba(59,130,246,0.7))",
            backdropFilter: "blur(4px)",
          }}
        >
          MERN
        </div>

        <div
          className="absolute left-[46%] top-[46%] min-w-[94px] -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(120deg, rgba(56,189,248,0.75), rgba(14,165,233,0.6))",
            backdropFilter: "blur(4px)",
          }}
        >
          Flutter
        </div>

        <div
          className="absolute right-[8%] top-[52%] min-w-[86px] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(125deg, rgba(244,114,182,0.7), rgba(239,68,68,0.62))",
            backdropFilter: "blur(4px)",
          }}
        >
          JS
        </div>

        <div
          className="absolute left-[14%] bottom-[32%] min-w-[92px] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(120deg, rgba(190,24,93,0.7), rgba(109,40,217,0.6))",
            backdropFilter: "blur(4px)",
          }}
        >
          Native
        </div>

        <div
          className="absolute right-[18%] bottom-[30%] min-w-[86px] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(120deg, rgba(30,41,59,0.75), rgba(16,185,129,0.68))",
            backdropFilter: "blur(4px)",
          }}
        >
          ML
        </div>

        <div
          className="absolute left-[44%] bottom-[18%] min-w-[112px] -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 shadow-lg"
          style={{
            background: "linear-gradient(125deg, rgba(12,74,110,0.8), rgba(22,163,74,0.7))",
            backdropFilter: "blur(4px)",
          }}
        >
          Blockchain
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 24%, rgba(255,255,255,0.28), transparent), radial-gradient(1px 1px at 72% 64%, rgba(0,0,0,0.18), transparent), radial-gradient(1px 1px at 44% 82%, rgba(34,211,238,0.25), transparent)",
          backgroundSize: "240px 240px",
          opacity: 0.28,
        }}
        animate={reduce ? undefined : { y: [-4, 6, -4] }}
        transition={reduce ? undefined : { repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />
    </div>
  );
}

export const OrnamentLayer = memo(OrnamentLayerInner);
