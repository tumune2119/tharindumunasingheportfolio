"use client";

import { useEffect, useState } from "react";
import { EasterEggReveal } from "./EasterEggReveal";
import { useKonamiCode } from "@/lib/useKonamiCode";

// Three-step hunt: the hero illustration's corner marker (see
// HeroCipherClue) or the matching hidden HTML comment nudges a curious
// visitor to decode the Atbash clue; clicking the revealed text there logs
// the second clue to the console, which nudges them to the Konami code
// below, and the code triggers the reveal. Ctrl/Cmd+Shift+G is kept as a
// quick shortcut once you already know it's there, so you don't have to
// retype all 10 keys every time — both paths open the exact same reveal.
export function EasterEgg() {
  const [revealOpen, setRevealOpen] = useState(false);

  function unlock() {
    // Setting the same value while it's already open is a no-op in React
    // — mashing the shortcut or re-entering the code mid-reveal won't
    // restart the sequence from the top.
    setRevealOpen(true);
  }

  useKonamiCode(unlock);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "g"
      ) {
        event.preventDefault();
        unlock();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <EasterEggReveal open={revealOpen} onClose={() => setRevealOpen(false)} />
  );
}
