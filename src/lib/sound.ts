let audioContext: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioContext = new Ctor();
  }
  return audioContext;
}

export async function resumeSound(): Promise<void> {
  const ctx = context();
  if (ctx?.state === "suspended") await ctx.resume();
}

export function playSoftClick(): void {
  const ctx = context();
  if (!ctx) return;
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(170, now);
  oscillator.frequency.exponentialRampToValueAtTime(120, now + 0.045);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.055);
}

export function playIndexTick(intensity = 1): void {
  const ctx = context();
  if (!ctx) return;
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(196 + intensity * 40, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035 * intensity, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.08);
}

export function playIndexSettle(): void {
  const ctx = context();
  if (!ctx) return;
  const now = ctx.currentTime;
  [392, 523.25].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.12;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.07, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.45);
  });
}

export function playTimerComplete(): void {
  const ctx = context();
  if (!ctx) return;
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.14;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.1, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.58);
  });
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
