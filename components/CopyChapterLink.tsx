"use client";

import { useState } from "react";

// Small button beside each chapter heading. Copies a URL pointing at that
// exact chapter (#slug) so sharing it lands the reader there directly,
// instead of at the top of the article.
export function CopyChapterLink({ chapterSlug }: { chapterSlug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${chapterSlug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable or blocked — nothing useful to fall back
      // to here, so the button just silently doesn't confirm.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy link to this chapter"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-foreground/10 bg-surface px-3 py-1.5 text-caption font-medium text-muted-foreground transition-all duration-500 ease-in-out hover:text-foreground active:scale-95"
    >
      {copied ? (
        <>
          <CheckIcon className="h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <LinkIcon className="h-3 w-3" />
          Copy link
        </>
      )}
    </button>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
