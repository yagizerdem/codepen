import { Link } from "react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HomeEditorPreview } from "@/components/home/home-editor-preview";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--stitch-surface-container-lowest)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-10 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-12 size-80 rounded-full bg-[var(--stitch-secondary-container)]/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-10 px-4 py-12 md:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Front-end playground
          </span>
          <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-5xl">
            Build, test and discover front-end code
          </h1>
          <p className="max-w-xl text-muted-foreground">
            A social development environment for front-end designers and
            developers. Write HTML, CSS and JavaScript in the browser, see it
            run instantly, and share it with the community.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/new-pen" className={buttonVariants({ size: "lg" })}>
              <PlusIcon data-icon="inline-start" />
              Start a pen
            </Link>
            <Link
              to="/explore"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Explore pens
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
        </div>

        <HomeEditorPreview />
      </div>
    </section>
  );
}
