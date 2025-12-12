export function HeroFallback() {
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
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--surface-1)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="320" fill="var(--surface-1)" />
        <circle cx="160" cy="150" r="120" fill="url(#g)" />
        <g fill="none" stroke="var(--border)" strokeWidth="1">
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
          stroke="var(--accent)"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
