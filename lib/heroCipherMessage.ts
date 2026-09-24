// The Atbash-encoded first clue of the easter egg hunt — decode it
// yourself (see lib/atbash.ts); the plaintext is deliberately not written
// anywhere in this codebase. Shared between the hidden HTML comment near
// the hero image (app/page.tsx, a Server Component) and the hover-revealed
// HeroCipherClue component (a Client Component) — kept as a plain constant
// in its own non-"use client" module rather than exported from
// HeroCipherClue.tsx, since a Server Component reading a non-component
// named export across a "use client" boundary isn't a reliable pattern in
// the RSC model (it's not a React element, so there's no client-reference
// mechanism for it — the value doesn't reliably reach the server side).
export const HERO_CIPHER_MESSAGE =
  "R wlm'g gsrmp R ollp tllw vmlfts gl yv sviv. Gszg'h dsb R kfg ZR rnztvh. (xfirlfh? gsv xlmhlov szh nliv.)";
