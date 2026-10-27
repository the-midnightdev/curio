import { CategoryGrid } from "@/components/CategoryGrid";
import { getArticlesByCategory, getCategories } from "@/lib/content";

export const metadata = {
  title: "Fields",
  description: "Six fields of curiosity on Curio, from psychology to society.",
};

export default async function FieldsPage() {
  const categories = await getCategories();
  const counts = Object.fromEntries(
    await Promise.all(
      categories.map(async (category) => {
        const articles = await getArticlesByCategory(category.slug);
        return [category.slug, articles.length] as const;
      }),
    ),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-violet">
        The atlas
      </p>
      <h1 className="mt-3 font-display text-5xl">Fields of curiosity</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        Each field opens an index you can turn. If you prefer a straight shelf,
        every reading also lives in the library.
      </p>
      <div className="mt-10">
        <CategoryGrid categories={categories} counts={counts} />
      </div>
    </div>
  );
}
