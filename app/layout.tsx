import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InlineScript } from "@/components/InlineScript";
import { Navbar } from "@/components/Navbar";
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
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the stored theme applies immediately
            instead of flashing the default light/dark theme first. */}
        <InlineScript html='(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()' />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
