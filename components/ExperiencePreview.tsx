import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { experience, skills } from "@/lib/experience";

// A handful of skills pulled across categories for a quick visual scan —
// the full page groups them properly, this is just a taste.
const previewSkills = skills.flatMap((group) => group.items).slice(0, 8);

// Home page scroll-down summary: most people scroll before they click a nav
// link, so the current role + a skill taste lives right on the landing page
// instead of only behind the "Experience" nav item — this still links out to
// the full timeline/skills/education page rather than duplicating it.
export function ExperiencePreview() {
  const current = experience[0];

  return (
    <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-overline text-muted-foreground">Experience</p>
          <h2 className="text-h3 mt-1">
            <CountUp end={5} suffix="+" /> years across the
            design-to-development pipeline.
          </h2>
        </div>
        <Link
          href="/experience"
          title="View full experience, skills, and education"
          className="text-body-sm shrink-0 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-500 ease-in-out hover:decoration-primary"
        >
          View experience →
        </Link>
      </div>

      <div className="mt-6 border-t border-foreground/10 pt-6">
        <p className="text-overline text-muted-foreground">
          {current.period}
        </p>
        <h3 className="text-h4 mt-1">{current.title}</h3>
        <p className="text-body-sm mt-1 text-muted-foreground">
          {current.company} · {current.location}
        </p>
        <p className="text-body mt-3 text-muted-foreground">
          {current.highlights[0]}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {previewSkills.map((item) => (
          <span
            key={item}
            className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-body-sm text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
