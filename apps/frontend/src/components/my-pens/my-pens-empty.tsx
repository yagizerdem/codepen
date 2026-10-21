import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function MyPensEmpty() {
  return (
    <Empty className="border border-dashed border-border py-16">
      <EmptyHeader>
        <EmptyTitle>No pens yet</EmptyTitle>
        <EmptyDescription>
          Pens you create show up here, ready to pick up where you left off.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="/new-pen" className={buttonVariants()}>
          <PlusIcon data-icon="inline-start" />
          Create your first pen
        </Link>
      </EmptyContent>
    </Empty>
  );
}
