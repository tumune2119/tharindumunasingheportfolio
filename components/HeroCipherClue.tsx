"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_CIPHER_MESSAGE } from "@/lib/heroCipherMessage";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  isEasterEggPlaying,
  playEasterEgg,
  stopEasterEgg,
  subscribeEasterEgg,
} from "@/lib/siteMusic";

const TYPE_SPEED_MS = 26;

// The second clue only reaches the console once someone actually clicks
// the revealed cipher text below — not automatically on every page load,
// which would spoil the hunt for anyone who just happens to have DevTools
// open.
function logConsoleClue() {
  console.log(
    "%cFound the first clue? Nice.",
    "font-size: 14px; font-weight: bold;",
  );
  console.log("Some codes never change: ↑ ↑ ↓ ↓ ← → ← → B A");
}

// A small "?" marker in the corner of the hero illustration card.
// Hovering (or focusing, for keyboard users) types out the encoded first
// clue beside it; clicking the revealed text unlocks the second clue in
// the console. Kept as a small corner target rather than covering the
// whole image, so it doesn't fight the image's own hover-driven liquid
// distortion effect for pointer events.
export function HeroCipherClue() {
  const [active, setActive] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [songPlaying, setSongPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // The track itself lives in lib/siteMusic, so it keeps playing across
  // components and ignores the site's mute setting. Click once to start, click
  // again to stop. It also stops if the card unmounts. The song file isn't
  // shipped with the repo; drop your own legally-obtained clip at
  // public/audio/gravity-falls-theme.mp3. Without it, playback fails silently.
  function toggleThemeSong() {
    if (isEasterEggPlaying()) {
      stopEasterEgg();
    } else {
      playEasterEgg();
    }
  }

  function handleClick() {
    logConsoleClue();
    toggleThemeSong();
  }

  // Keeps the button's pressed state in step with the shared track, including
  // when it ends by itself. Stops it if this card unmounts, so it doesn't keep
  // playing on a page that's gone.
  useEffect(() => {
    const unsubscribe = subscribeEasterEgg(() => setSongPlaying(isEasterEggPlaying()));
    return () => {
      unsubscribe();
      if (isEasterEggPlaying()) stopEasterEgg();
    };
  }, []);

  useEffect(() => {
    if (!active) {
      setTypedLength(0);
      return;
    }
    if (reducedMotion) {
      setTypedLength(HERO_CIPHER_MESSAGE.length);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTypedLength((length) => {
        if (length >= HERO_CIPHER_MESSAGE.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return length;
        }
        return length + 1;
      });
    }, TYPE_SPEED_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, reducedMotion]);

  return (
    <div
      className="absolute bottom-3 right-3 z-10 flex items-center justify-end"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {active && (
        <button
          type="button"
          onClick={handleClick}
          title={songPlaying ? "Click to stop" : "Decode me"}
          aria-pressed={songPlaying}
          className="hud-tip mr-2 transition-colors duration-500 ease-in-out hover:text-primary"
        >
          <span className="hud-label block">&gt; DECODE.TXT</span>
          <span className="mt-1 block">
            {HERO_CIPHER_MESSAGE.slice(0, typedLength)}
            {typedLength < HERO_CIPHER_MESSAGE.length && !reducedMotion && (
              <span aria-hidden="true" className="hud-cursor">
                _
              </span>
            )}
          </span>
        </button>
      )}
      <span
        tabIndex={0}
        role="button"
        aria-label="A small secret"
        title="?"
        className="hud-marker shrink-0"
      >
        ?
      </span>
    </div>
  );
}
