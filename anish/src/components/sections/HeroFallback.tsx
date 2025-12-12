import { useTheme } from "@/context/ThemeContext";

export function HeroFallback() {
  const { theme } = useTheme();

  const palette = theme === "light"
    ? {
        glow: "rgba(213,45,45,0.26)",
        stroke: "rgba(12,18,32,0.18)",
        ring: "rgba(213,45,45,0.34)",
        surface: "var(--surface-1)",
      }
    : {
        glow: "rgba(239,68,68,0.3)",
        stroke: "rgba(248,250,252,0.16)",
        ring: "rgba(239,68,68,0.42)",
        surface: "var(--surface-1)",
      };

  return (
    <div
      aria-hidden
      className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)]"
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        role="img"
        aria-label="Abstract hero graphic"
      >
        <defs>
          <radialGradient id="g" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={palette.glow} stopOpacity="0.9" />
            <stop offset="100%" stopColor={palette.surface} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="320" fill={palette.surface} />
        <circle cx="160" cy="150" r="120" fill="url(#g)" />
        <g fill="none" stroke={palette.stroke} strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M ${36 + i * 18} 36 L ${284 - i * 10} ${284 - i * 6}`}
              opacity={0.35}
            />
          ))}
        </g>
        <circle
          cx="160"
          cy="160"
          r="58"
          fill="none"
          stroke={palette.ring}
          strokeOpacity="0.9"
        />
      </svg>
    </div>
  );
}
