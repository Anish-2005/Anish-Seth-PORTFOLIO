import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  size?: "sm" | "md";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium will-change-transform transition-[background-color,border-color,color,box-shadow,filter,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)] hover:-translate-y-[1px] hover:shadow-[0_10px_30px_var(--cta-hover-shadow)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--cta-primary-start),var(--cta-primary-end))] text-white hover:brightness-105 shadow-[0_0_20px_var(--cta-primary-shadow)]",
  secondary:
    "border border-[color:var(--border)] bg-[color:var(--surface-1)] text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)] hover:border-[color:var(--cta-secondary-border-hover)]",
  ghost:
    "text-[color:var(--text-0)] hover:bg-[color:var(--surface-1)] hover:text-[color:var(--cta-ghost-text-hover)]",
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
