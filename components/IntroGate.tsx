"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IntroNotepad } from "@/components/IntroNotepad";
import { INTRO_OPEN_EVENT } from "@/lib/introEvent";
import { THEME_SWITCH_EVENT } from "@/lib/themeSwitch";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTheme } from "@/lib/useTheme";

// First-visit intro: a desktop with a THARINDU_MUNASINGHE folder, a window with one
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
    "C:\\THARINDU_MUNASINGHE> RUN_PORTFOLIO.EXE",
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
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const reducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
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
      setMenuOpen(false);
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

  // Folder shortcut: close the intro and go straight to a page.
  function openPage(href: string) {
    finish();
    router.push(href);
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
          <DesktopFolder
            onOpen={() => setPhase("folder")}
            onOpenReadme={() => setReadmeOpen(true)}
          />
        )}

        {phase === "folder" &&
          (unlocked ? (
            <FolderWindow
              onClose={() => setPhase("desktop")}
              onRun={() => setPhase("terminal")}
              onOpenPage={openPage}
            />
          ) : (
            <LoginWindow
              onClose={() => setPhase("desktop")}
              onUnlock={() => setUnlocked(true)}
            />
          ))}

        {readmeOpen && <ReadmeWindow onClose={() => setReadmeOpen(false)} />}

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
        <span>CLI</span>
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

function DesktopFolder({
  onOpen,
  onOpenReadme,
}: {
  onOpen: () => void;
  onOpenReadme: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="absolute left-6 top-6 md:left-10 md:top-10">
      <div className="flex gap-4">
        <DesktopIcon
          label="THARINDU_MUNASINGHE"
          selected={selectedId === "folder"}
          onSelect={() => setSelectedId("folder")}
          onOpen={onOpen}
        >
          <FolderIcon className="h-14 w-14 text-primary" />
        </DesktopIcon>
        <DesktopIcon
          label="README.TXT"
          selected={selectedId === "readme"}
          onSelect={() => setSelectedId("readme")}
          onOpen={onOpenReadme}
        >
          <ReadmeIcon className="h-14 w-14 text-primary" />
        </DesktopIcon>
      </div>
    </div>
  );
}

function ReadmeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4h18l8 8v32H12z" />
      <path d="M30 4v8h8M18 22h12M18 28h12M18 34h8" />
    </svg>
  );
}

// Credentials for the THARINDU_MUNASINGHE folder. The README on the desktop gives them out,
// so this gate is for fun, not real security.
const FOLDER_LOGIN = { username: "Det.MuNe", password: "password123" };

function LoginWindow({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nameMatches =
      username.trim().toLowerCase() === FOLDER_LOGIN.username.toLowerCase();
    if (nameMatches && password === FOLDER_LOGIN.password) {
      setError("");
      onUnlock();
      return;
    }
    setError("ACCESS DENIED. The README on the desktop has the details.");
    setPassword("");
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window">
        <div className="hud-window-bar">
          <span>THARINDU_MUNASINGHE · LOGIN</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <p className="hud-label">// Restricted folder</p>
          <label className="block">
            <span className="text-caption uppercase tracking-wider">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              autoFocus
              className="intro-input mt-1 w-full px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-caption uppercase tracking-wider">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              className="intro-input mt-1 w-full px-3 py-2"
            />
          </label>
          {error && (
            <p role="alert" className="intro-error text-caption">
              {error}
            </p>
          )}
          <button type="submit" className="hud-cta">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

function ReadmeWindow({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window">
        <div className="hud-window-bar">
          <span>README.TXT</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close README" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <div className="space-y-3 p-6 text-caption leading-relaxed">
          <p>THARINDU_MUNASINGHE is locked. Here is how to get in.</p>
          <p>
            Username: <span className="text-primary">Det.MuNe</span>
          </p>
          <p>
            Password: <span className="text-primary">password123</span>
          </p>
          <p className="text-muted-foreground">Yes, really. It is a portfolio, not a bank.</p>
        </div>
      </div>
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
      <span className="text-accent">{time}</span>
    </div>
  );
}

type ShortcutKind = "experience" | "projects" | "articles" | "contact";

const SHORTCUTS: { label: string; href: string; kind: ShortcutKind }[] = [
  { label: "EXPERIENCE", href: "/experience", kind: "experience" },
  { label: "PROJECTS", href: "/projects", kind: "projects" },
  { label: "ARTICLES", href: "/articles", kind: "articles" },
  { label: "CONTACT", href: "/contact", kind: "contact" },
];

// One glyph per destination, so each shortcut is recognisable at a glance:
// a briefcase for experience, a grid for projects, a page with lines for
// articles and an envelope for contact.
function ShortcutIcon({
  kind,
  className,
}: {
  kind: ShortcutKind;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (kind) {
    case "experience":
      return (
        <svg {...common}>
          <rect x="6" y="14" width="36" height="26" />
          <path d="M18 14V9h12v5M6 25h36" />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="15" height="15" />
          <rect x="27" y="6" width="15" height="15" />
          <rect x="6" y="27" width="15" height="15" />
          <rect x="27" y="27" width="15" height="15" />
        </svg>
      );
    case "articles":
      return (
        <svg {...common}>
          <path d="M24 12c-5-3-12-4-18-2v28c6-2 13-1 18 2 5-3 12-4 18-2V10c-6-2-13-1-18 2z" />
          <path d="M24 12v28" />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <rect x="6" y="11" width="36" height="26" />
          <path d="M6 13l18 14 18-14" />
        </svg>
      );
  }
}

function FolderWindow({
  onClose,
  onRun,
  onOpenPage,
}: {
  onClose: () => void;
  onRun: () => void;
  onOpenPage: (href: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window">
        <div className="hud-window-bar">
          <span>THARINDU_MUNASINGHE</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
          <DesktopIcon
            label="RUN_PORTFOLIO.EXE"
            selected={selectedId === "run"}
            onSelect={() => setSelectedId("run")}
            onOpen={onRun}
          >
            <ExeIcon className="h-12 w-12 text-primary" />
          </DesktopIcon>
          {SHORTCUTS.map((shortcut) => (
            <DesktopIcon
              key={shortcut.href}
              label={shortcut.label}
              selected={selectedId === shortcut.href}
              onSelect={() => setSelectedId(shortcut.href)}
              onOpen={() => onOpenPage(shortcut.href)}
            >
              <ShortcutIcon kind={shortcut.kind} className="h-12 w-12 text-primary" />
            </DesktopIcon>
          ))}
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
          <span>C:\THARINDU_MUNASINGHE\RUN_PORTFOLIO.EXE</span>
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
