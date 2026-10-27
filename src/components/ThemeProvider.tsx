"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "curio-theme";

function getTheme(): Theme {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", onChange);
  window.addEventListener("curio-theme", onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("curio-theme", onChange);
    media.removeEventListener("change", onChange);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    const next = getTheme() === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event("curio-theme"));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
