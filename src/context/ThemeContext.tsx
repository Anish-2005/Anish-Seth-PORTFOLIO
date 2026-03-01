"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";

import { themes, type ThemeName } from "@/lib/themes";

const STORAGE_KEY = "ui-theme";

type ThemeTransitionOrigin = {
  x: number;
  y: number;
};

type ViewTransitionLike = {
  ready: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionLike;
};

export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName, origin?: ThemeTransitionOrigin) => void;
  toggle: (origin?: ThemeTransitionOrigin) => void;
  options: { value: ThemeName; label: string }[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeVars(theme: ThemeName) {
  const def = themes[theme];
  if (!def) return;
  const root = document.documentElement;
  Object.entries(def.tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && themes[stored]) return stored;
    }
    return "dark";
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && themes[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    applyThemeVars(theme);
  }, [theme]);

  const persistTheme = useCallback((next: ThemeName) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const runThemeTransition = useCallback(
    (next: ThemeName, origin?: ThemeTransitionOrigin) => {
      if (typeof window === "undefined") return;

      const root = document.documentElement;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const docWithTransition = document as DocumentWithViewTransition;
      const supportsViewTransition = typeof docWithTransition.startViewTransition === "function";

      const applyNextTheme = () => {
        flushSync(() => {
          setThemeState(next);
        });
        applyThemeVars(next);
        persistTheme(next);
      };

      if (!supportsViewTransition || prefersReducedMotion) {
        root.classList.add("theme-transitioning");
        applyNextTheme();
        window.setTimeout(() => {
          root.classList.remove("theme-transitioning");
        }, 450);
        return;
      }

      const centerX = origin?.x ?? window.innerWidth / 2;
      const centerY = origin?.y ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(centerX, window.innerWidth - centerX),
        Math.max(centerY, window.innerHeight - centerY)
      );

      const transition = docWithTransition.startViewTransition!(applyNextTheme);

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${centerX}px ${centerY}px)`,
                `circle(${endRadius}px at ${centerX}px ${centerY}px)`,
              ],
            },
            {
              duration: 700,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          root.classList.add("theme-transitioning");
          window.setTimeout(() => {
            root.classList.remove("theme-transitioning");
          }, 300);
        });
    },
    [persistTheme]
  );

  const setTheme = useCallback(
    (next: ThemeName, origin?: ThemeTransitionOrigin) => {
      runThemeTransition(next, origin);
    },
    [runThemeTransition]
  );

  const toggle = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      const next = theme === "dark" ? "light" : "dark";
      runThemeTransition(next, origin);
    },
    [runThemeTransition, theme]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle,
      options: Object.values(themes).map((t) => ({ value: t.name, label: t.label })),
    }),
    [theme, setTheme, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
