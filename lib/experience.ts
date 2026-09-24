// CV-sourced content shared by the full Experience page (app/experience/page.tsx)
// and the Home page's ExperiencePreview — one source of truth instead of the
// same roles/skills/education typed out twice.

export type ExperienceRole = {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period?: string;
  note?: string;
};

// Work history, newest first.
export const experience: ExperienceRole[] = [
  {
    title: "Senior UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Mar 2025 – Aug 2026",
    highlights: [
      "Own end-to-end UI/UX strategy and delivery for key product areas, from user research, wireframing, and interaction design through to production-ready, pixel-perfect front-end code.",
      "Spearheaded the design and rollout of a major product version launch, driving the full UI/UX overhaul from concept and design system definition through release, improving product consistency and user satisfaction.",
      "Lead and mentor a cross-functional team of designers and engineers, architecting onboarding and training programs and tracking progress metrics to accelerate ramp-up and elevate team design maturity.",
      "Define, document, and maintain scalable design guidelines, UI kits, and component libraries to ensure visual and interaction consistency across the product ecosystem.",
      "Partner closely with Product and Engineering leadership to translate complex user needs into accessible, scalable, data-informed interfaces, aligning design decisions with business goals.",
    ],
  },
  {
    title: "UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Mar 2023 – Mar 2025",
    highlights: [
      "Designed and built responsive, pixel-perfect, accessible interfaces using Figma, React, and Tailwind CSS, ensuring seamless design-to-development handoff.",
      "Conducted usability testing and heuristic evaluations, iterating on designs based on qualitative user feedback and quantitative product data to continuously improve UX outcomes.",
      "Collaborated cross-functionally with product managers and engineers to ship user-centered features from concept to release within Agile sprint cycles.",
    ],
  },
  {
    title: "Associate UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Dec 2021 – Mar 2023",
    highlights: [
      "Contributed to interface design and front-end development for core product features, applying modern design principles and interaction patterns.",
      "Supported user research and usability testing efforts to validate design decisions early in the product development process.",
    ],
  },
  {
    title: "Trainee Associate UI/UX Engineer",
    company: "Xyicon",
    location: "Colombo, Sri Lanka",
    period: "Jun 2021 – Dec 2021",
    highlights: [
      "Assisted senior designers with wireframing, prototyping, and visual design tasks, gaining hands-on exposure to the end-to-end UX design and product development workflow.",
    ],
  },
];

// Grouped by the same categories the CV uses; rendered as pills.
export const skills: SkillGroup[] = [
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
export const education: EducationEntry[] = [
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
  },
];
