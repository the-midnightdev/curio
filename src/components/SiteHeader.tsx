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
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-transparent text-muted transition hover:bg-plum/5 hover:text-plum"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M20 15.4A8 8 0 0 1 8.6 4a8 8 0 1 0 11.4 11.4Z" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={`Turn sound ${enabled ? "off" : "on"}`}
            title={`Sound ${enabled ? "on" : "off"}`}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-transparent transition hover:bg-plum/5 ${enabled ? "text-cobalt" : "text-muted"}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M5 9.5v5h3.2l4.3 3.5V6L8.2 9.5H5Z" strokeLinejoin="round" />
              {enabled ? (
                <>
                  <path d="M15.5 9a4 4 0 0 1 0 6" strokeLinecap="round" />
                  <path d="M18 6.5a7.5 7.5 0 0 1 0 11" strokeLinecap="round" />
                </>
              ) : <path d="m15.5 10 4 4m0-4-4 4" strokeLinecap="round" />}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
