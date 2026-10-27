"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  playIndexSettle,
  playIndexTick,
  playSoftClick,
  playTimerComplete,
  resumeSound,
} from "@/lib/sound";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  start: () => void;
  tick: (intensity?: number) => void;
  settle: () => void;
  complete: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "curio-sound";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("curio-sound", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("curio-sound", onStoreChange);
  };
}

function getSoundSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "on";
}

function getServerSoundSnapshot() {
  return false;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribe,
    getSoundSnapshot,
    getServerSoundSnapshot,
  );

  const toggle = useCallback(() => {
    const next = window.localStorage.getItem(STORAGE_KEY) !== "on";
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    window.dispatchEvent(new Event("curio-sound"));
    if (next) void resumeSound();
  }, []);

  const tick = useCallback(
    (intensity = 1) => {
      if (!enabled) return;
      playIndexTick(intensity);
    },
    [enabled],
  );

  const start = useCallback(() => {
    if (!enabled) return;
    playSoftClick();
  }, [enabled]);

  const settle = useCallback(() => {
    if (!enabled) return;
    playIndexSettle();
  }, [enabled]);

  const complete = useCallback(() => {
    if (!enabled) return;
    playTimerComplete();
  }, [enabled]);

  const value = useMemo(
    () => ({ enabled, toggle, start, tick, settle, complete }),
    [enabled, toggle, start, tick, settle, complete],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const value = useContext(SoundContext);
  if (!value) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return value;
}
