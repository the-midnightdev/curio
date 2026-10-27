"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PracticeCategory, PracticeTopic } from "@/lib/types";
import { useSound } from "./SoundProvider";
import { SpeakingSession } from "./SpeakingSession";

type CategoryChoice = "surprise" | PracticeCategory["slug"];

export function HomeDiscovery({ categories, topics, initialTopic }: { categories: PracticeCategory[]; topics: PracticeTopic[]; initialTopic?: PracticeTopic }) {
  const { start, tick, settle } = useSound();
  const [category, setCategory] = useState<CategoryChoice>("surprise");
  const [displayed, setDisplayed] = useState(initialTopic ?? topics[0]);
  const [revealed, setRevealed] = useState(Boolean(initialTopic));
  const [discovering, setDiscovering] = useState(false);
  const [practising, setPractising] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  const discover = useCallback(() => {
    if (discovering || topics.length === 0) return;
    const pool = category === "surprise" ? topics : topics.filter((topic) => topic.category === category);
    if (pool.length === 0) return;
    const finalTopic = pool[Math.floor(Math.random() * pool.length)];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDiscovering(true); setRevealed(false); setPractising(false); start();
    if (reducedMotion) { setDisplayed(finalTopic); setDiscovering(false); setRevealed(true); settle(); return; }
    const duration = 2700;
    const startedAt = performance.now();
    const cycle = () => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      if (progress >= 1) { setDisplayed(finalTopic); setDiscovering(false); setRevealed(true); settle(); return; }
      setDisplayed(pool[Math.floor(Math.random() * pool.length)]);
      tick(0.45 + progress * 0.45);
      timerRef.current = window.setTimeout(cycle, 65 + progress * progress * 310);
    };
    cycle();
  }, [category, discovering, settle, start, tick, topics]);

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);
  useEffect(() => {
    if (!practising) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [practising]);

  const categoryName = categories.find((item) => item.slug === displayed.category)?.name;
  const returnToStart = () => { if (timerRef.current) window.clearTimeout(timerRef.current); setDiscovering(false); setPractising(false); };
  const openPractice = () => { setSessionKey((value) => value + 1); setPractising(true); };

  if (practising && revealed) {
    return (
      <section className="fixed inset-0 z-50 overflow-y-auto text-plum" style={{ background: "radial-gradient(circle at 50% 55%, rgba(58, 75, 219, 0.12), transparent 55%), var(--cream)" }} aria-label="Speaking practice session" aria-modal="true" role="dialog">
        <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-5 py-4 sm:px-8">
          <div className="flex min-h-12 items-center justify-between pb-3">
            <p className="font-display text-xl font-semibold">Curio<span className="text-coral">.</span></p>
            <button type="button" onClick={returnToStart} className="min-h-11 rounded-full bg-white px-4 text-sm font-semibold shadow-sm transition hover:bg-sage">Stop and return</button>
          </div>
          <div className="flex flex-1 items-center py-5"><div className="w-full"><SpeakingSession key={`${displayed.id}-${sessionKey}`} topic={displayed} onDiscoverAnother={discover} onExit={returnToStart} /></div></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-3 flex min-h-0 w-full max-w-5xl flex-1 flex-col" aria-labelledby="discovery-title">
      <fieldset className="category-palette mt-3 shrink-0">
        <legend className="sr-only">Choose a topic area</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {[{ slug: "surprise" as const, name: "All categories" }, ...categories].map((item) => (
              <button key={item.slug} type="button" aria-pressed={category === item.slug} disabled={discovering} onClick={() => setCategory(item.slug)} className={`group flex min-h-12 items-center justify-center rounded-xl px-3 py-2 text-center text-sm transition ${category === item.slug ? "font-semibold text-plum" : "text-muted hover:text-plum"} disabled:opacity-50`}>
                <span>{item.name}</span>
              </button>
            ))}
        </div>
      </fieldset>

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-white text-center shadow-[0_18px_50px_rgba(16,22,47,0.06)]">
        <KnowledgeField active={discovering} />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-text">{discovering ? "Spinning through topics…" : revealed ? categoryName : "Your random topic"}</p>
          <h2 id="discovery-title" aria-live={discovering ? "off" : "polite"} className={`mx-auto mt-2 max-w-2xl font-display text-3xl leading-tight transition-opacity sm:text-5xl ${discovering ? "opacity-55" : "opacity-100"}`}>{displayed.title}</h2>
          {revealed ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">10 min research · 2 min speaking</p> : null}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {revealed ? <>
                <button type="button" onClick={openPractice} className="min-h-12 rounded-full bg-coral-dark px-7 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,55,178,0.18)] transition hover:-translate-y-0.5 hover:bg-plum">Start practice</button>
                <button type="button" onClick={discover} className="min-h-12 rounded-full bg-canvas px-6 text-sm font-semibold text-plum transition hover:bg-sage">New topic</button>
              </> : <button type="button" onClick={discover} disabled={discovering} className="min-h-11 rounded-full bg-cobalt-deep px-6 text-sm font-semibold text-white transition hover:bg-blue-black disabled:bg-muted">{discovering ? "Spinning…" : "Spin for a random topic"}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowledgeField({ active }: { active: boolean }) {
  return (
    <svg className={`knowledge-field ${active ? "is-active" : ""}`} viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="wire-orbit">
        <g className="wire-mesh" transform="rotate(-12 500 210)">
          <circle cx="500" cy="210" r="178" />
          <ellipse cx="500" cy="210" rx="132" ry="178" />
          <ellipse cx="500" cy="210" rx="64" ry="178" />
          <ellipse cx="500" cy="210" rx="178" ry="68" />
          <ellipse cx="500" cy="210" rx="178" ry="126" />
        </g>
      </g>
    </svg>
  );
}
