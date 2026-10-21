import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function ExploreHeader() {
  return (
    <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Explore</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Animations, layouts and small games other people built in the editor.
          Open one to read the code and make it your own.
        </p>
      </div>
      <Link to="/new-pen" className={buttonVariants()}>
        <PlusIcon data-icon="inline-start" />
        Start a pen
      </Link>
    </header>
  );
}
