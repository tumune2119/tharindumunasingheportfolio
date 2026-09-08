import { Button } from "@/components/Button";

// Home page hero: title/slogan + bio cards on the left, a photo placeholder
// on the right. No explicit grid-cols on the wrapper below md, so it
// naturally stacks to one column on mobile; md:grid-cols-2 splits it into
// the two-column layout from the wireframe at larger sizes.
export default function Home() {
  return (
    <main
      id="home"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24"
    >
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Title + slogan */}
          <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
            <h1 className="text-h2 md:text-h1">
              Hi, I’m Tharindu Munasinghe, I design products, then build
              them.
            </h1>
            <p className="text-body md:text-body-lg mt-4 text-muted-foreground">
              Product designer &amp; full-stack developer. I map the problem,
              design the decision, and ship it — using AI as a tool, not a
              shortcut around the thinking.
            </p>
          </section>

          {/* Bio + CTAs. flex-1 lets this card stretch to fill the
              remaining height so it lines up with the photo placeholder
              on the right at md and up (see md:items-stretch above). */}
          <section className="flex flex-1 flex-col rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
            <p className="text-body text-muted-foreground">
              I’m a product designer and full-stack developer based in Sri
              Lanka. I care more about why a screen looks the way it does
              than how it looks — mapping flows, weighing trade-offs, and
              making deliberate calls before a single pixel gets placed.
            </p>
            <p className="text-body mt-4 text-muted-foreground">
              I build fast by directing AI tools like Claude Code, but I stay
              close enough to the code to know what’s real, what’s
              scaffolding, and what’s still broken. Recent work spans EV
              infrastructure design (Sri Charge) to a full-stack booking
              platform built solo, end to end (Kandy 1st Court).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {/* download attribute makes this actually save the file
                  instead of just navigating to it in the browser. */}
              <Button
                href="/cv.pdf"
                download="Tharindu-Munasinghe-CV.pdf"
                variant="primary"
              >
                Download CV
              </Button>
              <Button href="/contact" variant="outline">
                Contact me
              </Button>
            </div>
          </section>
        </div>

        {/* Placeholder until a real photo is ready — swap for next/image
            once one exists. md:h-full stretches it to match the left
            column's total height (see md:items-stretch on the grid). */}
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/20 bg-surface p-6 text-center sm:min-h-80 md:h-full md:p-8">
          <p className="text-body-sm font-medium text-muted-foreground">
            Photo coming soon
          </p>
          <p className="text-caption max-w-56 text-muted-foreground">
            Candid working shot, high contrast against the dark theme.
          </p>
        </div>
      </div>
    </main>
  );
}
