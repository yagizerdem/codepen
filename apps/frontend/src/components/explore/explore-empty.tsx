import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function ExploreEmpty({ onReset }: { onReset: () => void }) {
  return (
    <Empty className="bg-muted py-16">
      <EmptyHeader>
        <EmptyTitle>Nothing matches these filters</EmptyTitle>
        <EmptyDescription>
          Try a longer time range or a different topic.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onReset}>Clear filters</Button>
      </EmptyContent>
    </Empty>
  );
}
