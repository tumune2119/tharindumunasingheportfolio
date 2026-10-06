export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tharindumunasinghe.com";

export const SITE = {
  name: "Tharindu Munasinghe",
  url: SITE_URL,
  email: "tumune2119@gmail.com",
  jobTitle: "Senior UI/UX Engineer",
  roles: ["UI/UX Engineer", "Product Designer", "Front-end Engineer"],
  location: { city: "Colombo", region: "Western Province", country: "LK" },
  employer: "Xyicon",
  bio: "Senior UI/UX Engineer in Colombo, Sri Lanka, with over five years of experience turning complex user needs into accessible, production-ready interfaces in Figma, React and Tailwind CSS.",
  shortDescription:
    "UI/UX Engineer and Product Designer in Colombo, Sri Lanka, with 5+ years of experience across Figma, React and Tailwind CSS, building accessible interfaces.",
  knowsAbout: [
    "UI/UX design",
    "Product design",
    "Design systems",
    "Figma",
    "React",
    "Tailwind CSS",
    "Front-end development",
    "Accessibility",
  ],
  keywords: [
    "UI/UX Engineer",
    "Product Designer",
    "Front-end Engineer",
    "Senior UI/UX Engineer",
    "design systems",
    "Figma",
    "React",
    "Tailwind CSS",
    "Colombo",
    "Sri Lanka",
  ],
  sameAs: [
    "https://www.linkedin.com/in/tharindu-munasinghe-45b053184/",
    "https://github.com/tumune2119",
  ],
} as const;
