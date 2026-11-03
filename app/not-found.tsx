import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">404</p>
      <h1 className="text-h2 md:text-h1 mt-3">This page doesn&apos;t exist.</h1>
      <p className="text-body-lg mt-4 max-w-xl text-muted-foreground">
        The link might be broken, or the page may have moved. Here&apos;s how
        to find what you&apos;re after instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/projects" variant="outline">
          View projects
        </Button>
      </div>
    </main>
  );
}
