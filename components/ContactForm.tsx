"use client";

import emailjs from "@emailjs/browser";
import { useState, type FormEvent } from "react";
import { Button } from "./Button";

type Status = "idle" | "sending" | "sent" | "error";

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

      <Button
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="self-start"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      {status === "sent" && (
        <p className="text-body-sm animate-fade-in-up text-success">
          Message sent — thanks! I’ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-body-sm animate-fade-in-up text-error">
          Something went wrong sending that. Please try again or email me
          directly.
        </p>
      )}
    </form>
  );
}
