"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { themes, type ThemeName } from "@/lib/themes";

const STORAGE_KEY = "ui-theme";

export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggle: () => void;
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
  const [theme, setThemeState] = useState<ThemeName>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ThemeName | null;
    if (stored && themes[stored]) {
      setThemeState(stored);
      applyThemeVars(stored);
      return;
    }
    applyThemeVars("dark");
  }, []);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyThemeVars(next);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

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
