import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  size?: "sm" | "md";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)] hover:-translate-y-[1px] hover:shadow-[0_10px_30px_rgba(6,182,212,0.18)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#d73333,#e74974)] text-white hover:brightness-110 shadow-[0_0_20px_rgba(211,51,51,0.3)]",
  secondary:
    "border border-[color:var(--border)] bg-[color:var(--surface-1)] text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)]",
  ghost:
    "text-[color:var(--text-0)] hover:bg-[color:var(--surface-1)]",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
} as const;

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & BaseProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> &
  BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
