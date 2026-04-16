"use client";

import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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

function getRevealRadius(x: number, y: number) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
}

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
  overlay.style.transform = "translateZ(0)";
  overlay.style.willChange = "opacity";

  document.body.appendChild(overlay);

  const animation = overlay.animate(
    [
      { opacity: 0 },
      { opacity: 0.24, offset: 0.35 },
      { opacity: 0 },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  window.setTimeout(() => {
    applyTheme();
  }, 72);

  animation.finished
    .catch(() => undefined)
    .finally(() => {
      overlay.remove();
    });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep first client render identical to server render to avoid hydration mismatch.
  const [theme, setThemeState] = useState<ThemeName>("dark");
  const themeRef = useRef<ThemeName>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && themes[stored] && stored !== themeRef.current) {
      themeRef.current = stored;
      applyThemeVars(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    applyThemeVars(theme);
  }, [theme]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const persistTheme = useCallback((next: ThemeName) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const isTransitioningRef = useRef(false);
  const queuedThemeRef = useRef<ThemeName | null>(null);

  const applyThemeImmediately = useCallback(
    (next: ThemeName, syncState: boolean) => {
      themeRef.current = next;

      if (syncState) {
        flushSync(() => {
          setThemeState(next);
        });
      } else {
        startTransition(() => {
          setThemeState(next);
        });
      }

      applyThemeVars(next);
      persistTheme(next);
    },
    [persistTheme]
  );

  const runThemeTransition = useCallback(
    (next: ThemeName, origin?: ThemeTransitionOrigin) => {
      if (typeof window === "undefined") return;
      if (next === themeRef.current && !isTransitioningRef.current) return;
      void origin;

      if (isTransitioningRef.current) {
        queuedThemeRef.current = next;
        return;
      }

      isTransitioningRef.current = true;

      const root = document.documentElement;
      root.classList.add("theme-sync-lock");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const docWithTransition = document as DocumentWithViewTransition;
      const supportsViewTransition = typeof docWithTransition.startViewTransition === "function";

      const finish = () => {
        isTransitioningRef.current = false;
        root.classList.remove("theme-sync-lock");

        const queued = queuedThemeRef.current;
        queuedThemeRef.current = null;
        if (queued && queued !== next) {
          runThemeTransition(queued);
        }
      };

      if (prefersReducedMotion) {
        applyThemeImmediately(next, false);
        finish();
        return;
      }

      if (!supportsViewTransition) {
        runFallbackThemeFade(() => applyThemeImmediately(next, true));
        window.setTimeout(finish, 320);
        return;
      }

      root.classList.add("theme-vt-active");
      const centerX = origin?.x ?? window.innerWidth / 2;
      const centerY = origin?.y ?? window.innerHeight / 2;
      const revealRadius = getRevealRadius(centerX, centerY);
      root.classList.add("theme-vt-radial");
      root.style.setProperty("--vt-origin-x", `${centerX}px`);
      root.style.setProperty("--vt-origin-y", `${centerY}px`);
      root.style.setProperty("--vt-radius", `${revealRadius}px`);

      const transition = docWithTransition.startViewTransition!(() => {
        // Capture the full new themed tree in the new transition snapshot.
        applyThemeImmediately(next, true);
      });

      (transition.finished ?? transition.ready)
        .then(() => {
          root.classList.remove("theme-vt-active");
          root.classList.remove("theme-vt-radial");
          root.style.removeProperty("--vt-origin-x");
          root.style.removeProperty("--vt-origin-y");
          root.style.removeProperty("--vt-radius");
          finish();
        })
        .catch(() => {
          root.classList.remove("theme-vt-active");
          root.classList.remove("theme-vt-radial");
          root.style.removeProperty("--vt-origin-x");
          root.style.removeProperty("--vt-origin-y");
          root.style.removeProperty("--vt-radius");
          runFallbackThemeFade(() => applyThemeImmediately(next, true));
          window.setTimeout(finish, 320);
        });
    },
    [applyThemeImmediately]
  );

  const setTheme = useCallback(
    (next: ThemeName, origin?: ThemeTransitionOrigin) => {
      runThemeTransition(next, origin);
    },
    [runThemeTransition]
  );

  const toggle = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      const next = themeRef.current === "dark" ? "light" : "dark";
      runThemeTransition(next, origin);
    },
    [runThemeTransition]
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
