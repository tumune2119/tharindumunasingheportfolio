"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { ImageCarousel } from "./ImageCarousel";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remember what had focus so it can be restored once the modal closes,
    // and move focus into the dialog itself so screen readers announce it.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    // Prevent the page behind the modal from scrolling while it's open —
    // only the content inside the dialog (overflow-y-auto below) should.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Basic focus trap: keep Tab/Shift+Tab cycling within the dialog
      // instead of escaping to the page behind it.
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      // Closes only on a genuine backdrop click, not a click that started
      // inside the dialog and bubbled up.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.slug}-title`}
        tabIndex={-1}
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card outline-none"
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <h2 id={`${project.slug}-title`} className="text-h4">
            {project.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* The scrolling region the user asked for — everything below the
            fixed header scrolls, the header itself stays put. */}
        <div className="overflow-y-auto">
          <ImageCarousel images={project.images} alt={project.title} />

          <div className="flex flex-col gap-6 p-6">
            <p className="text-body-lg text-muted-foreground">
              {project.tagline}
            </p>

            {/* Each field sizes to its own content and wraps to the next
                line as a whole unit, rather than forcing equal-width
                columns that squeeze long values like Role/Status. */}
            <dl className="flex flex-wrap gap-x-8 gap-y-4">
              <Field label="Role" value={project.role} />
              <Field label="Status" value={project.status} />
              <Field label="Platform" value={project.platform} />
              <Field label="Tools" value={project.tools} />
            </dl>

            <Section title="The Problem">
              <p className="text-body text-muted-foreground">
                {project.problem}
              </p>
            </Section>

            <Section title="Approach">
              <p className="text-body text-muted-foreground">
                {project.approach.intro}
              </p>
              <BulletList items={project.approach.points} />
            </Section>

            <Section title="Key Decisions & Challenges">
              <BulletList items={project.keyDecisions} />
            </Section>

            <Section title="Outcome">
              <p className="text-body text-muted-foreground">
                {project.outcome}
              </p>
            </Section>

            <Section title="Tech Stack">
              <p className="text-body text-muted-foreground">
                {project.techStack}
              </p>
            </Section>

            {project.sourceNote && (
              <p className="text-body-sm text-muted-foreground">
                {project.sourceNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="max-w-56">
      <dt className="text-overline text-muted-foreground">{label}</dt>
      <dd className="text-body-sm mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-h5">{title}</h3>
      <div className="mt-2 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-body text-muted-foreground">
          <span
            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
