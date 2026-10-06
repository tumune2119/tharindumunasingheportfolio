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
    // 1-8 are the public marketing site (home, pricing, contact, about);
    // 9-15 are the customer account/booking flow; 16-20 are the admin portal.
    coverImage: "/work/kandy-1st-court/01-home-hero.png",
    images: [
      "/work/kandy-1st-court/01-home-hero.png",
      "/work/kandy-1st-court/02-home-gallery-amenities.png",
      "/work/kandy-1st-court/03-pricing-preview-find-us.png",
      "/work/kandy-1st-court/04-find-us-cta-footer.png",
      "/work/kandy-1st-court/05-contact-page.png",
      "/work/kandy-1st-court/06-pricing-hourly-membership.png",
      "/work/kandy-1st-court/07-membership-special-offers.png",
      "/work/kandy-1st-court/08-about-page.png",
      "/work/kandy-1st-court/09-account-dashboard.png",
      "/work/kandy-1st-court/10-booking-step1-date.png",
      "/work/kandy-1st-court/11-booking-step2-time.png",
      "/work/kandy-1st-court/12-booking-step3-payment.png",
      "/work/kandy-1st-court/13-booking-confirmed.png",
      "/work/kandy-1st-court/14-my-bookings-upcoming.png",
      "/work/kandy-1st-court/15-my-bookings-past.png",
      "/work/kandy-1st-court/16-admin-dashboard.png",
      "/work/kandy-1st-court/17-admin-manage-bookings.png",
      "/work/kandy-1st-court/18-admin-manage-customers.png",
      "/work/kandy-1st-court/19-admin-settings.png",
      "/work/kandy-1st-court/20-admin-reports.png",
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
      "/work/portfolio/01-home.png",
      "/work/portfolio/02-experience.png",
      "/work/portfolio/03-work.png",
      "/work/portfolio/04-contact.png",
      "/work/portfolio/05-project-modal.png",
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
      "/work/mune-tasks/01-dashboard.png",
      "/work/mune-tasks/02-new-project-empty.png",
      "/work/mune-tasks/03-new-project-streaming.png",
      "/work/mune-tasks/04-new-project-draft-ready.png",
      "/work/mune-tasks/05-project-page-top.png",
      "/work/mune-tasks/06-project-page-subtasks.png",
      "/work/mune-tasks/07-expand-into-steps-modal.png",
      "/work/mune-tasks/08-claude-usage-dashboard.png",
      "/work/mune-tasks/09-settings.png",
      "/work/mune-tasks/10-project-complete-confetti.png",
      "/work/mune-tasks/11-dashboard-archived.png",
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
      "/work/mune-splits/01-events-home.png",
      "/work/mune-splits/02-event-overview.png",
      "/work/mune-splits/03-expenses.png",
      "/work/mune-splits/04-balances.png",
      "/work/mune-splits/05-settle-up.png",
      "/work/mune-splits/06-add-expense.png",
      "/work/mune-splits/07-add-expense-shares.png",
      "/work/mune-splits/08-people.png",
      "/work/mune-splits/09-settings.png",
      "/work/mune-splits/10-print-report.png",
      "/work/mune-splits/11-event-mobile.png",
      "/work/mune-splits/12-events-home-light.png",
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
];
