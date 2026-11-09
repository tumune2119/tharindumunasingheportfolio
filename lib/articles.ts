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
  {
    slug: "redesigning-mo-marketplace",
    title: "Redesigning MO Marketplace: Four Shops Behind One Home Screen",
    excerpt:
      "How I audited a Sri Lankan marketplace app, found that three features I assumed were missing already existed, and redesigned its home screen and checkout flow in four days for a take-home design assessment.",
    chapters: [
      {
        slug: "four-shops-wearing-one-coat",
        title: "Four Shops Wearing One Coat",
        summary: "A home screen that never told a first-time visitor MO is four different shops.",
        content: [
          "MO Marketplace is a Sri Lankan buy-and-sell app with four very different shops under one roof: Super Mall for brand-new stock from official stores, Second Hand for pre-loved and thrifted goods, Vehicles for cars, bikes and three-wheelers, and Properties for homes and land for sale or rent. Each serves a different shopper in a different frame of mind, but today a visitor can't tell any of that from the home screen.",
          "In the app, Vehicles and Properties sit as ordinary category circles next to Women's Fashion. Second Hand, MO's real differentiator, only shows up at the bottom of an endless feed. On the website, the \"Vehicle\" category turns out to be 177 car accessories, and a banner states that second-hand items are available only on the app.",
          "The brief asked for a home screen redesign, for app and web, so a first-time visitor understands within seconds that MO offers four experiences and how to enter each one, plus a prioritised list of UX improvements for the rest of the app. This is an independent concept I built for a take-home design assessment. I'm not affiliated with MO Marketplace, and none of it shipped.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/cover.jpg",
            width: 2000,
            height: 1150,
            alt: "MO Marketplace redesign shown on desktop and iPhone, with a greeting, a search bar, four entrance cards for Super Mall, Second Hand, Vehicles and Properties, and a campaign banner",
            caption: "The redesigned home screen on desktop and iPhone: one greeting, one search bar, four clear entrances.",
          },
          {
            src: "/work/mo-marketplace/current-app.jpg",
            width: 1600,
            height: 1128,
            alt: "The current MO app home screen, Vehicle category and Properties category, with Vehicles and Properties sitting as ordinary category circles beside Women's Fashion",
            caption: "The current app: Vehicles and Properties are category circles next to Women's Fashion, not separate shops.",
          },
        ],
      },
      {
        slug: "walking-the-product-before-judging-it",
        title: "Walking the Product Before Judging It",
        summary: "Three research passes packed into a four-day window, and three assumptions that turned out to be wrong.",
        content: [
          "Before designing anything, I wanted to know what MO already did well and where it broke down, so I spent part of the four days I had on three research passes before opening Figma. An app walkthrough went from first launch to selling, capturing 61 iPhone screenshots and logging 32 checks in a spreadsheet, of which 21 turned up an issue. A website audit reviewed mo.lk at 1440 pixels wide and compared it with the app check by check, and 13 of the 32 checks had no web equivalent at all. An inspiration review studied Depop, Etsy, Facebook Marketplace and Pinterest for patterns that solved MO's specific problems, rather than layouts to copy.",
          "The walkthrough corrected assumptions I had written down before ever opening the app. I had assumed MO had no wishlist, no meet-up option and no payment step. All three exist, just hard to find. The wishlist sits ninth in a profile menu, next to a second, separate \"Favourite Items\" list. Meet-up is a seller setting the buyer never sees. Payment happens after a button labelled \"Place Order.\" That shifted most of the fix list toward surfacing what MO already had, rather than inventing features it didn't need.",
          "Other findings were sharper. A seller with zero sales displayed a five-star rating, and all three of their reviews came from the same person. Free delivery started at Rs 599 in the app, Rs 2,500 in the website header, and Rs 3,000 in the website cart. The last thing before \"Place Order\" was an \"I agree to no refunds\" checkbox, and the button beneath it actually opened payment.",
          "Some things already worked well and stayed exactly as they were: typo-tolerant search, an editable AI listing draft, clear delivery choices for sellers, nine-step order tracking, and chat quick replies.",
        ],
      },
      {
        slug: "fixing-the-reference-not-replacing-it",
        title: "Fixing the Reference, Not Replacing It",
        summary: "MO's own reference design pointed the right way, so I kept its structure and fixed seven problems in it.",
        content: [
          "MO supplied a reference design as a starting point: four tiles, a promotion, a flash sale, and a shelf for each experience. It pointed in the right direction, but reading it closely turned up seven problems, so I kept the structure and fixed those rather than starting over.",
        ],
      },
      {
        slug: "one-mo-four-ways-in",
        title: "One MO, Four Ways In",
        summary: "A page that answers what MO is, what's happening now, and what's here for me, in that order.",
        content: [
          "The redesigned home screen answers three questions in order: What is MO? What's happening now? What's here for me? Greeting and location come first, since location changes what MO can offer. Search follows immediately, so people who already know what they want don't have to scroll.",
          "Four entrances sit under the line \"One MO. Four ways to find it,\" each with a name, an icon and a one-line description, so no meaning depends on colour alone. One campaign banner follows the entrances, not before them: one banner, not a rotating carousel. Below that comes one shelf per experience in the same order as the entrances (Flash sale, Fresh pre-loved finds, Vehicles near you, A place to call yours), then Shop by budget starting with Free Stuff, which used to be buried inside Women's Fashion, a seller story and official stores, reasoned picks, and an ending state that reads \"You're all caught up.\" Every shelf's cards are built for what that shelf's buyer actually needs: condition, locality and seller for pre-loved items, mileage and fuel for vehicles, sale or rent, beds and baths for properties, and a save button on every card.",
          "The trade-off I made on purpose: no product is visible in the first iPhone viewport. The brief's first goal was understanding the four experiences within seconds, and four clear entrances do that better than two product cards would. Search and the entrances are both one tap from products. If testing showed people missing products, the campaign banner is the first thing I'd shrink.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/before-after.jpg",
            width: 1344,
            height: 1408,
            alt: "Before and after, the current app home screen next to the redesigned first viewport",
            caption: "Before and after: the same first viewport, read in seconds instead of scrolled past.",
          },
          {
            src: "/work/mo-marketplace/iphone-home-full.jpg",
            width: 1600,
            height: 2460,
            alt: "The full redesigned iPhone home screen, split into three columns",
            caption: "The full redesigned iPhone home screen, from greeting to the ending state.",
          },
        ],
      },
      {
        slug: "one-product-two-platforms",
        title: "One Product, Two Platforms",
        summary: "Desktop keeps the same names, colours and card anatomy, and spends the extra width on navigation.",
        content: [
          "The desktop version isn't a stretched phone. It keeps the same names, colours, icons, card anatomy and section order as the iPhone build, and spends the extra width on navigation and denser browsing: a top bar plus a row with the four experiences, Free Stuff and location, instead of a tab bar for Home, Saved, Sell, Chat and Account; one row of four entrances instead of a 2 by 2 grid; three to four cards per shelf row instead of two; and 64 pixel gutters instead of 20 point gutters and 44 point touch targets.",
          "On desktop, the four experiences become permanent navigation on every page, not just home. MO's current website only sells brand-new stock, so I labelled the desktop marketplace features as a phased concept rather than presenting them as a simple reskin of something that already existed.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/desktop-home-top.jpg",
            width: 1440,
            height: 1350,
            alt: "Redesigned desktop home at 1440 pixels, above the fold",
            caption: "Desktop home, above the fold: one top bar, one row of four entrances.",
          },
          {
            src: "/work/mo-marketplace/desktop-home-rest.jpg",
            width: 1600,
            height: 1063,
            alt: "Desktop home continued, with shelves, seller story, official stores, picks and the end state",
            caption: "Desktop home continued: shelves, seller story, official stores, picks and the end state.",
          },
        ],
      },
      {
        slug: "ranking-the-rest-of-the-app",
        title: "Ranking the Rest of the App",
        summary: "Seventeen improvements ranked by how directly they touch trust, cost or payment.",
        content: [
          "For the second task, I ranked 17 improvements from P0 to P2 by how directly they affect trust, cost or payment at the moment someone decides to buy, chat or sell, each with the evidence behind it, a business-impact hypothesis, and a way to validate it.",
          "The top five: checkout wording and order, so the flow reads Review, then Payment, then Confirmation, with a buyer-protection summary instead of an \"I agree to no refunds\" checkbox. Payment recovery, so when a card fails the message stays on screen, typed details are kept, and the buyer can retry or switch to Koko, with whether MO Coins and Koko can be combined shown before choosing. Honest seller trust, so identity is kept separate from rating, reviews are linked to real purchases, and new sellers show \"New seller, Unrated.\" One cost policy, so a single business-owned source feeds every delivery estimate instead of three different numbers. And visible negotiation and safety, so Chat and Make offer sit beside Buy on negotiable listings, with a safety notice in chat. Vehicles and properties also got their own filters, because someone buying a car asks different questions from someone renting a house.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/filters-vehicles-properties.jpg",
            width: 900,
            height: 1484,
            alt: "Filter sheets for vehicles, with make, year, mileage and fuel, and for properties, with rent or sale, type, bedrooms and district",
            caption: "Separate filters for vehicles and properties, built around what each buyer actually asks.",
          },
          {
            src: "/work/mo-marketplace/desktop-product-detail.jpg",
            width: 1440,
            height: 1449,
            alt: "Desktop pre-loved product detail page",
            caption: "The pre-loved product detail page on desktop.",
          },
          {
            src: "/work/mo-marketplace/task2-buy.jpg",
            width: 1600,
            height: 1475,
            alt: "Task 2 screens showing seller chat, checkout review, payment recovery and order tracking",
            caption: "Seller chat, checkout review, payment recovery and order tracking.",
          },
        ],
      },
      {
        slug: "a-prototype-that-can-fail",
        title: "A Prototype That Can Fail",
        summary: "A clickable HTML prototype built to show what happens when something goes wrong, not just the happy path.",
        content: [
          "Static click-throughs can't show what happens when something goes wrong, so alongside the Figma prototype I built a clickable HTML prototype for mobile and desktop, sharing one data set, so saving an item on one shows up on the other.",
          "Reviewers can search for \"lether backpack,\" misspelled, and still find it, then filter by price, condition and location. They can make a low offer and get a counter-offer from the seller, ask the seller for a close-up of a mark and receive a photo back in chat, have the first card payment fail on purpose and recover without losing anything, track the order through four milestone groups and start a return, and switch on Reduce Transparency and larger text to see the accessible fallbacks.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/task2-discover.jpg",
            width: 1600,
            height: 1544,
            alt: "Task 2 screens showing a welcome message, search results, pre-loved product detail and seller profile",
            caption: "Search, pre-loved product detail and seller profile, part of the discover flow.",
          },
          {
            src: "/work/mo-marketplace/task2-after-sale.jpg",
            width: 1600,
            height: 1684,
            alt: "Task 2 screens showing a return request, sell review, account and Saved, and resilience states",
            caption: "Return request, sell review and account states, including recovery after something fails.",
          },
        ],
      },
      {
        slug: "design-honest-enough-to-show-it",
        title: "Design Honest Enough to Show It",
        summary: "A deliberately small system where glass is reserved for chrome, and ratings can't lie.",
        content: [
          "The system is deliberately small: warm, but built around rules that make honest information easy to show. Pastel red is a warm surface colour only. Deep red carries every action. Text is always ink on opaque surfaces. Glass is reserved for chrome, meaning the tab bar and navigation, so prices and trust information always sit on solid surfaces, with an opaque fallback for Reduce Transparency.",
          "Components carry their own honesty rules. Condition is labelled as seller-declared. \"NIC verified\" says \"Identity only.\" Ratings only appear with a review count, so a new seller shows \"New seller, Unrated\" rather than a fabricated empty five stars. Contrast is checked against WCAG: white text on deep red measures 5.91 to 1, a pass, while white on pastel red measures 1.30 to 1, which is why that pairing is never used for text. Accessibility targets run through the whole system too: 44 point minimum touch targets, visible 2 pixel focus rings, text that reflows at larger sizes, and Lucide outline icons with accessible names.",
        ],
        images: [
          {
            src: "/work/mo-marketplace/design-system-foundations.jpg",
            width: 1440,
            height: 2109,
            alt: "Design system foundations, with colour, typography, spacing and accessibility rules",
            caption: "Foundations: colour, typography, spacing and the accessibility rules behind them.",
          },
          {
            src: "/work/mo-marketplace/design-system-components.jpg",
            width: 1600,
            height: 1073,
            alt: "MO design system components and their states, built as reusable named frame specimens",
            caption: "Components and their states, built as reusable, named specimens.",
          },
        ],
      },
      {
        slug: "what-id-test-next",
        title: "What I'd Test Next",
        summary: "Five decisions I'd defend, and the studies I'd run before trusting any of it.",
        content: [
          "Nothing here has been tested with users, and every business impact is a hypothesis, not a result. Five decisions I'd defend if asked: removing the chip row, since two routes to the same four places confuse people and the entrances already do that job; entrances above products, since comprehension within seconds was the first goal, ahead of showing products above the fold; one campaign instead of an auto-rotating carousel, since hidden slides get little attention and add motion for no benefit; no \"Verified sellers\" badge, since ID checks confirm identity, not quality, and a badge has to be true; and Saved in the tab bar rather than a Categories tab, since categories are already reachable through the entrances and search, while the existing wishlist was buried ninth in the profile menu.",
          "The first studies I'd run, with baselines from the current app: can people name MO's four experiences after five seconds on home? Can they find a pre-loved item and choose the right experience for a goal? Can they predict the total cost before paying? How do they read identity versus rating? I'd recruit across languages, including Sinhala, Tamil and English, across regions, and across accessibility needs.",
          "A few lessons carried past this one project. Walking the product before judging it turned most of the fix list from \"build this\" into \"show this,\" cheaper to ship and more respectful of the team's existing work. Honesty turned out to be a design material in its own right: the most valuable change on the home screen wasn't visual, it was removing claims the product couldn't keep, and building components that simply can't display a misleading rating. And a trade-off is only a real decision if you can say what would change your mind; writing that down for each call made the reasoning stronger and easier to argue with.",
        ],
      },
    ],
  },
  {
    slug: "designing-fixnow",
    title: "Designing FixNow: An Assistant That Guesses Out Loud, Never Quietly",
    excerpt:
      "How I designed a home-services marketplace and its AI assistant, Fixmon, for a take-home UI/UX assessment, and wrote a developer handoff that labels every claim by its evidence instead of letting a sample screen pass as a rule.",
    chapters: [
      {
        slug: "a-marketplace-with-too-many-choices",
        title: "A Marketplace With Too Many Choices",
        summary: "A category-first home-services app, plus a second way in: an AI assistant that explains its matches.",
        content: [
          "The brief asked for FixNow: a reliable, minimal marketplace for home services. Someone browses categories such as plumbing, electrical, cleaning and appliance repair, opens one, and gets matched to nearby vendors ranked by expertise first and proximity second. The reference point named in the brief was Uber Eats' category-first discovery, but scaled down: fewer choices, and a clear next step on every screen rather than a dense filter panel.",
          "The second entry point is Fixmon, an AI assistant that takes a written problem description and optional photos and turns that into a service category and a shortlist of vendors, with a reason given for each match. The two paths, manual browsing and Fixmon, were meant to converge on the same vendor list and the same profile screen, not fork into two separate products.",
        ],
      },
      {
        slug: "paper-first",
        title: "Paper First",
        summary: "Welcome, login, register, terms and an error state, sketched before any screen carried real colour.",
        content: [
          "Before opening Figma, I sketched the core screens on paper: welcome, login, register, terms and conditions, the home screen, and an error state. Nothing about the boxes and arrows was precious, which was the point. A wrong structural call on paper costs a few seconds to redraw. The same call caught after building out full colour and type in Figma costs a rebuild.",
        ],
        images: [
          {
            src: "/work/fixnow/reference-wireframes-01.png",
            width: 606,
            height: 1073,
            alt: "Paper wireframes for the welcome, login, register and terms screens",
            caption: "Welcome, login, register and terms, sketched on paper first.",
          },
          {
            src: "/work/fixnow/reference-wireframes-02.png",
            width: 606,
            height: 1073,
            alt: "Paper wireframes for the home screen and an error state",
            caption: "The home screen and an error state, worked out before any Figma frame existed.",
          },
        ],
      },
      {
        slug: "registering-without-overpromising",
        title: "Registering Without Overpromising",
        summary: "A ten-screen flow where the placeholder terms say so, and the error screen doesn't dead-end.",
        content: [
          "The registration and login flow runs ten screens: welcome, a choice between registering and logging in, account creation with name, email, phone, password and confirmation, a Google sign-in preview, Terms & Conditions, a final review-and-accept step, a returning-user login, a checking-your-details loading state, a couldn't-verify-your-account error, and arrival at the home screen.",
          "Two small decisions mattered more than the visual polish. The Terms & Conditions screen is labelled on its own face as placeholder legal content for wireframe review, not a legal policy, so nobody downstream mistakes a filler paragraph for something legal signed off on. And the verification error offers a plain retry plus a way back to the registration or login choice, rather than stranding someone on a dead screen.",
        ],
        images: [
          {
            src: "/work/fixnow/registration-login.png",
            width: 5217,
            height: 3000,
            alt: "Ten-screen registration and login flow from welcome through to the home screen",
            caption: "The full registration and login flow, including the error and retry state.",
          },
        ],
      },
      {
        slug: "finding-a-plumber-the-manual-way",
        title: "Finding a Plumber the Manual Way",
        summary: "Expertise ranked before distance, and a submit button that's honest about what it actually does.",
        content: [
          "The manual discovery flow also runs ten screens: find a service, browse services, what needs fixing, describe the problem, show us the issue with an optional photo, where is the job, when works for you, anything else to add, a ranked list of plumbers, and a vendor profile with service area, reviews and a primary action.",
          "Vendors are ordered by expertise match first and proximity second, which is a direct answer to the brief's priority. The more important decision was in the copy, not the layout: submitting this criteria only finds matching vendors. It doesn't book or charge anything, and viewing or selecting a profile isn't a submission either. That distinction had to survive into the developer handoff word for word, since it's exactly the kind of thing a rushed implementation quietly gets wrong.",
        ],
        images: [
          {
            src: "/work/fixnow/find-a-service.png",
            width: 6020,
            height: 3000,
            alt: "Ten-screen manual discovery flow from finding a service through to a vendor profile",
            caption: "Find a service, browse, describe the problem, then a ranked list and a profile.",
          },
        ],
      },
      {
        slug: "fixmon-a-guess-not-a-diagnosis",
        title: "Fixmon: A Guess, Not a Diagnosis",
        summary: "An AI assistant that says \"I'm not certain,\" and asks before sharing anything with a vendor.",
        content: [
          "The Fixmon flow is a chat. Someone describes their issue in free text or a voice note, attaches optional photos or video, and Fixmon reflects back a tentative interpretation worded as a guess, not a diagnosis: \"This may be a pipe or seal leak. I'm not certain.\" The person can confirm or correct that interpretation before address and timing are collected, and the vendor matches that follow explain the reasoning behind each one rather than just ranking silently.",
          "Nothing is shared with a vendor until the user explicitly consents to sharing that description and those photos, and no booking happens automatically anywhere in the chat. An AI assistant that quietly acts on its own guess is a different, much riskier product than one that shows its work and asks first, and the brief was clear about wanting the second one.",
        ],
        images: [
          {
            src: "/work/fixnow/fixmon-assistant.png",
            width: 5619,
            height: 3000,
            alt: "Ten-screen Fixmon AI assistant flow from describing the issue to matching vendors",
            caption: "Fixmon's flow: describe, get a tentative interpretation, correct it if needed, then matches.",
          },
        ],
      },
      {
        slug: "feedback-that-doesnt-oversell-itself",
        title: "Feedback That Doesn't Oversell Itself",
        summary: "\"Awaiting a response\" is not the same sentence as \"booking confirmed,\" and the copy has to prove it.",
        content: [
          "Both flows share one set of feedback states: location access denied, no matching professionals, loading, results unavailable, a failed upload, and a sent request. Every state pairs an icon with a label instead of relying on colour alone, and offers a recovery action rather than a dead end.",
          "\"Request sent to Alex\" is deliberately followed by \"Awaiting a response. This is not a confirmed booking,\" so the wording never claims more than what actually happened at that point in the flow. Alongside the two main journeys, a separate 69-frame wireframe set covers secondary flows I kept intentionally low-fidelity on purpose: profile, settings, saved payments, language and region, login security, and account deletion. Static wireframes, not a prototype, because those screens needed to exist and be reviewable, not to look finished before the core flows were settled.",
        ],
        images: [
          {
            src: "/work/fixnow/edge-cases.png",
            width: 3400,
            height: 2182,
            alt: "Edge case wireframes covering navigation, profile, settings and saved-payment flows",
            caption: "A slice of the 69-frame edge-case set, kept deliberately low-fidelity.",
          },
        ],
      },
      {
        slug: "a-six-colour-system-with-one-ai-only-accent",
        title: "A Six-Colour System With One AI-Only Accent",
        summary: "Teal for every action, and a cyan that only Fixmon is allowed to use.",
        content: [
          "Six colours carry the whole product: Deep Navy for trust and primary text, Teal for every action, Off-White for the page background, White for cards, Slate for secondary text and icons, and a Soft Cyan reserved only for Fixmon's own accents. That last rule matters more than it looks: if any button anywhere could turn cyan, Fixmon would stop reading as a distinct assistant and start reading as a colour variant of the same UI.",
          "Inter runs the full type scale across seven named styles, from a 28/36 Title down to a 12/16 Caption. Spacing is a 4px-based scale from 0 to 64, radius runs from 0 to a full 999px pill, and every control respects a 44px minimum touch target. The icon library is one outline family, 81 product glyphs across 8 categories, Lucide-based at a 2px stroke, with one canonical source per glyph rather than a different icon showing up for the same meaning on different screens.",
          "The component library itself is built as real Figma components, not pictures of components: a button with 14 variants, an input with 5 states, professional and chat cards, a 5-variant chip, 9 status labels, 6 feedback states, 3 AI-assistance variants, and the message composer.",
        ],
        images: [
          {
            src: "/work/fixnow/foundations.png",
            width: 4411,
            height: 3000,
            alt: "Design system foundations board with colour roles, typography scale, spacing and radius",
            caption: "Foundations: six colours, the type scale, spacing and radius, and the button and input hierarchy.",
          },
          {
            src: "/work/fixnow/icon-library.png",
            width: 4411,
            height: 3000,
            alt: "Icon library grouped into eight categories",
            caption: "81 glyphs across 8 categories, one canonical source per icon.",
          },
          {
            src: "/work/fixnow/component-library.png",
            width: 3400,
            height: 2182,
            alt: "Native component library with button, input, professional card and chip variants",
            caption: "The native component library: real Figma components, not static pictures of them.",
          },
        ],
      },
      {
        slug: "writing-a-handoff-id-trust",
        title: "Writing a Handoff I'd Trust",
        summary: "Observed, implementation guidance, or open. Every line labelled by what it actually is.",
        content: [
          "I wrote a basic developer handoff, not a full production spec, and labelled every line by its evidence: \"Observed\" for what the designs actually show, \"Implementation guidance\" for a recommended handling that isn't a working feature yet, and \"Open\" for a product or engineering decision that still needs making. That one habit stopped a sample screen from quietly being read as a rule by whoever built from it next.",
          "Some of what that labelling caught was uncomfortable to write down rather than smooth over. The final screens show white text on teal buttons, but the semantic token names navy as the colour that belongs on an action surface. The handoff names that conflict directly and asks for a measured contrast check, because a white override that merely looks fine is not the same thing as accessibility approval.",
          "Request, job, payment and review status are kept as four separate states with a recommended event-by-event mapping, because the component library's own copy says \"Awaiting a response. This is not a confirmed booking\" in one place, while the checkout flow says \"Booking confirmed\" immediately in another. Shipping both meanings for the same event was flagged as a decision still to be made, not something to quietly resolve in code and hope nobody notices the gap.",
          "Every piece of mismatched sample content got called out by name too: a profile screen pairing \"Average response\" with \"1 photo attached,\" an AI summary naming a different vendor than the one actually chosen. None of it is a valid content mapping, and the handoff says so instead of letting it slide through as an example to build from.",
        ],
      },
      {
        slug: "whats-still-open",
        title: "What's Still Open",
        summary: "A basic handoff, not a production sign-off, with the real gaps named instead of guessed shut.",
        content: [
          "Several categories of decision are explicitly left open rather than resolved by guesswork. The booking boundary: exactly when a request becomes a confirmed, paid booking, and what happens on a partial failure. Payment policy: processor hold and capture, wallet ledger behaviour, cancellation fees and refund timing, none of it verified against a real provider yet. An upload limits conflict: the manual flow states a 20MB cap per file, while another screen shows a 30.8MB example ready to send, two numbers that need reconciling rather than picking at random.",
          "There are visual conflicts beyond the button colour too, like a card radius of 16 in one alias against 8 in the shipped UI. Every vendor, review, price, date and address in these screens is illustrative test data, not real coverage, identity or availability, and the assistant is still named Fixman in the foundations file even though the brief and most screens call it Fixmon. Registration rules, password and OTP policy, language support, and the support channel's response times are all unresolved too.",
          "Labelling every claim by its evidence made these disagreements useful instead of something to paper over. Nobody building from this handoff has to guess whether a number is a rule or a one-off example. If I picked this back up, the booking-status conflict is where I'd start: the component library and the checkout screen currently promise two different things for the same event, and that's a product conversation, not a coin flip for whoever happens to write the backend first.",
        ],
      },
    ],
  },
];
