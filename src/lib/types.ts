export type CategorySlug =
  | "psychology"
  | "philosophy"
  | "science"
  | "geography"
  | "history"
  | "society";

export type Category = {
  slug: CategorySlug;
  name: string;
  kicker: string;
  description: string;
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "experiment"; id: "false-memory" };

export type ArticleReference = {
  title: string;
  source: string;
  url?: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: CategorySlug;
  readingMinutes: number;
  published: string;
  related: string[];
  speakingPrompts: string[];
  blocks: ArticleBlock[];
  references: ArticleReference[];
};

export type ArticleSummary = Omit<Article, "blocks" | "references" | "speakingPrompts">;

export type PracticeCategorySlug =
  | "history-culture"
  | "society"
  | "geography-environment"
  | "government-rights"
  | "economy"
  | "science-technology"
  | "world-affairs"
  | "ethics-decisions"
  | "psychology-mind";

export type PracticeCategory = {
  slug: PracticeCategorySlug;
  name: string;
};

export type PracticeTopic = {
  id: string;
  title: string;
  summary: string;
  category: PracticeCategorySlug;
  articleSlug?: string;
};
