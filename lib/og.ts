import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_COLORS = {
  background: "#ffffff",
  foreground: "#1b1b1b",
  muted: "#4a4a4a",
  primary: "#2d6a4f",
} as const;

// Inter first; the fallback keeps the card renderable if Google Fonts can't be reached.
export const OG_FONT_FAMILY = "Inter, Geist";

// Google's CSS endpoint only links a font file for an old user agent, so the
// same header is used for both the stylesheet and the file itself.
const LEGACY_UA = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)";

async function loadGoogleInter(weight: 400 | 600) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`, {
        headers: { "User-Agent": LEGACY_UA },
      })
    ).text();
    const url = css.match(/src: url\((https:[^)]+)\)/)?.[1];
    if (!url) return [];
    const data = await (await fetch(url, { headers: { "User-Agent": LEGACY_UA } })).arrayBuffer();
    // The renderer reads TTF, OTF and WOFF only; a WOFF2 response would fail the whole build.
    const signature = Buffer.from(data).subarray(0, 4).toString("latin1");
    if (!["\0\x01\0\0", "true", "OTTO", "wOFF"].includes(signature)) return [];
    return [{ name: "Inter", data, weight, style: "normal" as const }];
  } catch {
    return [];
  }
}

// Geist ships with Next's own image renderer, so it's always available locally.
async function loadBundledGeist() {
  try {
    const file = await readFile(
      join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
    );
    const data = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
    return [{ name: "Geist", data, weight: 400 as const, style: "normal" as const }];
  } catch {
    return [];
  }
}

export async function loadOgFonts() {
  const google = [...(await loadGoogleInter(400)), ...(await loadGoogleInter(600))];
  return google.length > 0 ? google : loadBundledGeist();
}
