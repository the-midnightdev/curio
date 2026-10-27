"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

const DURATIONS = [60, 120, 300] as const;

export function SpeakStudio({ prompts }: { prompts: string[] }) {
  const { complete, enabled, start: playStart } = useSound();
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState<number>(60);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setSeconds((value) => {
        if (value > 1) return value - 1;
        setRunning(false);
        if (!completedRef.current) {
          completedRef.current = true;
          complete();
        }
        return 0;
      });
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [complete, running, seconds]);

  const prompt = prompts[index];
  if (!prompt) return null;

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const progress = (seconds / duration) * 100;
  const warning = running && seconds <= 10;

  const chooseDuration = (nextDuration: number) => {
    setDuration(nextDuration);
    setSeconds(nextDuration);
    setRunning(false);
    setStarted(false);
    completedRef.current = false;
  };

  const begin = () => {
    if (seconds === 0) setSeconds(duration);
    completedRef.current = false;
    setStarted(true);
    setRunning(true);
    playStart();
  };

  const reset = () => {
    setRunning(false);
    setStarted(false);
    setSeconds(duration);
    completedRef.current = false;
  };

  return (
    <section className="mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-plum text-cream">
      <div className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-9 md:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage">
            Optional speaking practice
          </p>
          <h2 className="mt-3 font-display text-3xl text-white">
            Put the idea into your own words.
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-cream/70">
            No microphone, recording, or stored speech. Choose a prompt and
            practise privately for as long as feels useful.
          </p>
          <blockquote className="mt-7 max-w-xl font-serif text-xl leading-8 text-white">
            “{prompt}”
          </blockquote>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % prompts.length)}
            className="mt-4 min-h-11 text-sm font-semibold text-sage underline-offset-4 hover:underline"
          >
            Try another prompt
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex gap-2" aria-label="Practice duration">
            {DURATIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => chooseDuration(option)}
                disabled={running}
                aria-pressed={duration === option}
                className={`min-h-11 min-w-11 rounded-full border px-3 text-sm font-semibold transition ${
                  duration === option
                    ? "border-sage bg-sage text-plum"
                    : "border-white/20 text-white hover:border-sage"
                } disabled:opacity-50`}
              >
                {option / 60}m
              </button>
            ))}
          </div>

          <div className="relative mt-5 grid h-44 w-44 place-items-center" aria-live="polite">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(241,244,246,.14)" strokeWidth="3" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                pathLength="100"
                stroke={warning ? "#B64A3A" : "#D7A62E"}
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
                strokeLinecap="round"
                strokeWidth="3"
                className="transition-[stroke-dashoffset,stroke] duration-500"
              />
            </svg>
            <div className="text-center">
              <p className={`font-display text-5xl tabular-nums ${warning ? "text-[#B64A3A]" : "text-white"}`}>
                {time}
              </p>
              <p className="mt-1 text-xs text-cream/55">
                {seconds === 0 ? "Complete" : running ? "Speaking" : started ? "Paused" : "Ready"}
              </p>
            </div>
          </div>

          {seconds === 0 ? (
            <p className="mt-4 font-display text-xl text-sage">Time&apos;s up — well spoken!</p>
          ) : null}

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {!running ? (
              <button
                type="button"
                onClick={begin}
                className="min-h-11 rounded-full bg-coral-dark px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-plum"
              >
                {started && seconds > 0 ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setRunning(false)}
                className="min-h-11 rounded-full bg-white px-5 text-sm font-semibold text-plum"
              >
                Pause
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              disabled={!started && seconds === duration}
              className="min-h-11 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-sage disabled:opacity-40"
            >
              Reset
            </button>
          </div>
          <p className="mt-3 text-xs text-cream/50">
            Completion chime {enabled ? "on" : "off"}
          </p>
        </div>
      </div>
    </section>
  );
}
