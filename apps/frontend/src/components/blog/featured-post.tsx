import { BlogAuthor } from "./blog-author";
import { BlogCover } from "./blog-cover";
import { getExcerpt, type Blog } from "./blog-data";
import { BlogTags } from "./blog-tags";

export function FeaturedPost({ post }: { post: Blog }) {
  return (
    <article className="grid overflow-hidden rounded-lg bg-muted lg:grid-cols-5">
      <BlogCover
        id={post._id}
        label={post.tags[0]}
        className="min-h-64 lg:col-span-3"
      />
      <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-2 lg:p-12">
        <BlogTags tags={post.tags} />
        <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
          <a href={`/blog/${post._id}`} className="hover:underline">
            {post.title}
          </a>
        </h2>
        <p className="leading-relaxed">{getExcerpt(post.body)}</p>
        <BlogAuthor authorId={post.author} date={post.createdAt} />
      </div>
    </article>
  );
}
