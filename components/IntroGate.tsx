"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { HudScrollArea } from "@/components/HudScrollArea";
import { IntroNotepad } from "@/components/IntroNotepad";
import { SettingsWindow } from "@/components/SettingsWindow";
import { INTRO_OPEN_EVENT } from "@/lib/introEvent";
import { THEME_SWITCH_EVENT } from "@/lib/themeSwitch";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTheme } from "@/lib/useTheme";
import { useWindowDrag } from "@/lib/useWindowDrag";

// First-visit intro: a desktop with a THARINDU_MUNASINGHE folder, a window with one
// RUN_PORTFOLIO.EXE file, and a terminal that prints a burst of fake boot
// output before the site appears. Purely aesthetic. Nothing here runs a
// real process or touches a real system.
//
// It plays once per browser session. The inline script in the root layout
// marks the page `data-intro="pending"` only when the session hasn't seen it
// yet and this isn't a reload, so the site stays hidden until this component
// takes over. A reload skips the intro and lands on the home page.

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
  // Every window is its own independent boolean (or, for evidence photos, a
  // set of ids) instead of one exclusive "phase" — that was the earlier
  // design, and it meant opening one window could only replace another, never
  // sit alongside it. Now opening any window leaves everything else, desktop
  // icons included, exactly as it was.
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [openPhotos, setOpenPhotos] = useState<ReadonlySet<string>>(new Set());
  const reducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  function openPhoto(id: string) {
    setOpenPhotos((current) => new Set(current).add(id));
  }

  function closePhoto(id: string) {
    setOpenPhotos((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  useEffect(() => {
    if (document.documentElement.dataset.intro === "pending") {
      setOpen(true);
    }
  }, []);

  // Locks page scroll while the intro is up.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const finish = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage blocked: the intro may replay next time, which is harmless.
    }
    setOpen(false);
  }, []);

  // Escape closes the innermost thing open (the Start menu, then Notepad).
  // It does not skip the intro, so it can't end a session by accident.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (menuOpen) setMenuOpen(false);
      else if (notepadOpen) setNotepadOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, menuOpen, notepadOpen]);

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

  // The top-left readout reopens the intro at a clean desktop — every window
  // closed, Start menu closed — so the visitor can get back to Notepad or the
  // theme switch without a refresh. unlocked is left as it was, so the folder
  // doesn't demand the password again this session.
  useEffect(() => {
    function reopen() {
      setShutdown(false);
      setNotepadOpen(false);
      setMenuOpen(false);
      setReadmeOpen(false);
      setSettingsOpen(false);
      setFolderOpen(false);
      setEvidenceOpen(false);
      setCvOpen(false);
      setTerminalOpen(false);
      setOpenPhotos(new Set());
      setOpen(true);
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

  if (!open) return null;

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
      {/* Same scan wipe as the site grid, drawn behind the desktop content. */}
      <div aria-hidden="true" className="hud-scanline pointer-events-none absolute inset-x-0" />
      <div className="relative flex-1">
        {/* The desktop itself: the hero badge and the icons. Always on,
            regardless of what else is open, the same as a real desktop
            staying put under its windows. */}
        <IntroHero />
        <DesktopFolder
          onOpen={() => setFolderOpen(true)}
          onOpenReadme={() => setReadmeOpen(true)}
        />

        {folderOpen &&
          (unlocked ? (
            <FolderWindow
              onClose={() => setFolderOpen(false)}
              onRun={() => setTerminalOpen(true)}
              onOpenCv={() => setCvOpen(true)}
              onOpenEvidence={() => setEvidenceOpen(true)}
            />
          ) : (
            <LoginWindow
              onClose={() => setFolderOpen(false)}
              onUnlock={() => setUnlocked(true)}
            />
          ))}

        {readmeOpen && <ReadmeWindow onClose={() => setReadmeOpen(false)} />}

        {settingsOpen && <SettingsWindow onClose={() => setSettingsOpen(false)} />}

        {evidenceOpen && (
          <EvidenceWindow
            onClose={() => setEvidenceOpen(false)}
            openPhotos={openPhotos}
            onOpenPhoto={openPhoto}
          />
        )}

        {EVIDENCE_ITEMS.filter((item) => openPhotos.has(item.id)).map((item, i) => (
          <PhotoWindow key={item.id} item={item} index={i} onClose={() => closePhoto(item.id)} />
        ))}

        {cvOpen && <CvWindow onClose={() => setCvOpen(false)} />}

        {terminalOpen && (
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
          onSettings={() => {
            setMenuOpen(false);
            setSettingsOpen(true);
          }}
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
  onSettings,
}: {
  isDark: boolean;
  onSettings: () => void;
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
      <button type="button" role="menuitem" onClick={onSettings} className={itemClass}>
        <span>Settings</span>
        <span aria-hidden="true" className="text-accent">⚙</span>
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
      {/* break-words: long identifiers like DOSSIER.CLASSIFIED have no spaces
          to wrap at, so without it they'd overflow the fixed-width column
          and run into the next icon's label instead of wrapping. */}
      <span className="w-full text-center wrap-break-word">{label}</span>
    </button>
  );
}

// Centred hero on the intro desktop: the mint badge flips like a coin once per
// scan wipe, with the title and name bar under it. Decorative, except the name,
// which is plain text for screen readers.
function IntroHero() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="intro-coin-wrap">
        <div className="intro-coin">
          <div className="intro-coin-face">
            <img src="/hud/mint-badge.svg" alt="" aria-hidden="true" className="h-full w-full" />
          </div>
          <div className="intro-coin-face intro-coin-face--back">
            <img src="/hud/mint-badge.svg" alt="" aria-hidden="true" className="h-full w-full" />
          </div>
        </div>
      </div>
      <p className="intro-hero-title" aria-hidden="true">U.I. / U.X.</p>
      <p className="intro-hero-bar">Tharindu Munasinghe</p>
    </div>
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
      <div className="flex flex-col gap-4">
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
  // Inputs stay read-only until they're focused. Browsers only autofill fields
  // they can write to, so this keeps saved logins out, and the fields stay
  // empty every time the window opens.
  const [editable, setEditable] = useState(false);

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

  const drag = useWindowDrag();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window pointer-events-auto" style={drag.style} {...drag.rootProps}>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
          <span>THARINDU_MUNASINGHE · LOGIN</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-4 p-6"
        >
          <p className="hud-label">// Restricted folder</p>
          <label className="block">
            <span className="text-caption uppercase tracking-wider">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onFocus={() => setEditable(true)}
              readOnly={!editable}
              name="intro-login-user"
              autoComplete="off"
              spellCheck={false}
              className="intro-input mt-1 w-full px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-caption uppercase tracking-wider">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setEditable(true)}
              readOnly={!editable}
              name="intro-login-secret"
              autoComplete="new-password"
              className="intro-input mt-1 w-full px-3 py-2"
            />
          </label>
          {error && (
            <p role="alert" className="intro-error text-caption">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="hud-cta">
              Log in
            </button>
            <span className="text-caption text-muted-foreground">
              See README.TXT for mission data.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReadmeWindow({ onClose }: { onClose: () => void }) {
  // Offset from dead-centre: every window starts centred by default, and
  // with none of them hiding each other anymore, a visitor opening several
  // at once needs to actually see more than one. Each window type gets its
  // own starting corner; dragging moves it from there same as any other.
  // README and the folder/login window are both reachable straight from the
  // bare desktop and are the same size (no width class, short content), so
  // this is offset vertically by more than that shared height — the two
  // boxes then can't overlap no matter how their widths land.
  const drag = useWindowDrag({ x: -40, y: -280 });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window pointer-events-auto" style={drag.style} {...drag.rootProps}>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
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

function FolderWindow({
  onClose,
  onRun,
  onOpenCv,
  onOpenEvidence,
}: {
  onClose: () => void;
  onRun: () => void;
  onOpenCv: () => void;
  onOpenEvidence: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const drag = useWindowDrag();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window pointer-events-auto" style={drag.style} {...drag.rootProps}>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
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
          <DesktopIcon
            label="DOSSIER.CLASSIFIED"
            selected={selectedId === "cv"}
            onSelect={() => setSelectedId("cv")}
            onOpen={onOpenCv}
          >
            <ClassifiedIcon className="h-12 w-12 text-primary" />
          </DesktopIcon>
          <DesktopIcon
            label="EVIDENCE"
            selected={selectedId === "evidence"}
            onSelect={() => setSelectedId("evidence")}
            onOpen={onOpenEvidence}
          >
            <FolderIcon className="h-12 w-12 text-primary" />
          </DesktopIcon>
        </div>
      </div>
    </div>
  );
}

// A locked-looking file icon for the classified CV, reusing README's document
// shape with a small padlock in place of text lines.
function ClassifiedIcon({ className }: { className?: string }) {
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
      <path d="M30 4v8h8" />
      <rect x="18" y="26" width="12" height="9" rx="1" />
      <path d="M20 26v-3a4 4 0 018 0v3" />
    </svg>
  );
}

// Four field photos, each its own file in the EVIDENCE folder. The caption is
// flavour text for the window, not a factual description — the alt text below
// is the real description, for screen readers.
const EVIDENCE_ITEMS = [
  {
    id: "a",
    file: "/hud/evidence/exhibit-a.jpg",
    label: "EXHIBIT_A.JPG",
    caption: "Subject entering an unmarked service corridor.",
    alt: "Black-and-white photo of a man walking through a lit doorway into a dim corridor at night.",
  },
  {
    id: "b",
    file: "/hud/evidence/exhibit-b.jpg",
    label: "EXHIBIT_B.JPG",
    caption: "Subject at the operations terminal, monitoring feeds.",
    alt: "Black-and-white photo of a man at a desk with a camera and laptop, multiple monitors behind him.",
  },
  {
    id: "c",
    file: "/hud/evidence/exhibit-c.jpg",
    label: "EXHIBIT_C.JPG",
    caption: "Subject en route, package in hand.",
    alt: "Black-and-white photo, shot through a window, of a man walking down a wet street carrying a briefcase.",
  },
  {
    id: "d",
    file: "/hud/evidence/exhibit-d.jpg",
    label: "EXHIBIT_D.JPG",
    caption: "Subject at a dead drop, routine check.",
    alt: "Black-and-white photo of a man sitting on a park bench at night, reading a newspaper under a streetlight.",
  },
] as const;

type EvidenceItem = (typeof EVIDENCE_ITEMS)[number];

// A plain photo icon: frame, a "sun" and a mountain silhouette.
function PhotoIcon({ className }: { className?: string }) {
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
      <rect x="5" y="8" width="38" height="32" />
      <circle cx="17" cy="19" r="4" />
      <path d="M5 33l11-10 9 8 7-7 11 10" />
    </svg>
  );
}

function EvidenceWindow({
  onClose,
  openPhotos,
  onOpenPhoto,
}: {
  onClose: () => void;
  openPhotos: ReadonlySet<string>;
  onOpenPhoto: (id: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const drag = useWindowDrag({ x: 210, y: 90 });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window pointer-events-auto" style={drag.style} {...drag.rootProps}>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
          <span>EVIDENCE</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
          {EVIDENCE_ITEMS.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              selected={selectedId === item.id}
              onSelect={() => setSelectedId(item.id)}
              onOpen={() => onOpenPhoto(item.id)}
            >
              <PhotoIcon className="h-12 w-12 text-primary" />
            </DesktopIcon>
          ))}
        </div>
        {openPhotos.size > 0 && (
          <p className="hud-label px-4 pb-4">// {openPhotos.size} file(s) open</p>
        )}
      </div>
    </div>
  );
}

// One exhibit photo in its own window. index spaces each further out, so
// opening more than one at a time cascades them instead of stacking exactly.
function PhotoWindow({
  item,
  index,
  onClose,
}: {
  item: EvidenceItem;
  index: number;
  onClose: () => void;
}) {
  const drag = useWindowDrag({ x: 110 + index * 55, y: 260 + index * 40 });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div
        className="hud-window pointer-events-auto w-[min(85vw,20rem)]"
        style={drag.style}
        {...drag.rootProps}
      >
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
          <span>{item.label}</span>
          <div className="hud-window-controls">
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${item.label}`}
              className="hud-window-btn"
            >
              ×
            </button>
          </div>
        </div>
        <img
          src={item.file}
          alt={item.alt}
          className="hud-evidence-photo block max-h-[65vh] w-full bg-black object-contain"
        />
        <p className="hud-label p-3 text-center">// {item.caption}</p>
      </div>
    </div>
  );
}

// A redacted "dossier" built from the real CV (public/Tharindu-Munasinghe-CV.pdf),
// with personal contact details and references' contact details replaced by
// redaction bars — not just hidden with CSS, the real values never reach the
// page at all. Purely in-fiction: the actual CV stays downloadable from the
// Contact page as normal.
function CvWindow({ onClose }: { onClose: () => void }) {
  const drag = useWindowDrag({ x: -110, y: 160 });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div
        className="hud-window pointer-events-auto relative w-[min(92vw,34rem)]"
        style={drag.style}
        {...drag.rootProps}
      >
        <span className="hud-stamp" aria-hidden="true">
          Classified
        </span>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
          <span>DOSSIER.CLASSIFIED — EYES ONLY</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        {/* A definite height (not max-height): the scroller inside fills it via
            absolute + inset-0, which only works against a wrapper whose own
            height doesn't depend on that same child's content. */}
        <HudScrollArea axis="y" wrapperClassName="h-[min(70vh,32rem)]" className="h-full space-y-5 p-6 text-caption leading-relaxed">
          <div className="flex gap-4">
            <div className="hud-photo-frame shrink-0">
              <img src="/hud/dossier-photo.png" alt="" aria-hidden="true" className="hud-photo" />
              <span className="hud-eye-redact" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-h4">Tharindu Munasinghe</h2>
              <p className="text-primary">AKA: MuNe</p>
              <p className="text-muted-foreground">
                Senior UI/UX Engineer · Product Designer · Design Systems &amp; Front-End Specialist
              </p>
              <p className="mt-2">
                <Redacted width="7ch" /> <Redacted width="9ch" /> <Redacted width="6ch" />
                <br />
                <Redacted width="7ch" /> · <Redacted width="9ch" />
              </p>
            </div>
          </div>

          <div>
            <p className="hud-label">// Subject file</p>
            <ul className="mt-1 space-y-1">
              <li>
                CASE #: <Redacted width="6ch" />
                -2026
              </li>
              <li>
                CLEARANCE: <Redacted width="5ch" />
              </li>
              <li>
                HANDLER: <Redacted width="8ch" />
              </li>
              <li>
                LAST SIGNAL: <Redacted width="6ch" />
              </li>
              <li>STATUS: ACTIVE</li>
            </ul>
          </div>

          <div>
            <p className="hud-label">// Profile</p>
            <p className="mt-1">
              <Redacted width="3ch" />+ years operating under long-term cover across the full{" "}
              <Redacted width="7ch" /> lifecycle — <Redacted width="8ch" />, information architecture
              and <Redacted width="9ch" /> through to <Redacted width="11ch" /> execution in the
              field. Known for directing <Redacted width="7ch" /> strategy and{" "}
              <Redacted width="8ch" /> tradecraft, and for <Redacted width="8ch" /> junior assets
              drawn into the operation along the way.
            </p>
          </div>

          <div>
            <p className="hud-label">// Mission log</p>
            <div className="mt-1 space-y-3">
              <p>
                <span className="text-foreground">MISSION — <Redacted width="8ch" />.</span>{" "}
                Embedded at <Redacted width="6ch" /> under deep cover as &ldquo;
                <Redacted width="8ch" />.&rdquo; Directed a full <Redacted width="8ch" /> overhaul
                from the ground up, running a cell of <Redacted width="4ch" /> operatives through{" "}
                <Redacted width="6ch" /> and <Redacted width="5ch" /> protocols. Kept{" "}
                <Redacted width="7ch" /> leadership briefed to hold the operation&apos;s cover
                story in line with <Redacted width="6ch" /> interests. Outcome:{" "}
                <Redacted width="6ch" />.
              </p>
              <p>
                <span className="text-foreground">MISSION — <Redacted width="8ch" />.</span> Built
                and field-tested <Redacted width="6ch" /> interfaces under the{" "}
                <Redacted width="4ch" />, <Redacted width="5ch" /> and <Redacted width="6ch" />{" "}
                toolchain, every pass verified for <Redacted width="7ch" /> compliance before
                release. Ran repeated <Redacted width="8ch" /> on unwitting test subjects,
                adjusting the cover identity on <Redacted width="6ch" /> intel gathered in the
                field. Extraction from this posting was <Redacted width="5ch" />.
              </p>
              <p>
                <span className="text-foreground">MISSION — <Redacted width="8ch" />.</span>{" "}
                Assigned to support operations on core <Redacted width="6ch" /> infrastructure,
                applying <Redacted width="7ch" /> tradecraft to blend design decisions into the
                daily cover work. Assisted in gathering <Redacted width="6ch" /> intelligence to
                validate calls made earlier in the <Redacted width="5ch" /> cycle.
              </p>
              <p>
                <span className="text-foreground">MISSION — <Redacted width="8ch" />.</span>{" "}
                Entry-level placement, shadowing <Redacted width="6ch" /> through{" "}
                <Redacted width="7ch" /> and prototyping drills. Clearance at the time:{" "}
                <Redacted width="5ch" />. Field performance review: <Redacted width="6ch" />.
              </p>
            </div>
          </div>

          <div>
            <p className="hud-label">// Known locations</p>
            <ul className="mt-1 space-y-1.5">
              <li>
                <Redacted width="6ch" /> — <Redacted width="7ch" />, Sri Lanka · last visited:{" "}
                <Redacted width="5ch" />
              </li>
              <li>
                <Redacted width="8ch" /> — <Redacted width="6ch" />, Sri Lanka · last visited:{" "}
                <Redacted width="5ch" />
              </li>
              <li>
                <Redacted width="9ch" /> — <Redacted width="5ch" />, Sri Lanka · last visited:{" "}
                <Redacted width="5ch" />
              </li>
            </ul>
          </div>

          <div>
            <p className="hud-label">// Known associates</p>
            <ul className="mt-1 space-y-2">
              <li>
                Sumala — AKA: <Redacted width="6ch" />
                <br />
                <Redacted width="8ch" /> · <Redacted width="10ch" /> · relationship: <Redacted width="6ch" />
              </li>
              <li>
                Charitha — AKA: <Redacted width="6ch" />
                <br />
                <Redacted width="8ch" /> · <Redacted width="10ch" /> · relationship: <Redacted width="6ch" />
              </li>
            </ul>
          </div>

          <div className="border-t border-primary/20 pt-4">
            <p className="text-muted-foreground">
              This copy is redacted for the story. For the full file, run RUN_PORTFOLIO.EXE.
            </p>
          </div>
        </HudScrollArea>
      </div>
    </div>
  );
}

// A black redaction bar. No real value is ever passed in — the point is that
// what's underneath never reaches the page, not that it's merely hidden by CSS.
function Redacted({ width }: { width: string }) {
  return (
    <span className="hud-redact" style={{ width }}>
      <span className="sr-only">redacted</span>
    </span>
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

  const drag = useWindowDrag();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <div className="hud-window pointer-events-auto" style={drag.style} {...drag.rootProps}>
        <div className="hud-window-bar cursor-grab touch-none select-none" {...drag.handleProps}>
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
