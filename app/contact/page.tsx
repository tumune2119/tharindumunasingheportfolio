import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

// Contact card entries. Entries without an href (Location) render as plain text.
const contactDetails = [
  { label: "Location", value: "Colombo, Western Province, Sri Lanka" },
  { label: "Phone", value: "+94 77 268 1057", href: "tel:+94772681057" },
  {
    label: "Email",
    value: "tumune2119@gmail.com",
    href: "mailto:tumune2119@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tharindu-munasinghe-45b053184",
    href: "https://www.linkedin.com/in/tharindu-munasinghe-45b053184/",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Contact</p>
      <h1 className="text-h2 md:text-h1 mt-3">Let’s have a chat.</h1>

      <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 md:items-start">
        <Reveal>
        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h4">Tharindu Munasinghe</h2>
          <p className="text-body-sm mt-1 text-muted-foreground">
            Senior UI/UX Engineer
          </p>

          <dl className="mt-6 flex flex-col gap-4">
            {contactDetails.map((item) => (
              <div key={item.label}>
                <dt className="text-overline text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-body text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors duration-500 ease-in-out hover:text-primary hover:decoration-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-body text-foreground">
                      {item.value}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        </Reveal>

        <Reveal delay={80}>
        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h4">Send a message</h2>
          <p className="text-body-sm mt-1 text-muted-foreground">
            I read every message and reply from tumune2119@gmail.com.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
        </Reveal>
      </div>
    </main>
  );
}
