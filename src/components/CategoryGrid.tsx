import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryGrid({
  categories,
  counts,
}: {
  categories: Category[];
  counts: Record<string, number>;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/discover/${category.slug}`}
            className="group block h-full rounded-3xl border border-border bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-coral-dark"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-accent-text">
              {category.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              {category.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              {category.description}
            </p>
            <p className="mt-6 flex items-center justify-between text-sm">
              <span className="text-ink/50">
                {counts[category.slug] ?? 0} readings
              </span>
              <span className="font-medium text-accent-text group-hover:translate-x-0.5 transition">
                Open the index →
              </span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
