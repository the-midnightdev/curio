import { HomeDiscovery } from "@/components/HomeDiscovery";
import { practiceCategories, practiceTopics } from "@/lib/practice-topics";

export default async function Home({ searchParams }: PageProps<"/">) {
  const query = await searchParams;
  const topicId = typeof query.topic === "string" ? query.topic : undefined;
  const initialTopic = practiceTopics.find((topic) => topic.id === topicId);
  return (
    <div className="home-viewport mx-auto flex h-[calc(100dvh-76px)] max-w-6xl flex-col overflow-hidden px-5 py-4 md:px-8 md:py-5">
      <section className="shrink-0 text-center">
        <h1 className="font-display text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
          Know more. <span className="rounded-md bg-sage px-2">Speak better.</span>
        </h1>
      </section>
      <HomeDiscovery categories={practiceCategories} topics={practiceTopics} initialTopic={initialTopic} />
    </div>
  );
}
