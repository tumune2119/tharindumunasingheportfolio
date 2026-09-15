// Ambient decorative blob behind the home hero — a slow radial-gradient
// drift, not a state-driven effect, so it's pure CSS (see the
// animate-aura-drift keyframe in globals.css) with no client JS needed.
// Naturally covered by that file's site-wide prefers-reduced-motion override.
export function HeroAura() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="animate-aura-drift absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 55%, transparent), color-mix(in srgb, var(--color-secondary) 45%, transparent) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
