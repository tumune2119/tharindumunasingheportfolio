// Case-study content for the Projects page's project cards and each
// project's own /projects/[slug] page. Add a new entry here (and its cover/carousel
// images once you have them) to add a new project — the grid, the detail
// route, and its static params all just read this array.

// Anchor id for a section's heading (#slug), derived from its title so
// sections don't each need a hand-written slug.
export function sectionSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Pre-filled mailto for the "Request source access" button on a project
// page — the project's own title flows into the subject/body so this is one
// generic builder rather than a hardcoded link per project.
// A cover thumbnail is always one of the project's screenshots, so its alt
// text comes from that screenshot's entry rather than being repeated.
export function projectCoverAlt(project: Project): string {
  return (
    project.images.find((image) => image.src === project.coverImage)?.alt ??
    project.title
  );
}

export function sourceRequestMailto(projectTitle: string): string {
  const subject = `Source access request: ${projectTitle}`;
  const body = `Hi Tharindu,\n\nI'd like to request access to the source for ${projectTitle}.\n\n`;
  return `mailto:tumune2119@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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

// One swatch in a project's design-system showcase. Every hex here is either
// a real design token (where the project's own spec states one, e.g. Scam
// Shield's measured verdict colors) or sampled directly from that project's
// own shipped screenshots (lib/projects.ts's images) — never invented, so
// what's shown always traces back to something real.
export type ProjectDesignSystemColor = {
  name: string;
  hex: string;
  usage: string;
};

// One named size/weight role, e.g. { name: "H1", spec: "700 · 48/56px" }.
// Pulled from each project's own source (a documented type-scale token where
// one exists, otherwise the role's real font-size/line-height/weight as
// written in its CSS) rather than estimated from a screenshot.
export type ProjectTypeRole = {
  name: string;
  spec: string;
};

export type ProjectTypography = {
  // The real font family from that project's own next/font import or
  // font-family declaration — never guessed from how a screenshot looks.
  fontFamily: string;
  roles?: ProjectTypeRole[];
};

// A real component, named after its actual source file. `image` — a PNG
// cropped straight from that project's own screenshots or rendered design
// files, never a mockup redrawn for this purpose — is only set for the few
// that got an actual crop; the rest render as a plain name.
export type ProjectComponentExample = {
  name: string;
  image?: string;
};

export type ProjectDesignSystem = {
  // One line on the system's guiding idea, same spirit as each project's
  // own "Design" section prose.
  principle: string;
  colors: ProjectDesignSystemColor[];
  typography?: ProjectTypography;
  // A representative sample of real components from that project's own
  // components/ directory — not exhaustive, not invented.
  components?: ProjectComponentExample[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  // Card thumbnail. Undefined shows a placeholder until a real image exists.
  coverImage?: string;
  // Carousel screenshots shown on the project's page. Empty shows a placeholder.
  images: ProjectImage[];
  role: string;
  status: string;
  platform: string;
  tools: string;
  techStack: string;
  // Rendered in this order — each case study's own natural structure
  // (Problem, Approach, Real Issues Caught, Outcome, ...) rather than a
  // fixed set of fields every project has to fit into.
  sections: ProjectSection[];
  // Shown as its own swatch section, between "At a glance" and "Sections" —
  // not part of `sections` since it's a visual block, not body copy.
  designSystem?: ProjectDesignSystem;
  // Real, working links (repo, docs, live site).
  links?: ProjectLink[];
  // Small print for links that aren't ready yet (e.g. a broken/private repo).
  sourceNote?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
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
      { src: "/work/sri-charge/01-admin-login.png", alt: "Sri Charge admin login screen" },
      { src: "/work/sri-charge/02-add-station-form.png", alt: "Add-station form in the admin web app, with station detail fields" },
      { src: "/work/sri-charge/03-stations-list.png", alt: "Stations list in the admin dashboard" },
      { src: "/work/sri-charge/04-stations-list-expanded.png", alt: "Stations list with one station row expanded to show its details" },
      { src: "/work/sri-charge/05-update-station-modal.png", alt: "Update-station modal for editing an existing charging station" },
      { src: "/work/sri-charge/06-stations-list-collapsed.png", alt: "Stations list with rows collapsed for a compact overview" },
      { src: "/work/sri-charge/07-review-modal.png", alt: "Review modal for a charging station" },
      { src: "/work/sri-charge/08-amenities-modal-in-house.png", alt: "Amenities modal listing in-house amenities at a station" },
      { src: "/work/sri-charge/09-amenities-modal-nearby.png", alt: "Amenities modal listing nearby amenities around a station" },
      { src: "/work/sri-charge/10-station-info-step.png", alt: "Station information step of the add-station flow" },
      { src: "/work/sri-charge/11-plug-info-step.png", alt: "Plug information step of the add-station flow" },
      { src: "/work/sri-charge/12-operator-info-step.png", alt: "Operator information step of the add-station flow" },
      { src: "/work/sri-charge/13-mobile-map.png", alt: "Mobile app map showing nearby charging stations" },
      { src: "/work/sri-charge/14-mobile-filters.png", alt: "Mobile app filters for narrowing the station list" },
      { src: "/work/sri-charge/15-mobile-review.png", alt: "Mobile app review screen for a charging station" },
      { src: "/work/sri-charge/16-mobile-amenities.png", alt: "Mobile app amenities view for a charging station" },
      { src: "/work/sri-charge/17-mobile-plugs.png", alt: "Mobile app plug list for a charging station" },
    ],
    role: "Lead Designer (product design & UI), with the build supported by collaborating developers",
    status:
      "Design complete; core end-to-end flow (find + book a charger) built as a working MVP",
    platform: "React Native (mobile app)",
    tools: "Figma",
    techStack: "React Native · Figma",
    sections: [
      {
        title: "The Problem",
        body: "Electric vehicle charging stations exist across Sri Lanka, but there's no way to reserve one ahead of time. Drivers arrive without knowing whether a charger will be free, leading to long queues and unpredictable wait times, a friction point that undermines confidence in EV ownership as adoption grows.",
      },
      {
        title: "Approach",
        body: "Led the design process end-to-end: user research, journey mapping, and high-fidelity UI, working alongside developers who built out the app.",
        points: [
          "Researched how EV charging actually works in the Sri Lankan context (station types, operating models, and driver behavior), since off-the-shelf EV app patterns from other markets didn't map cleanly onto local conditions.",
          "Mapped user flows for the two core jobs: finding a nearby station and booking a charging slot in advance.",
          "Designed a station categorization system to structure how stations are organized and filtered, covering ownership, power type, automation level (manual/caretaker vs. semi- or fully-automated), plug types, capacity, and amenities.",
          "Produced high-fidelity UI screens and a lightweight design system (color, type, components) to hand off for development.",
        ],
      },
      {
        title: "Key Decisions & Challenges",
        points: [
          'Charging stations in Sri Lanka vary widely in how they\'re run, some are caretaker-operated, others semi- or fully-automated, so a flat "map of pins" model wasn\'t enough. The categorization system was designed to surface this variation to users in a way that\'s simple to scan.',
          'Booking needed to reflect real-world availability and queuing, not just station location, which shaped the flow beyond a typical "find on map" pattern.',
          "Kept the core flow tightly scoped (map + booking) rather than designing the full feature set up front, so there was a clear, buildable slice for the MVP.",
        ],
      },
      {
        title: "Outcome",
        body: "Delivered a complete set of user flows, a station categorization framework, and high-fidelity UI for the core experience. Using these designs, the development team built a working end-to-end flow for finding and booking a charging station, validating the core product concept as a functioning MVP.",
      },
    ],
    designSystem: {
      principle:
        "A clean, utility-first palette for a real-world logistics app: near-white surfaces, a single confident green carrying every primary action and live-status marker, and light tints reserved for selected states.",
      colors: [
        { name: "Surface", hex: "#FCFCFC", usage: "Page background and cards" },
        { name: "Primary Green", hex: "#30B430", usage: "Primary actions, live status, map pins" },
        { name: "Selected Tint", hex: "#C0E4C0", usage: "Selected rows and light highlights" },
        { name: "Border", hex: "#E4E4E4", usage: "Dividers and input borders" },
      ],
      components: [
        { name: "Buttons", image: "/work/sri-charge/components/buttons.png" },
        { name: "Form Input", image: "/work/sri-charge/components/input.png" },
      ],
    },
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
    // 1-8 are the public marketing site (home, pricing, contact, about);
    // 9-15 are the customer account/booking flow; 16-20 are the admin portal.
    coverImage: "/work/kandy-1st-court/01-home-hero.png",
    images: [
      { src: "/work/kandy-1st-court/01-home-hero.png", alt: "Kandy 1st Court homepage hero" },
      { src: "/work/kandy-1st-court/02-home-gallery-amenities.png", alt: "Homepage gallery showing the court's amenities" },
      { src: "/work/kandy-1st-court/03-pricing-preview-find-us.png", alt: "Pricing preview and find-us section on the homepage" },
      { src: "/work/kandy-1st-court/04-find-us-cta-footer.png", alt: "Find-us section with a call to action and the site footer" },
      { src: "/work/kandy-1st-court/05-contact-page.png", alt: "Contact page with the court's details" },
      { src: "/work/kandy-1st-court/06-pricing-hourly-membership.png", alt: "Pricing page with hourly and membership options" },
      { src: "/work/kandy-1st-court/07-membership-special-offers.png", alt: "Membership special offers page" },
      { src: "/work/kandy-1st-court/08-about-page.png", alt: "About page for the pickleball court" },
      { src: "/work/kandy-1st-court/09-account-dashboard.png", alt: "Customer account dashboard" },
      { src: "/work/kandy-1st-court/10-booking-step1-date.png", alt: "Booking flow, step 1: choosing a date" },
      { src: "/work/kandy-1st-court/11-booking-step2-time.png", alt: "Booking flow, step 2: choosing a time slot" },
      { src: "/work/kandy-1st-court/12-booking-step3-payment.png", alt: "Booking flow, step 3: payment" },
      { src: "/work/kandy-1st-court/13-booking-confirmed.png", alt: "Booking confirmation screen" },
      { src: "/work/kandy-1st-court/14-my-bookings-upcoming.png", alt: "My bookings page showing upcoming bookings" },
      { src: "/work/kandy-1st-court/15-my-bookings-past.png", alt: "My bookings page showing past bookings" },
      { src: "/work/kandy-1st-court/16-admin-dashboard.png", alt: "Admin dashboard with a booking overview" },
      { src: "/work/kandy-1st-court/17-admin-manage-bookings.png", alt: "Admin view for managing bookings" },
      { src: "/work/kandy-1st-court/18-admin-manage-customers.png", alt: "Admin view for managing customers" },
      { src: "/work/kandy-1st-court/19-admin-settings.png", alt: "Admin settings page" },
      { src: "/work/kandy-1st-court/20-admin-reports.png", alt: "Admin reports page" },
    ],
    role: "Full-stack owner: architecture, database, API, and UI decisions, implemented end-to-end via Claude Code",
    status: "Built; core flows functional; not yet deployed publicly",
    platform: "Web app + companion mobile app (Expo / React Native)",
    tools: "Claude Code · VS Code · Git · GitHub · Supabase · Vercel",
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
    designSystem: {
      principle:
        "A bold violet-on-navy identity for the court's marketing site, carried from the hero gradient through every primary button.",
      colors: [
        { name: "Deep Navy", hex: "#0C1824", usage: "Dark panels, hero and footer" },
        { name: "Violet", hex: "#7824C0", usage: "Primary buttons and gradients" },
        { name: "Bright Violet", hex: "#8430D8", usage: "Gradient highlight" },
        { name: "Supporting Surface", hex: "#302454", usage: "Secondary panels over navy" },
      ],
      typography: {
        fontFamily: "Geist, with Fraunces as a display serif for hero and section headings",
      },
      components: [
        { name: "Card", image: "/work/kandy-1st-court/components/pricing-card.png" },
        { name: "AdminDashboardContent", image: "/work/kandy-1st-court/components/stat-card.png" },
        { name: "BookingForm" },
        { name: "AdminBookingsTable" },
        { name: "CustomerDashboard" },
        { name: "MyBookingsList" },
        { name: "LoginForm" },
        { name: "Button" },
        { name: "DatePicker" },
        { name: "Badge" },
      ],
    },
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
    coverImage: "/work/portfolio/01-home.png",
    images: [
      { src: "/work/portfolio/01-home.png", alt: "This portfolio's homepage with the hero and role tags" },
      { src: "/work/portfolio/02-experience.png", alt: "Experience page with the work timeline and skills" },
      { src: "/work/portfolio/03-work.png", alt: "Projects page listing the case studies" },
      { src: "/work/portfolio/04-contact.png", alt: "Contact page with the contact card and form" },
      { src: "/work/portfolio/05-project-modal.png", alt: "Case study page with the screenshot carousel and project sections" },
    ],
    role: "Sole designer and developer, built end-to-end with Claude Code assisting",
    status: "Live and actively maintained",
    platform: "Web (responsive, desktop and mobile)",
    tools: "Claude Code · VS Code · Git · GitHub · Vercel",
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
    designSystem: {
      principle:
        "The Forest & Mint system this whole site runs on: one green that gets brighter in dark mode, a warm accent reserved for small highlights, and the same tokens driving every page.",
      colors: [
        { name: "Forest Green", hex: "#2D6A4F", usage: "Primary actions and links, light mode" },
        { name: "Mint Bright", hex: "#52B788", usage: "Primary actions and links, dark mode" },
        { name: "Canvas", hex: "#FFFFFF", usage: "Page background, light mode" },
        { name: "Deep Space", hex: "#1A1A2E", usage: "Page background, dark mode" },
        { name: "Warm Clay", hex: "#D4A373", usage: "Small accents, light mode" },
        { name: "Gold Accent", hex: "#E9C46A", usage: "Small accents, dark mode" },
      ],
      typography: {
        fontFamily: "Inter (body/UI), with Rajdhani for the HUD's display headings and JetBrains Mono for its readouts",
        roles: [
          { name: "H1", spec: "700 · 48/56px" },
          { name: "H2", spec: "700 · 36/44px" },
          { name: "H3", spec: "700 · 28/36px" },
          { name: "H4", spec: "700 · 22/30px" },
          { name: "Body", spec: "400 · 16/24px" },
          { name: "Caption", spec: "400 · 12/16px" },
        ],
      },
      components: [
        { name: "Button", image: "/work/portfolio/components/button.png" },
        { name: "Tag", image: "/work/portfolio/components/tag.png" },
        { name: "ProjectCard", image: "/work/portfolio/components/project-card.png" },
        { name: "NavLink" },
        { name: "Navbar" },
        { name: "ThemeToggle" },
        { name: "ImageCarousel" },
        { name: "HudFrame" },
        { name: "IntroGate" },
      ],
    },
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
  {
    slug: "mune-tasks",
    title: "MUNE TASKS",
    tagline:
      "A local-first AI project planner that turns a description into a phased, trackable to-do list in about 20 seconds.",
    coverImage: "/work/mune-tasks/04-new-project-draft-ready.png",
    images: [
      { src: "/work/mune-tasks/01-dashboard.png", alt: "MUNE TASKS dashboard listing active projects" },
      { src: "/work/mune-tasks/02-new-project-empty.png", alt: "New project form before a description is entered" },
      { src: "/work/mune-tasks/03-new-project-streaming.png", alt: "New project screen while the plan streams in" },
      { src: "/work/mune-tasks/04-new-project-draft-ready.png", alt: "Generated project plan, ready to review and save" },
      { src: "/work/mune-tasks/05-project-page-top.png", alt: "Project page with overall progress and the first sections" },
      { src: "/work/mune-tasks/06-project-page-subtasks.png", alt: "Project page with subtasks ticked off" },
      { src: "/work/mune-tasks/07-expand-into-steps-modal.png", alt: "Dialog for expanding a task into smaller steps" },
      { src: "/work/mune-tasks/08-claude-usage-dashboard.png", alt: "Usage dashboard of Claude requests, with cost and tokens" },
      { src: "/work/mune-tasks/09-settings.png", alt: "MUNE TASKS settings page" },
      { src: "/work/mune-tasks/10-project-complete-confetti.png", alt: "Completed project with a confetti celebration" },
      { src: "/work/mune-tasks/11-dashboard-archived.png", alt: "Dashboard with the archived projects tab open" },
    ],
    role: "Product owner, designer, and developer, built with Claude Code as an AI pair programmer",
    status: "Live, personal daily-use tool (local-first desktop web app)",
    platform:
      "Local web app on Windows, opened as a Chrome/Edge app window; also installable as a PWA",
    tools: "Claude Code · VS Code · Git",
    techStack:
      "Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · SQLite · Drizzle ORM · Anthropic SDK · Zod",
    sections: [
      {
        title: "The Problem",
        body: "Starting a project means breaking it into steps, and that planning work is slow and easy to skip. Generic to-do apps require typing every item by hand, while chat assistants produce a plan that still has to be copied somewhere and tracked manually. The goal was one tool that writes the plan from a free-text description and attached documents, then lets the actual work be tracked afterward.",
      },
      {
        title: "Approach",
        body: "Built as a fully local-first desktop web app on Windows: no account, no cloud database, no telemetry, with the server listening only on 127.0.0.1.",
        points: [
          "Generates a plan from a free-text prompt plus attached files (.md, .txt, code, .pdf, .docx), with a detail-level slider from vague milestones up to 5 to 15 minute steps and an optional target item count.",
          "Streams Claude's JSON response as it's written, parsing it with a tolerant partial-JSON parser so the plan's section and task tree builds up live instead of appearing after a long spinner.",
          "Every project gets its own page with an overall progress bar, per-section percentages, collapsible subtasks, drag-and-drop reordering, and an 'Original prompt' panel recording the prompt, settings, attachments, and that project's own Claude spend.",
          "Any task can be expanded into concrete 5 to 15 minute steps, and any section regenerated with optional guidance, both previewed in a dialog with their own cost shown before being applied.",
          "Logs every Claude request (tokens, cost, duration, retries, errors) to a usage dashboard with 7/30/90-day totals and breakdowns by feature, model, and project.",
        ],
      },
      {
        title: "Architecture & Key Decisions",
        points: [
          "Every Claude request passes through one AI layer that validates the response against Zod schemas and logs its cost; an invalid or off-schema response triggers exactly one retry with the validation errors fed back to the model.",
          "Running on a Claude subscription through the Claude Code CLI hit command-line length limits with large attachments and pulled in the CLI's own tools and settings. Fixed by piping the prompt over stdin, passing the system prompt through a temp file, and switching off tools, MCP servers, and settings, cutting per-request context from roughly 35k tokens to about 700.",
          "A Next.js proxy rejects foreign Host headers and cross-site origins on every write, since any page open in a browser can otherwise reach a server listening on localhost.",
          "Every edit on a project page (tick, rename, reorder, add, delete, replace a section) is one typed action validated by Zod and applied in a SQLite transaction, with the UI updating optimistically and requests queued so responses can't arrive out of order.",
        ],
      },
      {
        title: "Real Issues Caught & Fixed",
        points: [
          "The latest better-sqlite3 crashed on load because it only ships prebuilt Windows binaries for Node 22+, and compiling it needs Python and Visual Studio. Pinned to 12.9.0, the newest version with a Node 20 Windows binary.",
          "Renaming the app required moving the database file from its old name to mune-tasks.db, but most of the data was still sitting in SQLite's write-ahead log rather than the main file. Fixed by checkpointing the WAL into the main file before the rename, with a retry on next launch if the old file was still in use.",
        ],
      },
      {
        title: "Design",
        body: "A dark-only interface built around a deep navy background, slate-blue surface cards, and electric blue accents, with a soft glow on primary buttons and progress bars to draw the eye to the next action. Geist throughout, rounded-2xl cards, thin borders, generous spacing. Framer Motion draws the checkmark stroke, springs progress bars and rings to their new value, fades new tasks in, and bursts confetti at 100% completion (skipped under reduced motion). Fully keyboard-first: N for a new project, / for search, Space to tick the focused task, arrow keys or J and K to move between tasks, Enter to rename.",
      },
      {
        title: "Testing & Outcome",
        body: "A detailed plan arrives in about 20 seconds for roughly 3 cents of API-equivalent usage. An end-to-end Playwright script drives a real Chrome browser through the full flow: creating a project from a prompt plus an attached file, editing the plan before saving, ticking tasks and subtasks, using the keyboard shortcuts, renaming and adding tasks, restarting the server to confirm persistence, then completing and archiving the project. TypeScript, ESLint, and the production build all pass cleanly.",
      },
    ],
    designSystem: {
      principle:
        "A deep-navy, electric-blue interface built for long focus sessions, with one accent color carrying every primary action, progress indicator and status tag.",
      colors: [
        { name: "Deep Navy", hex: "#0B1123", usage: "Page background" },
        { name: "Slate Surface", hex: "#142037", usage: "Cards and panels" },
        { name: "Electric Blue", hex: "#4F8FF7", usage: "Primary actions, links, progress" },
        { name: "Priority Pink", hex: "#FFA1AD", usage: "High-priority tags" },
      ],
      typography: {
        fontFamily: "Geist",
      },
      components: [
        { name: "Button", image: "/work/mune-tasks/components/button.png" },
        { name: "PriorityBadge", image: "/work/mune-tasks/components/task-row.png" },
        { name: "AppShell" },
        { name: "ProjectBrowser" },
        { name: "PrioritySelect" },
        { name: "AnimatedCheckbox" },
        { name: "Progress" },
        { name: "TaskFiles" },
        { name: "UpNext" },
        { name: "Sidebar" },
        { name: "shadcn/ui primitives (Dialog, DropdownMenu, Tabs, Popover, Tooltip)" },
      ],
    },
    sourceNote: "Personal local-first tool; source available on request.",
  },
  {
    slug: "mune-splits",
    title: "MUNE Splits",
    tagline:
      "A local-first expense splitter that works out who owes whom in the fewest possible payments.",
    coverImage: "/work/mune-splits/02-event-overview.png",
    images: [
      { src: "/work/mune-splits/01-events-home.png", alt: "MUNE Splits events list with the Goa Trip summary" },
      { src: "/work/mune-splits/02-event-overview.png", alt: "Event overview with total spent, balance and spend charts" },
      { src: "/work/mune-splits/03-expenses.png", alt: "Expense list for the Goa Trip event" },
      { src: "/work/mune-splits/04-balances.png", alt: "Balances per person and who owes whom" },
      { src: "/work/mune-splits/05-settle-up.png", alt: "Suggested payments to settle up, with payment history" },
      { src: "/work/mune-splits/06-add-expense.png", alt: "Add-expense dialog with the equal split selected" },
      { src: "/work/mune-splits/07-add-expense-shares.png", alt: "Add-expense dialog with weighted shares per person" },
      { src: "/work/mune-splits/08-people.png", alt: "People list of reusable participants" },
      { src: "/work/mune-splits/09-settings.png", alt: "Settings page with theme, currency and backup options" },
      { src: "/work/mune-splits/10-print-report.png", alt: "Printable expense report with summaries and every expense" },
      { src: "/work/mune-splits/11-event-mobile.png", alt: "Event overview on a phone-width screen" },
      { src: "/work/mune-splits/12-events-home-light.png", alt: "Events list in light mode" },
    ],
    role: "Product owner, designer, and developer, with the app built from a written brief using an AI coding assistant",
    status: "Working local app with a demo trip, PDF and CSV export, and backup and restore",
    platform:
      "Local web app on Windows, installable as a PWA; runs without an internet connection",
    tools: "Claude Code",
    techStack:
      "Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · SQLite (better-sqlite3) · Recharts · jsPDF · Vitest",
    sections: [
      {
        title: "The Problem",
        body: "Splitting trip costs is slow and easy to get wrong. One person paid for dinner, another covered the villa, and by the end nobody remembers who owes whom. Most splitting apps want an account, a cloud sync and your data on their servers. The goal was a personal tool that keeps everything on the computer and still works out the fewest payments needed to settle up.",
      },
      {
        title: "Approach",
        body: "Built as a local-first web app with no accounts, no cloud sync and no tracking. The server only listens on 127.0.0.1, and all data lives in a local SQLite file.",
        points: [
          "Create an event or trip, add the people, and log each expense with one payer or several, and a split mode: equal, weighted shares, exact amounts or percentages.",
          "Weights are set per expense, so a partner can count as two people and a half portion as 0.5.",
          "Simplified balances show the fewest payments that settle everyone, while the raw view lists each direct debt.",
          "Record full or partial settlements, undo any payment, and lock an event as settled once everyone is at zero.",
          "Export a PDF report, a CSV or a plain-text summary, and back up or restore everything as JSON, including receipt images.",
        ],
      },
      {
        title: "Key Decisions & Challenges",
        points: [
          "Money is stored as integer minor units (paise or cents), so there are no floating-point errors.",
          "Shares are rounded with the largest-remainder method, so they always add up exactly to the total.",
          "Debts are simplified greedily by matching the largest creditor with the largest debtor, which takes at most people minus one payments.",
          "The split and settle maths lives in a pure module with its own unit tests. The UI, PDF and CSV export all share the same balance code.",
          "Every event edit is one typed action validated on the server. A proxy rejects foreign Host headers and cross-site writes, so other websites can't drive the local server.",
        ],
      },
      {
        title: "Known Risks",
        points: [
          "better-sqlite3 is pinned to 12.9.0 because it ships prebuilt Windows binaries for Node 20, which avoids a local compile step.",
          "The data folder sits inside OneDrive, and syncing a live SQLite database can conflict. The app's own notes recommend pausing sync while it runs, or moving the data folder and relying on JSON backups.",
        ],
      },
      {
        title: "Design",
        body: "A dark-first interface with a light mode, an orange accent and rounded cards. Each event has its own emoji and colour, and a floating Add expense button keeps the main action in reach. Press N to add an expense or event. On phones the navigation moves to a bottom bar.",
      },
      {
        title: "Testing & Outcome",
        body: "A demo trip, Goa Trip, loads with four people, weighted shares, a multi-payer villa, every split mode and a partial settlement. The engine's unit tests cover equal, weighted with decimals, exact, percent, multi-payer, rounding remainders and partial settlements. The production build was run and the demo trip was walked through in Chrome, from the events list to the print report.",
      },
    ],
    designSystem: {
      principle:
        "A dark-first interface with one warm accent color doing double duty for primary actions and category highlights, and mint-green reserved for positive balances.",
      colors: [
        { name: "Near Black", hex: "#121215", usage: "Page background" },
        { name: "Surface", hex: "#343032", usage: "Cards and panels" },
        { name: "Orange", hex: "#FFA66B", usage: "Primary actions and category highlights" },
        { name: "Mint Green", hex: "#6FE3B4", usage: "Positive balances owed to you" },
      ],
      typography: {
        fontFamily: "Geist",
      },
      components: [
        { name: "Button", image: "/work/mune-splits/components/button.png" },
        { name: "Money", image: "/work/mune-splits/components/balance-row.png" },
        { name: "PeopleManager" },
        { name: "Avatar" },
        { name: "Fields" },
        { name: "Screens" },
        { name: "SettingsForm" },
        { name: "shadcn/ui primitives (Dialog, DropdownMenu, Tabs, Popover, Tooltip)" },
      ],
    },
    sourceNote: "Personal local-first tool; source available on request.",
  },
  {
    slug: "mune-ux",
    title: "MUNE UX",
    tagline:
      "A local-first UX-to-dev pipeline that takes a vague idea through 17 guided stages to a shipped release, and traces every task back to a real user need.",
    coverImage: "/work/mune-ux/07-journey-emotion-curve.png",
    images: [
      { src: "/work/mune-ux/01-dashboard.png", alt: "MUNE UX dashboard over the aurora wallpaper, with three projects at different depths" },
      { src: "/work/mune-ux/02-project-overview.png", alt: "Tidy project overview with progress, the next stage to continue, and gap warnings" },
      { src: "/work/mune-ux/03-discovery-questions.png", alt: "Discovery question card with risk-rated assumptions" },
      { src: "/work/mune-ux/04-personas.png", alt: "Persona cards for Priya and Sam, drafted from the Brief and Discovery answers" },
      { src: "/work/mune-ux/05-persona-detail.png", alt: "Persona detail with the editable fields and where the persona leads" },
      { src: "/work/mune-ux/06-empathy-map.png", alt: "Empathy map with says, thinks, does and feels quadrants" },
      { src: "/work/mune-ux/07-journey-emotion-curve.png", alt: "Journey swimlane with an emotion curve and promoted pain points and opportunities" },
      { src: "/work/mune-ux/08-problems-hmw.png", alt: "Problem statements built from pain points, with How might we questions" },
      { src: "/work/mune-ux/09-moscow-board.png", alt: "Feature prioritisation board with Must, Should, Could and Won't columns" },
      { src: "/work/mune-ux/10-impact-effort-matrix.png", alt: "Impact versus effort matrix with features placed in their quadrants" },
      { src: "/work/mune-ux/11-user-flows.png", alt: "User flow steps with a decision branch, beside the sitemap outline" },
      { src: "/work/mune-ux/12-usability-testing.png", alt: "Usability test plan with goals, tasks and severity-rated findings" },
      { src: "/work/mune-ux/13-handoff-spec.png", alt: "Design handoff spec showing every UI state and a done-when checklist" },
      { src: "/work/mune-ux/14-tech-plan.png", alt: "Tech planning with constraints, the stack and a decision record" },
      { src: "/work/mune-ux/15-backlog.png", alt: "Backlog with an epic and its user stories" },
      { src: "/work/mune-ux/16-user-story.png", alt: "User story editor with Given, When, Then acceptance criteria" },
      { src: "/work/mune-ux/17-build-board.png", alt: "Sprint board with tasks, branches and pull request status" },
      { src: "/work/mune-ux/18-why-chain.png", alt: "Why chain tracing a build task back to the original answers" },
      { src: "/work/mune-ux/19-qa-test-runs.png", alt: "QA test runs generated from acceptance criteria, with pass and fail results" },
      { src: "/work/mune-ux/20-release-changelog.png", alt: "Release checklist and the changelog generated from shipped stories" },
      { src: "/work/mune-ux/21-metrics-feedback.png", alt: "Measure stage with metric charts tracked against the Brief's targets" },
      { src: "/work/mune-ux/22-traceability.png", alt: "Traceability view with coverage figures and the chain for one feature" },
      { src: "/work/mune-ux/23-assistant.png", alt: "Optional AI assistant panel with suggested questions" },
      { src: "/work/mune-ux/24-background-settings.png", alt: "Background settings with the wallpaper preview, blur and dim" },
      { src: "/work/mune-ux/25-component-library-light.png", alt: "Glass component library in light mode" },
      { src: "/work/mune-ux/26-mobile-overview.png", alt: "Project overview at phone width" },
      { src: "/work/mune-ux/27-mobile-stage-rail.png", alt: "Stage navigation as a bottom sheet at phone width" },
    ],
    role: "Product owner, designer, and developer, built with Claude Code as an AI pair programmer",
    status: "Working local app, personal daily-use tool (local-first desktop web app)",
    platform: "Local web app on Windows, opened as a Chrome/Edge app window from a desktop shortcut; also installable as a PWA",
    tools: "Claude Code · VS Code · Playwright · Git",
    techStack:
      "Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Radix UI · Dexie (IndexedDB) · Zustand · dnd-kit · Anthropic SDK · html-to-image",
    sections: [
      {
        title: "The Problem",
        body: "Most UX tools are blank canvases. Miro, FigJam and Notion templates give you space to think, but they don't guide the thinking, and every artifact lives on its own. A persona doesn't know which interview answer it came from, a feature doesn't know which pain point it solves, and by the time code ships nobody can say why a task exists. The goal was one tool that starts every project with questions and makes each stage feed the next. The chain runs from the first answer through to the release and the metric that measures it.",
      },
      {
        title: "Approach",
        body: "Built as a local-first desktop web app with no account, no cloud database and no telemetry. All data lives in the browser's IndexedDB.",
        points: [
          "Every project starts with 12 guided questions, one per card, across seven input types: short and long text, lists, single and multi choice, 1 to 5 scales, and a risk-rated assumption list.",
          "The work runs through 17 stages in six phases (Discover, Define, Design, Build, Ship, Learn). Quick, Standard and Deep depths include 10, 15 or all 17 stages. Stages can be skipped, reordered or added later, and the app warns about gaps but never blocks.",
          "Each stage feeds the next: personas are drafted from the answers and keep links back to them, journey pain points can be promoted to problem statements and opportunities to features, features become user stories with candidate acceptance criteria drafted from the user flow steps, and each criterion becomes a test case, a failed test becomes a pre-filled bug, and done stories generate the release changelog.",
          "The loop closes at the end: feedback logged in Measure & Iterate is sent back to Discovery as a new answer, which starts the next round.",
          'Exports cover Markdown, a printable PDF report, a JSON backup, PNG images of personas and journeys, Jira/Linear-ready CSV, GitHub issue Markdown, CHANGELOG.md, and a one-click "build brief" per story to paste into a coding assistant.',
        ],
      },
      {
        title: "Architecture & Key Decisions",
        points: [
          'Traceability is computed from the entities\' own references, not stored as a separate list of links. Every answer, persona, journey insight, problem, feature, story, task, test, release and metric is a node, so the graph can never drift out of sync with the data. It also powers the Traceability view and the "Why" popover on every story and task.',
          "AI is optional and off by default. When enabled, 10 structured tasks plus a streaming assistant run through one server route, each asking Claude for JSON that matches a strict schema. The API key stays server-side, refused requests fall back to another model, and anything the AI drafts is marked ✦ until you edit or accept it. Drafting, gap detection and the changelog all also work without a key.",
          "Built on Next.js 16 with Cache Components, which changed several defaults from older versions: visited routes stay mounted in the background so dialogs and side panels have to close themselves when hidden, pages that read URL parameters must render inside Suspense boundaries, and the desktop launcher's auto-exit flag is read at request time so a build never bakes it in.",
          "GitHub sync is read-only. A server route fetches pull requests and recent commits, then links any that mention #TASK-n or match a task's branch name, with tokens never reaching the browser.",
          'The desktop launcher follows the same pattern as my other MUNE apps: a hidden Windows script installs and rebuilds only when something changed, the app opens in a Chrome/Edge app window on 127.0.0.1, and the server shuts down when the last window closes, tracked by heartbeats and a "bye" beacon.',
        ],
      },
      {
        title: "Real Issues Caught & Fixed",
        points: [
          "Glass never frosted in Chrome or Edge. The CSS build merged the backdrop-filter and -webkit-backdrop-filter pair down to only the prefixed version, which Chromium ignores, so every glass panel was a flat tint. Fixed by writing only the standard property and letting the build add the prefix.",
          "The backdrop was invisible. The body had a solid background, and a fixed backdrop at z-index: -1 paints above the html background but below the body's. Moving the base colour to the html element revealed it.",
          "Rapid edits overwrote each other. Two quick changes to the same journey or checklist both wrote the whole array from a stale copy, so the second erased the first. An end-to-end test caught it when an emotion setting vanished; fixed with an atomic read-modify-write helper now used by every list edit.",
          "Lists came back in random order. Random UUIDs meant personas, features and stories reshuffled between sessions. Switched to time-ordered UUIDv7 ids, so storage order is creation order.",
          'Screenshot review found layout bugs no test checked for: matrix labels overlapping and scores sitting exactly on the quadrant dividing lines, long project titles cut off mid-word, the phone-width nav wrapping onto two lines, and stories reading "As a Priya." Each was fixed in the app, then the set was re-shot.',
          "Nested buttons on the boards. The drag-and-drop wrapper gave every card a button role around the card's own button, which breaks screen readers. Moved keyboard dragging to a separate grip handle and kept pointer dragging on the whole card.",
        ],
      },
      {
        title: "Design",
        body: 'The interface is dark glassmorphism: frosted translucent cards with soft white borders over a full-screen wallpaper. I generated the default "aurora" wallpaper in code, in a teal, moss, burnt orange and muted red palette, and you can upload your own with blur and dim controls. A purple accent (blue or green optional) glows under primary buttons and progress. Everything uses one set of tokens, so there\'s an optional light mode and a "reduce transparency" setting that swaps glass for solid surfaces. The journey editor draws a smooth emotion curve you set by clicking faces on each phase. On phones the stage list becomes a bottom sheet.',
      },
      {
        title: "Testing & Outcome",
        body: "An end-to-end script drives a real Edge browser through both acceptance checklists in the spec, 23 steps in all: creating a project and answering the questions, drafting and editing personas, building a journey with an emotion curve and promoting a pain point, dragging tasks across the board and attaching a branch and PR, turning a failed test into a bug, generating a changelog and exporting Markdown, CSV and the handoff spec, and checking that data survives a reload. All 23 steps pass with zero browser console errors. Separate checks cover the background settings and the desktop launcher's full lifecycle: first-run install, build, hidden start, Quit, and auto-exit when the window closes. TypeScript, ESLint and the production build all pass cleanly. The portfolio screenshots come from a scripted capture of a demo project loaded through the app's own Import feature, so the set can be regenerated after any design change. Not yet verified: AI features against the live API with a real key, and GitHub sync on a private repo. The app hasn't been tested with users yet.",
      },
    ],
    designSystem: {
      principle:
        "Dark glassmorphism over a full-screen generated wallpaper, with a purple accent by default and a green theme as an alternate, so the same frosted cards carry either one.",
      colors: [
        { name: "Glass Surface", hex: "#383E3C", usage: "Frosted cards over the wallpaper" },
        { name: "Purple Accent", hex: "#A36DFB", usage: "Primary accent, purple theme" },
        { name: "Green Accent", hex: "#3EDA85", usage: "Primary accent, green theme" },
        { name: "Pain-Point Maroon", hex: "#3E2B2A", usage: "Journey pain-point cards" },
      ],
      typography: {
        fontFamily: "Inter",
      },
      components: [
        { name: "Glass/Button", image: "/work/mune-ux/components/buttons.png" },
        { name: "Glass/Input", image: "/work/mune-ux/components/inputs.png" },
        { name: "Glass/Notification", image: "/work/mune-ux/components/notifications.png" },
        { name: "Glass/Tabs", image: "/work/mune-ux/components/tabs.png" },
        { name: "Glass/Card" },
        { name: "Glass/Dialog" },
        { name: "Glass/Accordion" },
        { name: "Glass/ChatBubble" },
        { name: "EmotionCurve" },
        { name: "ImpactMatrix" },
        { name: "MoscowBoard" },
        { name: "PersonaCard" },
      ],
    },
    sourceNote: "Personal local-first tool; source available on request.",
  },
  {
    slug: "scam-shield",
    title: "Scam Shield",
    tagline:
      "A fraud check for small shop owners, built in two weeks for the Google Cloud AI Builder Cup: paste a conversation or a payment-slip screenshot and get a STOP, VERIFY or SAFE verdict, the reasons, and what to do next.",
    coverImage: "/work/scam-shield/05-stop-result.png",
    images: [
      { src: "/work/scam-shield/01-check-empty.png", alt: "Check screen in its empty state, with upload and type-or-paste options beside a list of demo examples" },
      { src: "/work/scam-shield/02-check-filled-thread.png", alt: "Check screen with a multi-message conversation thread built up, ready to check" },
      { src: "/work/scam-shield/03-check-image-only.png", alt: "Check screen with a payment-slip image attached and ready to check" },
      { src: "/work/scam-shield/04-checking.png", alt: "Checking state: a designed waiting screen telling the owner what to avoid while the check runs" },
      { src: "/work/scam-shield/05-stop-result.png", alt: "STOP verdict for the cake-shop scam conversation, with the source thread and an escalation banner" },
      { src: "/work/scam-shield/06-verify-result.png", alt: "VERIFY verdict screen telling the owner to check before they act" },
      { src: "/work/scam-shield/07-safe-result.png", alt: "SAFE verdict screen reading \"No red flags found\" rather than claiming the message is genuine" },
      { src: "/work/scam-shield/08-long-thread-stop.png", alt: "STOP result for a long conversation thread with many evidence findings" },
      { src: "/work/scam-shield/09-your-records.png", alt: "Your records screen listing past checks for the shop" },
      { src: "/work/scam-shield/10-support-waiting.png", alt: "Supporting states board for waiting and validation errors" },
      { src: "/work/scam-shield/11-support-recovery.png", alt: "Supporting states board for service recovery, including network and rate-limit errors" },
      { src: "/work/scam-shield/12-mobile-stop-result.png", alt: "STOP verdict at mobile width, with the full source thread and image findings stacked below" },
      { src: "/work/scam-shield/13-mobile-safe-result.png", alt: "SAFE verdict at mobile width" },
      { src: "/work/scam-shield/14-color-palette.png", alt: "Design system color palette board, with trust blues and cool neutrals and their hex values" },
    ],
    role: "UI/UX designer and front-end engineer",
    status: "Shipped on time and live on Google Cloud Run, submitted to the Google Cloud AI Builder Cup 2026",
    platform: "Mobile-first web app, deployed on Google Cloud Run",
    tools: "Figma · Claude Code · VS Code · Git",
    techStack:
      "Next.js 16 (static export) · React 19 · TypeScript · FastAPI · Python · Gemini 2.5 Flash on Vertex AI · Google Cloud Run",
    sections: [
      {
        title: "The Problem",
        body: "Shop owners have seconds to decide whether to hand over goods or money, and scammers change tactics every time they're refused. Small merchants get fake payment slips, spoofed bank texts, phishing links, refund tricks and \"customer\" enquiries that push risky files, with no security team and a customer waiting at the counter. The project was shaped by a real case: a cake business was messaged on LinkedIn with a link to a fake meeting page, and when the owner refused to download it and asked to move to WhatsApp, the attacker switched approach and sent a disguised file with a two-hour payment deadline. A checker that reads one message at a time misses that kind of pattern; the owner doesn't need a threat report, she needs one word, the reasons, and what to do next. Existing checkers such as ARKA ScamCheck and Trend Micro ScamCheck are built for everyday consumers; Scam Shield is built for the merchant deciding whether to release goods or pay.",
      },
      {
        title: "Approach",
        body: "Built the front end and the whole design system in two weeks for the Google Cloud AI Builder Cup 2026, working alongside Sumala, who built the backend, security and evaluation. I owned everything the shop owner sees.",
        points: [
          "7 design-system boards in Figma: colour palette, typography, spacing and large controls, surfaces and accessibility, a component library of native Figma components, and composed examples.",
          "22 screen designs across 11 flows, each at 1440px desktop and 390px mobile: the check screen in its empty, filled-thread and image-only states, checking, the STOP/VERIFY/SAFE results, a long-thread STOP result, Your records, and two boards of supporting states for waiting, validation and service recovery.",
          "Every screen designed mobile-first, for someone standing at a counter with a phone in one hand: plain language instead of jargon like VBS or punycode, colour never used alone (every verdict pairs its colour with a word and an icon), calm pale-blue surfaces with red, amber and green kept strictly for verdicts, and room for longer Sinhala text to wrap instead of being cut off.",
          "Shipped the front end myself as a Next.js app built to static files and served by the FastAPI backend from the same Cloud Run container, plus the slides and the under-3-minute demo video for submission.",
        ],
      },
      {
        title: "Key Design Decisions",
        body: "The result screen had to be understood in about three seconds, and four decisions did most of that work.",
        points: [
          'SAFE never means "genuine." The system can only find red flags, not prove a slip or sender is real, so the best result reads "No red flags found" and tells the owner to confirm the payment in their banking app, and a payment-slip image always carries a note that a slip is not proof money arrived.',
          'Show what we saw and what to look for. The verdict is set in code; Gemini only adds limited evidence and writes the explanation, and that only builds trust if people can see it — every finding card shows where it came from (a known scam pattern, the shop\'s own records, a pattern across the conversation, or "AI noticed"), its severity, and an Observed/Expected pair in plain words. AI-only findings are labelled tentative and written as a clue, never as proof.',
          "Build a conversation, not a single message. The key signal is escalation, so the check screen builds an ordered thread of up to 20 items with a From them/From me toggle, and the owner's own replies let the system notice they pushed harder after you said no, which surfaces as a banner on the result.",
          "A check that can't finish never becomes SAFE. Image checks can take over a minute, so waiting is a designed screen that says what to avoid, not a spinner on a button, and network errors, rate limits, a missing business profile, a rejected image and a fallback explanation each get their own state, always saying plainly that no verdict was returned and keeping the thread so the owner can retry without rebuilding it.",
        ],
      },
      {
        title: "How It Works",
        body: "Scam Shield combines fixed security rules, knowledge of the shop's own business, and Gemini. The verdict is decided in code, so it comes with evidence rather than a guess.",
        points: [
          "A screenshot or payment slip is read into facts first (type, amount, date, reference, what it's asking the reader to do); Gemini only reads at this step, it never judges.",
          "Deterministic rules check lookalike and shortened links, risky or disguised file names, fake installers, urgency paired with a payment request, untraceable payment methods, advance fees, sign-in lures and payment-slip arithmetic.",
          "The message is compared against the shop's own suppliers' known domains, phones, bank accounts, normal amounts and usual channels, so a \"we changed our bank account\" message is judged against the shop's own history, not just against known scam patterns.",
          "A Gemini analyst reads the whole conversation for tactics no rule knows, but every finding must quote the conversation exactly, and code discards any finding whose quote isn't really there.",
          "One evidence-correlation engine tracks escalation across the thread, scores every piece of evidence, and sets the verdict: STOP needs a critical finding or a score of 60 or more together with at least one rule or business-context finding, VERIFY covers a score of 25 to 59 or any single high-severity rule, and SAFE means nothing was found.",
          "AI-only evidence is capped at 30 points, can lift a result to VERIFY at most, and can never lower a verdict or remove a finding. Gemini then writes the plain-English explanation, but never for a SAFE result, and a fixed template takes over if it fails its guardrails or times out.",
        ],
      },
      {
        title: "Front-End Build",
        body: "The front end is a Next.js app exported to static files and served by the FastAPI backend from the same Cloud Run container, so there's one deployment and no cross-origin setup. The browser sends the whole conversation with every check, and the server stores nothing between requests.",
        points: [
          "The UI never computes a verdict: it shows exactly the state the backend returns.",
          "Figma variables map one-to-one to CSS variables in tokens.css, including the three verdict colours and five severity levels.",
          "Static-export limits shaped the whole build: no API routes, server actions or dynamic result routes, so results live in client state, and trailingSlash stays on so reloading a route like /check still works.",
          "Images are checked in the browser first, with type, size and HEIC handled before upload and a clear message for each problem, and requests get a 120-second timeout since a multi-image check can take over a minute, with the thread surviving errors and reloads.",
          "labels.ts keeps the vocabulary in one place, turning API values like fake_page into words an owner actually understands.",
          "Code is organised by job: components/ for the UI parts (VerdictCard, EvidenceCard, ActionsList, ImageReadCard, SupplierCard), features/ for the check, result and records screens, and lib/ for the API client, thread building and image handling.",
        ],
      },
      {
        title: "Components & Accessibility",
        body: "Controls are at least 60px tall, focus is a 3px ring with a 3px offset, and contrast was measured for each exact colour pair rather than claimed for the system as a whole (exact hex values are in the design system above).",
        points: [
          'STOP: 6.85:1 contrast, "Do not open, click or pay."',
          'VERIFY: 6.24:1 contrast, "Check before you act."',
          'SAFE: 6.76:1 contrast, "No red flags found."',
          "Core pairs: primary text at 14.27:1 on white, secondary text at 7.29:1, and white on the action blue at 5.37:1.",
          "The component library covers buttons, text inputs, the conversation input with its direction toggle, image upload, verdict banners, evidence items tagged Rule or AI, tool-check rows, escalation and fallback banners, supplier cards and surfaces, every one a native Figma component with variants.",
        ],
      },
      {
        title: "Testing & Outcome",
        body: "Scam Shield shipped on time and is live on Cloud Run. Results are from the live evaluation on 10 October 2026: 88 synthetic messages, part of them written by a teammate who never read the rules, split into a dev half used to find and fix problems and a holdout half never looked at while fixing.",
        points: [
          "Caught 17 of 20 scams on the held-out half, up from 12 to 13 of 20 on the first deployed version, an improvement made using only the dev half, which suggests the fixes generalised rather than memorised the test set.",
          "1 of 7 harmless-but-pushy messages were wrongly flagged on the held-out half.",
          "Median time per text check was 5.0 seconds (95th percentile 6.6s) with Gemini 2.5 Flash and thinking disabled; a harmless message typically returned in about 2 seconds. Gemini 3.8 Flash was tried too, but a one-word request took 11 to 14 seconds in testing, too slow for a counter-top check.",
          "These are small samples, so a difference of one or two cases is within normal variation, and the tool finds red flags only: it can't confirm that anything is genuine.",
          "Built in two weeks, 4 to 18 October 2026: wireframes and the design system first, then the front-end plan written against the live backend with every result state designed before building, then the Next.js build connected to the live API, then the deck and demo video for the 18 October submission deadline.",
          "Next: test with real shop owners on their own phones, support Sinhala at scale, and read document content safely, which the prototype deliberately doesn't do yet.",
        ],
      },
    ],
    designSystem: {
      principle:
        "Calm pastel trust-blue with navy text, and red, amber and green used strictly as verdict colors, measured for contrast rather than claimed for the system as a whole.",
      colors: [
        { name: "Stop Red", hex: "#9E2828", usage: "Stop verdict text, on #FFF1F1" },
        { name: "Verify Amber", hex: "#805200", usage: "Verify verdict text, on #FFF6DF" },
        { name: "Safe Green", hex: "#17613F", usage: "Safe verdict text, on #EAF7EF" },
        { name: "Action Blue", hex: "#416D9F", usage: "Primary buttons and links" },
        { name: "Primary Text", hex: "#142B49", usage: "Headings and body text, on white" },
      ],
      typography: {
        fontFamily: "Inter",
        roles: [
          { name: "Display", spec: "700 · 32/40px — page title" },
          { name: "Title", spec: "700 · 22/30px — verdict word, section titles" },
          { name: "Heading", spec: "600 · 18/26px — card titles" },
          { name: "Body", spec: "400 · 18/28px" },
          { name: "Body Small", spec: "400 · 16/24px — secondary body" },
          { name: "Label", spec: "600 · 16/24px — field labels" },
          { name: "Caption", spec: "400 · 14/20px — hints, metadata" },
          { name: "Overline", spec: "600 · 13/18px — tags" },
        ],
      },
      components: [
        { name: "VerdictCard", image: "/work/scam-shield/components/verdict-banner.png" },
        { name: "Button", image: "/work/scam-shield/components/buttons.png" },
        { name: "Field", image: "/work/scam-shield/components/text-input.png" },
        { name: "EvidenceCard" },
        { name: "ActionsList" },
        { name: "ImageReadCard" },
        { name: "SourceThread" },
        { name: "SupplierCard" },
        { name: "DirectionToggle" },
        { name: "Banner" },
        { name: "Disclosure" },
        { name: "Tag" },
      ],
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SumalaMannage/trust-engine",
      },
    ],
  },
];
