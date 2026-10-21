import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const VISIBLE_PAGES = 5;

/** A sliding window of at most VISIBLE_PAGES page numbers that keeps the current page inside. */
function getVisiblePages(page: number, pageCount: number) {
  const size = Math.min(VISIBLE_PAGES, pageCount);
  const start = Math.min(
    Math.max(1, page - Math.floor(size / 2)),
    pageCount - size + 1,
  );
  return Array.from({ length: size }, (_, i) => start + i);
}

export function BlogPagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onChange(page - 1);
            }}
          />
        </PaginationItem>
        {getVisiblePages(page, pageCount).map((n) => (
          <PaginationItem key={n}>
            <PaginationLink
              href="#"
              isActive={n === page}
              onClick={(e) => {
                e.preventDefault();
                onChange(n);
              }}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === pageCount}
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) onChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
