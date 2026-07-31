"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { themes, type ThemeName } from "@/lib/themes";

const STORAGE_KEY = "ui-theme";

type ThemeTransitionOrigin = {
  x: number;
  y: number;
};

export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName, origin?: ThemeTransitionOrigin) => void;
  toggle: (origin?: ThemeTransitionOrigin) => void;
  options: { value: ThemeName; label: string }[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeVars(theme: ThemeName) {
  const definition = themes[theme];
  if (!definition) return;

  const root = document.documentElement;
  Object.entries(definition.tokens).forEach(([key, value]) => root.style.setProperty(key, value));
  root.dataset.theme = theme;
}

function playThemeFade(theme: ThemeName) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.className = "theme-fade-overlay";
  overlay.style.background = theme === "light" ? "#fbf8f7" : "#0f060b";
  document.body.appendChild(overlay);

  overlay.animate(
    [{ opacity: 0.16 }, { opacity: 0 }],
    { duration: 180, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
  ).finished.finally(() => overlay.remove());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dark");
  const themeRef = useRef<ThemeName>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (storedTheme && themes[storedTheme]) {
      themeRef.current = storedTheme;
      applyThemeVars(storedTheme);
      setThemeState(storedTheme);
    }
  }, []);

  const setTheme = useCallback((nextTheme: ThemeName, _origin?: ThemeTransitionOrigin) => {
    if (nextTheme === themeRef.current) return;

    themeRef.current = nextTheme;
    applyThemeVars(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
    playThemeFade(nextTheme);
  }, []);

  const toggle = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      setTheme(themeRef.current === "dark" ? "light" : "dark", origin);
    },
    [setTheme]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle,
      options: Object.values(themes).map((item) => ({ value: item.name, label: item.label })),
    }),
    [theme, setTheme, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
