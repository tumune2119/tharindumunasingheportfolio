"use client";

import emailjs from "@emailjs/browser";
import { useState, type FormEvent } from "react";
import { Button } from "./Button";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "rounded-xl border border-foreground/10 bg-surface px-4 py-3 text-body text-foreground outline-none focus:border-primary";
const labelClasses = "text-body-sm font-medium text-foreground";

// Sends straight from the browser to EmailJS — no backend route needed, so
// this works the same in local dev and once deployed. The three IDs below
// come from the EmailJS dashboard and must be set as NEXT_PUBLIC_ env vars
// (client-side code can only read env vars with that prefix — see
// app/contact/page.tsx and the project README for the exact keys).
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "EmailJS env vars are missing. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
          "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // sendForm reads each input's `name` directly as the template
      // variable — e.g. name="name" fills {{name}} in the EmailJS template.
      // These must match the variable names used in the EmailJS template body.
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
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
        <p className="text-body-sm text-success">
          Message sent — thanks! I’ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-body-sm text-error">
          Something went wrong sending that. Please try again or email me
          directly.
        </p>
      )}
    </form>
  );
}
