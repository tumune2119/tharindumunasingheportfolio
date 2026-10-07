"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

// The page's scrollbars, drawn by the site instead of the browser. The native
// bars are hidden (see globals.css), so every browser shows the same chamfered
// thumb. Scrolling itself is still the browser's own: wheel, trackpad, touch and
// keyboard all keep working. This only mirrors the position and lets the thumb
// be dragged or the track clicked.

const MIN_THUMB = 40;

type Axis = {
  visible: boolean;
  size: number;
  offset: number;
};

type Axes = { y: Axis; x: Axis };

const HIDDEN: Axes = {
  y: { visible: false, size: 0, offset: 0 },
  x: { visible: false, size: 0, offset: 0 },
};

// Works out one axis: the thumb length is the visible share of the page, and
// its offset is the scroll position as a share of the track.
function measureAxis(viewport: number, content: number, scroll: number): Axis {
  const max = content - viewport;
  if (max <= 0) return { visible: false, size: 0, offset: 0 };
  const track = viewport;
  const size = Math.max(MIN_THUMB, (viewport / content) * track);
  const offset = (scroll / max) * (track - size);
  return { visible: true, size, offset };
}

function measure(): Axes {
  const doc = document.documentElement;
  return {
    y: measureAxis(window.innerHeight, doc.scrollHeight, window.scrollY),
    x: measureAxis(window.innerWidth, doc.scrollWidth, window.scrollX),
  };
}

// Moves the window's scroll to a position, ignoring the page's smooth-scroll
// setting so the thumb tracks the pointer exactly.
function scrollToAxis(axis: "x" | "y", position: number) {
  if (axis === "y") {
    window.scrollTo({ top: position, behavior: "instant" as ScrollBehavior });
  } else {
    window.scrollTo({ left: position, behavior: "instant" as ScrollBehavior });
  }
}

export function HudScrollbars() {
  const [axes, setAxes] = useState<Axes>(HIDDEN);
  const dragRef = useRef<{
    axis: "x" | "y";
    startPointer: number;
    startScroll: number;
  } | null>(null);

  useEffect(() => {
    function update() {
      setAxes(measure());
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  // Converts a pointer distance along a track into a scroll distance, so a
  // thumb moved by N pixels scrolls the page proportionally.
  function scrollForPointer(axis: "x" | "y", pointer: number) {
    const current = measure()[axis];
    const doc = document.documentElement;
    const viewport = axis === "y" ? window.innerHeight : window.innerWidth;
    const content = axis === "y" ? doc.scrollHeight : doc.scrollWidth;
    const max = content - viewport;
    const travel = viewport - current.size;
    if (travel <= 0) return;
    const position = Math.min(max, Math.max(0, ((pointer - current.size / 2) / travel) * max));
    scrollToAxis(axis, position);
  }

  function startDrag(axis: "x" | "y", event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      axis,
      startPointer: axis === "y" ? event.clientY : event.clientX,
      startScroll: axis === "y" ? window.scrollY : window.scrollX,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const doc = document.documentElement;
    const axis = drag.axis;
    const viewport = axis === "y" ? window.innerHeight : window.innerWidth;
    const content = axis === "y" ? doc.scrollHeight : doc.scrollWidth;
    const size = measure()[axis].size;
    const travel = viewport - size;
    if (travel <= 0) return;
    const pointer = axis === "y" ? event.clientY : event.clientX;
    const delta = pointer - drag.startPointer;
    const max = content - viewport;
    scrollToAxis(axis, Math.min(max, Math.max(0, drag.startScroll + (delta / travel) * max)));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function clickTrack(axis: "x" | "y", event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const pointer = axis === "y" ? event.clientY - rect.top : event.clientX - rect.left;
    scrollForPointer(axis, pointer);
  }

  const { x, y } = axes;

  return (
    <>
      {y.visible && (
        <div
          aria-hidden="true"
          className="hud-sb-rail hud-sb-rail--y"
          onPointerDown={(event) => clickTrack("y", event)}
        >
          <div
            className="hud-sb-thumb hud-sb-thumb--y"
            style={{ height: y.size, top: y.offset }}
            onPointerDown={(event) => startDrag("y", event)}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />
        </div>
      )}
      {x.visible && (
        <div
          aria-hidden="true"
          className="hud-sb-rail hud-sb-rail--x"
          onPointerDown={(event) => clickTrack("x", event)}
        >
          <div
            className="hud-sb-thumb hud-sb-thumb--x"
            style={{ width: x.size, left: x.offset }}
            onPointerDown={(event) => startDrag("x", event)}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />
        </div>
      )}
    </>
  );
}
