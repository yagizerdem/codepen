import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function MyPensHeader({ count }: { count: number }) {
  return (
    <header className="flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-center">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">My Pens</h1>
        <span className="rounded border border-border bg-card px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
          {count} {count === 1 ? "Pen" : "Pens"}
        </span>
      </div>
      <Link to="/new-pen" className={buttonVariants({ size: "default" })}>
        <PlusIcon data-icon="inline-start" />
        New Pen
      </Link>
    </header>
  );
}
