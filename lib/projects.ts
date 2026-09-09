// Case-study content for the Work page's project cards + modal. Add a new
// entry here (and its cover/carousel images once you have them) to add a
// new project card — ProjectsGrid renders whatever's in this array.

// One named block of a case study's body copy (Problem, Approach, Outcome,
// etc). `body` is a paragraph, `points` is a bullet list — either or both,
// so this covers everything from a plain paragraph to an intro + bullets.
export type ProjectSection = {
  title: string;
  body?: string;
  points?: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

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
  techStack: string;
  // Rendered in this order — each case study's own natural structure
  // (Problem, Approach, Real Issues Caught, Outcome, ...) rather than a
  // fixed set of fields every project has to fit into.
  sections: ProjectSection[];
  // Real, working links (repo, docs, live site).
  links?: ProjectLink[];
  // Small print for links that aren't ready yet (e.g. a broken/private repo).
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
    techStack: "React Native · Figma",
    sections: [
      {
        title: "The Problem",
        body: "Electric vehicle charging stations exist across Sri Lanka, but there's no way to reserve one ahead of time. Drivers arrive without knowing whether a charger will be free, leading to long queues and unpredictable wait times — a friction point that undermines confidence in EV ownership as adoption grows.",
      },
      {
        title: "Approach",
        body: "Led the design process end-to-end: user research, journey mapping, and high-fidelity UI, working alongside developers who built out the app.",
        points: [
          "Researched how EV charging actually works in the Sri Lankan context — station types, operating models, and driver behavior — since off-the-shelf EV app patterns from other markets didn't map cleanly onto local conditions.",
          "Mapped user flows for the two core jobs: finding a nearby station and booking a charging slot in advance.",
          "Designed a station categorization system to structure how stations are organized and filtered, covering ownership, power type, automation level (manual/caretaker vs. semi- or fully-automated), plug types, capacity, and amenities.",
          "Produced high-fidelity UI screens and a lightweight design system (color, type, components) to hand off for development.",
        ],
      },
      {
        title: "Key Decisions & Challenges",
        points: [
          'Charging stations in Sri Lanka vary widely in how they\'re run — some are caretaker-operated, others semi- or fully-automated — so a flat "map of pins" model wasn\'t enough. The categorization system was designed to surface this variation to users in a way that\'s simple to scan.',
          'Booking needed to reflect real-world availability and queuing, not just station location — this shaped the flow beyond a typical "find on map" pattern.',
          "Kept the core flow tightly scoped (map + booking) rather than designing the full feature set up front, so there was a clear, buildable slice for the MVP.",
        ],
      },
      {
        title: "Outcome",
        body: "Delivered a complete set of user flows, a station categorization framework, and high-fidelity UI for the core experience. Using these designs, the development team built a working end-to-end flow for finding and booking a charging station, validating the core product concept as a functioning MVP.",
      },
    ],
    // Both GitHub links in the source case study 404 (private repos or a
    // typo) — the case study itself suggests this wording instead of
    // publishing dead links.
    sourceNote: "Source available on request.",
  },
  {
    slug: "kandy-1st-court",
    title: "Kandy 1st Court",
    tagline:
      "A full-stack booking platform for Sri Lanka's first dedicated pickleball court, built end-to-end by directing Claude Code, not by hand-coding or blind-accepting it.",
    images: [],
    role: "Full-stack owner: architecture, database, API, and UI decisions, implemented end-to-end via Claude Code",
    status: "Built; core flows functional; not yet deployed publicly",
    platform: "Web app + companion mobile app (Expo / React Native)",
    tools: "Claude Code",
    techStack:
      "Next.js 16 · TypeScript · Tailwind CSS v4 · PostgreSQL (Supabase) · Drizzle ORM · Supabase Auth · PayHere · Expo / React Native · Vercel (target hosting)",
    sections: [
      {
        title: "The Problem",
        body: "A friend needed a real booking system for Sri Lanka's first dedicated pickleball court in Kandy: a public marketing site, a customer-facing booking flow, and an admin portal to manage bookings, customers, and settings. Not a toy project: a system meant to run an actual small business.",
      },
      {
        title: "Why This Project",
        body: 'This was the first project built by directing Claude Code to its full extent, deliberately used as a test case for a bigger question: can AI meaningfully accelerate a developer without replacing the judgment that makes software actually work? The goal wasn\'t to see how much code could be generated, but to prove that a developer who knows what "correct" and "done" look like can use AI as a force multiplier. Someone without that judgment would end up with something that merely looks finished.',
      },
      {
        title: "Approach",
        body: "Owned the architecture end-to-end and directed implementation through Claude Code, reviewing and correcting output rather than accepting it at face value:",
        points: [
          "Designed the data model first (7 tables: users, courts, bookings, payments, pricing, blackout dates, settings) with a database-level unique constraint on (court, date, time) as the actual double-booking guard, not just app-side logic.",
          "Structured the app with Next.js route groups to cleanly separate the public marketing site, auth flow, customer area, and admin portal, each with its own layout.",
          "Integrated Supabase Auth and wired up the (non-obvious) two-step login handshake: the server validates credentials, but the browser session has to be set separately via setSession, a step that silently breaks every \"who's logged in\" check if skipped.",
          "Built a PayHere payment integration from scratch (no SDK available for this gateway), implementing the MD5-of-MD5 checkout-hash and webhook-signature logic by hand.",
          "Wrote a full developer guide documenting the real state of the system, including what's hardcoded, what's a genuine security gap, and what's demo scaffolding, rather than letting a polished UI imply more completeness than the code actually has.",
        ],
      },
      {
        title: "Real Issues Caught & Fixed",
        body: "Part of the point of this project was staying close enough to the code to catch what AI-generated output gets subtly wrong. A few examples documented in the dev guide:",
        points: [
          "A stray page.tsx outside a Next.js route group silently shadowed the real homepage: Next/Turbopack didn't error on the conflict, it just picked the wrong file.",
          "Drizzle ORM's .where() only accepts one condition; chaining multiple silently produces wrong query behavior instead of a compile error unless conditions are combined with and(...).",
          "Supabase's transaction-mode connection pooler breaks Drizzle's prepared statements, which required switching to the session-mode pooler.",
          "Tailwind v4 renamed several utility classes used throughout the app (e.g. bg-opacity-* to color-opacity modifiers); old classes don't error, they just silently do nothing, so the failure mode is a broken-looking page, not a build failure.",
          "Login only completing server-side, and not also setting the browser session, meant every client-side auth check silently failed, invisible until traced through the actual flow.",
        ],
      },
      {
        title: "Known Gaps (Documented, Not Hidden)",
        body: "Rather than presenting this as a finished product, the guide is explicit about what's real vs. scaffolding, treated as part of the deliverable, not a weakness to hide:",
        points: [
          "Several admin/customer views (profile, dashboard stats, bookings tables) currently render hardcoded demo data pending real API wiring.",
          "API routes trust a client-supplied user ID header rather than validating a session/JWT. This is flagged as the top priority if real security hardening is scoped in.",
          "Pricing and blackout-date tables exist in the schema but aren't yet read by the booking flow (pricing is currently hardcoded client-side).",
        ],
      },
      {
        title: "Outcome",
        body: "A working full-stack booking platform (public site, customer booking flow, and admin portal) built on a real, constraint-enforced data model, with a companion mobile app sharing the same API. Not yet publicly deployed, but functionally complete for its core flows, with an honest account of what remains before production readiness.",
      },
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tumune2119/pickle-ball-kandy",
      },
    ],
    sourceNote: "Full developer guide available on request.",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline:
      "This very site: a personal portfolio designed and built end-to-end with Claude Code assisting, one real feature at a time.",
    images: [],
    role: "Sole designer and developer, built end-to-end with Claude Code assisting",
    status: "Live and actively maintained",
    platform: "Web (responsive, desktop and mobile)",
    tools: "Claude Code",
    techStack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · EmailJS · Vercel",
    sections: [
      {
        title: "The Problem",
        body: "A portfolio needed to exist: one place showing who Tharindu is, the real projects he's shipped, and a working way for people to actually reach him, built on a real design system instead of a generic template.",
      },
      {
        title: "Approach",
        body: "Built up in layers, starting with tokens and primitives before any page content existed:",
        points: [
          "Turned a supplied color palette and type scale (the Forest and Mint palette, an Inter type ramp) into actual CSS custom properties and Tailwind utilities, not just a reference document.",
          "Built a small component library first, a Button, NavLink, Navbar, and ThemeToggle, before writing any page content, so every later page reused the same primitives instead of one-off styles.",
          "Added a manual light/dark toggle on top of the system preference, using a data-theme override and an inline script so the stored theme applies before first paint instead of flashing the default.",
          "Wired the contact form straight to EmailJS with no backend, since a static portfolio has nowhere to run server code, then confirmed the same setup actually worked once deployed to Vercel, not just in local dev.",
        ],
      },
      {
        title: "Real Decisions & Fixes",
        body: "Part of using an AI coding agent well is checking its claims instead of accepting them. A few examples from this build:",
        points: [
          "React's ViewTransition component, documented for this Next.js version, turned out not to exist in the installed stable React build. That got checked with a one-line Node script before any code was written around it, rather than shipping something that would silently do nothing.",
          "The theme toggle's icon briefly mismatched between server and client, because its initial state read localStorage during render. Fixed by always rendering the same default on both sides and correcting it in a layout effect just before paint.",
          "Tapping a card or button on a phone left it visually stuck in its hover state until tapping elsewhere. Fixed once, site-wide, by redefining Tailwind's hover variant to require an actual hover-capable pointer.",
          "EmailJS's service ID, template ID, and public key are safe to keep in the client code itself. The whole integration runs in the browser, so an environment variable would not have hidden them any better; the real safeguard is the allowed-domains list in the EmailJS dashboard.",
        ],
      },
      {
        title: "Outcome",
        body: "A live, responsive portfolio with a real design system, working project case studies with an image carousel, and a working contact form, built with iterative assistance from Claude Code, with the developer checking claims and fixing what it got wrong along the way, rather than accepting output at face value.",
      },
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tumune2119/tharindumunasingheportfolio",
      },
      {
        label: "Live Site",
        href: "https://tharindumunasingheportfolio.vercel.app",
      },
    ],
  },
];
