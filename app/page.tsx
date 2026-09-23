import { Button } from "@/components/Button";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import { HeroAura } from "@/components/HeroAura";
import { HeroImageCycle } from "@/components/HeroImageCycle";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";

const roles = ["UI/UX Engineer", "Product Designer", "Front-end Engineer"];

const heroImages = [
  "/hero/coding.png",
  "/hero/designing.png",
  "/hero/planning.png",
];

// Home page hero: title/slogan + bio cards on the left, a photo placeholder
// on the right. No explicit grid-cols on the wrapper below md, so it
// naturally stacks to one column on mobile; md:grid-cols-2 splits it into
// the two-column layout from the wireframe at larger sizes.
export default function Home() {
  return (
    <main
      id="home"
      className="relative mx-auto w-full max-w-6xl flex-1 overflow-hidden px-4 py-12 sm:px-6 md:px-8 md:py-24"
    >
      <HeroAura />
      <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Title + roles. All roles show at once, as tags, instead of a
              typewriter cycle — a visitor who doesn't wait through an
              animation still sees the full picture immediately. */}
          <Reveal>
            <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
              <h1 className="text-h2 md:text-h1">
                Hi, I am Tharindu Munasinghe
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {roles.map((role, index) => (
                  <Tag key={role} delay={index * 100}>
                    {role}
                  </Tag>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Bio + CTAs. flex-1 lets this card stretch to fill the
              remaining height so it lines up with the photo placeholder
              on the right at md and up (see md:items-stretch above). */}
          <Reveal delay={80} className="flex flex-1 flex-col">
            <section className="flex flex-1 flex-col rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
              <p className="text-body text-muted-foreground">
                <span className="font-semibold text-primary">
                  User Experience Designer and Engineer
                </span>{" "}
                with an Interactive Media background and over{" "}
                <span className="font-semibold text-primary">
                  5 years of experience
                </span>{" "}
                turning complex user needs into intuitive, elegant digital
                products. Fluent across the full{" "}
                <span className="font-semibold text-primary">
                  design-to-development pipeline
                </span>
                , from user research and Figma prototyping to
                production-ready React and Tailwind implementation. Skilled
                in design systems, iconography, typography, and modern
                design principles, with a creative, curious, and detail
                driven approach to solving user problems.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <DownloadCVButton />
                <Button href="/contact" variant="outline" title="Go to the Contact page">
                  Contact me
                </Button>
              </div>
            </section>
          </Reveal>
        </div>

        {/* Loops through three illustrations with a digital-glitch
            transition between them. md:h-full stretches it to match the
            left column's total height (see md:items-stretch on the grid). */}
        <Reveal delay={160} className="md:h-full">
          <div className="min-h-64 overflow-hidden rounded-2xl border border-foreground/10 bg-surface p-6 sm:min-h-80 md:h-full md:p-8">
            <HeroImageCycle
              images={heroImages}
              alt="Illustration of Tharindu coding, designing, and planning"
            />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
