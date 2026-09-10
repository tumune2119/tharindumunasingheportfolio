// Content for the Articles section. Add a new entry to `articles` for a
// new article — the list page's search and the [slug] route both just
// read from this array, no other wiring needed.

export type ArticleChapter = {
  // Anchor id (#slug) — also what CopyChapterLink copies a link to.
  slug: string;
  title: string;
  // One-line dek shown under the chapter heading and in the table of contents.
  summary: string;
  // Paragraphs. Undefined/empty renders a "Chapter coming soon" placeholder.
  content?: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  chapters: ArticleChapter[];
};

export const articles: Article[] = [
  {
    slug: "the-fall-off",
    title: "The Fall Off",
    excerpt:
      "On climbing to senior, losing it, and what actually survived the fall.",
    chapters: [
      {
        slug: "the-climb",
        title: "The Climb",
        summary:
          "What being a senior UI/UX engineer actually looked like day to day, and what I was proud of.",
        content: [
          "I was sixteen when I first saw it: a YouTube video that opened up a world I didn't know existed. I already loved art, music, movies, and games, and somewhere in that video, I saw a version of a career that let all of it matter at once. At the time, I assumed the path was obvious. I'd become a software engineer, front-end, building the things I'd seen on screen.",
          "By the time I graduated, the plan had shifted slightly, but the conviction hadn't. I was sure I was different, that loving all these things gave me some edge, some unique angle nobody else had. Every fresh graduate thinks that. I just didn't know it yet.",
          "I applied to anything and everything, the way you do when you need a job more than you need the right job. One company said yes, and what started as a starting point became something much bigger. They taught me almost everything I know, not just tools and process, but how to think about design, how to defend a decision in a room full of people who disagreed with it, and how to turn a vague idea into something real. It didn't matter that I'd landed in UI/UX instead of the front-end engineering path I'd imagined at sixteen. This felt like the same dream, just a different door into it.",
          "Somewhere in that first year, I made a decision that would define the next five: I would stay loyal.",
          "Loyalty, in practice, wasn't a feeling. It was a series of choices: staying through the hard stretches when it would've been easier to leave, and turning down other offers that came my way, sometimes better ones, because I'd already decided where I belonged. It was the extra hours nobody asked for but that felt, at the time, like the least I could do for a company that gave me a shot when no one else had.",
          "Over five years, I climbed: trainee associate, associate, and eventually, senior UI/UX engineer. Each step felt earned, not given.",
          "But the climb wasn't just about titles. It was about who I was climbing alongside. I started with a mentor, someone who taught me the fundamentals and showed me what good design discipline actually looked like. Later, I had a boss, a different kind of relationship, more about direction and delivery than teaching. And then, finally, I had a partner, someone I could work with, not just for or under. It was real collaboration, the kind where ideas bounce back and forth instead of flowing in one direction, and it was the first time I understood, from the other side, what it meant to be a mentor myself.",
          "It didn't last. A few months into that partnership, the first wave of layoffs hit, and my partner was let go. I remember thinking it was a loss, a real one, but not a warning. I didn't yet know how to read it as one.",
          "The high point came not long after. I helped create and lead a new version of the product, something I believed in, worked hard on, and watched come to life. When it released, it felt like proof: proof that the loyalty had meant something, proof that I'd made it.",
          "A few months later, everything fell apart.",
        ],
      },
      {
        slug: "the-turn",
        title: "The Turn",
        summary:
          "The moment, or the slow slide, where things started to fall apart.",
      },
      {
        slug: "the-fall",
        title: "The Fall",
        summary:
          "What it actually felt like, without over-explaining or over-justifying.",
      },
      {
        slug: "what-i-learned",
        title: "What I Learned",
        summary:
          "The corporate and systemic lessons, and the personal ones.",
      },
      {
        slug: "what-im-carrying-forward",
        title: "What I'm Carrying Forward",
        summary:
          "How I'm using it now: mentoring, rebuilding, seeing my career differently.",
      },
    ],
  },
];
