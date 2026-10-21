type HomeStat = {
  value: string;
  label: string;
};

const STATS: HomeStat[] = [
  { value: "2.4M+", label: "Pens created" },
  { value: "380K", label: "Developers" },
  { value: "96M", label: "Pen views" },
  { value: "12K", label: "Daily forks" },
];

export function HomeStats() {
  return (
    <section className="bg-muted">
      <dl className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 text-center">
            <dt className="order-2 text-sm text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="order-1 font-mono text-3xl font-bold text-primary tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
