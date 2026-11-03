import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What data this site collects and how it's used.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Privacy</p>
      <h1 className="text-h2 md:text-h1 mt-3">What this site collects.</h1>

      <div className="mt-8 flex flex-col gap-6">
        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h4">Contact form</h2>
          <p className="text-body mt-3 text-muted-foreground">
            The name, email address, subject and message you submit through
            the contact form are sent directly to my inbox using EmailJS, a
            third-party email delivery service. I use that information only
            to reply to you, and I don&apos;t sell or share it with anyone
            else.
          </p>
        </section>

        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h4">Analytics</h2>
          <p className="text-body mt-3 text-muted-foreground">
            This site uses Vercel Web Analytics to see which pages get
            visited. It doesn&apos;t use cookies and doesn&apos;t collect any
            information that identifies you personally, only aggregate
            counts like page views.
          </p>
        </section>

        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h4">Questions</h2>
          <p className="text-body mt-3 text-muted-foreground">
            Email me at tumune2119@gmail.com if you have any questions about
            this.
          </p>
        </section>
      </div>
    </main>
  );
}
