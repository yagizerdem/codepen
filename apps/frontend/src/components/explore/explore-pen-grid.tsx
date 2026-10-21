import { ExplorePenCard } from "@/components/explore/explore-pen-card";
import type { ExplorePen } from "@/components/explore/explore-data";

export function ExplorePenGrid({
  pens,
  getHref,
}: {
  pens: ExplorePen[];
  getHref: (pen: ExplorePen) => string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pens.map((pen) => (
        <ExplorePenCard key={pen.id} pen={pen} href={getHref(pen)} />
      ))}
    </div>
  );
}
