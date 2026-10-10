"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
} from "react";

// A scrolling area inside the page (the thumbnail strip, the intro CLI log)
// with the same HUD scrollbar as the page. The native bar is hidden, and a bar
// is drawn only when the content overflows, so it's there where it's needed.
// Scrolling itself is still the browser's: wheel, trackpad, touch and keyboard.

const MIN_THUMB = 28;

type Thumb = { visible: boolean; size: number; offset: number };
const HIDDEN: Thumb = { visible: false, size: 0, offset: 0 };

type Props = HTMLAttributes<HTMLDivElement> & {
  axis: "x" | "y";
  wrapperClassName?: string;
};

export const HudScrollArea = forwardRef<HTMLDivElement, Props>(function HudScrollArea(
  { axis, wrapperClassName = "", className = "", children, ...rest },
  forwardedRef,
) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState<Thumb>(HIDDEN);
  const dragRef = useRef<{ start: number; startPos: number } | null>(null);

  // Lets the caller keep its own ref (the CLI log scrolls itself to the bottom).
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      scrollerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const viewport = axis === "x" ? el.clientWidth : el.clientHeight;
    const content = axis === "x" ? el.scrollWidth : el.scrollHeight;
    const position = axis === "x" ? el.scrollLeft : el.scrollTop;
    const max = content - viewport;
    if (max <= 0) {
      setThumb(HIDDEN);
      return;
    }
    const size = Math.max(MIN_THUMB, (viewport / content) * viewport);
    const offset = (position / max) * (viewport - size);
    setThumb({ visible: true, size, offset });
  }, [axis]);

  useEffect(() => {
    measure();
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (event.button !== 0 || !el) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      start: axis === "x" ? event.clientX : event.clientY,
      startPos: axis === "x" ? el.scrollLeft : el.scrollTop,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    const drag = dragRef.current;
    if (!el || !drag) return;
    const viewport = axis === "x" ? el.clientWidth : el.clientHeight;
    const content = axis === "x" ? el.scrollWidth : el.scrollHeight;
    const travel = viewport - thumb.size;
    if (travel <= 0) return;
    const pointer = axis === "x" ? event.clientX : event.clientY;
    const max = content - viewport;
    const position = Math.min(max, Math.max(0, drag.startPos + ((pointer - drag.start) / travel) * max));
    if (axis === "x") el.scrollLeft = position;
    else el.scrollTop = position;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  // The y-axis scroller is pinned to fill its (position: relative) wrapper via
  // absolute + inset-0, rather than height: 100% — a percentage height needs
  // its parent's height to be "specified", and a flex item sized only by
  // max-height/flex-basis doesn't reliably count as that in every browser.
  // Inset-filling sidesteps the question entirely. The x-axis scroller stays
  // in normal flow, since its wrapper is meant to size to its content.
  const scrollerOverflow =
    axis === "x"
      ? "overflow-x-auto overflow-y-hidden"
      : "absolute inset-0 overflow-y-auto overflow-x-hidden";

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <div ref={setRefs} onScroll={measure} className={`${scrollerOverflow} ${className}`} {...rest}>
        {children}
      </div>
      {thumb.visible && (
        <div
          aria-hidden="true"
          className={axis === "x" ? "hud-inner-rail hud-inner-rail--x" : "hud-inner-rail hud-inner-rail--y"}
        >
          <div
            className={axis === "x" ? "hud-sb-thumb hud-sb-thumb--x" : "hud-sb-thumb hud-sb-thumb--y"}
            style={axis === "x" ? { width: thumb.size, left: thumb.offset } : { height: thumb.size, top: thumb.offset }}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />
        </div>
      )}
    </div>
  );
});
