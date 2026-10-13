// Content for the Articles section. Add a new entry to `articles` for a
// new article — the list page's search and the [slug] route both just
// read from this array, no other wiring needed.

// Flip to true to bring the section back — the list page shows a "coming
// soon" message and individual article pages 404 while this is false, but
// none of the underlying article content below is touched.
export const ARTICLES_ENABLED = true;

export type ArticleChapter = {
  // Anchor id (#slug) — also what CopyChapterLink copies a link to.
  slug: string;
  title: string;
  // One-line dek shown under the chapter heading and in the table of contents.
  summary: string;
  // Paragraphs. Undefined/empty renders a "Chapter coming soon" placeholder.
  content?: string[];
  // Figures shown after the paragraphs, in order.
  images?: ArticleImage[];
};

export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
  // Pixel size of the source file, so the figure reserves its space before it loads.
  width: number;
  height: number;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  chapters: ArticleChapter[];
};

export const articles: Article[] = [
  {
    slug: "redesigning-online-qr-generator",
    title: "Redesigning Online QR Generator in 48 Hours",
    excerpt:
      "How I audited a live QR code product, then redesigned its homepage and PDF creation flow in two days, and what I would test next.",
    chapters: [
      {
        slug: "the-brief",
        title: "The Brief",
        summary:
          "Two tasks, one live product, and a 48-hour clock.",
        content: [
          "Rightmo Web Solutions gave me a technical assessment for a UI/UX Engineer role. The brief used the real content and structure of online-qr-generator.com, a B2C SaaS product that turns links, files and contact details into QR codes. I had 48 hours, from 2 to 4 October 2026, as the sole designer. The scope was desktop only.",
          "There were two tasks. The first was a high-converting, modern homepage for the QR code generator, judged on visual hierarchy, typography, layout and modern B2C SaaS patterns. The second was to make content entry and customisation in the PDF creation flow, Step 2, feel seamless, intuitive and frictionless, judged on information architecture, visual hierarchy and usability.",
          "I treated the first task mainly as a visual design problem and the second mainly as a thinking problem. For the second, I wanted to show the reasoning behind each decision, not only the final screens.",
        ],
        images: [
          {
            src: "/work/qr-generator-article/img-55.png",
            width: 8415,
            height: 7769,
            alt: "Grid of the redesigned QR generator screens, from the homepage through the PDF creation states",
            caption: "The full set of redesigned screens, from the homepage through the PDF creation states.",
          },
        ],
      },
      {
        slug: "finding-the-problems",
        title: "Finding the Problems",
        summary:
          "Ten homepage issues, thirteen in the creation flow, and a competitor scan that showed the gap.",
        content: [
          "I split the work into three days. On day one I audited the live homepage and the Step 2 flow, captured every state, and scanned four QR code competitors and three SaaS sites for visual references. I found ten issues on the homepage and thirteen in Step 2.",
          "The homepage had no value proposition and no live product. The hero said \"We make QR codes easy\", and its only button went straight to signup. There were no ratings, logos or customer numbers, and pricing appeared only in the footer. The main buttons also failed accessibility: white text on the brand green measured about 2.35:1, against the 4.5:1 that WCAG AA requires for normal text. The same action carried five different labels, and one footer link went to login instead.",
          "Step 2 had a priority problem. One required task, uploading a PDF, sat among eight equally weighted sections, about four screens of scrolling. Only the upload was marked required, so nothing told people they could skip the rest. A step called Content also held page colours, fonts, a welcome screen, a password and folder settings.",
          "Some problems only appeared in use. A grey checkbox labelled \"Directly show the PDF file\" removed four whole sections when ticked, without saying so. Errors appeared as small red text under a box that stayed green. Next stayed active before a file was uploaded, and the uploaded state showed no file name or size. None of this was visible from the default screens, which is why I captured every state.",
          "Comparing against competitors made the gap clear. Every competitor led with a working product. The free tools put a generator in the hero. The platforms led with a benefit headline, a real product view and review badges. The SaaS references shared one pattern: a short, specific headline, at most two calls to action, a large product shot, and a logo strip underneath.",
        ],
        images: [
          {
            src: "/work/qr-generator-article/img-53.png",
            width: 1810,
            height: 7411,
            alt: "Annotated homepage audit with numbered callouts on the hero, how-it-works, features, QR types, FAQ and footer",
            caption: "Homepage audit: each numbered annotation maps to one of the ten issues found on the live page.",
          },
          {
            src: "/work/qr-generator-article/img-54.png",
            width: 1810,
            height: 8436,
            alt: "Annotated PDF creation audit across the Step 2 screens, with issue numbers beside each captured state",
            caption: "PDF creation audit: thirteen issues across Step 2, annotated on each captured screen.",
          },
          {
            src: "/work/qr-generator-article/img-35.png",
            width: 11033,
            height: 10400,
            alt: "Reference scan of QR code tools and SaaS sites, showing hero, trust and pricing patterns side by side",
            caption: "Reference scan: free QR tools, QR platforms and SaaS sites, compared for hero, trust and pricing patterns.",
          },
        ],
      },
      {
        slug: "showing-the-product-first",
        title: "Showing the Product First",
        summary:
          "A content and call-to-action plan built around one label and one honest claim.",
        content: [
          "The goal for the homepage was to clarify the product, build informed confidence and guide visitors toward creating a QR code. I started with content rather than layout. The output was a content and call-to-action decision board: one product-first story, one primary action, and every claim checked against the live site.",
          "The first decision was a single label. The original page used five labels for its main action. I standardised every primary button in the header, hero, mid-page and closing band to \"Create QR code\". Log in stayed a utility action, and Pricing, FAQ and Reviews became navigation rather than competing calls to action. The label also avoids promising a shortcut, since it doesn't imply that signup is skipped.",
          "The hero leads with the benefit that matters: \"Create QR codes you can update after printing.\" Dynamic editing is the product's real differentiator, so the headline says so. Beside it sits a URL-to-QR concept with Website, PDF and vCard tabs, so visitors see what they will make before committing. It is a static concept, labelled as one, not a working demo.",
          "The rest of the page follows a ten-section sequence: the hero, a trust strip with the verified 4.9 rating from 210 reviews, all 16 live QR types grouped into Business, Media and Social, a three-step how-it-works, four distinct feature highlights in place of seven overlapping cards, use cases, a pricing teaser that states the billing period next to each price, verified testimonials, one FAQ accordion of eight high-intent questions, and a final call-to-action band with a footer grouped into Service, Company and Help.",
          "I set one rule for the board: no invented logos, user counts or trial promises. Every content item was tagged as observed on the live site, proposed by me, or unverified and not yet safe to publish. The trial price and duration stayed unverified and were held back from the copy until confirmed.",
        ],
        images: [
          {
            src: "/work/qr-generator-article/img-56.png",
            width: 1120,
            height: 1816,
            alt: "Task 1 design rationale board listing eight homepage decisions, each with its problem, change and reason",
            caption: "Task 1 design rationale: eight decisions, each with the problem, the change and the reason.",
          },
          {
            src: "/work/qr-generator-article/img-57.png",
            width: 1440,
            height: 4226,
            alt: "Homepage content and CTA board with the primary label, the ten-section sequence and observed facts kept apart from proposals",
            caption: "Content decision board: one primary label, the homepage sequence, and observed facts kept apart from proposed copy.",
          },
        ],
      },
      {
        slug: "one-required-action",
        title: "One Required Action",
        summary:
          "Collapsing eight equal sections into one required step, with every state designed.",
        content: [
          "The UX goal for Step 2 was to let someone upload a PDF and reach a ready-to-use QR code within 30 seconds, with customisation optional rather than mandatory. Before adding any visual styling, I tested the structure in a grey wireframe: one required upload, a plain choice about what happens after scanning, three collapsed optional groups, a preview that stays visible, and Back and Next in a bottom bar.",
          "I renamed the step from Content to \"Content & page\" so the label matches what it holds, and proposed a four-step stepper: Type, Content & page, QR design and Download. Making Download an explicit final stage means the flow ends with a clear finish. The page now opens with one sentence that sets expectations: \"Only your PDF is required. Continue after uploading; customization is optional.\"",
          "The eight equal sections became one open requirement and three collapsed optional groups: Page details, Page design and Advanced. Each collapsed header lists what is inside, so nothing is hidden by surprise. The vague checkbox became a plain-language choice. Choosing \"Open the PDF directly\" hides Page details and Page design, and a helper line says so.",
          "Feedback was the other big change. The uploaded state now shows the file name, size and page count, with Replace and Remove. Every field keeps a persistent label and helper text instead of a placeholder that disappears. Named palette presets sit above custom colours, and the unlabelled colour-swap control became a clear \"Swap colors\" button. Next stays disabled until a valid PDF is in place, and the bottom bar always says why.",
          "I designed each state rather than only the happy path. An empty zone states the accepted type and the 100 MB limit. An uploading state shows a progress bar with a Cancel option. A wrong file type gets a red-bordered zone that says the file is not a PDF, names the file and offers Browse again. An invalid website gets an inline error on the field, and the uploaded PDF and other inputs are kept. A password switched on with nothing entered gets a clear message, and Next stays disabled until it is fixed.",
        ],
        images: [
          {
            src: "/work/qr-generator-article/img-41.png",
            width: 1440,
            height: 1205,
            alt: "Low-fi wireframe of Step 2 with one required upload, three collapsed optional groups and a preview",
            caption: "Low-fi wireframe: one required upload, collapsed optional groups, and a preview that stays visible.",
          },
          {
            src: "/work/qr-generator-article/img-43.png",
            width: 1440,
            height: 1193,
            alt: "Empty upload state with a dashed drop zone, a Browse files button and a preview waiting for a file",
            caption: "Empty state: the upload zone states the accepted type and size, and the preview waits for a file.",
          },
          {
            src: "/work/qr-generator-article/img-42.png",
            width: 1440,
            height: 1625,
            alt: "Uploaded state showing the file name, size and page count, with Replace and Remove and the Advanced group open",
            caption: "Uploaded state: the file name, size and page count are visible, with Replace and Remove beside them.",
          },
          {
            src: "/work/qr-generator-article/img-50.png",
            width: 1440,
            height: 1178,
            alt: "Upload in progress with a progress bar, a Cancel button and Next disabled until the upload completes",
            caption: "Uploading state: a progress bar and Cancel, with Next disabled until the upload completes.",
          },
          {
            src: "/work/qr-generator-article/img-44.png",
            width: 1440,
            height: 1178,
            alt: "Error for a file over the size limit, with a red border, the file name and size, and a Browse again button",
            caption: "Too large: a red-bordered error names the file, its size and the 100 MB limit.",
          },
          {
            src: "/work/qr-generator-article/img-52.png",
            width: 1440,
            height: 1193,
            alt: "Error for a PNG uploaded where a PDF is required, with a red border and a Browse again button",
            caption: "Wrong file type: the error names the file and offers Browse again, while Next stays disabled.",
          },
          {
            src: "/work/qr-generator-article/img-51.png",
            width: 1440,
            height: 1761,
            alt: "Invalid website URL with a red error on the field, while the uploaded PDF and other inputs stay in place",
            caption: "Invalid website: the error sits on the field, and the uploaded PDF and other inputs are kept.",
          },
          {
            src: "/work/qr-generator-article/img-46.png",
            width: 1440,
            height: 1681,
            alt: "Page details filled in with a company name, page title, description and website on the landing page preview",
            caption: "Page details filled in: the public preview updates, and internal settings stay out of it.",
          },
          {
            src: "/work/qr-generator-article/img-47.png",
            width: 1440,
            height: 1703,
            alt: "Password protection switched on with an empty password field showing a red error and Next disabled",
            caption: "Password on, nothing entered: the message says what to fix, and Next stays disabled.",
          },
          {
            src: "/work/qr-generator-article/img-48.png",
            width: 1440,
            height: 1178,
            alt: "Direct PDF mode with Page details and Page design hidden and the PDF shown in the preview",
            caption: "Direct PDF mode: page-only settings are hidden, and the preview shows the PDF itself.",
          },
          {
            src: "/work/qr-generator-article/img-49.png",
            width: 1440,
            height: 1178,
            alt: "Landing page preview with smart defaults, using an example portfolio destination and a placeholder QR code",
            caption: "Smart defaults: the landing page preview fills in from example content until details are added.",
          },
          {
            src: "/work/qr-generator-article/img-58.png",
            width: 1120,
            height: 1864,
            alt: "Task 2 design rationale board listing eight PDF creation decisions, each traced to its audit issues",
            caption: "Task 2 design rationale: eight decisions, each traced to the audit issues it resolves.",
          },
        ],
      },
      {
        slug: "colour-type-and-contrast",
        title: "Colour, Type and the Contrast Fix",
        summary:
          "Measuring the brand green, and why the first fix still failed.",
        content: [
          "Both tasks shared one small system: foundations for colour, type and spacing, then a light component library built on top. The system has 22 named colour roles: four brand greens, nine neutrals and nine feedback colours for success, error and warning.",
          "The contrast problem looked easy to fix. The original white-on-green button measured about 2.35:1. My first suggested fix, #1A9E45, still reached only 3.49:1, which is not enough. I kept darkening the green until it passed. The final primary colour, #16843A, gives 4.78:1 with white text, which passes WCAG AA for normal text. The lightest body text allowed on white is #6B7280, at 4.83:1.",
          "Typography uses one typeface, Inter, in two weights: Semi Bold for headings and Regular for body text and captions. Each page has one H1. Six type roles run from a 56/64 px H1 down to a 12/18 px caption. Spacing uses an 8 px base unit with 13 reusable tokens, on a 12-column grid at 1440 px with 72 px margins and 24 px gutters. In Step 2, the form spans eight columns and the preview spans four.",
          "The component library, which I called Light stained glass, has seven component families and 27 states, including primary, secondary and ghost buttons, text inputs with persistent labels, and dropdowns. Its rules carry the UX decisions into every screen: one primary action per task, a visible label on every field, and errors that say how to fix the problem.",
          "I chose a light interface on purpose. QR codes scan most reliably as dark on light, and the preview should match the printed result. The system is light by design, and I did not claim measured WCAG compliance for the whole product.",
        ],
        images: [
          {
            src: "/work/qr-generator-article/img-38.png",
            width: 1440,
            height: 3222,
            alt: "Colour foundations board with the 22 named colour roles and measured contrast for each text and background pairing",
            caption: "Colour foundations: the 22 named roles, with contrast measured for every text and background pairing.",
          },
          {
            src: "/work/qr-generator-article/img-45.png",
            width: 1440,
            height: 1945,
            alt: "PDF page design step with the Blue and sage, Forest and Slate palette presets and custom colour fields",
            caption: "Palette presets and custom colours on the page design step.",
          },
          {
            src: "/work/qr-generator-article/img-40.png",
            width: 1440,
            height: 3158,
            alt: "Typography board with Inter in six roles, from H1 down to caption, with sizes and line heights",
            caption: "Typography: Inter in six roles, from H1 down to caption, with sizes and line heights.",
          },
          {
            src: "/work/qr-generator-article/img-39.png",
            width: 1440,
            height: 4107,
            alt: "Grid and spacing board with a 12-column desktop grid and 8px base spacing tokens",
            caption: "Grid and spacing: a 12-column desktop grid with 8px base spacing tokens.",
          },
          {
            src: "/work/qr-generator-article/img-37.png",
            width: 1640,
            height: 2729,
            alt: "Reusable component masters for buttons, inputs, dropdowns, swatches, cards, tabs and sections",
            caption: "Reusable component masters: buttons, inputs, dropdowns, cards, tabs and sections, with their states.",
          },
          {
            src: "/work/qr-generator-article/img-36.png",
            width: 1440,
            height: 4189,
            alt: "Core components board showing the Light stained glass states for buttons, inputs, dropdowns and sections",
            caption: "Core components: the Light stained glass states for buttons, inputs, dropdowns and sections.",
          },
        ],
      },
      {
        slug: "what-i-learned",
        title: "What I Learned and What I'd Test Next",
        summary:
          "Static proposals rather than tested results, and the steps to validate them.",
        content: [
          "These are static design proposals built in 48 hours, not tested results. The hero generator and the sticky preview are concepts, and I labelled them that way in the files. Here is how I would validate the work.",
          "The first test would be the hero concept. I would build the URL-to-QR demo for real and A/B test it against the original hero, measuring signup rate and time to the first QR code. For Step 2, I would measure the time from upload to Next, and how often people open the optional sections at all. I would run usability sessions on the wrong-file and validation states to check that people notice and fix errors without help, and do a full accessibility audit of the built screens, including focus order and how errors are announced to screen readers.",
          "An audit is the fastest way into an unfamiliar product. Capturing every state, including the errors, revealed problems the default screens hid, such as Next staying active before a file was uploaded.",
          "Usability work is mostly about removing things. The biggest Step 2 improvements came from collapsing, grouping and reordering, not from adding features.",
          "Check the numbers, not just the direction. Darkening the green felt like the fix, but measuring showed my first choice still failed at 3.49:1.",
          "Honest content builds trust. Separating observed facts from proposed copy and unverified claims kept invented logos, user counts and trial promises off the page.",
        ],
      },
    ],
  },
  {
    slug: "building-mune-ux",
    title: "Building MUNE UX: A UX Pipeline Where Every Task Knows Why It Exists",
    excerpt:
      "How I designed and built a local-first tool that guides a project from discovery questions to a shipped release, traces every task back to a real user need, and what testing caught along the way.",
    chapters: [
      {
        slug: "the-blank-canvas-problem",
        title: "The Blank Canvas Problem",
        summary: "Why every UX tool I used left the thinking, and the connections, up to me.",
        content: [
          "I run personal and freelance projects end to end, from research to code. For years my process lived in a scatter of tools: a Miro board for personas, a FigJam file for journeys, a Notion page for features, and a GitHub board for tasks. Each tool was good on its own. None of them knew about the others.",
          "The cost showed up late. Halfway through a build I would look at a task and not remember which user problem it was meant to solve. The persona that justified it sat in a different app, and the interview answer behind that persona was in a third. Insights got lost between stages, and blank canvases didn't help me decide what to think about next.",
          "So I wrote a specification for the tool I wanted. It starts every project with questions, not an empty template. Each stage's output feeds the next, and the whole chain stays traceable: answer, persona, journey pain point, problem, feature, user story, task, pull request, test, release and metric.",
        ],
      },
      {
        slug: "designing-the-pipeline",
        title: "Designing the Pipeline",
        summary: "Seventeen stages, three depths, and a loop instead of a line.",
        content: [
          "The pipeline has 17 stages grouped into six phases: Discover, Define, Design, Build, Ship and Learn. Not every project needs all of them, so each project picks a depth. Quick runs 10 stages, Standard runs 15, and Deep runs all 17. Stages can also be skipped, reordered or added back later. The app warns about gaps but never blocks you.",
          'Discovery starts with 12 guided questions, one per card. Most of the work went into the question types. A plain text box wasn\'t enough for "What do you believe about your users that you haven\'t verified?", so that question became a list where each assumption gets a risk rating from 1 to 5. Anything rated 4 or 5 shows up as a warning until you plan research to test it.',
          'Each stage shows a "Feeds from" and "Feeds into" strip, so you always see where you are in the chain. Each stage also creates the next stage\'s raw material. Personas are drafted from the answers to "Who is it for?", "What problem does it solve?" and "What does success look like?". A pain point on a journey has a Problem button that turns it into a problem statement. An opportunity becomes a feature. Features become user stories, and each step of a user flow becomes a candidate Given, When, Then acceptance criterion.',
          "The pipeline is a loop rather than a line. In the final stage, feedback is logged and sent back to Discovery as a new answer, and that starts the next round.",
        ],
        images: [
          {
            src: "/work/mune-ux/03-discovery-questions.png",
            width: 2880,
            height: 1800,
            alt: "Discovery question card with risk-rated assumptions",
            caption: "Assumptions are rated by risk; anything at 4 or 5 is flagged until it's tested.",
          },
          {
            src: "/work/mune-ux/02-project-overview.png",
            width: 2880,
            height: 1800,
            alt: "Project overview with progress, the next stage to continue, and gap warnings",
            caption: "The project overview shows overall progress, where to continue, and gaps across stages.",
          },
          {
            src: "/work/mune-ux/07-journey-emotion-curve.png",
            width: 2880,
            height: 1800,
            alt: "Journey swimlane with an emotion curve and promoted pain points",
            caption: "Journey phases with a clickable emotion curve. Pain points and opportunities can be promoted straight into problems and features.",
          },
        ],
      },
      {
        slug: "traceability-as-the-core-promise",
        title: "Traceability as the Core Promise",
        summary: "Why the links are computed from the data, not stored beside it.",
        content: [
          "Traceability was the feature everything else had to serve, so I made an early architectural decision: don't store links as a separate list. Each entity already holds its own references. A persona lists the answers it came from, a problem lists the pain points it was promoted from, a feature lists its problems, a story points to its feature, a task to its story, and a release lists the stories it ships. The traceability graph is built from those references every time it's needed.",
          "Because nothing is stored twice, the graph can't drift out of sync with the data. Deleting a feature removes it from every chain at once, with no cleanup step to forget.",
          'The same graph drives two views. The Traceability page shows the whole chain for any feature, along with coverage numbers such as how many stories trace all the way back to an answer. The "Why" popover on every story and task walks the chain upstream, so from a single build task you can see the story, feature, problem, pain point, journey, persona and the original answers that justified it.',
        ],
        images: [
          {
            src: "/work/mune-ux/18-why-chain.png",
            width: 2880,
            height: 1800,
            alt: "Why chain tracing a build task back to the original answers",
            caption: "The Why chain on a task: from the answers, through the persona, journey, pain point, problem, feature and story, to the task itself.",
          },
          {
            src: "/work/mune-ux/22-traceability.png",
            width: 2880,
            height: 1800,
            alt: "Traceability view from answers through personas, journeys and problems to features",
            caption: "The Traceability view, filtered by feature, with coverage figures.",
          },
        ],
      },
      {
        slug: "glass-that-stays-readable",
        title: "Glass That Stays Readable",
        summary: "A glassmorphism design system with contrast rules, a light mode and an escape hatch.",
        content: [
          'The visual language is dark glassmorphism: frosted translucent cards with soft white borders over a blurred, colourful background. Glass is easy to make pretty and hard to make readable, so the design system started with rules, not components. Body text never drops below roughly 4.5:1 contrast. Nested glass panels don\'t stack blur on blur, so a page never has more than two layers of blur. A "reduce transparency" setting swaps every glass surface for a solid one.',
          "Every colour, radius, shadow and blur is a design token, and the components only use tokens. That made the optional light mode and the purple, blue and green accent themes almost free to add. On top of the tokens I built the component set: cards, buttons with an accent underglow, inputs, toggles, segmented controls, badges, chips, tabs, dialogs, side sheets, an accordion and progress rings. A Library page shows all of them in one place.",
          "Glass needs something rich behind it, so the app has a full-screen wallpaper. I generated the default one in code, with soft aurora ribbons, glow fields, bokeh and film grain, in the same teal, moss, burnt orange and muted red palette as the spec. In Settings you can upload your own image and tune its blur and dim, or switch back to a CSS gradient.",
        ],
        images: [
          {
            src: "/work/mune-ux/01-dashboard.png",
            width: 2880,
            height: 1800,
            alt: "MUNE UX dashboard over the aurora wallpaper, with frosted glass cards",
            caption: "The dashboard over the generated aurora wallpaper.",
          },
          {
            src: "/work/mune-ux/25-component-library-light.png",
            width: 2880,
            height: 1800,
            alt: "Glass component library in light mode",
            caption: "The same tokens power an optional light mode.",
          },
        ],
      },
      {
        slug: "building-with-an-ai-pair-programmer",
        title: "Building With an AI Pair Programmer",
        summary: "Working from a spec with Claude Code, and keeping AI optional inside the product.",
        content: [
          "I built MUNE UX with Claude Code as a pair programmer, working from the written specification. My role was product owner and designer: deciding scope, reviewing every screen, and pushing back when something didn't match the spec. The work went phase by phase: foundation and design system first, then each group of stages, then exports, AI, GitHub sync, and finally the desktop launcher.",
          "The framework had moved on from what I knew. Next.js 16's Cache Components keep recently visited pages mounted in the background, so a dialog left open on one page would still be open when you came back. Every dialog and side panel now closes itself when its page is hidden. Pages that read URL parameters also have to render inside loading boundaries, or the build fails.",
          "Inside the product, AI is strictly optional. It's off by default, and every AI feature has an offline equivalent: personas, stories and test cases can be drafted from your own data, gaps are detected by rules, and the changelog is generated from shipped stories. When AI is on, 10 structured tasks and a streaming assistant run through one server route. Each task asks Claude for JSON that matches a strict schema, the API key stays server-side, and anything the AI writes is marked ✦ until you edit or accept it.",
        ],
      },
      {
        slug: "what-testing-caught",
        title: "What Testing Caught",
        summary: "Driving a real browser through the spec found bugs that type-checking never would.",
        content: [
          "TypeScript, linting and a clean build said the app was finished. A real browser said otherwise. I wrote an end-to-end script that drives Edge through both acceptance checklists in the spec, 23 steps in all, from creating a project to exporting a changelog. It also takes screenshots, so I could review each screen.",
          "The first run failed in a revealing way. I set two emotions on a journey in quick succession and only one survived. Both edits had written the journey's whole list of phases from a stale copy, so the second erased the first. The fix was a single helper that reads the latest saved version before writing, which now handles every list edit in the app.",
          "The screenshots caught the rest: order (personas and stories reshuffled between runs, because random IDs set the storage order, and time-ordered IDs fixed it), accessibility (board cards nested one button inside another, which confuses screen readers, so keyboard dragging moved to a separate grip handle), and the glass itself (it had never actually frosted, because the CSS build kept only the Safari-prefixed blur property, which Chrome and Edge ignore, while a solid page background hid the backdrop entirely).",
          "Two one-line fixes, and the design finally looked like the spec.",
          'Even the portfolio screenshots found bugs. Capturing this set at 2× showed four problems: the impact and effort matrix had labels running into each other, with dots sitting exactly on the quadrant lines; long project titles were cut off; the phone-width nav wrapped onto two lines; and stories that named a persona read "As a Priya."',
          "I fixed each in the app and re-shot the set. Now the screenshots are generated by a script, so they can be regenerated after any change.",
          "The final run passes all 23 steps with zero browser console errors. I'm also clear about what's not verified yet: the AI features against the live API with a real key, GitHub sync on a private repository, and any testing with users.",
        ],
        images: [
          {
            src: "/work/mune-ux/19-qa-test-runs.png",
            width: 2880,
            height: 1800,
            alt: "QA test runs generated from acceptance criteria, with pass and fail results",
            caption: "Test cases come straight from each story's acceptance criteria. A failing one opens a pre-filled bug.",
          },
          {
            src: "/work/mune-ux/10-impact-effort-matrix.png",
            width: 2880,
            height: 1800,
            alt: "Impact versus effort matrix with features placed in their quadrants",
            caption: "The matrix after the screenshot review: every feature sits clearly inside its quadrant, and labels in the same row stack instead of colliding.",
          },
        ],
      },
      {
        slug: "making-it-a-desktop-app",
        title: "Making It a Desktop App",
        summary: "One shortcut, no console, and a server that stops when you close the window.",
        content: [
          "MUNE UX runs the same way as my other local tools, MUNE TASKS and MUNE Splits. A desktop shortcut starts a hidden script, which installs dependencies and rebuilds only when something has changed. The server starts on 127.0.0.1, and the app opens in a Chrome or Edge app window with no tabs or address bar.",
          "The server lives only as long as the app. Every open window sends a heartbeat, and closing it sends a goodbye beacon. When the last window closes, the server waits a few seconds in case it was only a reload, then stops. A Quit button does the same immediately. Started any other way, for example during development, the server never shuts itself down.",
          "Each app has its own port, so all three run side by side. Since the data lives in the browser's own storage for that address, everything is still there the next time the shortcut is opened.",
        ],
        images: [
          {
            src: "/work/mune-ux/26-mobile-overview.png",
            width: 1170,
            height: 2532,
            alt: "Project overview at phone width",
            caption: "The overview at phone width.",
          },
          {
            src: "/work/mune-ux/27-mobile-stage-rail.png",
            width: 1170,
            height: 2532,
            alt: "Stage navigation as a bottom sheet on a phone-width screen",
            caption: "The layout also works at phone width, where the stage list becomes a bottom sheet.",
          },
        ],
      },
      {
        slug: "what-id-do-next",
        title: "What I'd Do Next",
        summary: "Validating with real projects and closing the remaining gaps.",
        content: [
          "The tool is built but not proven. The next step is to run two real projects through it, one Quick and one Deep, and note where I skip stages, where the questions miss, and whether the traceability chains help when it's time to make decisions.",
          "There are also specific gaps to close: AI (test the features against the live API, and compare drafts with and without AI on the same project), GitHub (sync with a private repository), backups (include uploaded wallpapers in the JSON backup), and phone (try IndexedDB data on a phone, since the layout already supports it).",
          "Further out, the spec leaves room for multi-device sync. I deliberately left it out of version one to keep the tool local, private and fast.",
        ],
      },
    ],
  },
];
