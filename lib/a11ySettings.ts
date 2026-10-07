"use client";

import { useSyncExternalStore } from "react";

// Accessibility preferences: pause all motion, and mute the site's background
// music. They're saved in this browser only, so a visitor's choice holds across
// reloads and visits, and nothing is sent anywhere.
export type A11ySettings = {
  motionPaused: boolean;
  musicMuted: boolean;
};

const KEYS = {
  motionPaused: "a11y-motion-paused",
  musicMuted: "a11y-music-muted",
} as const;

const DEFAULTS: A11ySettings = { motionPaused: false, musicMuted: false };

const listeners = new Set<() => void>();
let cache: A11ySettings | null = null;

function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    // Storage blocked or unavailable: fall back to the defaults.
    return false;
  }
}

function writeFlag(key: string, value: boolean) {
  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
}

// Mirrors the pause setting onto <html> so one CSS rule can freeze every
// CSS animation and transition on the page.
export function applyMotionSetting(motionPaused: boolean) {
  if (motionPaused) {
    document.documentElement.setAttribute("data-motion", "paused");
  } else {
    document.documentElement.removeAttribute("data-motion");
  }
}

export function getA11ySettings(): A11ySettings {
  if (!cache) {
    cache = {
      motionPaused: readFlag(KEYS.motionPaused),
      musicMuted: readFlag(KEYS.musicMuted),
    };
  }
  return cache;
}

export function setA11ySettings(partial: Partial<A11ySettings>) {
  const next = { ...getA11ySettings(), ...partial };
  cache = next;
  if (partial.motionPaused !== undefined) {
    writeFlag(KEYS.motionPaused, next.motionPaused);
    applyMotionSetting(next.motionPaused);
  }
  if (partial.musicMuted !== undefined) {
    writeFlag(KEYS.musicMuted, next.musicMuted);
  }
  listeners.forEach((listener) => listener());
}

export function subscribeA11ySettings(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useA11ySettings(): A11ySettings {
  return useSyncExternalStore(subscribeA11ySettings, getA11ySettings, () => DEFAULTS);
}
