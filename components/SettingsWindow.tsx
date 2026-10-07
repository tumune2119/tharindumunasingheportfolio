"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { setA11ySettings, useA11ySettings } from "@/lib/a11ySettings";
import { useWindowDrag } from "@/lib/useWindowDrag";

// Visitor settings in a HUD window. Opened from the site's Settings button and
// from the intro's Start menu, so both give the same controls.
export function SettingsWindow({ onClose }: { onClose: () => void }) {
  const { motionPaused, musicMuted } = useA11ySettings();
  const drag = useWindowDrag();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-210 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="hud-window w-[min(90vw,28rem)]"
        style={drag.style}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
          <span>SETTINGS</span>
          <div className="hud-window-controls">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="hud-window-btn"
            >
              ×
            </button>
          </div>
        </div>
        <div className="space-y-6 p-6">
          <SettingRow
            label="Animations"
            detail="Pausing freezes the looping effects. Page loading still runs."
            status={motionPaused ? "Paused" : "Playing"}
            actionLabel={motionPaused ? "Play animations" : "Pause animations"}
            icon={motionPaused ? <PlayIcon /> : <PauseIcon />}
            onToggle={() => setA11ySettings({ motionPaused: !motionPaused })}
          />
          <SettingRow
            label="Music"
            detail="Muting silences the site music. The easter egg track still plays."
            status={musicMuted ? "Muted" : "Playing"}
            actionLabel={musicMuted ? "Unmute music" : "Mute music"}
            icon={musicMuted ? <UnmutedIcon /> : <MutedIcon />}
            onToggle={() => setA11ySettings({ musicMuted: !musicMuted })}
          />
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  detail,
  status,
  actionLabel,
  icon,
  onToggle,
}: {
  label: string;
  detail: string;
  status: string;
  actionLabel: string;
  icon: ReactNode;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-body-sm font-medium">
          {label}: <span className="text-primary">{status}</span>
        </p>
        <p className="text-caption text-muted-foreground">{detail}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        title={actionLabel}
        aria-label={actionLabel}
        className="hud-icon-button shrink-0"
      >
        {icon}
      </button>
    </div>
  );
}

// Icons are drawn with currentColor so they follow the button's colour.
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M7 5l12 7-12 7z" />
    </svg>
  );
}

// Speaker with sound waves: shown while music is playing, so the button mutes.
function MutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M16 9a4 4 0 010 6M19 6a8 8 0 010 12" />
    </svg>
  );
}

// Speaker with a cross: shown while music is muted, so the button unmutes.
function UnmutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M16 9l5 6M21 9l-5 6" />
    </svg>
  );
}
