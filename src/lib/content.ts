import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { Article, ArticleSummary, Category, CategorySlug } from "./types";

const contentDir = path.join(process.cwd(), "content");

export async function getCategories(): Promise<Category[]> {
  const raw = await readFile(path.join(contentDir, "categories.json"), "utf8");
  return JSON.parse(raw) as Category[];
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

async function readArticles(): Promise<Article[]> {
  const dir = path.join(contentDir, "articles");
  const files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
  const articles = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), "utf8");
      return JSON.parse(raw) as Article;
    }),
  );
  return articles.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getArticles(): Promise<Article[]> {
  return readArticles();
}

export async function getArticleSummaries(): Promise<ArticleSummary[]> {
  const articles = await readArticles();
  return articles.map(toSummary);
}

export async function getArticlesByCategory(
  slug: CategorySlug,
): Promise<ArticleSummary[]> {
  const articles = await readArticles();
  return articles.filter((article) => article.category === slug).map(toSummary);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await readArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getRelatedArticles(
  article: Article,
): Promise<ArticleSummary[]> {
  const articles = await readArticles();
  const related = article.related
    .map((slug) => articles.find((item) => item.slug === slug))
    .filter((item): item is Article => Boolean(item));

  if (related.length >= 3) {
    return related.slice(0, 3).map(toSummary);
  }

  const extras = articles.filter(
    (item) =>
      item.slug !== article.slug &&
      !related.some((entry) => entry.slug === item.slug) &&
      (item.category === article.category || related.length < 3),
  );

  return [...related, ...extras].slice(0, 3).map(toSummary);
}

export async function getFeaturedArticle(): Promise<Article> {
  const featured = await getArticle(
    "why-do-we-remember-things-that-never-happened",
  );
  if (!featured) {
    const [first] = await readArticles();
    return first;
  }
  return featured;
}

function toSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    dek: article.dek,
    category: article.category,
    readingMinutes: article.readingMinutes,
    published: article.published,
    related: article.related,
  };
}
