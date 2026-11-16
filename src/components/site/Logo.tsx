import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-fg font-mono text-[11px] font-semibold tracking-tight text-bg",
        className,
      )}
    >
      AS
      <span className="absolute right-[5px] top-[5px] size-[5px] rounded-full bg-accent" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5 rounded-xl", className)}
      aria-label="Anish Seth — home"
    >
      <LogoMark className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6" />
      <span className="text-[0.95rem] font-semibold tracking-tight">Anish Seth</span>
    </Link>
  );
}
