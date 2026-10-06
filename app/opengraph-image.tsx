import { ImageResponse } from "next/og";
import { loadOgFonts, OG_COLORS, OG_FONT_FAMILY } from "@/lib/og";
import { SITE, SITE_URL } from "@/lib/site";

export const alt = `${SITE.name}, ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 600,
              color: OG_COLORS.foreground,
              lineHeight: 1.05,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 36,
              fontWeight: 600,
              color: OG_COLORS.primary,
            }}
          >
            UI/UX Engineer · Product Designer · Front-end Engineer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 28,
              color: OG_COLORS.muted,
            }}
          >
            Colombo, Sri Lanka · Figma · React · Tailwind CSS
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: OG_COLORS.muted,
          }}
        >
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
