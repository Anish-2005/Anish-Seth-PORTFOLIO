import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[3px] font-medium tracking-[-0.005em] transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Ink button; an accent panel wipes in from the left on hover.
  primary:
    "bg-fg text-bg before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:text-accent-fg hover:before:scale-x-100 [&>*]:relative",
  secondary: "border border-line-strong text-fg hover:border-fg",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.82rem]",
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-12 px-6 text-[0.94rem]",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Wraps text nodes so the primary button's hover panel stays behind them. */
function Inner({ children }: { children: ReactNode }) {
  return <span className="relative inline-flex items-center gap-2.5">{children}</span>;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);
  // Same-page anchors (#work) and files don't need client routing or a prefetch.
  if (external || href.startsWith("#") || href.startsWith("http") || href.endsWith(".pdf") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        <Inner>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}
