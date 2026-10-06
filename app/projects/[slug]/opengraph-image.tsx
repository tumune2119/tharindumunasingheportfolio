import { ImageResponse } from "next/og";
import { projects } from "@/lib/projects";
import { loadOgFonts, OG_COLORS, OG_FONT_FAMILY } from "@/lib/og";
import { SITE, SITE_URL } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return [
    {
      id: "card",
      alt: project
        ? `${project.title}: ${project.tagline}`
        : `${SITE.name} case study`,
      size,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const title = project?.title ?? SITE.name;
  const tagline = project?.tagline ?? SITE.shortDescription;
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: OG_COLORS.background,
          borderLeft: `24px solid ${OG_COLORS.primary}`,
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            color: OG_COLORS.primary,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Case study · {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 600,
              color: OG_COLORS.foreground,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.3,
              color: OG_COLORS.muted,
            }}
          >
            {tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: OG_COLORS.muted }}>
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
