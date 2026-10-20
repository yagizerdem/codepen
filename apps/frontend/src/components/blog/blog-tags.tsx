export function BlogTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-sm bg-[var(--stitch-surface-container-high)] px-2 py-1 text-xs font-medium"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
