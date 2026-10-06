"use client";

import { useCallback, useSyncExternalStore } from "react";

export type UiStyle = "classic" | "hud";

const STORAGE_KEY = "ui-style";

// The data-ui attribute on <html> is the single source of truth. The inline
// script in the layout sets it before paint from the stored choice, and every
// component that uses this hook reads it, so the toggle and the HUD frame
// always agree.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): UiStyle {
  return document.documentElement.getAttribute("data-ui") === "hud" ? "hud" : "classic";
}

function getServerSnapshot(): UiStyle {
  return "classic";
}

// The HUD styles are all scoped under html[data-ui="hud"] in globals.css, so
// classic stays exactly as it was when this is off. The styles stay in the
// code either way; only the attribute changes.
export function useUiStyle() {
  const style = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleStyle = useCallback(() => {
    const next: UiStyle = getSnapshot() === "hud" ? "classic" : "hud";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the switch still works for this visit.
    }
    document.documentElement.setAttribute("data-ui", next);
    listeners.forEach((onChange) => onChange());
  }, []);

  return { style, toggleStyle };
}
