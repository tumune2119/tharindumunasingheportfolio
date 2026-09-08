// Renders a <script> that actually runs on first page load (unlike a plain
// React <script> tag, which is inert on any client-side re-render). The
// type flips to "text/plain" once we're in the browser so React doesn't
// try to re-execute it on subsequent client renders — it already ran
// during the initial HTML parse, before React loaded.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
