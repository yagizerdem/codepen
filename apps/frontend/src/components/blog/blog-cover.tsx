import { cn } from "cn";

const palettes = [
  "bg-[var(--stitch-primary-container)]",
  "bg-[var(--stitch-secondary-container)]",
  "bg-[var(--stitch-tertiary-container)]",
];

// Widths of the fake code lines, picked from the post id so every cover differs.
const lineWidths = [62, 38, 74, 50, 28, 66, 44];

function hash(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function BlogCover({
  id,
  label,
  className,
}: {
  id: string;
  label?: string;
  className?: string;
}) {
  const h = hash(id);
  const lines = Array.from({ length: 6 }, (_, i) => ({
    width: lineWidths[(h + i * 3) % lineWidths.length],
    indent: (h >> (i + 2)) % 3,
  }));

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center overflow-hidden p-6",
        palettes[h % palettes.length],
        className,
      )}
    >
      <div className="w-full max-w-sm rounded-md bg-[var(--stitch-surface-container-lowest)] p-4">
        {label && (
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            {label}
          </p>
        )}
        <div className="space-y-2">
          {lines.map((line, i) => (
            <div
              key={i}
              className="h-2 rounded-sm bg-[var(--stitch-surface-container-high)]"
              style={{
                width: `${line.width}%`,
                marginLeft: `${line.indent * 1.25}rem`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
