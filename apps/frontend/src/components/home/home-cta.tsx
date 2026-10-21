import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeCta() {
  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-10 md:px-6">
      <div className="relative flex flex-col items-center justify-between gap-5 overflow-hidden rounded-xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 size-48 rounded-full bg-primary/15 blur-2xl"
        />
        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to write your first pen?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Free to start. No setup, just open the editor and code.
          </p>
        </div>
        <Link
          to="/register"
          className={cn(buttonVariants({ size: "lg" }), "relative")}
        >
          Sign up free
        </Link>
      </div>
    </section>
  );
}
