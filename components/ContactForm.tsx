"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { SuccessBurst } from "./SuccessBurst";

type Status = "idle" | "sending" | "sent" | "error";

// Copy and colour for the result window. Success uses the theme's success
// token, error its error token, so the window matches the rest of the HUD.
const RESULT = {
  sent: {
    title: "TRANSMISSION.LOG",
    heading: "Message sent",
    body: "Thanks! I’ll get back to you soon.",
    tone: "var(--success)",
  },
  error: {
    title: "TRANSMISSION.LOG",
    heading: "Send failed",
    body: "Something went wrong sending that. Please try again or email me directly.",
    tone: "var(--error)",
  },
} as const;

const fieldClasses =
  "rounded-xl border border-foreground/10 bg-surface px-4 py-3 text-body text-foreground outline-none transition-all duration-500 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClasses = "text-body-sm font-medium text-foreground";

// Sends straight from the browser to EmailJS — no backend route needed, so
// this works the same in local dev and once deployed. These IDs are from
// the EmailJS dashboard (dashboard.emailjs.com/admin). They're safe to keep
// in the source: this call only ever runs client-side, so the values end up
// in the public JS bundle either way — an env var wouldn't hide them any
// better. The actual security boundary is the allowed-domains list under
// EmailJS's Account > Security settings.
const EMAILJS_SERVICE_ID = "service_tdzke1d";
const EMAILJS_TEMPLATE_ID = "template_gkjiu8e";
const EMAILJS_PUBLIC_KEY = "fL-MrKobQa6f_A_ns";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("sending");
    try {
      // sendForm reads each input's `name` directly as the template
      // variable — e.g. name="name" fills {{name}} in the EmailJS template.
      // These must match the variable names used in the EmailJS template body.
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClasses}>
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className={labelClasses}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={fieldClasses}
        />
      </div>

      <div className="relative self-start">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <SuccessBurst trigger={status === "sent"} />
      </div>

    </form>
      {(status === "sent" || status === "error") && (
        <ResultWindow outcome={status} onClose={() => setStatus("idle")} />
      )}
    </>
  );
}

// Result window shown after a send, in the HUD style. Success and error each
// take their own token colour. It portals to <body> so the reveal animation's
// transform on the page can't pull it out of the viewport.
function ResultWindow({
  outcome,
  onClose,
}: {
  outcome: "sent" | "error";
  onClose: () => void;
}) {
  const copy = RESULT[outcome];
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    okRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-result-title"
        className="hud-window hud-tone-window"
        style={{ "--tone": copy.tone } as CSSProperties}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="hud-window-bar">
          <span>{copy.title}</span>
          <div className="hud-window-controls">
            <button type="button" onClick={onClose} aria-label="Close" className="hud-window-btn">
              ×
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6 text-center">
          <p className="hud-label" style={{ color: copy.tone }}>
            {outcome === "sent" ? "// Status: OK" : "// Status: ERR"}
          </p>
          <h2 id="contact-result-title" className="text-h3" style={{ color: copy.tone }}>
            {copy.heading}
          </h2>
          <p className="text-body-sm text-muted-foreground">{copy.body}</p>
          <button
            ref={okRef}
            type="button"
            onClick={onClose}
            className="hud-cta"
            style={{ background: copy.tone }}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
