import { HomeSection } from "@/components/home/home-section";

export type HomeStep = {
  title: string;
  description: string;
};

export const STEPS: HomeStep[] = [
  {
    title: "Write",
    description: "Open a blank pen and start typing HTML, CSS and JavaScript.",
  },
  {
    title: "Preview",
    description: "Watch the result update live while you tweak and iterate.",
  },
  {
    title: "Share",
    description: "Save it, copy the link and show the world what you built.",
  },
];

export function HomeSteps() {
  return (
    <HomeSection title="How it works">
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-lg border border-border bg-card p-5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </HomeSection>
  );
}
