import Link from "next/link";
import { Button } from "@/components/Button";
import { contactDetails } from "@/lib/contact";

// Only the actionable entries (Location has no href) — a quick set of
// tap/click targets, not the full contact card; the actual form lives on
// the dedicated Contact page this links out to.
const quickLinks = contactDetails.filter((detail) => detail.href);

// Home page scroll-down summary of the Contact section — closes out the
// same scroll-down flow as Experience/Projects/Articles above it, so a
// visitor who scrolls all the way down lands on a clear way to reach out
// instead of a dead end.
export function ContactPreview() {
  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-overline text-muted-foreground">Contact</p>
          <h2 className="text-h3 mt-1">Let’s have a chat.</h2>
        </div>
        <Link
          href="/contact"
          title="Go to the Contact page"
          className="text-body-sm shrink-0 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
        >
          View contact →
        </Link>
      </div>

      <p className="text-body mt-6 text-muted-foreground">
        Got a project, a question, or just want to say hi? I read every
        message and reply from tumune2119@gmail.com.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {quickLinks.map((detail) => (
          <a
            key={detail.label}
            href={detail.href}
            target={detail.href?.startsWith("http") ? "_blank" : undefined}
            rel={
              detail.href?.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            title={detail.title}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-surface px-3 py-1.5 text-body-sm text-foreground transition-all duration-500 ease-in-out hover:border-primary/30 hover:text-primary"
          >
            <detail.icon className="h-3.5 w-3.5" />
            {detail.label}
          </a>
        ))}
        <Button
          href="/contact"
          variant="primary"
          title="Go to the Contact page"
          className="ml-auto"
        >
          Contact me
        </Button>
      </div>
    </section>
  );
}
