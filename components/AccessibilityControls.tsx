"use client";

import { useEffect } from "react";
import { applyMotionSetting, getA11ySettings } from "@/lib/a11ySettings";
import { playClickSound } from "@/lib/clickSound";
import { startSiteMusic } from "@/lib/siteMusic";

// Real interactive controls only — buttons, links, tabs, menu items, that
// kind of thing. Deliberately excludes drag handles (cursor-grab) and plain
// desktop/window space, so dragging a window or clicking past one doesn't
// also click-sound.
const CLICKABLE_SELECTOR =
  'button, a[href], [role="button"], [role="menuitem"], [role="tab"], [role="switch"], summary, select, input[type="checkbox"], input[type="radio"]';

// Renders nothing. Applies the saved animation setting once the page is up,
// starts site music on the first click or key press (browsers only allow
// audio after a gesture), and plays a short click sound on every real
// control's click. Mounted once from the HUD frame, so it runs on every
// page — including behind the intro gate, which sits on top of it. Gestures
// spent on the intro itself (clicking around the desktop, opening the
// terminal) don't start the music: `data-intro="pending"` stays on <html>
// for as long as the intro is up, and IntroGate's own finish() (what
// actually clears it) starts the music itself. This listener only needs to
// catch the case where the intro never runs at all — a visitor landing
// straight on the site. Click sounds, unlike the music, do play throughout
// the intro — that's the whole point of them there.
export function AccessibilityBootstrap() {
  useEffect(() => {
    applyMotionSetting(getA11ySettings().motionPaused);

    function start() {
      if (document.documentElement.dataset.intro === "pending") return;
      startSiteMusic();
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    }
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null;
      if (target?.closest(CLICKABLE_SELECTOR)) playClickSound();
    }
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
