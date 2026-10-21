import type { Pen } from "@codepen/shared";
import { cn } from "cn";

// By default the pen is rendered at this multiple of the card size and scaled down to fit.
const FRAME_SCALE = 4;

// A literal closing tag inside the code would end the wrapping element early.
const escapeClosing = (code: string, tag: string) =>
  code.replace(new RegExp(`</(${tag})`, "gi"), "<\\/$1");

function buildDocument({ htmlCode, cssCode, jsCode }: Pick<Pen, "htmlCode" | "cssCode" | "jsCode">) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${escapeClosing(cssCode, "style")}</style></head><body>${htmlCode}<script>${escapeClosing(jsCode, "script")}</script></body></html>`;
}

/** Non-interactive, sandboxed live thumbnail of a pen. */
export function PenPreview({
  pen,
  className,
  scale = FRAME_SCALE,
}: {
  pen: Pick<Pen, "htmlCode" | "cssCode" | "jsCode">;
  className?: string;
  scale?: number;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-white",
        className,
      )}
    >
      <iframe
        title="Pen preview"
        aria-hidden="true"
        tabIndex={-1}
        loading="lazy"
        sandbox="allow-scripts"
        srcDoc={buildDocument(pen)}
        className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          transform: `scale(${1 / scale})`,
        }}
      />
    </div>
  );
}
