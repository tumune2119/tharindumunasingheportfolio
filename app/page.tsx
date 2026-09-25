import { ArticlesPreview } from "@/components/ArticlesPreview";
import { Button } from "@/components/Button";
import { ContactPreview } from "@/components/ContactPreview";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import { ExperiencePreview } from "@/components/ExperiencePreview";
import { HeroAura } from "@/components/HeroAura";
import { HeroCipherClue } from "@/components/HeroCipherClue";
import { HeroImageCycle } from "@/components/HeroImageCycle";
import { HtmlComment } from "@/components/HtmlComment";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { ScrollFade } from "@/components/ScrollFade";
import { Tag } from "@/components/Tag";
import { HERO_CIPHER_MESSAGE } from "@/lib/heroCipherMessage";

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
      {/* One flex column, one gap value, for the hero block and every
          preview section below it — so the gap above the first preview
          section matches the gap between each section after it, instead of
          the hero using a much larger top margin than the sections use
          between themselves. Larger than the site's usual card-internal
          gap-4/gap-6 (see the hero's own two-column grid below) since these
          are full, distinct sections, not cards within one section. */}
      <div className="flex flex-col gap-10 sm:gap-14 md:gap-20">
        {/* HeroAura is scoped to this wrapper (its own relative positioning
            context), not the whole <main> — otherwise, once the scroll-down
            preview sections below make the page much taller, the aura's
            absolute inset-0 would center itself on the full page height
            instead of staying put behind the hero cards. */}
        <div className="relative">
          <HeroAura />
          <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Title + roles. All roles show at once, as tags, instead of
                  a typewriter cycle — a visitor who doesn't wait through an
                  animation still sees the full picture immediately. */}
              <ScrollFade>
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
              </ScrollFade>

              {/* Bio + CTAs. flex-1 lets this card stretch to fill the
                  remaining height so it lines up with the photo placeholder
                  on the right at md and up (see md:items-stretch above). */}
              <ScrollFade delay={80} className="flex flex-1 flex-col">
                <section className="flex flex-1 flex-col rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
                  <p className="text-body text-muted-foreground">
                    <span className="font-semibold text-primary">
                      User Experience Designer and Engineer
                    </span>{" "}
                    with an Interactive Media background and over{" "}
                    <span className="font-semibold text-primary">
                      5 years of experience
                    </span>{" "}
                    turning complex user needs into intuitive, elegant
                    digital products. Fluent across the full{" "}
                    <span className="font-semibold text-primary">
                      design-to-development pipeline
                    </span>
                    , from user research and Figma prototyping to
                    production-ready React and Tailwind implementation.
                    Skilled in design systems, iconography, typography, and
                    modern design principles, with a creative, curious, and
                    detail driven approach to solving user problems.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <DownloadCVButton />
                    <Button href="/contact" variant="outline" title="Go to the Contact page">
                      Contact me
                    </Button>
                  </div>
                </section>
              </ScrollFade>
            </div>

            {/* Loops through three illustrations with a digital-glitch
                transition between them. md:h-full stretches it to match the
                left column's total height (see md:items-stretch on the
                grid). */}
            <ScrollFade delay={160} className="md:h-full">
              <div className="relative min-h-64 overflow-hidden rounded-2xl border border-foreground/10 bg-surface p-6 sm:min-h-80 md:h-full md:p-8">
                <HtmlComment text={HERO_CIPHER_MESSAGE} />
                <HeroImageCycle
                  images={heroImages}
                  alt="Illustration of Tharindu coding, designing, and planning"
                />
                <HeroCipherClue />
              </div>
            </ScrollFade>
          </div>
        </div>

        {/* Scroll-down summaries: most visitors scroll before they click a
            nav link, so Experience/Projects/Articles/Contact each get a
            preview right on the landing page (still linking out to their
            own full page) instead of only being reachable through the nav.
            ScrollFade (not Reveal) animates these back out on the way past
            too, instead of only ever fading in once. */}
        <ScrollFade>
          <ExperiencePreview />
        </ScrollFade>
        <ScrollFade delay={80}>
          <ProjectsPreview />
        </ScrollFade>
        <ScrollFade delay={160}>
          <ArticlesPreview />
        </ScrollFade>
        <ScrollFade delay={240}>
          <ContactPreview />
        </ScrollFade>
      </div>
    </main>
  );
}
