import Link from "next/link";
import { getArticleSummaries } from "@/lib/content";
import { practiceCategories, practiceTopics } from "@/lib/practice-topics";

export const metadata = {
  title: "Knowledge Library",
  description: "Browse every Curio speaking concept and full guide by subject.",
};

export default async function LibraryPage() {
  const articles = await getArticleSummaries();
  const linkedGuides = new Set(practiceTopics.flatMap((topic) => topic.articleSlug ? [topic.articleSlug] : []));
  const additionalGuides = articles.filter((article) => !linkedGuides.has(article.slug));

  return (
    <main id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet">Knowledge library</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">Find an idea worth explaining.</h1>
        <p className="mt-4 text-base leading-7 text-ink/70 sm:text-lg">Browse {practiceTopics.length} useful concepts. Practise any topic, or open a full Curio guide where one is available.</p>
      </header>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Library categories">
        {practiceCategories.map((category) => (
          <a key={category.slug} href={`#${category.slug}`} className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink/75 shadow-sm transition hover:bg-sage hover:text-blue-black">{category.name}</a>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {practiceCategories.map((category) => {
          const topics = practiceTopics.filter((topic) => topic.category === category.slug);
          return (
            <section key={category.slug} id={category.slug} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">{topics.length} concepts</p>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl">{category.name}</h2>
                </div>
                <a href="#top" className="text-sm text-ink/50 hover:text-ink">Back to top</a>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {topics.map((topic) => (
                  <article key={topic.id} className="flex min-h-56 flex-col rounded-[1.5rem] bg-paper p-5 shadow-[0_12px_35px_rgba(16,22,47,0.06)] sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Concept</span>
                      {topic.articleSlug ? <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold text-blue-black">Full guide</span> : null}
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-tight">{topic.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-ink/65">{topic.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link href={`/?topic=${topic.id}`} className="rounded-full bg-coral-dark px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-plum">Practise topic</Link>
                      {topic.articleSlug ? <Link href={`/read/${topic.articleSlug}`} className="rounded-full bg-canvas px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage hover:text-blue-black">Read guide</Link> : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {additionalGuides.length > 0 ? (
        <section className="mt-16 rounded-[1.75rem] bg-paper p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">More reading</p>
          <h2 className="mt-2 font-display text-3xl">Additional Curio guides</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {additionalGuides.map((article) => (
              <Link key={article.slug} href={`/read/${article.slug}`} className="rounded-xl bg-canvas p-4 transition hover:bg-sage hover:text-blue-black">
                <span className="font-display text-xl">{article.title}</span>
                <span className="mt-1 block text-sm opacity-65">{article.readingMinutes} min read</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
