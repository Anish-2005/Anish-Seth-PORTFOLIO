"use client";

import { useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/Icon";
import { applyTheme, getTheme, THEME_EVENT, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}

export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        applyTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
      title={theme ? `Switch to ${next} theme` : "Toggle theme"}
      className={cn(
        "relative grid size-9 place-items-center text-muted transition-colors hover:text-fg",
        className,
      )}
    >
      <Icon
        name="sun"
        size={17}
        className="absolute transition-all duration-500 ease-[var(--ease-out-expo)] dark:rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Icon
        name="moon"
        size={17}
        className="absolute rotate-90 scale-0 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
