import type { PenSort } from "@codepen/shared";
import { cn } from "cn";

const SORT_OPTIONS: { value: PenSort; label: string }[] = [
  { value: "updated", label: "Recently updated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export function MyPensToolbar({
  sort,
  onSortChange,
  from,
  to,
  total,
}: {
  sort: PenSort;
  onSortChange: (sort: PenSort) => void;
  from: number;
  to: number;
  total: number;
}) {
  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <div
        role="group"
        aria-label="Sort pens"
        className="inline-flex w-fit rounded border border-border bg-muted p-0.5 font-mono text-[10px] font-semibold"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={sort === value}
            onClick={() => onSortChange(value)}
            className={cn(
              "rounded px-2.5 py-1 transition-colors",
              sort === value
                ? "border border-border bg-background text-foreground"
                : "border border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        Showing {from}–{to} of {total} pens
      </p>
    </div>
  );
}
