"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

// Shared across every window on the page: whichever one was interacted with
// most recently claims the next number, so it paints above the rest — the
// same "click to bring forward" rule a real window manager uses. Starts well
// clear of the fixed overlay z-indexes used elsewhere (the intro root, the
// Settings backdrop, and so on), which all stay in the hundreds.
let frontCounter = 1;

// Lets a window be dragged by its title bar, and brought to the front by a
// press anywhere on it. Pointer events (rather than mouse events) so touch
// works too. Presses on the window's buttons don't start a drag, so the
// close control still just closes — they still bring the window forward.
// The offset is applied as a transform, so the window's own layout and
// Tailwind classes stay as they are.
//
// `initialOffset` nudges a window off dead-centre as soon as it opens — every
// window centres on the same spot by default, so a window meant to open
// *alongside* another (e.g. a file's window opened from its still-open
// parent folder) would otherwise land exactly on top of it. Between this and
// bringing a window forward on click, anything can still be reached even
// when several windows end up overlapping — the same as dragging one aside
// on a real desktop.
//
// `focusToken` is for bringing a window forward from outside it entirely —
// the taskbar restoring a minimized window, for instance, which has no
// press on the window itself to hook bringToFront onto. Any change to this
// value (a parent bumping a per-window counter) raises it, same as a click
// would; it's ignored while undefined, so a window that nobody's asked to
// refocus doesn't jump to the front just because its caller re-rendered.
export function useWindowDrag(
  initialOffset: { x: number; y: number } = { x: 0, y: 0 },
  focusToken?: number,
) {
  const [offset, setOffset] = useState(initialOffset);
  const [front, setFront] = useState(() => frontCounter++);
  const start = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);

  function bringToFront() {
    setFront(frontCounter++);
  }

  useEffect(() => {
    if (focusToken !== undefined) bringToFront();
    // Deliberately keyed only on the token itself — bringToFront is stable
    // in spirit (it always does the same thing) and including it would mean
    // the lint rule asking for the whole closure, not just the signal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusToken]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if ((event.target as Element).closest("button")) return;
    start.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: offset.x,
      y: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const origin = start.current;
    if (!origin) return;
    setOffset({
      x: origin.x + event.clientX - origin.pointerX,
      y: origin.y + event.clientY - origin.pointerY,
    });
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    start.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return {
    style: {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      zIndex: front,
    } as CSSProperties,
    handleProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
    // Spread onto the window's own root element (not just its title bar), so
    // a press anywhere on it — including where another window currently
    // covers part of it — brings it forward without otherwise interfering
    // with clicks on whatever's inside.
    rootProps: {
      onPointerDownCapture: bringToFront,
    },
  };
}
