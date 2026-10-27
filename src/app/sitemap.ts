import type { MetadataRoute } from "next";
import { getArticles, getCategories } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return [
    { url: "https://curio.local/", changeFrequency: "weekly", priority: 1 },
    { url: "https://curio.local/library", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://curio.local/fields", changeFrequency: "monthly", priority: 0.7 },
    ...categories.flatMap((category) => [
      {
        url: `https://curio.local/fields/${category.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `https://curio.local/discover/${category.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ]),
    ...articles.map((article) => ({
      url: `https://curio.local/read/${article.slug}`,
      lastModified: article.published,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
