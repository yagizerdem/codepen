import type { ReactNode } from "react";
import type { Pen } from "@codepen/shared";
import { PenCard } from "@/components/pen/pen-card";

export function PenGrid({
  pens,
  getHref,
  renderActions,
}: {
  pens: Pen[];
  getHref: (pen: Pen) => string;
  renderActions?: (pen: Pen) => ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pens.map((pen) => (
        <PenCard
          key={pen._id}
          pen={pen}
          href={getHref(pen)}
          actions={renderActions?.(pen)}
        />
      ))}
    </div>
  );
}
