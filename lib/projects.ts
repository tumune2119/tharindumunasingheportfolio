// Case-study content for the Work page's project cards + modal. Add a new
// entry here (and its cover/carousel images once you have them) to add a
// new project card — ProjectsGrid renders whatever's in this array.
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  // Card thumbnail. Undefined shows a placeholder until a real image exists.
  coverImage?: string;
  // Carousel screenshots shown inside the modal. Empty shows a placeholder.
  images: string[];
  role: string;
  status: string;
  platform: string;
  tools: string;
  problem: string;
  approach: { intro: string; points: string[] };
  keyDecisions: string[];
  outcome: string;
  techStack: string;
  // Small print shown at the end of the modal, e.g. for links that aren't ready yet.
  sourceNote?: string;
};

export const projects: Project[] = [
  {
    slug: "sri-charge",
    title: "Sri Charge",
    tagline:
      "A design-led EV charging & booking platform for Sri Lanka, built to end the queue.",
    // 1-12 walk through the admin/operator web flow (login, adding a
    // station, managing it, reviews/amenities); 13-17 are the rider-facing
    // mobile app.
    coverImage: "/work/sri-charge/10-station-info-step.png",
    images: [
      "/work/sri-charge/01-admin-login.png",
      "/work/sri-charge/02-add-station-form.png",
      "/work/sri-charge/03-stations-list.png",
      "/work/sri-charge/04-stations-list-expanded.png",
      "/work/sri-charge/05-update-station-modal.png",
      "/work/sri-charge/06-stations-list-collapsed.png",
      "/work/sri-charge/07-review-modal.png",
      "/work/sri-charge/08-amenities-modal-in-house.png",
      "/work/sri-charge/09-amenities-modal-nearby.png",
      "/work/sri-charge/10-station-info-step.png",
      "/work/sri-charge/11-plug-info-step.png",
      "/work/sri-charge/12-operator-info-step.png",
      "/work/sri-charge/13-mobile-map.png",
      "/work/sri-charge/14-mobile-filters.png",
      "/work/sri-charge/15-mobile-review.png",
      "/work/sri-charge/16-mobile-amenities.png",
      "/work/sri-charge/17-mobile-plugs.png",
    ],
    role: "Lead Designer (product design & UI) — build supported by collaborating developers",
    status:
      "Design complete; core end-to-end flow (find + book a charger) built as a working MVP",
    platform: "React Native (mobile app)",
    tools: "Figma",
    problem:
      "Electric vehicle charging stations exist across Sri Lanka, but there's no way to reserve one ahead of time. Drivers arrive without knowing whether a charger will be free, leading to long queues and unpredictable wait times — a friction point that undermines confidence in EV ownership as adoption grows.",
    approach: {
      intro:
        "Led the design process end-to-end: user research, journey mapping, and high-fidelity UI, working alongside developers who built out the app.",
      points: [
        "Researched how EV charging actually works in the Sri Lankan context — station types, operating models, and driver behavior — since off-the-shelf EV app patterns from other markets didn't map cleanly onto local conditions.",
        "Mapped user flows for the two core jobs: finding a nearby station and booking a charging slot in advance.",
        "Designed a station categorization system to structure how stations are organized and filtered, covering ownership, power type, automation level (manual/caretaker vs. semi- or fully-automated), plug types, capacity, and amenities.",
        "Produced high-fidelity UI screens and a lightweight design system (color, type, components) to hand off for development.",
      ],
    },
    keyDecisions: [
      'Charging stations in Sri Lanka vary widely in how they\'re run — some are caretaker-operated, others semi- or fully-automated — so a flat "map of pins" model wasn\'t enough. The categorization system was designed to surface this variation to users in a way that\'s simple to scan.',
      'Booking needed to reflect real-world availability and queuing, not just station location — this shaped the flow beyond a typical "find on map" pattern.',
      "Kept the core flow tightly scoped (map + booking) rather than designing the full feature set up front, so there was a clear, buildable slice for the MVP.",
    ],
    outcome:
      "Delivered a complete set of user flows, a station categorization framework, and high-fidelity UI for the core experience. Using these designs, the development team built a working end-to-end flow for finding and booking a charging station, validating the core product concept as a functioning MVP.",
    techStack: "React Native · Figma",
    // Both GitHub links in the source case study 404 (private repos or a
    // typo) — the case study itself suggests this wording instead of
    // publishing dead links.
    sourceNote: "Source available on request.",
  },
];
