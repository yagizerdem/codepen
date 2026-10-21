import type { Blog, BlogAuthor } from "@codepen/shared";
import blogsJson from "@/assets/blogs.json";
import authorsJson from "@/assets/blog-authors.json";

export const ALL_TAGS = "All";

const authors = new Map(
  (authorsJson as BlogAuthor[]).map((a) => [a._id, a] as const),
);

export function getBlogs(): Blog[] {
  return [...(blogsJson as Blog[])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getAuthor(id: string): BlogAuthor | undefined {
  return authors.get(id);
}

export function getExcerpt(body: string): string {
  return body.split("\n\n")[0];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
