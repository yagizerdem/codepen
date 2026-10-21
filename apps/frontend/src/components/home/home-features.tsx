import { HomeSection } from "@/components/home/home-section";
import {
  CodeXmlIcon,
  FolderKanbanIcon,
  GitForkIcon,
  MoonIcon,
  ShareIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

export type HomeFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const FEATURES: HomeFeature[] = [
  {
    title: "Live preview",
    description:
      "Every keystroke renders instantly in a sandboxed result pane.",
    icon: ZapIcon,
  },
  {
    title: "HTML, CSS & JS editors",
    description:
      "Three focused editors with syntax highlighting, side by side.",
    icon: CodeXmlIcon,
  },
  {
    title: "Share by link",
    description:
      "Send a single URL and anyone can open, read and run your pen.",
    icon: ShareIcon,
  },
  {
    title: "Fork any pen",
    description: "Found something great? Fork it and make it your own.",
    icon: GitForkIcon,
  },
  {
    title: "Collections",
    description: "Group experiments into collections to keep your work tidy.",
    icon: FolderKanbanIcon,
  },
  {
    title: "Light & dark themes",
    description: "Switch themes anywhere; the editor follows your eyes.",
    icon: MoonIcon,
  },
];

export function HomeFeatures() {
  return (
    <HomeSection
      title="Everything you need to ship an idea"
      description="A fast, focused workbench for prototyping, learning and showing off."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-[var(--stitch-outline)]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
