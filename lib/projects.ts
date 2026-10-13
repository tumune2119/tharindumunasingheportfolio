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
    sourceNote: "Personal local-first tool; source available on request.",
  },
];
