import type { ArticleBlock } from "@/lib/types";
import { FalseMemoryExperiment } from "./FalseMemoryExperiment";

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside>
          <p className="kicker">{block.title}</p>
          <p>{block.text}</p>
        </aside>
      );
    case "experiment":
      return <FalseMemoryExperiment />;
    default:
      return null;
  }
}
