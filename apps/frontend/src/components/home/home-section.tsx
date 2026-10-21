import type { ReactNode } from "react";

export function HomeSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-10 md:px-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
