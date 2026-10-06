"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUiStyle } from "@/lib/useUiStyle";

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

// Decorative viewport chrome for the HUD style. Only rendered while the HUD is
// on, and hidden below md so it never covers content on phones.
export function HudFrame() {
  const { style } = useUiStyle();
  const pathname = usePathname();
  const [clock, setClock] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);
  const isHud = style === "hud";

  useEffect(() => {
    if (!isHud) return;
    const id = setInterval(() => setClock(clockFormat.format(new Date())), 1000);
    return () => clearInterval(id);
  }, [isHud]);

  useEffect(() => {
    if (!isHud) return;
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHud]);

  if (!isHud) return null;

  return (
    <div aria-hidden="true" className="hud-frame pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <span className="hud-bracket left-3 top-3 border-l-2 border-t-2" />
      <span className="hud-bracket right-3 top-3 border-r-2 border-t-2" />
      <span className="hud-bracket bottom-3 left-3 border-b-2 border-l-2" />
      <span className="hud-bracket bottom-3 right-3 border-b-2 border-r-2" />

      <div className="hud-readout absolute bottom-5 left-7">
        <p>LAT 06.9271° N / LON 79.8612° E</p>
        <p className="text-accent">COLOMBO {clock}</p>
      </div>

      <div className="hud-readout absolute bottom-5 right-7 text-right">
        <p className="text-accent">{sectionLabel(pathname)}</p>
        <p>SCROLL {String(scrollPercent).padStart(3, "0")}%</p>
      </div>
    </div>
  );
}
