"use client";

import { useEffect } from "react";
import { applyMotionSetting, getA11ySettings } from "@/lib/a11ySettings";
import { startSiteMusic } from "@/lib/siteMusic";

// Renders nothing. Applies the saved animation setting once the page is up,
// and starts site music on the first click or key press (browsers only allow
// audio after a gesture). Mounted once from the HUD frame, so it runs on every
// page.
export function AccessibilityBootstrap() {
  useEffect(() => {
    applyMotionSetting(getA11ySettings().motionPaused);
    const start = () => startSiteMusic();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  return null;
}
