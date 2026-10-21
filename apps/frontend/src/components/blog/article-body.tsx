import { cn } from "cn";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; text: string };

// Bodies are plain text: blank-line separated paragraphs, "## " headings
// and ``` fenced code.
function parseBody(body: string): Block[] {
  return body
    .split(/\n{2,}/)
    .filter((chunk) => chunk.trim())
    .map((chunk): Block => {
      const text = chunk.trim();
      if (text.startsWith("```")) {
        return {
          type: "code",
          text: text.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, ""),
        };
      }
      if (text.startsWith("## ")) return { type: "h2", text: text.slice(3) };
      return { type: "p", text };
    });
}

export function ArticleBody({
  body,
  className,
}: {
  body: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[68ch] space-y-5", className)}>
      {parseBody(body).map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-8 text-2xl font-semibold tracking-tight">
              {block.text}
            </h2>
          );
        }
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg bg-[var(--stitch-surface-container-high)] p-5 font-mono text-sm leading-6"
            >
              <code>{block.text}</code>
            </pre>
          );
        }
        return (
          <p key={i} className="text-lg leading-8">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
