"use client";

import { getA11ySettings } from "@/lib/a11ySettings";

// A short synthetic "key" click for every real control on the site, made
// with the Web Audio API rather than an audio file — there's nothing to
// fetch before the very first click, and it matches the rest of the HUD
// being drawn rather than recorded. Respects the same mute setting as the
// site music.
let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!ctx) ctx = new AudioContextCtor();
  return ctx;
}

export function playClickSound() {
  if (getA11ySettings().musicMuted) return;
  const audio = getContext();
  if (!audio) return;
  // Browsers create the context suspended until a user gesture resumes it —
  // this call is always inside a click handler, so that gesture is here.
  if (audio.state === "suspended") void audio.resume();

  const now = audio.currentTime;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(1100, now);
  oscillator.frequency.exponentialRampToValueAtTime(380, now + 0.05);
  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.07);
}

// A two-note rising blip for page navigation — distinct from the click tick
// above, so a route change reads as "request completed" rather than just
// another click. Same reasoning as the click sound: synthesized, so there's
// nothing to load, and it respects the same mute setting.
export function playPageTransitionSound() {
  if (getA11ySettings().musicMuted) return;
  const audio = getContext();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();

  const now = audio.currentTime;
  [
    { freq: 620, start: 0 },
    { freq: 980, start: 0.07 },
  ].forEach(({ freq, start }) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(freq, now + start);
    gain.gain.setValueAtTime(0.06, now + start);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + 0.09);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start(now + start);
    oscillator.stop(now + start + 0.1);
  });
}
