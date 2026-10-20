import { cn } from "cn";

export function BlogTagFilter({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by tag"
      className="flex flex-wrap gap-2"
    >
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          aria-pressed={active === tag}
          onClick={() => onChange(tag)}
          className={cn(
            "h-9 rounded-md px-4 text-sm font-medium transition-colors",
            active === tag
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
