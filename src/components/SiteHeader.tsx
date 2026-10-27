"use client";

import Link from "next/link";
import { useSound } from "./SoundProvider";
import { useTheme } from "./ThemeProvider";

export function SiteHeader() {
  const { enabled, toggle } = useSound();
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <header className="bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex min-h-11 items-center">
          <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-plum">
            Curio<span className="text-coral">.</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2 md:gap-4" aria-label="Primary navigation">
          <Link className="flex min-h-11 items-center rounded-full px-3 text-sm hover:bg-plum/5" href="/">
            Home
          </Link>
          <Link className="flex min-h-11 items-center rounded-full px-3 text-sm hover:bg-plum/5" href="/library">
            Library
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="grid h-11 w-11 place-items-center rounded-full bg-paper text-plum transition hover:bg-sage hover:text-blue-black"
          >
            {theme === "dark" ? <span aria-hidden className="text-lg">☀</span> : <span aria-hidden className="text-lg">◐</span>}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={`Turn sound ${enabled ? "off" : "on"}`}
            className="min-h-11 rounded-full border border-border bg-white px-4 text-left text-xs font-semibold uppercase tracking-wide transition hover:border-coral-dark"
          >
            Sound {enabled ? "on" : "off"}
          </button>
        </nav>
      </div>
    </header>
  );
}
