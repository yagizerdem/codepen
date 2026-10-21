import { AppFooter } from "@/components/app-footer";
import { ArticleBody } from "@/components/blog/article-body";
import { BlogAuthor } from "@/components/blog/blog-author";
import { BlogCover } from "@/components/blog/blog-cover";
import { BlogTags } from "@/components/blog/blog-tags";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLayout } from "@/layouts/app-layout";
import API from "@/lib/axios-wrapper";
import type { ApiResponse, Blog } from "@codepen/shared";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router";

async function fetchBlog(blogId: string): Promise<Blog> {
  const response = (await API.get(`/api/blogs/${blogId}`))
    .data as ApiResponse<Blog>;

  if (!response.success) {
    throw new Error(response.message);
  }

  if (response.data) return response.data;
  throw new Error("No blog data found");
}

function ArticleSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <Skeleton className="h-14 w-3/4" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="aspect-[21/9] w-full" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-full max-w-[68ch]" />
        <Skeleton className="h-5 w-full max-w-[68ch]" />
        <Skeleton className="h-5 w-2/3 max-w-[68ch]" />
      </div>
    </div>
  );
}

export default function ReadPage() {
  const { blogid = "" } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blogid],
    queryFn: () => fetchBlog(blogid),
    enabled: blogid !== "",
  });

  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <main className="mx-auto w-full max-w-5xl space-y-10 px-6 py-14 lg:px-14 lg:py-20">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link to="/blog" />}
            className="-ml-3"
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Back to the blog
          </Button>

          {isLoading && <ArticleSkeleton />}

          {isError && (
            <p className="text-lg">
              We couldn't load this article. It may have been removed.
            </p>
          )}

          {data && (
            <article className="space-y-10">
              <header className="max-w-3xl space-y-5">
                <BlogTags tags={data.tags} />
                <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                  {data.title}
                </h1>
                <BlogAuthor authorId={data.author} date={data.createdAt} />
              </header>
              <BlogCover
                id={data._id}
                label={data.tags[0]}
                className="aspect-[21/9] rounded-lg"
              />
              <ArticleBody body={data.body} />
            </article>
          )}
        </main>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
