import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TOPICS,
  type ExplorePeriod,
  type ExploreSort,
  type ExploreTopic,
} from "@/components/explore/explore-data";

const SORT_OPTIONS: { value: ExploreSort; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "liked", label: "Most liked" },
];

const TOPIC_OPTIONS = [
  { value: "all", label: "All topics" },
  ...TOPICS.map((topic) => ({ value: topic, label: topic })),
];

const PERIOD_OPTIONS: { value: ExplorePeriod; label: string }[] = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" },
];

export function ExploreToolbar({
  sort,
  onSortChange,
  topic,
  onTopicChange,
  period,
  onPeriodChange,
  from,
  to,
  total,
}: {
  sort: ExploreSort;
  onSortChange: (sort: ExploreSort) => void;
  topic: ExploreTopic | "all";
  onTopicChange: (topic: ExploreTopic | "all") => void;
  period: ExplorePeriod;
  onPeriodChange: (period: ExplorePeriod) => void;
  from: number;
  to: number;
  total: number;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
      <Tabs
        value={sort}
        onValueChange={(value) => onSortChange(value as ExploreSort)}
      >
        <TabsList aria-label="Sort pens">
          {SORT_OPTIONS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="px-3">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          items={TOPIC_OPTIONS}
          value={topic}
          onValueChange={(value) =>
            onTopicChange(value as ExploreTopic | "all")
          }
        >
          <SelectTrigger aria-label="Topic" className="w-36 border-0 bg-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TOPIC_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={PERIOD_OPTIONS}
          value={period}
          onValueChange={(value) => onPeriodChange(value as ExplorePeriod)}
        >
          <SelectTrigger aria-label="Period" className="w-32 border-0 bg-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="ml-1 text-sm text-muted-foreground tabular-nums">
          {total === 0 ? "No pens" : `${from}–${to} of ${total}`}
        </p>
      </div>
    </div>
  );
}
