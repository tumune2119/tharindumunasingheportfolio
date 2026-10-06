"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Colombo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function sectionLabel(pathname: string) {
  if (pathname === "/") return "HOME";
  if (pathname.startsWith("/projects/")) return "CASE STUDY";
  if (pathname.startsWith("/articles/")) return "ARTICLE";
  return pathname.split("/")[1]?.toUpperCase() || "HOME";
}

// Viewport chrome for the HUD: a drifting grid behind the page with a scan line
// sweeping down through it, then corner brackets and live readouts on top of
// everything (including the sticky header). All decorative, and the readouts
// are hidden below md so they never cover content on phones.
export function HudFrame() {
  const pathname = usePathname();
  const [clock, setClock] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setClock(clockFormat.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="hud-grid pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hud-scanline absolute inset-x-0" />
      </div>

      <div
        aria-hidden="true"
        className="hud-frame pointer-events-none fixed inset-0 z-60 overflow-hidden"
      >
        <span className="hud-bracket left-3 top-3 border-l-2 border-t-2" />
        <span className="hud-bracket right-3 top-3 border-r-2 border-t-2" />
        <span className="hud-bracket bottom-3 left-3 border-b-2 border-l-2" />
        <span className="hud-bracket bottom-3 right-3 border-b-2 border-r-2" />

        <div className="hud-readout absolute right-7 top-5 hidden items-center gap-2 md:flex">
          <span className="hud-status-dot" />
          <span className="text-success">ONLINE</span>
        </div>

        <div className="hud-readout absolute bottom-5 left-7 hidden md:block">
          <p>LAT 06.9271° N / LON 79.8612° E</p>
          <p className="text-accent">COLOMBO {clock}</p>
        </div>

        <div className="hud-readout absolute bottom-5 right-7 hidden text-right md:block">
          <p className="text-accent">{sectionLabel(pathname)}</p>
          <p>SCROLL {String(scrollPercent).padStart(3, "0")}%</p>
        </div>
      </div>
    </>
  );
}
