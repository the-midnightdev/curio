"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PracticeTopic } from "@/lib/types";
import { practiceCategories } from "@/lib/practice-topics";
import { useSound } from "./SoundProvider";

type TimedStage = "research" | "speaking";
type Stage = "countdown" | TimedStage | "review";
const RESEARCH_DURATION = 600;
const SPEAKING_DURATION = 120;

export function SpeakingSession({ topic, onDiscoverAnother, onExit }: { topic: PracticeTopic; onDiscoverAnother: () => void; onExit: () => void }) {
  const { complete, settle, start: playStart, tick } = useSound();
  const [stage, setStage] = useState<Stage>("countdown");
  const researchDuration = RESEARCH_DURATION;
  const speakingDuration = SPEAKING_DURATION;
  const [seconds, setSeconds] = useState(600);
  const [running, setRunning] = useState(false);
  const [nextStage, setNextStage] = useState<TimedStage>("research");
  const [countdownStep, setCountdownStep] = useState(3);
  const transitionRef = useRef(false);

  useEffect(() => {
    if (stage !== "countdown") return;
    if (countdownStep > 0) {
      tick(0.55 + (3 - countdownStep) * 0.15);
      const countdownTimer = window.setTimeout(() => setCountdownStep((value) => value - 1), 750);
      return () => window.clearTimeout(countdownTimer);
    }
    playStart();
    const startTimer = window.setTimeout(() => {
      setSeconds(nextStage === "research" ? researchDuration : speakingDuration);
      setStage(nextStage);
      setRunning(true);
      transitionRef.current = false;
    }, 550);
    return () => window.clearTimeout(startTimer);
  }, [countdownStep, nextStage, playStart, researchDuration, speakingDuration, stage, tick]);

  useEffect(() => {
    if (!running || (stage !== "research" && stage !== "speaking")) return;
    const timer = window.setTimeout(() => {
      setSeconds((value) => {
        if (value > 1) return value - 1;
        if (transitionRef.current) return 0;
        transitionRef.current = true;
        if (stage === "research") {
          settle(); setRunning(false); setNextStage("speaking"); setCountdownStep(3); setStage("countdown");
        } else {
          complete(); setRunning(false); setStage("review");
        }
        return 0;
      });
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [complete, running, seconds, settle, speakingDuration, stage]);

  const startSpeakingNow = () => {
    transitionRef.current = false;
    setNextStage("speaking");
    setCountdownStep(3);
    setRunning(false);
    setStage("countdown");
  };
  const resetSession = () => { transitionRef.current = false; setStage("countdown"); setSeconds(researchDuration); setRunning(false); setNextStage("research"); setCountdownStep(3); };
  const categoryName = practiceCategories.find((category) => category.slug === topic.category)?.name ?? topic.category;

  if (stage === "review") {
    return (
      <div className="session-reveal mx-auto max-w-3xl rounded-[1.5rem] bg-white p-5 text-left text-plum shadow-[0_18px_50px_rgba(16,22,47,0.08)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-text">Practice complete</p>
        <h3 className="mt-2 font-display text-3xl">How did that feel?</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["I made one clear point", "I used a useful example", "I finished with confidence"].map((label) => (
            <label key={label} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-canvas px-4 text-sm"><input type="checkbox" className="h-5 w-5 accent-coral-dark" /><span>{label}</span></label>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={resetSession} className="min-h-11 rounded-full bg-coral-dark px-5 text-sm font-semibold text-white hover:bg-plum">Try this topic again</button>
          <button type="button" onClick={onDiscoverAnother} className="min-h-11 rounded-full bg-canvas px-5 text-sm font-semibold hover:bg-sage">Spin for another topic</button>
        </div>
      </div>
    );
  }

  if (stage === "countdown") {
    const speakingNext = nextStage === "speaking";
    return (
      <div className="focus-card session-reveal mx-auto flex min-h-[31rem] w-full max-w-3xl flex-col items-center justify-center rounded-[1.75rem] px-5 py-8 text-center shadow-[0_24px_70px_rgba(16,22,47,0.16)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: speakingNext ? "var(--speaking-accent)" : "var(--research-accent)" }}>{speakingNext ? "Speaking begins in" : "Research begins in"}</p>
        <p key={countdownStep} className="session-reveal mt-4 font-sans text-8xl font-semibold tabular-nums sm:text-9xl" aria-live="assertive" style={{ color: speakingNext ? "var(--speaking-accent)" : "var(--research-accent)" }}>{countdownStep || "Go"}</p>
        <p className="focus-muted mt-5 font-display text-xl">{topic.title}</p>
        <button type="button" onClick={onExit} className="focus-muted mt-7 min-h-11 px-5 text-sm font-semibold hover:opacity-80">Stop</button>
      </div>
    );
  }

  if (stage === "research" || stage === "speaking") {
    const speaking = stage === "speaking";
    const total = speaking ? speakingDuration : researchDuration;
    const progress = Math.max(0, Math.min(100, (seconds / total) * 100));
    return (
      <div className="focus-card session-reveal mx-auto flex min-h-[31rem] w-full max-w-3xl flex-col justify-center rounded-[1.75rem] px-5 py-6 text-center shadow-[0_24px_70px_rgba(16,22,47,0.16)] sm:px-8 sm:py-8">
        <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
          <span style={{ color: speaking ? "var(--speaking-accent)" : "var(--research-accent)" }}>{speaking ? "Speaking time" : "Research time"}</span>
          <span className="focus-muted opacity-30" aria-hidden>•</span>
          <span className="focus-muted">{categoryName}</span>
        </div>
        <h3 className="mx-auto mt-3 max-w-2xl font-display text-2xl leading-tight sm:text-3xl">{topic.title}</h3>
        <p className="focus-muted mx-auto mt-2 max-w-xl text-sm">{speaking ? "Explain the idea aloud in your own words." : "Understand the idea and note one useful example."}</p>
        <div className="relative mx-auto mt-5 grid h-52 w-52 place-items-center sm:h-56 sm:w-56" role="progressbar" aria-label={`${speaking ? "Speaking" : "Research"} time remaining`} aria-valuemin={0} aria-valuemax={total} aria-valuenow={seconds}>
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--focus-track)" strokeWidth="3" />
            <circle cx="50" cy="50" r="46" fill="none" pathLength="100" stroke={speaking ? "var(--speaking-accent)" : "var(--research-accent)"} strokeDasharray="100" strokeDashoffset={100 - progress} strokeLinecap="round" strokeWidth="3" className="transition-[stroke-dashoffset] duration-500" />
          </svg>
          <p className="font-display text-6xl tabular-nums tracking-[-0.055em] sm:text-7xl" style={{ color: speaking ? "var(--speaking-accent)" : "var(--research-accent)" }} aria-live="polite">{formatTime(seconds)}</p>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {!speaking ? <button type="button" onClick={startSpeakingNow} className="min-h-11 rounded-full bg-aqua px-6 text-sm font-bold text-blue-black transition hover:bg-[#fff8e7]">Start speaking</button> : null}
          <button type="button" onClick={() => setRunning((value) => !value)} className="focus-secondary min-h-11 rounded-full px-5 text-sm font-semibold transition hover:opacity-80">{running ? "Pause" : "Resume"}</button>
          <button type="button" onClick={onExit} className="focus-muted min-h-11 px-4 text-sm font-semibold hover:opacity-80">Stop</button>
        </div>
        {!speaking && topic.articleSlug ? <Link href={`/read/${topic.articleSlug}`} target="_blank" className="focus-muted mt-3 inline-flex text-xs font-semibold underline decoration-transparent underline-offset-4 hover:decoration-current">Open guide ↗</Link> : null}
      </div>
    );
  }

  return null;
}

function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`; }
