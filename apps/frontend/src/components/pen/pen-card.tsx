import type { ReactNode } from "react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRightIcon } from "lucide-react";
import type { Pen } from "@codepen/shared";
import { PenPreview } from "@/components/pen/pen-preview";

const LANGUAGES = [
  { key: "htmlCode", label: "HTML", color: "var(--stitch-lang-html)" },
  { key: "cssCode", label: "CSS", color: "var(--stitch-lang-css)" },
  { key: "jsCode", label: "JS", color: "var(--stitch-lang-js)" },
] as const;

export function PenCard({
  pen,
  href,
  actions,
}: {
  pen: Pen;
  href: string;
  actions?: ReactNode;
}) {
  const shortId = pen._id.slice(-6);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-[var(--stitch-outline)]">
      <Link
        to={href}
        aria-label={`Open pen ${shortId} in editor`}
        className="relative block border-b border-border"
      >
        <PenPreview pen={pen} />
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded bg-background px-3 py-1.5 font-mono text-[11px] font-medium text-foreground">
            Open in editor
            <ArrowUpRightIcon className="size-3.5" />
          </span>
        </span>
      </Link>

      <div className="flex items-center justify-between gap-2 p-2.5">
        <div className="min-w-0">
          <h2 className="truncate text-xs font-semibold">
            Untitled pen
            <span className="ml-1.5 font-mono font-normal text-muted-foreground">
              · {shortId}
            </span>
          </h2>
          <div className="mt-1 flex items-center gap-1.5">
            {LANGUAGES.filter(({ key }) => pen[key].trim() !== "").map(
              ({ key, label, color }) => (
                <span
                  key={key}
                  className="rounded px-1.5 py-0.5 font-mono text-[10px] font-medium"
                  style={{
                    color,
                    backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                  }}
                >
                  {label}
                </span>
              ),
            )}
            <time
              dateTime={pen.updatedAt}
              className="ml-1 font-mono text-[10px] text-muted-foreground"
            >
              Updated {formatDistanceToNow(new Date(pen.updatedAt))} ago
            </time>
          </div>
        </div>
        {actions}
      </div>
    </article>
  );
}
