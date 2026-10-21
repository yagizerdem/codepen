import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 8;

export function PenGridSkeleton() {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading pens"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg border border-border bg-card"
        >
          <Skeleton className="aspect-video rounded-none" />
          <div className="space-y-2 p-2.5">
            <Skeleton className="h-3.5 w-3/5" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
