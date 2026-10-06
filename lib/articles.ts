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
];
