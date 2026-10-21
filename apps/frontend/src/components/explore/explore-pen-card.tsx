import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { EyeIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PenPreview } from "@/components/pen/pen-preview";
import type { ExplorePen } from "@/components/explore/explore-data";

// Community pens are shown closer to full size than the editor's own thumbnails.
const PREVIEW_SCALE = 2;

const compact =new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

// Each author keeps one pale tint, derived from the handle so it never shifts between renders.
const authorTint = (handle: string) => {
  let hash = 0;
  for (const char of handle) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return `hsl(${hash} 45% 50% / 0.28)`;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export function ExplorePenCard({
  pen,
  href,
}: {
  pen: ExplorePen;
  href: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-card">
      <Link
        to={href}
        aria-label={`Open ${pen.title}`}
        className="relative block"
      >
        <PenPreview pen={pen} scale={PREVIEW_SCALE} />
        <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            Open pen
          </span>
        </span>
      </Link>

      <div className="flex flex-col gap-2 p-3">
        <h2 className="truncate text-sm font-semibold">{pen.title}</h2>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback
                style={{ backgroundColor: authorTint(pen.author.handle) }}
                className="text-[10px] font-medium text-foreground"
              >
                {initials(pen.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-medium">{pen.author.name}</p>
              <time
                dateTime={pen.createdAt}
                className="text-xs text-muted-foreground"
              >
                {formatDistanceToNow(new Date(pen.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
          </div>

          <ul className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground tabular-nums">
            <li className="flex items-center gap-1" title="Likes">
              <HeartIcon className="size-3.5 fill-[var(--stitch-tertiary)] text-[var(--stitch-tertiary)]" />
              {compact.format(pen.likes)}
            </li>
            <li className="flex items-center gap-1" title="Comments">
              <MessageCircleIcon className="size-3.5" />
              {compact.format(pen.comments)}
            </li>
            <li className="flex items-center gap-1" title="Views">
              <EyeIcon className="size-3.5" />
              {compact.format(pen.views)}
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
