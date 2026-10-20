import { useEffect, useRef, useState } from "react";
import { AppFooter } from "@/components/app-footer";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/layouts/app-layout";
import { cn } from "cn";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "first-pen", title: "Your first pen" },
  { id: "workspace", title: "The workspace" },
  { id: "files", title: "Import and export" },
  { id: "shortcuts", title: "Editor shortcuts" },
  { id: "sandbox", title: "The sandbox" },
];

const htmlExample = `<button id="roll">Roll</button>
<p id="result"></p>`;

const jsExample = `const result = document.getElementById("result");

document.getElementById("roll").addEventListener("click", () => {
  result.textContent = Math.ceil(Math.random() * 6);
});`;

const files = [
  ["HTML", "index.html", ".html, .htm"],
  ["CSS", "style.css", ".css"],
  ["JS", "script.js", ".js, .mjs, .cjs"],
];

const shortcuts = [
  ["Comment or uncomment the line", ["Ctrl", "/"]],
  ["Move the line up or down", ["Alt", "↑ / ↓"]],
  ["Copy the line down", ["Shift", "Alt", "↓"]],
  ["Select the next match of the word", ["Ctrl", "D"]],
  ["Find", ["Ctrl", "F"]],
  ["Find and replace", ["Ctrl", "H"]],
  ["Format the pane", ["Shift", "Alt", "F"]],
  ["Show suggestions", ["Ctrl", "Space"]],
] as const;

function Section({
  id,
  title,
  flip,
  children,
}: {
  id: string;
  title: string;
  flip?: boolean;
  children: [React.ReactNode, React.ReactNode];
}) {
  const [text, side] = children;
  return (
    <section
      id={id}
      className="grid scroll-mt-8 gap-8 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn("space-y-4", flip && "lg:order-2")}>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <div className="max-w-prose space-y-4 text-base leading-relaxed">
          {text}
        </div>
      </div>
      <div className={cn("min-w-0", flip && "lg:order-1")}>{side}</div>
    </section>
  );
}

