import type { ArticleReference } from "@/lib/types";

export function References({ items }: { items: ArticleReference[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-ink/10 pt-10">
      <h2 className="font-display text-3xl">Sources & further reading</h2>
      <ol className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={item.title} className="text-sm leading-6 text-ink/75">
            <span className="mr-2 text-ink/40">{index + 1}.</span>
            {item.url ? (
              <a href={item.url} className="text-violet underline-offset-4 hover:underline">
                {item.title}
              </a>
            ) : (
              <span className="font-medium text-ink">{item.title}</span>
            )}
            <span className="block pl-6 text-ink/55">{item.source}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
