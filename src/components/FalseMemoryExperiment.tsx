"use client";

import { useEffect, useMemo, useState } from "react";

const STUDY_WORDS = [
  "bed",
  "rest",
  "awake",
  "tired",
  "dream",
  "wake",
  "snooze",
  "blanket",
  "doze",
  "slumber",
  "snore",
  "nap",
  "yawn",
  "drowsy",
];

type ProbeKind = "studied" | "new" | "lure";

const PROBES: { word: string; kind: ProbeKind }[] = [
  { word: "bed", kind: "studied" },
  { word: "window", kind: "new" },
  { word: "sleep", kind: "lure" },
  { word: "tired", kind: "studied" },
  { word: "chair", kind: "new" },
  { word: "dream", kind: "studied" },
  { word: "cloud", kind: "new" },
  { word: "nap", kind: "studied" },
];

type Phase = "ready" | "study" | "test" | "results";

export function FalseMemoryExperiment() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [studyIndex, setStudyIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const probes = useMemo(() => PROBES, []);
  const currentProbe = probes[testIndex];

  useEffect(() => {
    if (phase !== "study") return;
    const timer = window.setTimeout(() => {
      if (studyIndex >= STUDY_WORDS.length - 1) {
        setPhase("test");
        return;
      }
      setStudyIndex((value) => value + 1);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [phase, studyIndex]);

  function start() {
    setPhase("study");
    setStudyIndex(0);
    setTestIndex(0);
    setAnswers({});
  }

  function answer(seen: boolean) {
    if (!currentProbe) return;
    const nextAnswers = { ...answers, [currentProbe.word]: seen };
    setAnswers(nextAnswers);
    if (testIndex + 1 >= probes.length) {
      setPhase("results");
    } else {
      setTestIndex((value) => value + 1);
    }
  }

  const lureCaught = answers.sleep === true;
  const studiedHits = probes.filter(
    (probe) => probe.kind === "studied" && answers[probe.word],
  ).length;
  const falseAlarms = probes.filter(
    (probe) => probe.kind === "new" && answers[probe.word],
  ).length;

  return (
    <section
      aria-label="False memory word experiment"
      className="my-10 overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70"
    >
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-ink/[0.03] px-5 py-3 md:px-7">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-violet">
          Desk experiment
        </p>
        <p className="text-xs text-ink/50">No recording · private to this page</p>
      </div>

      <div className="px-5 py-8 md:px-7">
        {phase === "ready" ? (
          <div className="max-w-xl">
            <h3 className="font-display text-3xl">A list, then a recognition.</h3>
            <p className="mt-3 leading-7 text-ink/75">
              Fourteen ordinary words will appear, one at a time. Do not write
              them down. Afterward you will judge whether a new set of words
              was on the list. There is a twist, but it only works if you meet
              the list first.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full bg-violet px-5 py-2.5 text-sm text-white"
            >
              Begin the list
            </button>
          </div>
        ) : null}

        {phase === "study" ? (
          <div className="flex min-h-48 flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-ink/40">
              Word {Math.min(studyIndex + 1, STUDY_WORDS.length)} of{" "}
              {STUDY_WORDS.length}
            </p>
            <p
              aria-live="polite"
              className="mt-6 font-display text-5xl capitalize md:text-6xl"
            >
              {STUDY_WORDS[studyIndex] ?? "…"}
            </p>
          </div>
        ) : null}

        {phase === "test" && currentProbe ? (
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.24em] text-ink/40">
              Recognition {testIndex + 1} of {probes.length}
            </p>
            <h3 className="mt-4 font-display text-4xl capitalize">
              {currentProbe.word}
            </h3>
            <p className="mt-3 text-ink/70">Was this word on the list?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => answer(true)}
                className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory"
              >
                Yes, I saw it
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm"
              >
                No, it is new
              </button>
            </div>
          </div>
        ) : null}

        {phase === "results" ? (
          <div className="max-w-2xl">
            <h3 className="font-display text-3xl">
              {lureCaught
                ? "You “remembered” a word that was never shown."
                : "You declined the lure — which is rarer than it feels."}
            </h3>
            <p className="mt-4 leading-7 text-ink/75">
              The critical lure was <strong>sleep</strong>. It never appeared.
              The list was built from its neighbours: bed, rest, dream, nap,
              drowsy. If sleep felt present, you met a DRM-style false memory
              in miniature — familiarity without a source.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat
                label="Studied words claimed"
                value={`${studiedHits} / 4`}
              />
              <Stat label="New words claimed" value={`${falseAlarms} / 3`} />
              <Stat
                label="Sleep judged as seen"
                value={lureCaught ? "Yes" : "No"}
              />
            </dl>
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full border border-ink/15 px-5 py-2.5 text-sm"
            >
              Run the list again
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-ivory px-4 py-3">
      <dt className="text-xs uppercase tracking-[0.18em] text-ink/45">{label}</dt>
      <dd className="mt-1 font-display text-2xl">{value}</dd>
    </div>
  );
}
