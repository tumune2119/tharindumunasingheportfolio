"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// First-visit intro: a desktop with a PORTFOLIO folder, a window with one
// RUN_PORTFOLIO.EXE file, and a terminal that prints a burst of fake boot
// output before the site appears. Purely aesthetic. Nothing here runs a
// real process or touches a real system.
//
// It plays once per browser session. The inline script in the root layout
// marks the page `data-intro="pending"` only when the session hasn't seen it
// yet and this isn't a reload, so the site stays hidden until this component
// takes over. A reload skips the intro and lands on the home page.

type Phase = "desktop" | "folder" | "terminal" | null;

const LINE_MS = 240;
const HOLD_MS = 900;

function hex(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return out;
}

// Fresh random output each time the terminal opens, so no two sessions match.
function buildTerminalLines(): string[] {
  return [
    "C:\\PORTFOLIO> RUN_PORTFOLIO.EXE",
    `[ OK ] Routing through node ${hex(4)}:${hex(4)}`,
    "[ OK ] Initialising kernel modules",
    `[ OK ] Mapping memory 0x${hex(8)} - 0x${hex(8)}`,
    "[ ## ] Bypassing portfolio.sys firewall",
    "[ OK ] Loading atbash cipher keys",
    `[ OK ] Decrypting payload ${hex(6)}`,
    "[ OK ] Compiling experience.tsx",
    "[ OK ] Compiling projects.tsx",
    "[ OK ] Rendering hero illustration",
    "ACCESS GRANTED. Welcome, visitor.",
  ];
}

export function IntroGate() {
  const [phase, setPhase] = useState<Phase>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (document.documentElement.dataset.intro === "pending") {
      setPhase("desktop");
    }
  }, []);

  // Locks page scroll while the intro is up, and lets Escape skip it.
  useEffect(() => {
    if (!phase) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  const finish = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage blocked: the intro may replay next time, which is harmless.
    }
    setPhase(null);
  }, []);

  useEffect(() => {
    if (!phase) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [phase, finish]);

  if (!phase) return null;

  return (
    <div
      id="intro-root"
      className="intro-desktop fixed inset-0 z-200 flex flex-col overflow-hidden bg-background font-mono text-foreground"
    >
      <div className="relative flex-1">
        {phase === "desktop" && (
          <DesktopFolder onOpen={() => setPhase("folder")} />
        )}

        {phase === "folder" && (
          <FolderWindow
            onClose={() => setPhase("desktop")}
            onRun={() => setPhase("terminal")}
          />
        )}

        {phase === "terminal" && (
          <TerminalWindow reducedMotion={reducedMotion} onDone={finish} />
        )}
      </div>

      <Taskbar onSkip={finish} />
    </div>
  );
}

// Folder and file icons, drawn with currentColor so they follow the theme.
function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12h14l4 4h22v24H4z" />
      <path d="M4 20h40" />
    </svg>
  );
}

function ExeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4h18l8 8v32H12z" />
      <path d="M30 4v8h8" />
      <path d="M18 28l4 4-4 4M26 36h6" />
    </svg>
  );
}

// Desktop icon: one click selects it, a double-click (or Enter) opens it.
function DesktopIcon({
  label,
  selected,
  onSelect,
  onOpen,
  children,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="intro-icon flex w-28 flex-col items-center gap-2 p-2 text-caption uppercase tracking-wider"
      aria-pressed={selected}
      aria-label={`Open ${label}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter") onOpen();
      }}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

function DesktopFolder({ onOpen }: { onOpen: () => void }) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="absolute left-6 top-6 md:left-10 md:top-10">
      <DesktopIcon
        label="PORTFOLIO"
        selected={selected}
        onSelect={() => setSelected(true)}
        onOpen={onOpen}
      >
        <FolderIcon className="h-14 w-14 text-primary" />
      </DesktopIcon>
      <p className="hud-label mt-6 max-w-xs">
        Double-click PORTFOLIO to open
      </p>
    </div>
  );
}

function Taskbar({ onSkip }: { onSkip: () => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="intro-taskbar flex h-10 items-center justify-between px-3 text-caption uppercase tracking-wider">
      <span className="hud-cta px-3 py-1 text-caption">Start</span>
      <button
        type="button"
        onClick={onSkip}
        className="text-muted-foreground hover:text-primary"
      >
        Skip intro · Esc
      </button>
      <span className="text-accent">{time}</span>
    </div>
  );
}

function FolderWindow({
  onClose,
  onRun,
}: {
  onClose: () => void;
  onRun: () => void;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window">
        <div className="hud-window-bar">
          <span>PORTFOLIO</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <div className="flex min-h-48 p-6">
          <DesktopIcon
            label="RUN_PORTFOLIO.EXE"
            selected={selected}
            onSelect={() => setSelected(true)}
            onOpen={onRun}
          >
            <ExeIcon className="h-12 w-12 text-primary" />
          </DesktopIcon>
        </div>
      </div>
    </div>
  );
}

function TerminalWindow({
  reducedMotion,
  onDone,
}: {
  reducedMotion: boolean;
  onDone: () => void;
}) {
  const [lines] = useState(buildTerminalLines);
  const [shown, setShown] = useState(reducedMotion ? lines.length : 0);

  useEffect(() => {
    if (shown < lines.length) {
      const id = setTimeout(
        () => setShown((count) => count + 1),
        reducedMotion ? 0 : LINE_MS,
      );
      return () => clearTimeout(id);
    }
    const id = setTimeout(onDone, reducedMotion ? 400 : HOLD_MS);
    return () => clearTimeout(id);
  }, [shown, lines.length, onDone, reducedMotion]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window">
        <div className="hud-window-bar">
          <span>C:\PORTFOLIO\RUN_PORTFOLIO.EXE</span>
        </div>
        <div className="space-y-1 p-5 text-caption leading-relaxed" aria-live="polite">
          {lines.slice(0, shown).map((line, i) => (
            <p key={i} className={i === lines.length - 1 ? "text-primary" : ""}>
              {line}
            </p>
          ))}
          {shown < lines.length && (
            <span aria-hidden="true" className="hud-cursor text-primary">
              _
            </span>
          )}
          <div className="hud-progress mt-4">
            <div
              className="hud-progress-fill"
              style={{ animationDuration: reducedMotion ? "0ms" : "3000ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
