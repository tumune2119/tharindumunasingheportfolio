"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { IntroNotepad } from "@/components/IntroNotepad";
import { INTRO_OPEN_EVENT } from "@/lib/introEvent";
import { THEME_SWITCH_EVENT } from "@/lib/themeSwitch";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTheme } from "@/lib/useTheme";

// First-visit intro: a desktop with a MUNE folder, a window with one
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
    "C:\\MUNE> RUN_PORTFOLIO.EXE",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const reducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (document.documentElement.dataset.intro === "pending") {
      setPhase("desktop");
    }
  }, []);

  // Locks page scroll while the intro is up.
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

  // Escape closes the innermost thing open (the Start menu, then Notepad).
  // It does not skip the intro, so it can't end a session by accident.
  useEffect(() => {
    if (!phase) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (menuOpen) setMenuOpen(false);
      else if (notepadOpen) setNotepadOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [phase, menuOpen, notepadOpen]);

  // Clicking anywhere outside the Start menu or its button closes the menu.
  useEffect(() => {
    if (!menuOpen) return;
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Element | null;
      if (target?.closest("[data-start-menu]")) return;
      setMenuOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  // The top-left readout reopens the desktop with its Start menu open, so the
  // visitor can get back to Notepad or the theme switch without a refresh.
  useEffect(() => {
    function reopen() {
      setShutdown(false);
      setNotepadOpen(false);
      setMenuOpen(true);
      setPhase("desktop");
    }
    window.addEventListener(INTRO_OPEN_EVENT, reopen);
    return () => window.removeEventListener(INTRO_OPEN_EVENT, reopen);
  }, []);

  // Same theme switch as the header toggle, including the glitch overlay.
  function handleToggleTheme() {
    toggleTheme();
    window.dispatchEvent(new Event(THEME_SWITCH_EVENT));
  }

  // Browsers only let a script close a tab it opened, so the close is tried
  // first and the screen below is the fallback when it's refused.
  function handleShutdown() {
    setMenuOpen(false);
    setShutdown(true);
    window.close();
  }

  if (!phase) return null;

  if (shutdown) {
    return (
      <div
        id="intro-root"
        role="status"
        className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-background p-6 text-center font-mono text-caption uppercase tracking-wider text-muted-foreground"
      >
        <p className="text-primary">Shutdown complete</p>
        <p className="mt-2">It is now safe to close this tab.</p>
      </div>
    );
  }

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

        {notepadOpen && (
          <IntroNotepad
            onClose={() => setNotepadOpen(false)}
            onToggleTheme={handleToggleTheme}
            isDark={isDark}
          />
        )}
      </div>

      {menuOpen && (
        <StartMenu
          isDark={isDark}
          onNotepad={() => {
            setMenuOpen(false);
            setNotepadOpen(true);
          }}
          onTheme={() => {
            setMenuOpen(false);
            handleToggleTheme();
          }}
          onOpenSite={finish}
          onShutdown={handleShutdown}
        />
      )}

      <Taskbar menuOpen={menuOpen} onStart={() => setMenuOpen((open) => !open)} />
    </div>
  );
}

// The Start menu: Notepad, theme switch, open the site, and shut down. It
// sits above the taskbar, opposite the Start button.
function StartMenu({
  isDark,
  onNotepad,
  onTheme,
  onOpenSite,
  onShutdown,
}: {
  isDark: boolean;
  onNotepad: () => void;
  onTheme: () => void;
  onOpenSite: () => void;
  onShutdown: () => void;
}) {
  const itemClass =
    "flex w-full items-center justify-between px-4 py-2.5 text-left text-caption uppercase tracking-wider text-foreground hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:bg-primary/15 focus-visible:text-primary";

  return (
    <div
      role="menu"
      data-start-menu="menu"
      aria-label="Start menu"
      className="intro-menu absolute bottom-10 left-0 z-10 flex w-64 flex-col py-2"
    >
      <button type="button" role="menuitem" onClick={onNotepad} className={itemClass}>
        <span>Notepad</span>
        <span aria-hidden="true" className="text-accent">&gt;_</span>
      </button>
      <button type="button" role="menuitem" onClick={onTheme} className={itemClass}>
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
        <span aria-hidden="true" className="text-accent">◐</span>
      </button>
      <button type="button" role="menuitem" onClick={onOpenSite} className={itemClass}>
        <span>Open portfolio</span>
        <span aria-hidden="true" className="text-accent">↵</span>
      </button>
      <div className="my-1 h-px bg-primary/30" aria-hidden="true" />
      <button type="button" role="menuitem" onClick={onShutdown} className={itemClass}>
        <span>Shut down</span>
        <span aria-hidden="true" className="text-accent">⏻</span>
      </button>
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
        label="MUNE"
        selected={selected}
        onSelect={() => setSelected(true)}
        onOpen={onOpen}
      >
        <FolderIcon className="h-14 w-14 text-primary" />
      </DesktopIcon>
      <p className="hud-label mt-6 max-w-xs">
        Double-click MUNE to open
      </p>
    </div>
  );
}

function Taskbar({
  menuOpen,
  onStart,
}: {
  menuOpen: boolean;
  onStart: () => void;
}) {
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
    <div className="intro-taskbar relative flex h-10 items-center justify-between px-3 text-caption uppercase tracking-wider">
      <button
        type="button"
        onClick={onStart}
        data-start-menu="toggle"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        className={`hud-cta px-3 py-1 text-caption ${menuOpen ? "bg-primary-variant" : ""}`}
      >
        Start
      </button>
      <span className="text-muted-foreground">Esc closes menus</span>
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
          <span>MUNE</span>
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
          <span>C:\MUNE\RUN_PORTFOLIO.EXE</span>
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
