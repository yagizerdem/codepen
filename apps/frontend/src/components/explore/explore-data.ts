import pensJson from "@/mocks/explore-pens.json";

export const TOPICS = [
  "Animation",
  "Layout",
  "Games",
  "Forms",
  "Typography",
  "Canvas",
] as const;

export type ExploreTopic = (typeof TOPICS)[number];
export type ExploreSort = "trending" | "newest" | "liked";
export type ExplorePeriod = "week" | "month" | "all";

export type ExplorePen = {
  id: string;
  title: string;
  topic: ExploreTopic;
  author: { name: string; handle: string };
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
};

export type ExploreQuery = {
  sort: ExploreSort;
  topic: ExploreTopic | "all";
  period: ExplorePeriod;
  page: number;
  pageSize: number;
};

const HOUR_MS = 3_600_000;
const PERIOD_HOURS: Record<ExplorePeriod, number> = {
  week: 24 * 7,
  month: 24 * 30,
  all: Infinity,
};

const now = Date.now();

// Mock data stores its age in hours so "this week" stays meaningful whenever the app runs.
const ALL_PENS: ExplorePen[] = pensJson.map(({ hoursAgo, ...pen }) => ({
  ...pen,
  topic: pen.topic as ExploreTopic,
  createdAt: new Date(now - hoursAgo * HOUR_MS).toISOString(),
}));

const ageInHours = (pen: ExplorePen) =>
  (now - new Date(pen.createdAt).getTime()) / HOUR_MS;

// Engagement decays with age so a fresh pen with traction outranks an old hit.
const trendingScore = (pen: ExplorePen) =>
  (pen.likes + pen.comments * 3) / Math.pow(ageInHours(pen) / 24 + 2, 1.2);

const SORTERS: Record<ExploreSort, (a: ExplorePen, b: ExplorePen) => number> = {
  trending: (a, b) => trendingScore(b) - trendingScore(a),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  liked: (a, b) => b.likes - a.likes,
};

/** Stand-in for GET /api/explore: same filter, sort and page contract the real endpoint will need. */
export async function fetchExplorePens({
  sort,
  topic,
  period,
  page,
  pageSize,
}: ExploreQuery): Promise<{ pens: ExplorePen[]; penCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const matches = ALL_PENS.filter(
    (pen) =>
      (topic === "all" || pen.topic === topic) &&
      ageInHours(pen) <= PERIOD_HOURS[period],
  ).sort(SORTERS[sort]);

  return {
    pens: matches.slice((page - 1) * pageSize, page * pageSize),
    penCount: matches.length,
  };
}
