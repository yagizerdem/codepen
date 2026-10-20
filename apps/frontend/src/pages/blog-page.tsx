import { useMemo, useState } from "react";
import { AppFooter } from "@/components/app-footer";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogTagFilter } from "@/components/blog/blog-tag-filter";
import { ALL_TAGS, getBlogs } from "@/components/blog/blog-data";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostGrid } from "@/components/blog/post-grid";
import { AppLayout } from "@/layouts/app-layout";

const PAGE_SIZE = 6;

export default function BlogPage() {
  const blogs = useMemo(getBlogs, []);
  const tags = useMemo(
    () => [ALL_TAGS, ...new Set(blogs.flatMap((b) => b.tags))],
    [blogs],
  );

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(ALL_TAGS);
  const [page, setPage] = useState(1);

  const isFiltering = query.trim() !== "" || tag !== ALL_TAGS;
  const featured = isFiltering ? undefined : blogs[0];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter(
      (b) =>
        b !== featured &&
        (tag === ALL_TAGS || b.tags.includes(tag)) &&
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.body.toLowerCase().includes(q)),
    );
  }, [blogs, featured, query, tag]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <main className="mx-auto w-full max-w-7xl space-y-12 px-6 py-14 lg:px-14 lg:py-20">
          <BlogHeader
            query={query}
            onQueryChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
          />
          {featured && <FeaturedPost post={featured} />}
          <BlogTagFilter
            tags={tags}
            active={tag}
            onChange={(value) => {
              setTag(value);
              setPage(1);
            }}
          />
          <PostGrid posts={visible} />
          <BlogPagination
            page={current}
            pageCount={pageCount}
            onChange={setPage}
          />
        </main>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
