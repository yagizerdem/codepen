import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppFooter } from "@/components/app-footer";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { ExploreEmpty } from "@/components/explore/explore-empty";
import { ExploreHeader } from "@/components/explore/explore-header";
import { ExplorePenGrid } from "@/components/explore/explore-pen-grid";
import { ExploreToolbar } from "@/components/explore/explore-toolbar";
import {
  fetchExplorePens,
  type ExplorePeriod,
  type ExploreSort,
  type ExploreTopic,
} from "@/components/explore/explore-data";
import { PenGridSkeleton } from "@/components/pen/pen-grid-skeleton";
import { AppLayout } from "@/layouts/app-layout";

const PAGE_SIZE = 12;

const getEditorHref = (id: string) => `/new-pen?pen=${id}`;

export default function ExplorePage() {
  const [sort, setSort] = useState<ExploreSort>("trending");
  const [topic, setTopic] = useState<ExploreTopic | "all">("all");
  const [period, setPeriod] = useState<ExplorePeriod>("all");
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useQuery({
    queryKey: ["explore-pens", sort, topic, period, page],
    queryFn: () =>
      fetchExplorePens({ sort, topic, period, page, pageSize: PAGE_SIZE }),
  });

  const pens = data?.pens ?? [];
  const penCount = data?.penCount ?? 0;
  const pageCount = Math.max(1, Math.ceil(penCount / PAGE_SIZE));

  // Any filter change starts again from the first page.
  const withFirstPage = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  const resetFilters = () => {
    setTopic("all");
    setPeriod("all");
    setPage(1);
  };

  return (
    <AppLayout activePath="/explore">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-6 md:px-6">
          <ExploreHeader />
          <ExploreToolbar
            sort={sort}
            onSortChange={withFirstPage(setSort)}
            topic={topic}
            onTopicChange={withFirstPage(setTopic)}
            period={period}
            onPeriodChange={withFirstPage(setPeriod)}
            from={(page - 1) * PAGE_SIZE + 1}
            to={(page - 1) * PAGE_SIZE + pens.length}
            total={penCount}
          />

          {isPending ? (
            <PenGridSkeleton />
          ) : isError ? (
            <p
              role="alert"
              className="py-16 text-center text-sm text-muted-foreground"
            >
              Couldn't load pens. Reload the page to try again.
            </p>
          ) : penCount === 0 ? (
            <ExploreEmpty onReset={resetFilters} />
          ) : (
            <>
              <ExplorePenGrid
                pens={pens}
                getHref={(pen) => getEditorHref(pen.id)}
              />
              <BlogPagination
                page={page}
                pageCount={pageCount}
                onChange={setPage}
              />
            </>
          )}
        </main>
        <AppFooter />
      </div>
    </AppLayout>
  );
}
