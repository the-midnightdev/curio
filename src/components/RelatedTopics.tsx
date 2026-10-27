import Link from "next/link";
import type { ArticleSummary } from "@/lib/types";

export function RelatedTopics({ topics }: { topics: ArticleSummary[] }) {
  if (topics.length === 0) return null;

  return (
    <section className="mt-16">
      <p className="text-[0.7rem] uppercase tracking-[0.26em] text-violet">
        Continue along the shelf
      </p>
      <h2 className="mt-2 font-display text-3xl">Related readings</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/read/${topic.slug}`}
              className="block h-full rounded-3xl border border-ink/10 bg-white/50 p-5 hover:border-violet/40"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
                {topic.category}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight">
                {topic.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{topic.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
