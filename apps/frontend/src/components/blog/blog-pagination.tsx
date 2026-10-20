import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
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
