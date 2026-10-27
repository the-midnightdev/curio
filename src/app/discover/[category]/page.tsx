import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategories, getCategory } from "@/lib/content";
import type { CategorySlug } from "@/lib/types";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Field not found" };
  return { title: category.name, description: `Browse Curio guides about ${category.name.toLowerCase()}.` };
}

export default async function DiscoverPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const articles = await getArticlesByCategory(slug as CategorySlug);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <Link href="/library" className="text-xs font-semibold uppercase tracking-[0.2em] text-violet hover:underline">← Knowledge library</Link>
      <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{category.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">{category.description}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="flex flex-col rounded-[1.5rem] bg-paper p-6 shadow-[0_12px_35px_rgba(16,22,47,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{article.readingMinutes} min guide</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">{article.title}</h2>
            <p className="mt-3 flex-1 leading-7 text-ink/65">{article.dek}</p>
            <Link href={`/read/${article.slug}`} className="mt-6 w-fit rounded-full bg-coral-dark px-5 py-2.5 text-sm font-semibold text-white hover:bg-plum">Read guide</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
