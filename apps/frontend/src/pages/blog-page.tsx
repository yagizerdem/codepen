import { useEffect, useMemo, useState } from "react";
import { AppFooter } from "@/components/app-footer";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogTagFilter } from "@/components/blog/blog-tag-filter";
import { ALL_TAGS } from "@/components/blog/blog-data";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostGrid } from "@/components/blog/post-grid";
import { AppLayout } from "@/layouts/app-layout";
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios-wrapper";
import type { Blog, GetBlogResponse } from "@codepen/shared";
import { toast } from "sonner";
import { PostGridSkeleton } from "@/components/blog/post-grid-skeleton";
import { useBlog } from "@/providers/blog-provider";

const PAGE_SIZE = 22;

export default function BlogPage() {
  const { setIsLoading, isLoading } = useBlog();

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(ALL_TAGS);
  const [page, setPage] = useState(1);

  async function fetchBlogs(): Promise<GetBlogResponse["data"]> {
    try {
      setIsLoading(true);
      const response = (
        await API.get("/api/blogs", {
          params: {
            limit: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
          },
        })
      ).data as GetBlogResponse;

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.data) {
        return response.data;
      }
      return {
        blogs: [],
        blogCount: 0,
      };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const { data, isError, error, isSuccess } = useQuery<GetBlogResponse["data"]>(
    {
      queryKey: ["blogs", page],
      queryFn: fetchBlogs,
      placeholderData: {
        blogs: [],
        blogCount: 0,
      } as GetBlogResponse["data"],
    },
  );

  useEffect(() => {
    if (isError) {
      toast(error.message, {
        position: "top-right",
      });
    }
  }, [isError, error]);

  const isFiltering = query.trim() !== "" || tag !== ALL_TAGS;
  const featured = isFiltering ? undefined : data?.blogs[0];

  const results: Blog[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (
      data?.blogs.filter(
        (b) =>
          b !== featured &&
          (tag === ALL_TAGS || b.tags.includes(tag)) &&
          (!q ||
            b.title.toLowerCase().includes(q) ||
            b.body.toLowerCase().includes(q)),
      ) ?? []
    );
  }, [data?.blogs, featured, query, tag]);

  const pageCount = Math.max(1, Math.ceil((data?.blogCount ?? 0) / PAGE_SIZE));
  const current = Math.min(page, pageCount);

  const tags = useMemo(
    () => [ALL_TAGS, ...new Set(data?.blogs.flatMap((b) => b.tags) ?? [])],
    [data],
  );

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

          {isLoading && <PostGridSkeleton />}
          {featured && <FeaturedPost post={featured} />}
          <BlogTagFilter
            tags={tags}
            active={tag}
            onChange={(value) => {
              setTag(value);
              setPage(1);
            }}
          />
          {!isLoading && <PostGrid posts={results} />}
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
