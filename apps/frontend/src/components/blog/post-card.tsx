import { useNavigate } from "react-router";
import { BlogAuthor } from "./blog-author";
import { BlogCover } from "./blog-cover";
import { getExcerpt } from "./blog-data";
import { BlogTags } from "./blog-tags";
import type { Blog } from "@codepen/shared";

export function PostCard({ post }: { post: Blog }) {
  const navigate = useNavigate();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-muted">
      <BlogCover id={post._id} label={post.tags[0]} className="aspect-video" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <BlogTags tags={post.tags} />
        <h3 className="text-xl font-semibold leading-snug tracking-tight">
          <span
            onMouseUp={() => navigate(`/read/${post._id}`)}
            className="hover:underline"
          >
            {post.title}
          </span>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {getExcerpt(post.body)}
        </p>
        <div
          onMouseUp={() => navigate(`/read/${post._id}`)}
          className="hover:underline cursor-pointer"
        >
          read more ...
        </div>
        <BlogAuthor authorId={post.author} date={post.createdAt} />
      </div>
    </article>
  );
}
