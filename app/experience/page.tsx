// Work history, newest first, sourced from the CV. Rendered as a timeline below.
const experience = [
  {
    title: "Senior UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Mar 2025 – Aug 2026",
    highlights: [
      "Lead end-to-end UI/UX delivery for key product areas, from user research and wireframes through to production-ready front-end code.",
      "Led the design and rollout of a major product version launch, owning the UI/UX overhaul from concept through release.",
      "Lead and mentor a cross-functional team extending beyond UI/UX engineers, building onboarding and training plans and tracking progress to accelerate ramp-up.",
      "Define and maintain design guidelines and component libraries to ensure visual and interaction consistency across the product.",
      "Partner closely with product and engineering teams to translate user needs into scalable, accessible interfaces.",
    ],
  },
  {
    title: "UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Western Province, Sri Lanka",
    period: "Mar 2023 – Mar 2025",
    highlights: [
      "Designed and built responsive, pixel-perfect interfaces using Figma, React, and Tailwind.",
      "Conducted usability testing and iterated on designs based on user feedback and data.",
      "Collaborated cross-functionally to ship features from concept to release.",
    ],
  },
  {
    title: "Associate UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Dec 2021 – Mar 2023",
    highlights: [
      "Contributed to interface design and front-end development for core product features.",
      "Supported research and testing efforts to validate design decisions early in the process.",
    ],
  },
  {
    title: "Trainee Associate UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Western Province, Sri Lanka",
    period: "Jun 2021 – Dec 2021",
    highlights: [
      "Assisted senior designers with wireframing, prototyping, and visual design tasks, gaining hands-on exposure to the end-to-end UX workflow.",
    ],
  },
];

// Grouped by the same categories the CV uses; rendered as pills below.
const skills = [
  {
    label: "Design",
    items: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "UI Design",
      "Interaction Design",
      "Iconography",
      "Typography",
      "Design Guidelines & Systems",
      "Modern Design Concepts",
      "Usability Testing",
    ],
  },
  {
    label: "Engineering",
    items: [
      "React",
      "Tailwind CSS",
      "HTML/CSS",
      "JavaScript",
      "Responsive & Accessible Front-End Development",
    ],
  },
  {
    label: "Tools",
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
  },
  {
    label: "Leadership",
    items: [
      "Team Leadership",
      "Mentoring & Training",
      "Onboarding Plan Design",
      "Progress Tracking",
      "Cross-Team Collaboration",
      "Agile Working Environment",
    ],
  },
  {
    label: "Platforms",
    items: ["Microsoft Azure"],
  },
];

// Two entries; period/note are optional since Trinity College's two
// qualifications share one line instead of a single date range.
const education = [
  {
    institution: "SLIIT (Sri Lanka Institute of Information Technology), Malabe",
    degree:
      "B.Sc. Special Honours Degree in Information Technology, specializing in Interactive Media",
    period: "2017 – 2021",
    note: 'Research: Co-authored "Assist" (rendering, pipeline management and pipeline tracking system), presented at ICAC 2020.',
  },
  {
    institution: "Trinity College, Kandy",
    degree: "Advanced Level, 2016 · Ordinary Level, 2013",
    period: undefined,
    note: undefined,
  },
];

// CV content laid out as three cards: an experience timeline, skill pills
// grouped by category, and an education timeline — reusing the same
// vertical-line-with-dots pattern for both timelines.
export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Experience</p>
      <h1 className="text-h2 md:text-h1 mt-3">
        5+ years across the design-to-development pipeline.
      </h1>

      <div className="mt-8 flex flex-col gap-4 sm:gap-6">
        {/* Work history timeline: a vertical rule (border-l) with a dot
            positioned on top of it for each role, via the absolutely
            positioned span offset by half its own width. */}
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

        {/* Skills grouped under an overline label per category, each item a pill. */}
        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h3">Skills</h2>
          <div className="mt-4 flex flex-col gap-5">
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

        {/* Same timeline treatment as the work history, above. */}
        <section className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
          <h2 className="text-h3">Education</h2>
          <ol className="relative mt-4 flex flex-col gap-8 border-l border-foreground/10 pl-6 md:pl-8">
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
      </div>
    </main>
  );
}
