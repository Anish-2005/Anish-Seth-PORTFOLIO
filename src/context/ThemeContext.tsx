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
  finished?: Promise<void>;
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

function runFallbackThemeFade(applyTheme: () => void) {
  const root = document.documentElement;
  const overlay = document.createElement("div");
  const currentSurface = getComputedStyle(root).getPropertyValue("--surface-0").trim() || "#0b0f1b";

  overlay.setAttribute("aria-hidden", "true");
  overlay.className = "theme-fade-overlay";
  overlay.style.background = currentSurface;

  document.body.appendChild(overlay);

  const animation = overlay.animate(
    [
      { opacity: 0 },
      { opacity: 0.24, offset: 0.35 },
      { opacity: 0 },
    ],
    {
      duration: 460,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  window.setTimeout(() => {
    applyTheme();
  }, 120);

  animation.finished
    .catch(() => undefined)
    .finally(() => {
      overlay.remove();
    });
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
      if (next === theme) return;
      void origin;

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

      if (prefersReducedMotion) {
        applyNextTheme();
        return;
      }

      if (!supportsViewTransition) {
        runFallbackThemeFade(applyNextTheme);
        return;
      }

      root.classList.add("theme-vt-active");
      const transition = docWithTransition.startViewTransition!(applyNextTheme);
      const onDone = () => root.classList.remove("theme-vt-active");

      (transition.finished ?? transition.ready)
        .then(onDone)
        .catch(() => {
          onDone();
          runFallbackThemeFade(applyNextTheme);
        });
    },
    [persistTheme, theme]
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
