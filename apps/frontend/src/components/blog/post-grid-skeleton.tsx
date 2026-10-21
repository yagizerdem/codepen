import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "cn";

const SKELETON_COUNT = 6;

function Shimmer({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn(
        "relative animate-none overflow-hidden bg-[var(--stitch-surface-container-high)]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-background/50 before:to-transparent",
        className,
      )}
    />
  );
}

function PostCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-muted">
      <Shimmer className="aspect-video rounded-none" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex gap-2">
          <Shimmer className="h-6 w-14" />
          <Shimmer className="h-6 w-16" />
        </div>
        <Shimmer className="h-6 w-4/5" />
        <div className="flex flex-1 flex-col gap-2">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-2/3" />
        </div>
        <div className="flex items-center gap-3">
          <Shimmer className="size-6 rounded-full" />
          <Shimmer className="h-4 w-24" />
          <Shimmer className="ml-auto h-4 w-20" />
        </div>
      </div>
    </article>
  );
}

export function PostGridSkeleton() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading articles"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
