"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { INTRO_OPEN_EVENT } from "@/lib/introEvent";
import { AccessibilityBootstrap } from "./AccessibilityControls";
import { SiteControls } from "./SiteControls";
import { ThemeToggle } from "./ThemeToggle";

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Colombo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// The current site path as a folder-style trail, e.g. PORTFOLIO/PROJECTS/SRI-CHARGE/.
function sitePath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return ["PORTFOLIO", ...segments].join("/").toUpperCase() + "/";
}

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
      <AccessibilityBootstrap />

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

      {/* Top-left path readout. It sits outside the aria-hidden frame because
          "MUNE" is a button: clicking it reopens the intro desktop at its
          Start menu. Level with the top bracket arms, clear of the logo. */}
      <div className="hud-readout fixed left-7 top-5 z-60 hidden md:block">
        <p>
          <span className="text-accent">DIR: //</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(INTRO_OPEN_EVENT))}
            className="hud-link text-accent"
            title="Back to the start menu"
          >
            MUNE
          </button>
          <span className="text-accent">// </span>
          <span className="text-foreground">{sitePath(pathname)}</span>
        </p>
      </div>

      {/* Site options: always visible, under the DIR readout on desktop. */}
      <SiteControls />

      {/* Sits under the ONLINE tag in the top-right corner. The frame above
          ignores the pointer, so this wrapper turns it back on for the
          switch. It's outside the aria-hidden frame so it stays in the
          accessibility tree. Desktop only; phones keep it in the header. */}
      <div className="fixed right-7 top-12 z-60 hidden md:block">
        <ThemeToggle />
      </div>
    </>
  );
}
