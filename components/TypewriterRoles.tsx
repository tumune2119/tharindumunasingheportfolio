"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED_MS = 80;
const DELETE_SPEED_MS = 40;
const PAUSE_AFTER_TYPE_MS = 1500;
const PAUSE_AFTER_DELETE_MS = 300;

// Cycles through `roles`, typing each one out, pausing, deleting it, then
// moving to the next — looping forever. Purely decorative, so the actual
// text is aria-hidden; render a static sr-only list alongside this for
// screen readers (see app/page.tsx).
export function TypewriterRoles({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const handleChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Skip the animation for users who've asked for reduced motion —
    // just show the first role, static.
    if (reduceMotion) {
      setText(roles[0]);
      return;
    }

    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        TYPE_SPEED_MS,
      );
    } else if (!isDeleting && text.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE_MS);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        DELETE_SPEED_MS,
      );
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      }, PAUSE_AFTER_DELETE_MS);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles, reduceMotion]);

  return (
    <span className="text-primary" aria-hidden="true">
      {text}
      {!reduceMotion && (
        <span className="animate-pulse" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
}
