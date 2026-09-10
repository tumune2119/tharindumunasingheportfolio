import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { InlineScript } from "@/components/InlineScript";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

// Self-hosted Google font. The CSS variable is consumed by --font-sans in
// globals.css so every page/component just uses Tailwind's font-sans utility.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Default <title>/<meta description> for every route that doesn't override them.
export const metadata: Metadata = {
  title: "Tharindu Munasinghe - Portfolio",
  description: "Portfolio of Tharindu Munasinghe.",
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
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the stored theme applies immediately
            instead of flashing the default light/dark theme first. */}
        <InlineScript html='(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()' />
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
      </body>
    </html>
  );
}
