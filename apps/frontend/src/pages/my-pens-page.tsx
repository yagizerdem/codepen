import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import API from "@/lib/axios-wrapper";
import { AppFooter } from "@/components/app-footer";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { MyPensEmpty } from "@/components/my-pens/my-pens-empty";
import { MyPensHeader } from "@/components/my-pens/my-pens-header";
import { MyPensToolbar } from "@/components/my-pens/my-pens-toolbar";
import { PenActions } from "@/components/my-pens/pen-actions";
import { PenGrid } from "@/components/pen/pen-grid";
import { PenGridSkeleton } from "@/components/pen/pen-grid-skeleton";
import { AppLayout } from "@/layouts/app-layout";
import type { GetPensResponse, PenSort } from "@codepen/shared";

const PAGE_SIZE = 12;

const getEditorHref = (id: string) => `/new-pen?pen=${id}`;

async function fetchPens(
  sort: PenSort,
  page: number,
): Promise<NonNullable<GetPensResponse["data"]>> {
  const response = (
    await API.get("/api/pens", {
      params: { sort, limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE },
    })
  ).data as GetPensResponse;

  if (!response.success) {
    throw new Error(response.message);
  }
  return response.data ?? { pens: [], penCount: 0 };
}

export default function MyPensPage() {
  const [sort, setSort] = useState<PenSort>("updated");
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["pens", sort, page],
    queryFn: () => fetchPens(sort, page),
  });

  useEffect(() => {
    if (isError) toast(error.message, { position: "top-right" });
  }, [isError, error]);

  const pens = data?.pens ?? [];
  const penCount = data?.penCount ?? 0;
  const pageCount = Math.max(1, Math.ceil(penCount / PAGE_SIZE));

  // Deleting the last pen of a page leaves it empty: step back to the previous one.
  useEffect(() => {
    if (data && page > pageCount) setPage(pageCount);
  }, [data, page, pageCount]);

  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-6 md:px-6">
          <MyPensHeader count={penCount} />

          {isPending ? (
            <PenGridSkeleton />
          ) : isError ? (
            <p
              role="alert"
              className="py-16 text-center text-sm text-muted-foreground"
            >
              Couldn't load your pens. Reload the page to try again.
            </p>
          ) : penCount === 0 ? (
            <MyPensEmpty />
          ) : (
            <>
              <MyPensToolbar
                sort={sort}
                onSortChange={(value) => {
                  setSort(value);
                  setPage(1);
                }}
                from={(page - 1) * PAGE_SIZE + 1}
                to={(page - 1) * PAGE_SIZE + pens.length}
                total={penCount}
              />
              <PenGrid
                pens={pens}
                getHref={(pen) => getEditorHref(pen._id)}
                renderActions={(pen) => (
                  <PenActions pen={pen} href={getEditorHref(pen._id)} />
                )}
              />
              <div className="border-t border-border pt-4">
                <BlogPagination
                  page={page}
                  pageCount={pageCount}
                  onChange={setPage}
                />
              </div>
            </>
          )}
        </main>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
