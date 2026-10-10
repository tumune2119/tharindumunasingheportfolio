"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

// Lets a window be dragged by its title bar. Pointer events (rather than mouse
// events) so touch works too. Presses on the window's buttons are ignored, so
// the close control still just closes. The offset is applied as a transform,
// so the window's own layout and Tailwind classes stay as they are.
//
// `initialOffset` nudges a window off dead-centre as soon as it opens — every
// window centres on the same spot by default, so a window meant to open
// *alongside* another (e.g. a file's window opened from its still-open
// parent folder) would otherwise land exactly on top of it, out of reach
// until dragged. The visitor can still drag it anywhere afterwards.
export function useWindowDrag(initialOffset: { x: number; y: number } = { x: 0, y: 0 }) {
  const [offset, setOffset] = useState(initialOffset);
  const start = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);

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
    } as CSSProperties,
    handleProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}
