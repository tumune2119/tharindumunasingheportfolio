"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

// A notepad window that behaves like a command prompt, opened from the intro
// desktop's Start menu. Every command is scripted and purely cosmetic: "run"
// prints random code, and nothing here reads or changes anything on the
// visitor's machine. A few commands hand out clues to the site's easter egg,
// released one at a time through "hint" so the hunt isn't given away.

type Line = { kind: "in" | "out"; text: string };

const FILES: Record<string, string> = {
  "readme.md": "PORTFOLIO. Nothing to see here. Try 'help'.",
  "hint.txt": "Hints are rationed. Type: hint",
  "secret.enc": "ENCRYPTED. Ask for a hint to find the way in.",
};

// Released in order by "hint". Each one only names the next step.
const HINTS = [
  "Something on the home page has a small '?' tucked in its corner. Hover it.",
  "What it types is written backwards. Each letter swaps with its mirror: A↔Z, B↔Y, C↔X.",
  "Decode it, then click the text for a second clue. After that: ↑ ↑ ↓ ↓ ← → ← → B A, or Ctrl+Shift+G.",
];

const HELP = [
  "help        list commands",
  "ls          list files",
  "cat <file>  print a file",
  "hint        get the next hint",
  "run         execute the portfolio payload",
  "theme       switch dark / light mode",
  "whoami      who am i",
  "date        current date",
  "clear       clear the screen",
  "exit        close notepad",
];

const RUN_STEP_MS = 110;

function hex(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return out;
}

// Random output for "run". Regenerated on every run so it never repeats.
function buildRunLines(): string[] {
  const lines = ["> compiling payload..."];
  for (let i = 0; i < 5; i++) {
    lines.push(`  ${hex(8)} ${hex(8)} ${hex(8)} ${hex(8)}`);
  }
  lines.push("> linking modules ............ OK");
  lines.push("> segfault? no. it's fine.");
  lines.push("ACCESS GRANTED.");
  return lines;
}

export function IntroNotepad({
  onClose,
  onToggleTheme,
  isDark,
}: {
  onClose: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}) {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: "Notepad ready. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // Keep the newest line in view.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [history]);

  function print(...texts: string[]) {
    setHistory((h) => [...h, ...texts.map((text) => ({ kind: "out" as const, text }))]);
  }

  // Prints lines one at a time, so "run" looks like it's executing.
  function emitSlowly(lines: string[]) {
    lines.forEach((text, i) => {
      const id = setTimeout(() => print(text), i * RUN_STEP_MS);
      timersRef.current.push(id);
    });
  }

  function runCommand(raw: string) {
    const [command, ...args] = raw.trim().split(/\s+/);
    const name = command.toLowerCase();

    switch (name) {
      case "":
        return;
      case "help":
        return print(...HELP);
      case "ls":
        return print(Object.keys(FILES).join("  "));
      case "cat": {
        const file = args[0]?.toLowerCase();
        if (!file) return print("cat: missing file name");
        return print(FILES[file] ?? `cat: ${args[0]}: no such file`);
      }
      case "hint": {
        if (hintIndex >= HINTS.length) {
          return print("No more hints. You're closer than you think.");
        }
        setHintIndex((i) => i + 1);
        return print(`hint ${hintIndex + 1}/${HINTS.length}: ${HINTS[hintIndex]}`);
      }
      case "run":
        return emitSlowly(buildRunLines());
      case "theme":
        onToggleTheme();
        return print(`switched to ${isDark ? "light" : "dark"} mode`);
      case "whoami":
        return print("visitor. not a hacker. (wink)");
      case "date":
        return print(new Date().toDateString());
      case "sudo":
        return print("nice try.");
      case "clear":
        return setHistory([]);
      case "exit":
        return onClose();
      default:
        return print(`'${command}' is not recognized as a command. Type 'help'.`);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = input;
    setInput("");
    if (raw.trim().toLowerCase() !== "clear") {
      setHistory((h) => [...h, { kind: "in", text: raw }]);
    }
    runCommand(raw);
  }

  return (
    <div
      role="dialog"
      aria-label="Notepad"
      className="hud-window fixed left-1/2 top-1/2 z-210 -translate-x-1/2 -translate-y-1/2"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="hud-window-bar">
        <span>NOTEPAD.TXT · MUNE</span>
        <div className="hud-window-controls">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notepad"
            className="hud-window-btn"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex h-80 w-[min(90vw,36rem)] flex-col text-caption">
        <div ref={logRef} className="flex-1 space-y-1 overflow-y-auto p-4" aria-live="polite">
          {history.map((line, i) => (
            <p
              key={i}
              className={line.kind === "in" ? "text-primary" : "text-foreground"}
            >
              {line.kind === "in" ? `C:\\MUNE> ${line.text}` : line.text}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-primary/30 px-4 py-3">
          <label htmlFor="intro-command" className="shrink-0 text-primary">
            C:\MUNE&gt;
          </label>
          <input
            id="intro-command"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none"
          />
        </form>
      </div>
    </div>
  );
}
