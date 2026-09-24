// Renders a literal HTML comment node — visible in "View Source"/DevTools'
// Elements panel, never on the rendered page. React has no JSX syntax for
// a raw comment, so dangerouslySetInnerHTML is the standard escape hatch.
// display: contents means the wrapping element creates no box of its own,
// so this has zero layout or visual footprint.
export function HtmlComment({ text }: { text: string }) {
  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: `<!--${text}-->` }}
    />
  );
}
