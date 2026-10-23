import Image from "next/image";
import type { ProjectDesignSystem as ProjectDesignSystemData } from "@/lib/projects";
import { Tag } from "@/components/Tag";

// Visual swatch board for a project's case study page — colors, typography
// and components. Every value here is either a real token the project
// states (e.g. Scam Shield's measured verdict colors and type scale) or
// read straight from that project's own source (a next/font import, a
// components/ directory listing) or sampled from its screenshots — never
// invented. Sits between "At a glance" and "Sections", its own block rather
// than a Section, since most of it is drawn, not written.
export function ProjectDesignSystem({
  designSystem,
}: {
  designSystem: ProjectDesignSystemData;
}) {
  const { principle, colors, typography, components } = designSystem;

  return (
    <section className="mt-4 rounded-2xl border border-foreground/10 bg-card p-6 sm:mt-6 md:p-8">
      <h2 className="text-h4">Design system</h2>
      <p className="text-body-sm mt-2 text-muted-foreground">{principle}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {colors.map((color) => (
          <div
            key={color.hex}
            className="overflow-hidden rounded-xl border border-foreground/10 bg-surface"
          >
            <div
              className="h-16 border-b border-foreground/10"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <div className="p-3">
              <p className="text-body-sm font-medium text-foreground">{color.name}</p>
              <p className="text-caption font-mono text-muted-foreground">{color.hex}</p>
              <p className="text-caption mt-1 text-muted-foreground">{color.usage}</p>
            </div>
          </div>
        ))}
      </div>

      {typography && (
        <div className="mt-6 border-t border-foreground/10 pt-6">
          <p className="text-overline text-muted-foreground">Typography</p>
          <p className="text-body-sm mt-2 text-foreground">{typography.fontFamily}</p>
          {typography.roles && (
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 md:grid-cols-4">
              {typography.roles.map((role) => (
                <div key={role.name}>
                  <dt className="text-caption text-muted-foreground">{role.name}</dt>
                  <dd className="text-caption font-mono text-foreground">{role.spec}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {components && components.length > 0 && (
        <div className="mt-6 border-t border-foreground/10 pt-6">
          <p className="text-overline text-muted-foreground">Components</p>
          {/* Real crops first — every other named component (no crop taken)
              follows as a plain pill, same list either way. */}
          {components.some((c) => c.image) && (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {components
                .filter((c) => c.image)
                .map((component) => (
                  <div
                    key={component.name}
                    className="overflow-hidden rounded-xl border border-foreground/10 bg-surface"
                  >
                    <div className="relative h-28 bg-background">
                      <Image
                        src={component.image!}
                        alt={`${component.name} component example`}
                        fill
                        className="object-contain p-3"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <p className="border-t border-foreground/10 p-3 text-body-sm font-medium text-foreground">
                      {component.name}
                    </p>
                  </div>
                ))}
            </div>
          )}
          {components.some((c) => !c.image) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {components
                .filter((c) => !c.image)
                .map((component) => (
                  <Tag key={component.name}>{component.name}</Tag>
                ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
