"use client";

import { useEffect, useRef } from "react";

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

// Listens for the Konami code anywhere on the page (not tied to a specific
// input) and calls `onUnlock` once the full sequence completes correctly.
// Resets on any wrong key. `event.repeat` guards against a single held key
// auto-repeating into the buffer and accidentally completing/corrupting
// the sequence.
export function useKonamiCode(onUnlock: () => void) {
  const bufferRef = useRef<string[]>([]);
  const onUnlockRef = useRef(onUnlock);

  // Keeping the latest onUnlock in a ref (updated here, not written
  // directly during render) lets the keydown listener below stay mounted
  // once for the component's whole lifetime instead of re-subscribing
  // every time the caller passes a new inline function.
  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;

      const key = event.key.toLowerCase();
      const next = [...bufferRef.current, key].slice(-KONAMI_CODE.length);
      bufferRef.current = next;

      if (
        next.length === KONAMI_CODE.length &&
        next.every((k, i) => k === KONAMI_CODE[i])
      ) {
        bufferRef.current = [];
        onUnlockRef.current();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
