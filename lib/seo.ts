import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// Metadata for a page below the root layout. Next merges openGraph and twitter
// shallowly, so each page sets its own title and description in full; otherwise
// it would inherit the homepage's social preview. Pages without their own card
// use the site card; project pages pass null to keep their generated card.
const SITE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name}, ${SITE.jobTitle}`,
};

export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
  image = SITE_CARD,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: typeof SITE_CARD | null;
}): Metadata {
  const socialTitle = `${title} · ${SITE.name}`;
  // Omitting the key entirely (not passing undefined) lets Next use the route's own generated card.
  const images = image ? { images: [image] } : {};
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      siteName: SITE.name,
      locale: "en_US",
      url: path,
      title: socialTitle,
      description,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...images,
    },
  };
}
