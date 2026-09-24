"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

// Standard "manual activation" tablist keyboard pattern: Left/Right moves
// and selects (wrapping at either end), Home/End jump to the first/last
// tab. Panels stay in the DOM (as role="tabpanel", just `hidden`) so
// assistive tech sees the full tab structure, but only the active one's
// content actually mounts — remounting a panel on every switch is what
// lets its inner <Reveal> fade-in replay each time, instead of firing once
// and never again after the first tab visit.
export function ExperienceTabs({ tabs }: { tabs: TabItem[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectIndex(index: number) {
    const wrapped = (index + tabs.length) % tabs.length;
    setActiveId(tabs[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectIndex(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectIndex(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectIndex(tabs.length - 1);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Experience sections"
        className="flex w-fit flex-wrap gap-1.5 rounded-full border border-foreground/10 bg-surface p-1.5"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`experience-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`experience-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-full px-4 py-2 text-body-sm font-medium transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`experience-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`experience-tab-${tab.id}`}
            hidden={tab.id !== activeId}
          >
            {tab.id === activeId && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
