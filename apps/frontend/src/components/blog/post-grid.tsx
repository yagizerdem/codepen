import type { Blog } from "./blog-data";
import { PostCard } from "./post-card";

export function PostGrid({ posts }: { posts: Blog[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-lg bg-muted p-10 text-center text-muted-foreground">
        No articles match your search.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
