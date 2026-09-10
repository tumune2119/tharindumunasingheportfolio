import { ArticleSearch } from "@/components/ArticleSearch";
import { articles } from "@/lib/articles";

export default function ArticlesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 md:px-8 md:py-24">
      <p className="text-overline text-muted-foreground">Articles</p>
      <h1 className="text-h2 md:text-h1 mt-3">Writing.</h1>

      <div className="mt-8">
        <ArticleSearch articles={articles} />
      </div>
    </main>
  );
}
