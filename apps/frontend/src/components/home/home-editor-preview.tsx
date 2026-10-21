const EDITOR_TABS = [
  { label: "HTML", color: "var(--stitch-lang-html)" },
  { label: "CSS", color: "var(--stitch-lang-css)" },
  { label: "JS", color: "var(--stitch-lang-js)" },
] as const;

const CODE_LINES = [
  '<button class="pulse">',
  "  Hello, CodePen",
  "</button>",
  "",
  ".pulse {",
  "  animation: glow 2s infinite;",
  "}",
];

/** Static, decorative mock of the pen editor shown in the hero. */
export function HomeEditorPreview() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-lg border border-border bg-card shadow-xl"
    >
      <div className="flex border-b border-border bg-muted">
        {EDITOR_TABS.map((tab, index) => (
          <span
            key={tab.label}
            style={index === 0 ? { borderTopColor: tab.color } : undefined}
            className={
              index === 0
                ? "border-t-2 bg-card px-4 py-2 text-[11px] font-semibold tracking-wider"
                : "border-t-2 border-transparent px-4 py-2 text-[11px] font-semibold tracking-wider text-muted-foreground"
            }
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2">
        <pre className="overflow-hidden border-b border-border p-4 font-mono text-xs leading-6 text-muted-foreground sm:border-r sm:border-b-0">
          {CODE_LINES.map((line, index) => (
            <div key={index} className="flex gap-4">
              <span className="w-3 text-right opacity-50 select-none">
                {index + 1}
              </span>
              <code>{line}</code>
            </div>
          ))}
        </pre>

        <div className="flex min-h-40 items-center justify-center bg-[var(--stitch-surface-container-lowest)] p-6">
          <span className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px] shadow-primary/40">
            Hello, CodePen
          </span>
        </div>
      </div>
    </div>
  );
}