export default function DocumentationPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { root, rootMargin: "0px 0px -70% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <AppLayout>
      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="mx-auto flex w-full max-w-7xl">
          <aside className="sticky top-0 hidden h-[calc(100vh-5rem)] w-60 shrink-0 bg-muted px-3 py-10 md:block">
            <nav aria-label="Documentation" className="space-y-1">
              {sections.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(id);
                  }}
                  className={cn(
                    "block rounded px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    active === id && "bg-accent font-medium text-foreground",
                  )}
                >
                  {title}
                </a>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 space-y-28 px-6 py-14 lg:space-y-36 lg:px-14 lg:py-20">
            <header className="max-w-3xl space-y-5">
              <h1 className="text-5xl font-semibold tracking-tight lg:text-6xl">
                Write it, see it, move on
              </h1>
              <p className="text-lg leading-relaxed">
                How the editor works, what the preview can and can&apos;t do,
                and the keys worth learning.
              </p>
            </header>

            <Section id="overview" title="Overview">
              {[
                <>
                  <p>
                    A pen is three files: HTML, CSS and JavaScript. You write
                    them in the editors at the bottom of the page and the result
                    shows up in the preview above them.
                  </p>
                  <p>
                    There is nothing to install and no build step. Whatever is
                    in the three editors is put together into one page and shown
                    in the preview, so what you see is exactly what the browser
                    would run.
                  </p>
                </>,
                <dl className="space-y-5 bg-muted p-8">
                  <div>
                    <dt className="text-sm text-muted-foreground">Languages</dt>
                    <dd className="text-xl font-medium">
                      HTML, CSS, JavaScript
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Preview updates
                    </dt>
                    <dd className="text-xl font-medium">
                      Half a second after you stop typing
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Editor</dt>
                    <dd className="text-xl font-medium">
                      Monaco, the one from VS Code
                    </dd>
                  </div>
                </dl>,
              ]}
            </Section>

            <Section id="first-pen" title="Your first pen" flip>
              {[
                <>
                  <p>A button that rolls a die takes two panes.</p>
                  <ol className="list-decimal space-y-3 pl-5">
                    <li>
                      Open{" "}
                      <a className="underline" href="/new-pen">
                        New pen
                      </a>{" "}
                      and click into the HTML pane.
                    </li>
                    <li>Paste the markup from the first block.</li>
                    <li>
                      Click into the JS pane and paste the second block. The
                      preview reloads on its own.
                    </li>
                    <li>Click Roll in the preview.</li>
                  </ol>
                  <p>
                    Add a few lines to the CSS pane when you want it to look
                    like something.
                  </p>
                </>,
                <div className="space-y-4">
                  <CodeBlock>
                    <CodeBlockHeader>
                      <CodeBlockTitle>HTML pane</CodeBlockTitle>
                      <CodeBlockActions>
                        <CodeBlockCopyButton value={htmlExample} />
                      </CodeBlockActions>
                    </CodeBlockHeader>
                    <CodeBlockContent>{htmlExample}</CodeBlockContent>
                  </CodeBlock>
                  <CodeBlock>
                    <CodeBlockHeader>
                      <CodeBlockTitle>JS pane</CodeBlockTitle>
                      <CodeBlockActions>
                        <CodeBlockCopyButton value={jsExample} />
                      </CodeBlockActions>
                    </CodeBlockHeader>
                    <CodeBlockContent>{jsExample}</CodeBlockContent>
                  </CodeBlock>
                </div>,
              ]}
            </Section>

            <Section id="workspace" title="The workspace">
              {[
                <>
                  <p>
                    The preview sits on top and the three editors side by side
                    underneath. Every divider can be dragged, so give the
                    preview more room when you are tweaking a layout and the
                    editors more when you are writing.
                  </p>
                  <p>
                    The preview waits until you pause for half a second before
                    it reloads, so it doesn&apos;t flicker while you type.
                  </p>
                  <p>
                    If a script gets stuck in an endless loop the page can look
                    frozen. Fix the code, then press the refresh button at the
                    top of the pen page. It throws the old preview away and
                    starts a fresh one.
                  </p>
                </>,
                <div
                  aria-hidden="true"
                  className="grid aspect-[4/3] grid-rows-2 gap-2 text-sm"
                >
                  <div className="flex items-center justify-center bg-accent text-lg font-medium">
                    Preview
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["HTML", "CSS", "JS"].map((label) => (
                      <div
                        key={label}
                        className="flex items-center justify-center bg-muted font-medium"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>,
              ]}
            </Section>

            <section id="files" className="scroll-mt-8 space-y-8">
              <div className="max-w-prose space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Import and export
                </h2>
                <p className="text-base leading-relaxed">
                  Each pane has two small buttons in its title bar. The arrow
                  pointing in loads a file from your computer and replaces what
                  is in that pane. The arrow pointing out saves the pane to your
                  downloads folder. There is no account and no cloud copy, so
                  export anything you want to keep.
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pane</TableHead>
                    <TableHead>Saved as</TableHead>
                    <TableHead>Import accepts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map(([pane, saved, accepts]) => (
                    <TableRow key={pane}>
                      <TableCell className="font-medium">{pane}</TableCell>
                      <TableCell>{saved}</TableCell>
                      <TableCell>{accepts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            <Section id="shortcuts" title="Editor shortcuts" flip>
              {[
                <>
                  <p>
                    The editors are Monaco, so you get the same shortcuts as in
                    VS Code. These are the ones that save the most time.
                  </p>
                  <p>On a Mac, read Ctrl as Cmd and Alt as Option.</p>
                </>,
                <Table>
                  <TableBody>
                    {shortcuts.map(([action, keys]) => (
                      <TableRow key={action}>
                        <TableCell>{action}</TableCell>
                        <TableCell className="text-right">
                          <KbdGroup>
                            {keys.map((k) => (
                              <Kbd key={k}>{k}</Kbd>
                            ))}
                          </KbdGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>,
              ]}
            </Section>

            <Section id="sandbox" title="The sandbox">
              {[
                <>
                  <p>
                    Your code runs in an iframe with{" "}
                    <code>sandbox=&quot;allow-scripts&quot;</code> and nothing
                    else. That means a pen can run JavaScript but is treated as
                    a stranger by the rest of the site.
                  </p>
                  <p>
                    The CSS and JavaScript are written into the page itself
                    rather than linked, because a sandboxed frame can&apos;t
                    load files from this site. If you link a script or font from
                    a CDN in the HTML pane, that still works.
                  </p>
                </>,
                <div className="grid gap-8 bg-muted p-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Works</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Running scripts</li>
                      <li>Changing the DOM</li>
                      <li>Loading resources from a CDN</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Blocked</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Reading this site&apos;s cookies or storage</li>
                      <li>Reaching the parent page</li>
                      <li>Opening popups and submitting forms</li>
                    </ul>
                  </div>
                </div>,
              ]}
            </Section>
          </main>
        </div>

        <AppFooter />
      </div>
    </AppLayout>
  );
}
