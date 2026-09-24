"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Phase = "glitch" | "red" | "matrix" | "message";

// Durations chosen to land inside the ranges from the brief: a quick
// glitch, a smoothly-eased (never a flash/pop) red transition, then a
// longer beat of matrix rain before the joke lands — the rain itself
// doesn't actually stop there, though (see showMatrixRain below); this is
// just how long it plays *alone*, before the message card appears on top.
const GLITCH_MS = 450;
const RED_MS = 550;
const MATRIX_MS = 3000;
const MATRIX_LINE_SWAP_MS = MATRIX_MS * 0.55;

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Full-screen overlay for the easter egg's payoff: a brief glitch, an eased
// (not flashed) red transition, a short matrix-rain beat with a
// deliberately silly "hacking" line, then the actual joke message. Purely
// cosmetic — no network calls, no real data of any kind involved.
export function EasterEggReveal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("glitch");
  const [matrixLine, setMatrixLine] = useState("ACCESSING MAINFRAME...");
  const dialogRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The rain plays alone for MATRIX_MS, then keeps going *underneath* the
  // message card once phase advances — it doesn't actually stop until the
  // whole overlay closes. Reduced-motion users never see it at all, at
  // either phase. Because this only flips true->true (not true->false->true)
  // across that phase change, the draw effect below (keyed on this same
  // value) never tears down and restarts the rain mid-flow.
  const showMatrixRain =
    !reducedMotion && (phase === "matrix" || phase === "message");

  // Reduced motion: skip straight to the message, no animation at all —
  // set once per open, not re-derived every render.
  useEffect(() => {
    if (open) setPhase(reducedMotion ? "message" : "glitch");
  }, [open, reducedMotion]);

  // Advances glitch -> red -> matrix -> message automatically. Skipped
  // entirely under reduced motion, since phase is pinned to "message" above.
  useEffect(() => {
    if (!open || reducedMotion) return;
    if (phase === "glitch") {
      const timeout = setTimeout(() => setPhase("red"), GLITCH_MS);
      return () => clearTimeout(timeout);
    }
    if (phase === "red") {
      const timeout = setTimeout(() => setPhase("matrix"), RED_MS);
      return () => clearTimeout(timeout);
    }
    if (phase === "matrix") {
      const timeout = setTimeout(() => setPhase("message"), MATRIX_MS);
      return () => clearTimeout(timeout);
    }
  }, [open, phase, reducedMotion]);

  // Swaps the fake status line partway through the matrix beat — the
  // "gotcha" is landing the punchline before the message screen even
  // appears, not just in the final text.
  useEffect(() => {
    if (phase !== "matrix") return;
    setMatrixLine("ACCESSING MAINFRAME...");
    const timeout = setTimeout(
      () => setMatrixLine("JUST KIDDING."),
      MATRIX_LINE_SWAP_MS,
    );
    return () => clearTimeout(timeout);
  }, [phase]);

  // Classic falling-character rain. Reads the site's own primary color at
  // draw time (so it's on-brand and matches light/dark theme) instead of a
  // hardcoded "matrix green". Keyed on showMatrixRain (not phase) so it
  // starts once and keeps running behind the message card, instead of
  // tearing down and restarting when the phase itself changes underneath it.
  useEffect(() => {
    if (!showMatrixRain) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rainColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() || "#52b788";

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 18;
    const columns = Math.max(1, Math.floor(canvas.width / fontSize));
    const drops = new Array(columns).fill(1);

    let frameId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = rainColor;
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
      frameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [showMatrixRain]);

  // Modal accessibility: focus the dialog on open, trap Tab inside it,
  // restore focus to whatever was focused before on close, and let ESC
  // close it at any point in the sequence — same pattern used for every
  // other overlay on this site.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Easter egg reveal"
      tabIndex={-1}
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden outline-none ${
        phase === "glitch" ? "" : "transition-colors duration-500 ease-in-out"
      } ${
        phase === "glitch"
          ? "bg-background"
          : phase === "red"
            ? "bg-[#7a1f1f]"
            : "bg-black"
      }`}
    >
      {phase === "glitch" && (
        <div
          aria-hidden="true"
          className="animate-glitch-burst absolute inset-0 bg-background"
        />
      )}

      {/* Rendered for both "matrix" and "message" (see showMatrixRain) —
          the canvas element itself has to stay mounted continuously across
          that transition, or its draw effect would tear down and restart
          instead of continuing seamlessly underneath the message card. */}
      {showMatrixRain && (
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
      )}
      {phase === "matrix" && (
        <p className="relative z-10 font-mono text-body-sm tracking-wide text-[#52b788]">
          {matrixLine}
        </p>
      )}

      {phase === "message" && (
        <div className="animate-fade-in-up relative z-10 mx-4 max-w-md rounded-2xl border border-foreground/10 bg-card p-8 text-center shadow-xl">
          <h2 className="text-h3">You found it. 🎉</h2>
          <p className="text-body mt-3 font-medium text-primary">
            Relax — your computer is not hacked. (Wink.)
          </p>
          <p className="text-body-sm mt-4 text-muted-foreground">
            Honestly, the easter egg hunt was the fun part. It leads to...
            nothing. But hey, I hope this at least means I get hired.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-medium text-primary-foreground shadow-sm transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-primary-variant active:scale-[0.97]"
          >
            Back to home
          </button>
        </div>
      )}
    </div>
  );
}
