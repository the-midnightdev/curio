import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  getCategories,
  getCategory,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { CategorySlug } from "@/lib/types";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Field not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const articles = await getArticlesByCategory(slug as CategorySlug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-violet">
        {category.kicker}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">{category.name}</h1>
        <Link
          href={`/discover/${category.slug}`}
          className="rounded-full bg-violet px-4 py-2 text-sm text-white"
        >
          Draw from the index
        </Link>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        {category.description}
      </p>
      <ul className="mt-10 grid gap-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/read/${article.slug}`}
              className="block rounded-3xl border border-ink/10 bg-white/50 p-6 hover:border-violet/40"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
                {formatDate(article.published)} · {article.readingMinutes} min
              </p>
              <h2 className="mt-2 font-display text-3xl">{article.title}</h2>
              <p className="mt-2 max-w-3xl text-ink/70">{article.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
