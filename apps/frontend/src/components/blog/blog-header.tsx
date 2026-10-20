import { Input } from "@/components/ui/input";

export function BlogHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="max-w-3xl space-y-5">
      <h1 className="text-5xl font-semibold tracking-tight lg:text-6xl">Blog</h1>
      <p className="text-lg leading-relaxed">
        News, tips and updates from the CodePen team and community.
      </p>
      <Input
        type="search"
        aria-label="Search articles"
        placeholder="Search articles, tutorials and release notes"
        autoComplete="off"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="h-11 max-w-xl"
      />
    </header>
  );
}
