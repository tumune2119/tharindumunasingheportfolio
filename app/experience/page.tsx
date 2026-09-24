import { CountUp } from "@/components/CountUp";
import { ExperienceTabs } from "@/components/ExperienceTabs";
import { Reveal } from "@/components/Reveal";
import { education, experience, skills } from "@/lib/experience";

// CV content laid out as three tabbed panels — an experience timeline, skill
// pills grouped by category, and an education timeline — reusing the same
// vertical-line-with-dots pattern for both timelines. Tabs (rather than one
// long scroll) so Skills and Education are visible as soon as the page
// loads, not just discoverable by scrolling past Experience first.
export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Experience</p>
      <h1 className="text-h2 md:text-h1 mt-3">
        <CountUp end={5} suffix="+" /> years across the design-to-development
        pipeline.
      </h1>

      <div className="mt-8">
        <ExperienceTabs
          tabs={[
            {
              id: "experience",
              label: "Experience",
              content: (
                <Reveal>
                  <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
                    <ol className="relative flex flex-col gap-10 border-l border-foreground/10 pl-6 md:pl-8">
                      {experience.map((role) => (
                        <li key={role.title} className="relative">
                          <span className="absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary md:-left-9.25" />
                          <p className="text-overline text-muted-foreground">
                            {role.period}
                          </p>
                          <h2 className="text-h4 mt-1">{role.title}</h2>
                          <p className="text-body-sm mt-1 text-muted-foreground">
                            {role.company} · {role.location}
                          </p>
                          <ul className="mt-3 flex flex-col gap-2">
                            {role.highlights.map((point) => (
                              <li
                                key={point}
                                className="flex gap-2 text-body text-muted-foreground"
                              >
                                <span
                                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
                                  aria-hidden="true"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </section>
                </Reveal>
              ),
            },
            {
              id: "skills",
              label: "Skills",
              content: (
                <Reveal>
                  <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
                    <div className="flex flex-col gap-5">
                      {skills.map((group) => (
                        <div key={group.label}>
                          <p className="text-overline text-muted-foreground">
                            {group.label}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-body-sm text-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ),
            },
            {
              id: "education",
              label: "Education",
              content: (
                <Reveal>
                  <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
                    <ol className="relative flex flex-col gap-8 border-l border-foreground/10 pl-6 md:pl-8">
                      {education.map((school) => (
                        <li key={school.institution} className="relative">
                          <span className="absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary md:-left-9.25" />
                          {school.period && (
                            <p className="text-overline text-muted-foreground">
                              {school.period}
                            </p>
                          )}
                          <h3 className="text-h4 mt-1">{school.institution}</h3>
                          <p className="text-body-sm mt-1 text-muted-foreground">
                            {school.degree}
                          </p>
                          {school.note && (
                            <p className="mt-2 text-body-sm text-muted-foreground">
                              {school.note}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                  </section>
                </Reveal>
              ),
            },
          ]}
        />
      </div>
    </main>
  );
}
