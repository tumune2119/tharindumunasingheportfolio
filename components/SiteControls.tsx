"use client";

import { setA11ySettings, useA11ySettings } from "@/lib/a11ySettings";
import { MutedIcon, PauseIcon, PlayIcon, UnmutedIcon } from "./SettingsWindow";

// Two always-visible controls on the site: pause animations and mute music.
// They sit under the DIR readout on desktop and above the footer edge on phones,
// so a visitor can find them on any page without opening a menu. The icon shows
// the current state, and aria-pressed says whether the control is on.
export function SiteControls() {
  const { motionPaused, musicMuted } = useA11ySettings();

  return (
    <div className="fixed bottom-16 left-4 z-60 flex flex-col items-start gap-2 md:bottom-auto md:left-7 md:top-12">
      <button
        type="button"
        onClick={() => setA11ySettings({ motionPaused: !motionPaused })}
        aria-pressed={motionPaused}
        title={motionPaused ? "Play animations" : "Pause animations"}
        className="hud-chip pointer-events-auto inline-flex items-center gap-2"
      >
        {motionPaused ? <PlayIcon /> : <PauseIcon />}
        Animations
      </button>
      <button
        type="button"
        onClick={() => setA11ySettings({ musicMuted: !musicMuted })}
        aria-pressed={musicMuted}
        title={musicMuted ? "Unmute music" : "Mute music"}
        className="hud-chip pointer-events-auto inline-flex items-center gap-2"
      >
        {musicMuted ? <UnmutedIcon /> : <MutedIcon />}
        Music
      </button>
    </div>
  );
}
