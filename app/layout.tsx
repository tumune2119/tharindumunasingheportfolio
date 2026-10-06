import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rajdhani } from "next/font/google";
import { EasterEgg } from "@/components/EasterEgg";
import { HudFrame } from "@/components/HudFrame";
import { IntroGate } from "@/components/IntroGate";
import { ThemeGlitch } from "@/components/ThemeGlitch";
import { Footer } from "@/components/Footer";
import { InlineScript } from "@/components/InlineScript";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted Google font. The CSS variable is consumed by --font-sans in
// globals.css so every page/component just uses Tailwind's font-sans utility.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display and mono faces for the HUD interface. Only the HUD styles use them,
// so the classic interface looks the same with or without these loaded.
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Preview deployments (and local builds) stay out of search results; only
// the production domain is indexable.
const isProduction = process.env.VERCEL_ENV === "production";

// Defaults for every route. Each page sets its own title and canonical;
// the title template is what gives child pages their " · Tharindu Munasinghe" suffix.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tharindu Munasinghe — UI/UX Engineer & Product Designer",
    template: "%s · Tharindu Munasinghe",
  },
  description: SITE.shortDescription,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: isProduction, follow: isProduction },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE_URL,
    title: "Tharindu Munasinghe — UI/UX Engineer & Product Designer",
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharindu Munasinghe — UI/UX Engineer & Product Designer",
    description: SITE.shortDescription,
  },
};

// Wraps every page: sets up fonts, the dark/light theme, and the site nav.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below can change
    // data-theme before React hydrates, which would otherwise be flagged
    // as a server/client mismatch on this element.
    // scroll-smooth: eases anchor jumps (chapter TOC / copy-link
    // navigation) instead of an instant snap. Safe alongside
    // prefers-reduced-motion — globals.css already forces
    // scroll-behavior: auto !important for that case.
    <html
      lang="en"
      data-ui="hud"
      className={`${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the stored theme applies immediately
            instead of flashing the default light/dark theme first. */}
        <InlineScript html='(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()' />
        {/* Intro gate. A reload skips the first-visit intro and lands on home;
            a fresh session with no intro seen yet hides the site until
            IntroGate plays it (see components/IntroGate.tsx). */}
        <InlineScript html='(function(){try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){sessionStorage.setItem("intro-seen","1");if(location.pathname!=="/")location.replace("/");return}if(!sessionStorage.getItem("intro-seen"))document.documentElement.setAttribute("data-intro","pending")}catch(e){}})()' />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Sits behind the Navbar (z-40 < Navbar's z-50) so content
            scrolling up fades into the background before it reaches the
            nav pill, instead of sitting flush against it. Fixed (not
            sticky) so it stays put at the very top of the viewport
            regardless of scroll, matching the Navbar's own behavior. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-background via-background/80 to-transparent md:h-32"
        />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <EasterEgg />
        <HudFrame />
        <IntroGate />
        <ThemeGlitch />
        <Analytics />
      </body>
    </html>
  );
}
