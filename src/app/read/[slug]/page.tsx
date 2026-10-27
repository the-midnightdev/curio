import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBlocks } from "@/components/ArticleBlocks";
import { References } from "@/components/References";
import { RelatedTopics } from "@/components/RelatedTopics";
import { SpeakStudio } from "@/components/SpeakStudio";
import {
  getArticle,
  getArticles,
  getCategory,
  getRelatedArticles,
} from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Reading not found" };
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [category, related] = await Promise.all([
    getCategory(article.category),
    getRelatedArticles(article),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.published,
    articleSection: category?.name,
    timeRequired: `PT${article.readingMinutes}M`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-violet">
        <Link href={`/fields/${article.category}`} className="hover:underline">
          {category?.name}
        </Link>
        <span className="mx-2 text-ink/30">/</span>
        {article.readingMinutes} min read
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
        {article.title}
      </h1>
      <p className="mt-5 text-xl leading-8 text-ink/70">{article.dek}</p>
      <p className="mt-4 text-sm text-ink/45">
        Entered {formatDate(article.published)}
      </p>
      <div className="mt-10">
        <ArticleBlocks blocks={article.blocks} />
      </div>
      <SpeakStudio prompts={article.speakingPrompts} />
      <References items={article.references} />
      <RelatedTopics topics={related} />
    </article>
  );
}
