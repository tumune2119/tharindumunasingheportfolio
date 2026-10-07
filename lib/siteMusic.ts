"use client";

import { getA11ySettings, subscribeA11ySettings } from "@/lib/a11ySettings";

// The site's background music and the easter egg track, managed together.
//
// Rules:
// - Site music plays after the first click or key press (browsers block
//   autoplay before that), and only while it isn't muted.
// - Easter egg music ignores the mute setting. While it plays, site music is
//   paused. When it stops, site music resumes straight away, unless it's muted.
export const SITE_MUSIC_SRC = "/audio/site-music.mp3";
export const EASTER_MUSIC_SRC = "/audio/gravity-falls-theme.mp3";

let site: HTMLAudioElement | null = null;
let easter: HTMLAudioElement | null = null;
let gestureSeen = false;
let easterPlaying = false;

const easterListeners = new Set<() => void>();

function getSite(): HTMLAudioElement | null {
  if (!site && typeof Audio !== "undefined") {
    site = new Audio(SITE_MUSIC_SRC);
    site.loop = true;
    site.volume = 0.35;
  }
  return site;
}

// Brings the site track in line with the current state. Called whenever any
// of the inputs change.
function syncSite() {
  const audio = getSite();
  if (!audio) return;
  const shouldPlay =
    gestureSeen && !easterPlaying && !getA11ySettings().musicMuted;
  if (shouldPlay) {
    if (audio.paused) void audio.play().catch(() => {});
  } else if (!audio.paused) {
    audio.pause();
  }
}

// Mute changes take effect at once.
subscribeA11ySettings(syncSite);

export function startSiteMusic() {
  gestureSeen = true;
  syncSite();
}

export function isEasterEggPlaying() {
  return easterPlaying;
}

export function subscribeEasterEgg(listener: () => void) {
  easterListeners.add(listener);
  return () => {
    easterListeners.delete(listener);
  };
}

function notifyEaster() {
  easterListeners.forEach((listener) => listener());
}

export function playEasterEgg() {
  if (!easter && typeof Audio !== "undefined") {
    easter = new Audio(EASTER_MUSIC_SRC);
    easter.volume = 0.6;
    easter.addEventListener("ended", stopEasterEgg);
  }
  if (!easter) return;
  easter.currentTime = 0;
  void easter.play().catch(() => {});
  easterPlaying = true;
  syncSite();
  notifyEaster();
}

export function stopEasterEgg() {
  if (easter) {
    easter.pause();
    easter.currentTime = 0;
  }
  easterPlaying = false;
  syncSite();
  notifyEaster();
}
