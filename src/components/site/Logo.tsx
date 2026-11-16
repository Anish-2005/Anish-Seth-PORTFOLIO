import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-7 place-items-center bg-fg text-[11px] font-bold tracking-[-0.02em] text-bg [font-stretch:118%]",
        className,
      )}
    >
      AS
      <span className="absolute -right-[3px] -top-[3px] size-[6px] bg-accent" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="Anish Seth — home">
      <LogoMark />
      <span className="text-[0.92rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">Anish Seth</span>
    </Link>
  );
}
