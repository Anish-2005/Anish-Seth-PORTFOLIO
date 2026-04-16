"use client";

import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

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

  const themeRef = useRef<ThemeName>(theme);

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
    (next: ThemeName) => {
      themeRef.current = next;
      applyThemeVars(next);
      persistTheme(next);
    },
    [persistTheme]
  );

  const syncReactThemeState = useCallback((next: ThemeName) => {
    const apply = () => {
      startTransition(() => {
        setThemeState(next);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(apply, { timeout: 900 });
      return;
    }

    globalThis.setTimeout(apply, 120);
  }, []);

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
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const docWithTransition = document as DocumentWithViewTransition;
      const supportsViewTransition = typeof docWithTransition.startViewTransition === "function";

      const finish = () => {
        syncReactThemeState(next);
        isTransitioningRef.current = false;

        const queued = queuedThemeRef.current;
        queuedThemeRef.current = null;
        if (queued && queued !== next) {
          runThemeTransition(queued);
        }
      };

      if (prefersReducedMotion) {
        applyThemeImmediately(next);
        finish();
        return;
      }

      if (!supportsViewTransition) {
        runFallbackThemeFade(() => applyThemeImmediately(next));
        window.setTimeout(finish, 320);
        return;
      }

      root.classList.add("theme-vt-active");
      const transition = docWithTransition.startViewTransition!(() => {
        applyThemeImmediately(next);
      });
      const onDone = () => {
        root.classList.remove("theme-vt-active");
        finish();
      };

      (transition.finished ?? transition.ready)
        .then(onDone)
        .catch(() => {
          root.classList.remove("theme-vt-active");
          runFallbackThemeFade(() => applyThemeImmediately(next));
          window.setTimeout(finish, 320);
        });
    },
    [applyThemeImmediately, syncReactThemeState]
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
