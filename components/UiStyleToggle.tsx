"use client";

import { useUiStyle } from "@/lib/useUiStyle";

// Switches between the classic interface and the HUD interface. The choice
// is remembered on this device, and turning HUD off restores classic exactly.
export function UiStyleToggle() {
  const { style, toggleStyle } = useUiStyle();
  const isHud = style === "hud";
  const label = isHud ? "Switch to classic interface" : "Switch to HUD interface";

  return (
    <button
      type="button"
      onClick={toggleStyle}
      aria-label={label}
      title={label}
      aria-pressed={isHud}
      className="inline-flex h-8 shrink-0 items-center rounded-full border border-foreground/10 bg-surface px-3 text-caption font-medium text-muted-foreground transition-all duration-500 ease-in-out hover:text-foreground active:scale-95"
    >
      HUD: {isHud ? "On" : "Off"}
    </button>
  );
}
